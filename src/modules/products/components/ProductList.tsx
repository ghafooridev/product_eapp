import React from 'react';
import ProductItem from './ProductItem';
import { ProductWithImages } from '@/types';

const ProductList = async (props: { products: ProductWithImages[] }) => {
  const { products } = props;

  return (
    <div className="flex w-full my-10 flex-wrap justify-between items-center">
      {products.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </div>
  );
};

export default ProductList;
