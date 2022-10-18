import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface ProductDetailsProps {
  image: string;
  title: string;
  description: string;
  rating: number;
  longDescription: string;
}

interface FullProductProps {
  data: ProductDetailsProps;
}

type ProductBase = Pick<ProductDetailsProps, "title" | "image">;

export const ProductLight = ({ image, title }: ProductBase) => {
  return (
    <div className='rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-white p-1 shadow-xl'>
      <div className='block relative h-full rounded-xl bg-gray-800 p-6 sm:p-8'>
        <div className='mt-5'>
          <div className='p-3 bg-white'>
            <Image
              width={16}
              height={9}
              layout='responsive'
              objectFit='contain'
              alt={title}
              src={image}
            />
          </div>
          <h5 className='text-xl mt-5 font-bold text-white'>{title}</h5>
        </div>
      </div>
    </div>
  );
};

export const FullProduct = ({ data }: FullProductProps) => {
  return (
    <div className='rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-white p-1 shadow-xl h-full'>
      <div className='block relative h-full rounded-xl bg-gray-800 p-6 sm:p-8'>
        <span className='absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-black'>
          Rating: {data.rating}
        </span>
        <div className='mt-5'>
          <div className='p-3 bg-white'>
            <Image
              alt={data.title}
              src={data.image}
              width={16}
              height={9}
              layout='responsive'
              objectFit='contain'
            />
          </div>
          <h5 className='text-2xl mt-5 font-bold text-white'>{data.title}</h5>
          <p className='mt-2 text-sm text-gray-400'>{data.description}</p>
          <div className='mt-6'>
            <article className='prose prose-h2:text-gray-200 prose-h2:text-lg prose-h3:text-gray-200 prose-h3:text-lg prose-a:text-blue-500'>
              <ReactMarkdown className='text-sm text-gray-400'>
                {data.longDescription}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};
