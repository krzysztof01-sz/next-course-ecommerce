import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { Product } from ".";
import { Main } from "../../components/Main";
import { FullProduct } from "../../components/Product";
import { NextSeo } from "next-seo";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export const getStaticPaths = async () => {
  const response: Product[] = await fetch(
    "https://naszsklep-api.vercel.app/api/products"
  )
    .then((res) => res.json())
    .then((data) => data);

  const ids = response.map(({ id }) => ({
    params: {
      id: String(id),
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
  if (!params?.id) {
    return {
      props: {},
      notFound: true,
    };
  }

  const response: Product | null = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${params.id}`
  )
    .then((res) => res.json())
    .then((data) => data);

  return {
    props: {
      product: response,
    },
  };
};

const ProductDetailsPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
          <Link href='/products'>
            <a>Go back</a>
          </Link>
        </button>
        <FullProduct
          data={{
            description: product.description,
            image: product.image,
            rating: product.rating.rate,
            title: product.title,
            longDescription: product.longDescription,
          }}
        />
      </div>
    </Main>
  );
};

export default ProductDetailsPage;
