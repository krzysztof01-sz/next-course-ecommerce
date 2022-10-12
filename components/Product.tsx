import Image from "next/image";

interface ProductDetailsProps {
  image: string;
  title: string;
  description: string;
  rating: number;
}

interface FullProductProps {
  data: ProductDetailsProps;
}

type ProductBase = Pick<ProductDetailsProps, "title" | "image">;

export const ProductDetails = ({ image, title }: ProductBase) => {
  return (
    <div className='rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-white p-1 shadow-xl'>
      <div className='block relative h-full rounded-xl bg-gray-800 p-6 sm:p-8'>
        <div className='mt-5'>
          <Image
            width={16}
            height={19}
            layout='responsive'
            alt={title}
            src={image}
          />
          <h5 className='text-xl mt-5 font-bold text-white'>{title}</h5>
        </div>
      </div>
    </div>
  );
};

export const FullProduct = ({ data }: FullProductProps) => {
  return (
    <div className='rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-white p-1 shadow-xl'>
      <div className='block relative h-full rounded-xl bg-gray-800 p-6 sm:p-8'>
        <span className='absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-black'>
          {data.rating}
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
          <h5 className='text-xl mt-5 font-bold text-white'>{data.title}</h5>
          <p className='mt-2 text-sm text-gray-300'>{data.description}</p>
        </div>
      </div>
    </div>
  );
};
