import { Review } from "../graphql/generated/graphql";

interface ProductReviewProps {
  review: Pick<Review, "__typename" | "title" | "content" | "rating">;
}

export const ProductReview = ({ review }: ProductReviewProps) => {
  return (
    <div className='w-full p-1 rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-white'>
      <div className='p-4 flex flex-col h-full w-full bg-gray-800'>
        <h4 className='text-gray-100 text-xl text-bold'>{review.title}</h4>
        <p className='mt-3 text-sm text-gray-400'>{review.content}</p>
        <span className='block mt-3 self-end text-white'>
          Review: {review.rating}/5
        </span>
      </div>
    </div>
  );
};
