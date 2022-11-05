import { Main } from "../../components/Main";
import { NoProducts } from "../../components/NoProducts";
import { Pagination } from "../../components/Pagination";
import { ProductsList } from "../../components/ProductsList";
import { apolloClient } from "../../graphql";
import {
  GetAllProductsDocument,
  LightProductFragment,
} from "../../graphql/generated/graphql";

export const getStaticProps = async () => {
  const { data, error } = await apolloClient.query({
    query: GetAllProductsDocument,
  });

  if (error || !data) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
      page: 1,
    },
  };
};

interface ProductsPageProps {
  products: LightProductFragment[];
  page: number;
}

const ProductsPage = ({ products, page }: ProductsPageProps) => {
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

export default ProductsPage;
