// app/products/[id]/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ProductWithImages } from "@/types";
import { Button } from "@/components/ui";
import { ShoppingCart } from "lucide-react";

export default async function ProductDetail(product: ProductWithImages) {

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{product?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {product?.images.length > 0 ? (
                <Image
                  src={product?.images[0].image}
                  alt={product?.name}
                  width={500}
                  height={500}
                  quality={50}
                  property="1"
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                  No Image Available
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-xl font-semibold">${product?.price?.toFixed(2)}</p>
              <p className="text-gray-700">quantity: {product?.quantity}</p>
              <p className="mt-2 text-sm">Category: {product?.category}</p>
              <p className="text-gray-600 line-clamp">{product?.description || "No description available."}</p>
              <Button>Add To Cart
                <ShoppingCart />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
