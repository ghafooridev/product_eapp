import ProductTable from "../components/ProductTable";
import { getProducts } from "../services/product";



const ProductDashBoardView = async () => {
  const products = await getProducts();

  return (
    <ProductTable products={products} />
  );
}

export default ProductDashBoardView