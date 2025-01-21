import React from 'react'
import { Suspense } from "react";
import Spinner from '@/components/Spinner';
import ProductSiteView from '@/modules/products/views/productSiteView';

// export const revalidate = 60;




function ProductPage() {
  // throw new Error("An unintentional Error, please revisit again")
  return (
    <div>
      <Suspense fallback={
        <Spinner />
      }>
        <ProductSiteView />
      </Suspense>
    </div>
  )
}

export default ProductPage