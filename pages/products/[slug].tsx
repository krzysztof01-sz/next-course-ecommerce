import { Main } from "../../components/Main";
import { FullProduct } from "../../components/Product";
import { NextSeo } from "next-seo";
import { serialize } from "next-mdx-remote/serialize";
import { useRouter } from "next/router";
import { apolloClient } from "../../graphql";
import {
  FullProductFragment,
  GetAllProductsSlugDocument,
  GetProductDetailsDocument,
  GetProductReviewsDocument,
  Review,
} from "../../graphql/generated/graphql";
import { ProductReviewForm } from "../../components/ProductReviewForm";
import { ProductReview } from "../../components/ProductReview";
import { useEffect, useState } from "react";
import { NoProducts } from "../../components/NoProducts";

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
    query: GetProductDetailsDocument,
    variables: {
      slug: params.slug,
    },
  });

  if (error || !data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  const longDescription = (data.product as FullProductFragment).longDescription;

  return {
    props: {
      product: {
        ...data.product,
        longDescription: longDescription
          ? await serialize(longDescription)
          : undefined,
      },
    },
  };
};

interface ProductDetailsPageProps {
  product: FullProductFragment;
}

export type ProductReview = Pick<
  Review,
  "id" | "title" | "content" | "rating" | "__typename"
>;

const ProductDetailsPage = ({ product }: ProductDetailsPageProps) => {
  const { back, query } = useRouter();
  const [reviews, setReviews] = useState<ProductReview[]>([]);

  useEffect(() => {
    apolloClient.refetchQueries({ include: ["GetProductReviews"] });
  }, [reviews]);

  useEffect(() => {
    const getProductReviews = async () => {
      const { data, error } = await apolloClient.query({
        query: GetProductReviewsDocument,
        variables: { slug: query.slug as string },
        fetchPolicy: "no-cache",
      });

      if (data.product?.reviews) {
        return setReviews(data.product.reviews);
      }
      if (error) {
        return [];
      }
    };
    getProductReviews();
  }, [query.slug]);

  if (!product) return <NoProducts />;

  return (
    <Main>
      <NextSeo
        title={product.title}
        description={product.description as string}
        canonical={`https://next-course-ecommerce.vercel.app/products/${product.slug}`}
        openGraph={{
          url: `https://next-course-ecommerce.vercel.app/products/${product.slug}`,
          title: product.title,
          description: product.description as string,
          images: [
            {
              url: product.image ? product.image.url : "",
              alt: product.title,
              type: "image/jpeg",
            },
          ],
          site_name: "My e-commerce next app",
        }}
      />
      <div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5'>
          <div onClick={back}>
            <a>Go back</a>
          </div>
        </button>
      </div>
      <div className='flex flex-col lg:flex-row w-full md:w-2/3 lg:w-full mx-auto h-max'>
        <div className='md:w-full lg:1/2'>
          <FullProduct data={product} />
        </div>
        <div className='mt-6 lg:mt-0 lg:ml-5 md:w-full lg:1/2'>
          <ProductReviewForm reviews={reviews} setReviews={setReviews} />
          <ul>
            {reviews.map((review) => {
              return (
                <li className='mt-4' key={review.id}>
                  <ProductReview review={review} key={review.id} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Main>
  );
};

export default ProductDetailsPage;
