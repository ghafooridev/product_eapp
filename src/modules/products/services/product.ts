

'use server';
import { prisma, PrismaType } from "@/lib/prisma"
import { redirect } from "next/navigation";

// import { fetcher } from "@/lib/fetcher";
import { Product } from "@prisma/client";



export const getProducts = async () => {
  const result = await prisma.product.findMany({ include: { images: true } });
  return result
}

export const getProductById = async (id: string) => {
  // 'use server';
  const result = await prisma.product.findFirst({ where: { id }, include: { images: true } });
  if (!result) {
    return null;
  }
  return result

}

// export const upsertProduct = async (id: string, _actionState: ActionState<Product>, formData: FormData) => {
//   // 'use server';

//   const productData = {
//     name: formData.get('name') as string,
//     category: formData.get('category') as PrismaType.ProductCategory,
//     description: formData.get('description') as string | null,
//     price: parseFloat(formData.get('price') as string) || 0,
//     quantity: parseInt(formData.get('quantity') as string, 10) || 0,
//   };

//   try {
//     if (id) {
//       const result = await prisma.product.update({
//         where: { id },
//         data: productData, // Update data
//       });

//       return { message: "product updated", data: result }
//     } else {
//       const result = await prisma.product.create({
//         data: productData, // ID will be auto-generated
//       });
//       console.log("first", result)
//       return { message: "product Created", data: result }
//     }
//   } catch (error) {
//     console.log(error)
//     throw new Error('Failed to upsert product');
//   }
//   finally {

//     // redirect('/product');
//     // revalidatePath(`/dashboard/products/${productData.id}`)
//   }
// }

export const upsertProduct = async (_prevState: { message: string, data: Product | null }, formData: FormData) => {
  const id = formData.get('id') as string | null;
  const productData = {
    name: formData.get('name') as string,
    category: formData.get('category') as PrismaType.ProductCategory,
    description: formData.get('description') as string | null,
    price: parseFloat(formData.get('price') as string) || 0,
    quantity: parseInt(formData.get('quantity') as string, 10) || 0,
  };

  try {
    let result;
    if (id) {
      result = await prisma.product.update({
        where: { id },
        data: productData,
      });
      return { message: 'Product updated', data: result };
    } else {
      result = await prisma.product.create({
        data: productData,
      });
      return { message: 'Product created', data: result };
    }
  } catch (error) {
    console.error('Error:', error);
    return { message: 'Failed to upsert product', data: null };
  }
};

export const deleteProduct = async (formData: FormData) => {
  // 'use server';

  const id = formData.get('id') as string | undefined;
  if (!id) {
    throw new Error('Product id is required');

  }
  await prisma.product.delete({ where: { id } })
  redirect('/dashboard/products');
}

// API CALLS
// export const getProductsAction = async (): Promise<PrismaType.Product[]> => {
//   return await fetcher('/api/product');
// }

// export const getProductByIdAction = async (id: string): Promise<PrismaType.Product> => {
//   return await fetcher(`/api/product?id=${id}`);
// }