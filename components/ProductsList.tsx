import { LightProductFragment } from "../graphql/generated/graphql";
import { ProductLight } from "./Product";

interface ProductsListProps {
  products: LightProductFragment[];
}

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {products.map((product) => (
        <li key={product.id}>
          <ProductLight product={product} />
        </li>
      ))}
    </ul>
  );
};
