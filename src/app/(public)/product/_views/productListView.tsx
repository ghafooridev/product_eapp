// import ProductList from "../_components/ProductList";
import ProductTable from "../_components/ProductTable";
import { getProducts } from "../_services/product";



const ProductsView = async () => {
  const products = await getProducts();

  return (
    <ProductTable products={products} />
    // <ProductList products={products} />
  );
}

export default ProductsView