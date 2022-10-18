import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { Main } from "../../components/Main";
import { FullProduct } from "../../components/Product";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const getStaticProps = async () => {
  const response: Product[] = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => data);
  return {
    props: {
      product: response,
    },
  };
};

const ProductsPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Main>
      <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {product.map(({ description, image, rating, title, id }) => (
          <li key={id}>
            <Link passHref href={`/products/${id}`}>
              <a>
                <FullProduct
                  data={{ description, image, rating: rating.rate, title }}
                />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Main>
  );
};

export default ProductsPage;
