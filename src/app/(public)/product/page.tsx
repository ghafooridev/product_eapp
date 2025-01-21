import React from 'react'
import { Suspense } from "react";
import Spinner from '@/components/Spinner';
import ProductList from './_views/productListView';

// export const revalidate = 60;




function ProductPage() {
  // throw new Error("An unintentional Error, please revisit again")
  return (
    <div>
      <Suspense fallback={
        <Spinner />
      }>
        <ProductList />
      </Suspense>
    </div>
  )
}

export default ProductPage