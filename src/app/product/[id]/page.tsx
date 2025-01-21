import React from 'react'
import { Suspense } from "react";
import Spinner from '@/components/Spinner';
import ProductDetailView from '../_views/productDetailView';


const ProductPage = async ({ params }: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id
  return (
    <div>
      <Suspense fallback={
        <Spinner />
      }>
        <ProductDetailView id={id} />
      </Suspense>
    </div>
  )
}

export default ProductPage