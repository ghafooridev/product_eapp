import Image from 'next/image';
import { Card, CardHeader, CardContent, CardFooter, Button } from '@/components/ui';
import Link from 'next/link';
import { ProductWithImages } from '@/types';

const ProductItem = async (props: { product: ProductWithImages }) => {
  const { product } = props;
  return (
    <Card className="w-[400px] transform transition-transform duration-300 hover:scale-105">
      <Link href="/">
        <CardHeader>
          <div className="relative w-full h-[300px]">
            <Image src={product?.images[0]?.image || '/assets/noImage.jpg'} alt={product?.name} fill className="rounded-t-lg object-cover" />
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-bold">{product?.name}</h2>
          <p className="text-gray-500">{product?.category}</p>
          <p className="mt-2 text-ellipsis overflow-hidden whitespace-nowrap">{product?.description}</p>
          <p className="mt-4 text-lg font-semibold">${product?.price?.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter>
        <Button className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;