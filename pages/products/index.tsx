import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Main } from "../../components/Main";
import { Pagination } from "../../components/Pagination";
import { ProductLight } from "../../components/Product";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  longDescription?: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductsPage = () => {
  const { query } = useRouter();
  const page = Number(query.page || 1);
  const offset = (page - 1) * 25;

  const { data: products, refetch } = useQuery<Product[]>(
    "products",
    async () => {
      const response = await fetch(
        `https://naszsklep-api.vercel.app/api/products?take=25&offset=${offset}`
      );
      const products = await response.json();
      return products;
    }
  );

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (!products) {
    return <div>Oops, something went wrong.</div>;
  }

  return (
    <Main>
      <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {products.map(({ image, title, id }) => (
          <li key={id}>
            <Link passHref href={`/products/${id}`}>
              <a>
                <ProductLight image={image} title={title} />
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <Pagination page={page} />
    </Main>
  );
};

export default ProductsPage;
