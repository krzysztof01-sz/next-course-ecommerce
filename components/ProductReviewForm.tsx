import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { apolloClient } from "../graphql";
import {
  CreateProductReviewDocument,
  PublishProductReviewDocument,
} from "../graphql/generated/graphql";
import { ProductReview } from "../pages/products/[slug]";
import { Input } from "./Input";
import { OrderAlert } from "./OrderAlert";

const schema = yup
  .object({
    title: yup.string().required("Field is required"),
    content: yup.string().required("Field is required"),
    rating: yup.number().min(1).max(5).required("Field is required"),
  })
  .required();

export type ProductReviewData = yup.InferType<typeof schema>;

interface ProductReviewFormProps {
  reviews: ProductReview[];
  setReviews: Dispatch<SetStateAction<ProductReview[]>>;
}

export const ProductReviewForm = ({
  reviews,
  setReviews,
}: ProductReviewFormProps) => {
  const { query } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductReviewData>({ resolver: yupResolver(schema) });
  const [error, setError] = useState<string | undefined>(undefined);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: ProductReviewData) => {
    setError(undefined);
    setIsSuccess(false);

    const { data: response } = await apolloClient.mutate({
      mutation: CreateProductReviewDocument,
      variables: {
        review: {
          ...data,
          clduq942m0coq01un9z8544g9: {
            connect: [{ slug: query.slug as string }],
          },
        },
      },
    });

    if (!response?.createReview) {
      return setError("Dodawanie nie powiodło się");
    }

    const publishingResponse = await apolloClient.mutate({
      mutation: PublishProductReviewDocument,
      variables: { id: response?.createReview?.id },
    });

    if (!publishingResponse.data) {
      return setError("Publikowanie recenzji nie powiodło się");
    }

    setReviews([response.createReview, ...reviews]);
    return setIsSuccess(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4'>
          <div>
            <Input
              labelText='Title'
              labelFor='title'
              error={errors.title?.message}
              register={register}
            />
          </div>
          <div className='mt-3'>
            <label
              htmlFor='content'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Your review
            </label>
            <div className='mt-2 px-4 py-2 bg-white rounded-t-lg dark:bg-gray-600'>
              <textarea
                id='content'
                rows={4}
                className='w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-600 focus:ring-0 dark:text-white dark:placeholder-gray-400'
                {...register("content")}
              />
            </div>
            <p className='text-red-400 text-sm font-bold mt-1'>
              {errors.content?.message}
            </p>
          </div>
          <div className='mt-3'>
            <Input
              inputType='number'
              labelFor='rating'
              labelText='Rating'
              register={register}
              error={errors.rating?.message}
            />
          </div>
          <div className='mt-3 flex items-center justify-between py-2 dark:border-gray-600'>
            {error && <OrderAlert text={error} variant='error' />}
            {isSuccess ? (
              <OrderAlert
                text='Opinia została dodana pomyślnie'
                variant='success'
              />
            ) : (
              <button
                type='submit'
                className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'
              >
                Dodaj opinie
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
