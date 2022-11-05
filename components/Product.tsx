import Image from "next/image";
import Link from "next/link";
import {
  FullProductFragment,
  LightProductFragment,
} from "../graphql/generated/graphql";
import { useCartContext } from "../hooks/useCartContext";
import { MarkdownResult } from "../types";
import { CustomMarkdown } from "./CustomMarkdown";

export const ProductLight = ({
  id,
  title,
  slug,
  image,
}: LightProductFragment) => {
  const { addProduct } = useCartContext();

  return (
    <div className='rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-white p-1 shadow-xl'>
      <div className='block relative h-full rounded-xl bg-gray-800 p-6 sm:p-8'>
        <div className='mt-5'>
          <Link passHref href={`/products/${slug}`}>
            <a>
              <div className='p-3 bg-white'>
                {image && (
                  <Image
                    width={16}
                    height={9}
                    layout='responsive'
                    objectFit='contain'
                    alt={title}
                    src={image.url}
                  />
                )}
              </div>
              <h5 className='text-xl mt-5 font-bold text-white'>{title}</h5>
            </a>
          </Link>

          <button
            onClick={() => addProduct({ title, price: 10, id })}
            type='button'
            className='mt-4 text-white bg-pink-500 hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-pink-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2'
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
};

interface FullProductProps {
  data: FullProductFragment;
}

export const FullProduct = ({ data }: FullProductProps) => {
  return (
    <div className='rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-white p-1 shadow-xl h-full'>
      <div className='block relative h-full rounded-xl bg-gray-800 p-6 sm:p-8'>
        <span className='absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-black'>
          Rating: {data.rating}
        </span>
        <div className='mt-5'>
          <div className='p-3 bg-white'>
            {data.image && (
              <Image
                alt={data.title}
                src={data.image.url}
                width={2}
                height={1}
                layout='responsive'
                objectFit='contain'
              />
            )}
          </div>
          <h5 className='text-2xl mt-5 font-bold text-white'>{data.title}</h5>
          <p className='mt-2 text-sm text-gray-400'>{data.description}</p>
          {data.longDescription && (
            <div className='mt-6'>
              <article className='prose prose-h2:text-gray-200 prose-h2:text-lg prose-h3:text-gray-200 prose-h3:text-lg prose-a:text-white'>
                <CustomMarkdown>
                  {data.longDescription as unknown as MarkdownResult}
                </CustomMarkdown>
              </article>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
