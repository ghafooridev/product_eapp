import ProductList from '../components/ProductList';
import { getProducts } from '../services/product';

const ProductSiteView = async () => {
  const products = await getProducts();

  return <ProductList products={products} />;
};

export default ProductSiteView;
