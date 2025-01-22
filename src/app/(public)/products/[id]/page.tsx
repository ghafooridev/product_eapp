import { customMetaDataGenerator } from "@/lib/staticMetadata";
import ProductDetail from "@/modules/products/components/ProductDetail";
import { getProductById } from "@/modules/products/services/product";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const product = await getProductById(id);

  if (!product) {
    return customMetaDataGenerator({
      title: "Not Found",
    });
  }
  return customMetaDataGenerator({
    title: product?.name,
    images: product?.images,
    description: product?.description,
  })
}

const ProductDetailPage = async ({ params }: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id

  const product = await getProductById(id);


  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product?.name,
    image: product?.images.length && product?.images[0].image,
    description: product?.description,
  }


  if (!product) {
    return notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail {...product} />
    </section>
  );
}

export default ProductDetailPage