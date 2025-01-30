import { getProductById } from '../services/product';
import ProductForm from '../components/ProductForm';
import React, { FC } from 'react';

const ProductDetailView: FC<{ id: string }> = async ({ id }) => {
  const product = await getProductById(id);
  return (
    <div>
      <ProductForm product={product} />
    </div>
  );
};

export default ProductDetailView;
