import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"
import { Edit, PlusCircle } from "lucide-react";
import Link from "next/link";
import DeleteProduct from "./DeleteProduct";
import Image from "next/image";
import { getProducts } from "../services/product";

const ProductTable = async (props: { products: Awaited<ReturnType<typeof getProducts>> }) => {
  const { products } = props;
  return (
    <div className="border border-gray-200 rounded-lg shadow-md mt-4 ">
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-xl font-semibold">Products</h1>
        <Button asChild>
          <Link href="/product/new">Add New Product
            <PlusCircle />
          </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Name</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell >{product.name}-{product.id}</TableCell>
              <TableCell className="text-center">{product.category}</TableCell>
              <TableCell className="text-center">{product.price}</TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell className="text-center">
                <Image src={product.images[0]?.image || '/assets/noImage.jpg'} alt={product.name} width={50} height={50} className="rounded-full m-auto" />
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2 items-center">
                  <Button variant="ghost" asChild>
                    <Link href={`/product/${product.id}`} >
                      <Edit />
                    </Link>
                  </Button>
                  <DeleteProduct id={product.id as string} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">{products.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>

  )
}
export default ProductTable