import { InferGetStaticPropsType } from "next";
import { Product } from "../";
import { Main } from "../../../components/Main";
import { Pagination } from "../../../components/Pagination";
import { InferGetStaticPaths } from "../[id]";
import { NoProducts } from "../../../components/NoProducts";
import { ProductsList } from "../../../components/ProductsList";

export const getStaticPaths = async () => {
  const ids = [...new Array(10)].map((_, id) => ({
    params: {
      page: String(id + 1),
    },
  }));

  return {
    paths: ids,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.page) {
    return {
      props: {},
      notFound: true,
    };
  }

  const offset = (Number(params.page) - 1) * 25;
  const { page } = params;

  const products: Product[] | null = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=25&offset=${offset}`
  )
    .then((res) => res.json())
    .then((data) => data);

  if (!products) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      products,
      page,
    },
  };
};

const SingleProductsPage = ({
  products,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!products) {
    return <NoProducts />;
  }

  return (
    <Main>
      <ProductsList products={products} />
      <Pagination page={Number(page)} />
    </Main>
  );
};

export default SingleProductsPage;
