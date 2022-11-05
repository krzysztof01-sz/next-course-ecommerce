import { InferGetStaticPropsType } from "next";
import { Main } from "../../components/Main";
import { FullProduct } from "../../components/Product";
import { NextSeo } from "next-seo";
import { serialize } from "next-mdx-remote/serialize";
import { useRouter } from "next/router";
import { apolloClient } from "../../graphql";
import { gql } from "@apollo/client";
import { GetAllProductsSlugDocument } from "../../graphql/generated/graphql";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query({
    query: GetAllProductsSlugDocument,
  });

  const slugs = data.products.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths: slugs,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.slug) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { data, error } = await apolloClient.query({
    query: gql`
      query GetProductDetails($slug: String!) {
        product(where: { slug: $slug }) {
          id
          title
          slug
          description
          longDescription
          rating
          price
          image {
            id
            width
            height
            url(
              transformation: { image: { resize: { width: 800, height: 400 } } }
            )
          }
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });

  if (error) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      product: {
        ...data.product,
        longDescription: data.product.longDescription
          ? await serialize(data.product.longDescription)
          : undefined,
      },
    },
  };
};

const ProductDetailsPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { back } = useRouter();

  if (!product) {
    return <p>Product not found 😥</p>;
  }

  return (
    <Main>
      <NextSeo
        title={product.title}
        description={product.description}
        canonical={`https://next-course-ecommerce.vercel.app/products/${product.id}`}
        openGraph={{
          url: `https://next-course-ecommerce.vercel.app/products/${product.id}`,
          title: product.title,
          description: product.description,
          images: [
            {
              url: product.image,
              alt: product.title,
              type: "image/jpeg",
            },
          ],
          site_name: "My e-commerce next app",
        }}
      />
      <div className='w-full md:w-2/3 lg:w-2/5 mx-auto h-max'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5'>
          <div onClick={back}>
            <a>Go back</a>
          </div>
        </button>
        <FullProduct data={product} />
      </div>
    </Main>
  );
};

export default ProductDetailsPage;
