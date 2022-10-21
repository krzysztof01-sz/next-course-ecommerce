import Link from "next/link";

interface PageProps {
  number: number;
}

const Page = ({ number }: PageProps) => {
  return (
    <Link href={`/products?page=${number}`} passHref>
      <a className='border-transparent text-gray-100 hover:text-gray-400 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'>
        {number}
      </a>
    </Link>
  );
};

const ActivePage = ({ number }: PageProps) => {
  return (
    <div
      className='border-pink-500 text-pink-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'
      aria-current='page'
    >
      {number}
    </div>
  );
};

const PagesSeparator = () => {
  return (
    <span className='border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'>
      ...
    </span>
  );
};

export const Pagination = ({ page }: { page: number }) => {
  return (
    <nav className='border-t border-gray-100 px-4 flex items-center justify-between sm:px-0'>
      <div className='hidden md:-mt-px md:flex'>
        {[...new Array(10)].map((_, index) => {
          const pageIndex = index + 1;
          if (pageIndex === page) {
            return <ActivePage key={pageIndex} number={pageIndex} />;
          }
          return <Page key={pageIndex} number={pageIndex} />;
        })}
      </div>
    </nav>
  );
};
