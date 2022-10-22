import { InferGetStaticPropsType } from "next";
import { Main } from "../../components/Main";
import { NoProducts } from "../../components/NoProducts";
import { Pagination } from "../../components/Pagination";
import { ProductsList } from "../../components/ProductsList";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  longDescription?: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const getStaticProps = async () => {
  const products: Product[] | null = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=25&offset=0`
  ).then((data) => data.json());

  if (!products) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      products,
      page: 1,
    },
  };
};

const ProductsPage = ({
  products,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!products) {
    return <NoProducts />;
  }

  return (
    <Main>
      <ProductsList products={products} />
      <Pagination page={page} />
    </Main>
  );
};

export default ProductsPage;
