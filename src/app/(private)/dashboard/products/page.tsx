import React from 'react';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import ProductDashBoardView from '@/modules/products/views/productDashboardView';

function ProductPage() {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <ProductDashBoardView />
      </Suspense>
    </div>
  );
}

export default ProductPage;
