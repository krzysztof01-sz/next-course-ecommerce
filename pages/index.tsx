import { Main } from "../components/Main";
import { FullProduct } from "../components/Product";
import { apolloClient } from "../graphql";
import {
  FullProductFragment,
  GetHomepageProductsDocument,
} from "../graphql/generated/graphql";

export const getStaticProps = async () => {
  const { data, error } = await apolloClient.query({
    query: GetHomepageProductsDocument,
  });

  if (error) {
    return {
      props: {
        products: [],
      },
      notFound: true,
    };
  }

  if (data) {
    return {
      props: {
        products: data.products,
      },
    };
  }
};

interface HomeProps {
  products: FullProductFragment[];
}

const Home = ({ products }: HomeProps) => {
  return (
    <Main>
      <ul className='grid md:grid-cols-2 gap-6'>
        {products.map((product) => {
          return (
            <FullProduct
              key={product.title}
              data={{ ...product, longDescription: undefined }}
            />
          );
        })}
      </ul>
    </Main>
  );
};

export default Home;
