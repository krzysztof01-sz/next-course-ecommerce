import { Main } from "../../../components/Main";
import { Pagination } from "../../../components/Pagination";
import { InferGetStaticPaths } from "../[slug]";
import { NoProducts } from "../../../components/NoProducts";
import { ProductsList } from "../../../components/ProductsList";
import {
  GetAllProductsDocument,
  GetPageProductsDocument,
  LightProductFragment,
} from "../../../graphql/generated/graphql";
import { apolloClient } from "../../../graphql";

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query({
    query: GetAllProductsDocument,
  });

  const ids = [...new Array(Math.ceil(data.products.length / 3))].map(
    (_, id) => ({
      params: {
        page: String(id + 1),
      },
    })
  );

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

  const { page } = params;
  const offset = (Number(page) - 1) * 3;

  const { data, error } = await apolloClient.query({
    query: GetPageProductsDocument,
    variables: { first: 3, skip: offset },
  });

  if (!data || error) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      products: data.productsConnection.edges.map((prod) => prod.node),
      productsCount: data.productsConnection.aggregate.count,
      page,
    },
  };
};

interface SingleProductsPageProps {
  products: LightProductFragment[];
  page: number;
  productsCount: number;
}

const SingleProductsPage = ({
  products,
  page,
  productsCount,
}: SingleProductsPageProps) => {
  if (!products) {
    return <NoProducts />;
  }

  return (
    <Main>
      <ProductsList products={products} />
      <Pagination itemsCount={productsCount} page={Number(page)} />
    </Main>
  );
};

export default SingleProductsPage;
