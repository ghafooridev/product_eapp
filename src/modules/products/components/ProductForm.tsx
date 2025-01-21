'use client';

import { Product, ProductCategory } from '@prisma/client';
import { FC, useActionState } from 'react';
import {
  Input, Button, Textarea, Label, Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle, Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from '@/components/ui';
import { upsertProduct } from '../services/product';
import Link from 'next/link';
import dynamic from "next/dynamic";
const UploadImage = dynamic(() => import("./UploadImage"), { ssr: false });


const ProductForm: FC<{ product: Product | null }> = ({ product }) => {
  const [actionState, action] = useActionState(
    upsertProduct,
    { message: '', data: product }
  );
  const { data } = actionState;

  return (
    <Card className="w-[500px] mx-auto mt-10">
      <form action={action} className="max-w-lg">
        <CardHeader>
          <CardTitle> Product</CardTitle>
          <CardDescription>Create New Product</CardDescription>
        </CardHeader>
        <CardContent>
          <input type="hidden" name="id" value={data?.id || ''} />
          <div className="my-2">
            <Label htmlFor="name">Product Name</Label>
            <Input name="name" id="name" defaultValue={data?.name || ''} required />
          </div>
          <div className="my-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" required defaultValue={data?.category || ProductCategory.OTHER}>
              <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
              <SelectContent>
                {Object.values(ProductCategory).map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="my-2">
            <Label htmlFor="description">Description</Label>
            <Textarea name="description" id="description" defaultValue={data?.description || ''} />
          </div>
          <div className="my-2">
            <Label htmlFor="price">Price</Label>
            <Input type="number" name="price" id="price" defaultValue={data?.price || ''} step="0.01" />
          </div>
          <div className="my-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input type="number" name="quantity" id="quantity" defaultValue={data?.quantity || ''} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/product">Cancel</Link>
          </Button>
          <Button type="submit">
            {data?.id ? 'Update Product' : 'Add Product'}
          </Button>
        </CardFooter>
      </form>
      {data?.id && <CardFooter className="flex justify-between">
        <UploadImage productId={data?.id} />

      </CardFooter>}
    </Card>
  );
};

export default ProductForm;
