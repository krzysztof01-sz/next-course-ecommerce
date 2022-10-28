import Link from "next/link";
import { Product } from "../pages/products";
import { ProductLight } from "./Product";

interface ProductsListProps {
  products: Product[];
}

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {products.map(({ image, title, id }) => (
        <li key={id}>
          <ProductLight id={id} image={image} title={title} />
        </li>
      ))}
    </ul>
  );
};
