import { Main } from "../../components/Main";
import { NoProducts } from "../../components/NoProducts";
import { Pagination } from "../../components/Pagination";
import { ProductsList } from "../../components/ProductsList";
import { apolloClient } from "../../graphql";
import {
  GetPageProductsDocument,
  LightProductFragment,
} from "../../graphql/generated/graphql";

export const getStaticProps = async () => {
  const { data, error } = await apolloClient.query({
    query: GetPageProductsDocument,
    variables: { first: 3, skip: 0 },
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
      page: 1,
    },
  };
};

interface ProductsPageProps {
  products: LightProductFragment[];
  page: number;
  productsCount: number;
}

const ProductsPage = ({ products, page, productsCount }: ProductsPageProps) => {
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

export default ProductsPage;
