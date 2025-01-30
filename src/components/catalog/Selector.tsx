'use client';
import { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { getProducts } from '@/modules/products/services/product';
import { Product } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function CatalogSelector() {
  const params = useSearchParams();
  const id = params.get('id');
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((_products) => {
      setProducts(_products);
    });
  }, [id]);

  const onChangeSelector = (value: string) => {
    router.push(`/products/catalog?id=${value}`);
  };

  return (
    <Select onValueChange={onChangeSelector} value={id!}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Product" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>products</SelectLabel>
          {products.map((product) => {
            return (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default CatalogSelector;
