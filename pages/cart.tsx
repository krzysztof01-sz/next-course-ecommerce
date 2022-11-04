import Link from "next/link";
import { useCartContext } from "../hooks/useCartContext";

const CartPage = () => {
  const { products, deleteProduct } = useCartContext();

  if (products.length === 0) {
    return (
      <>
        <h2 className='text-white text-xl text-bold my-6'>
          No products in your cart
        </h2>
        <Link href='/products' passHref>
          <a className='text-blue-300 underline'>Buy some products</a>
        </Link>
      </>
    );
  }

  return (
    <>
      <table className='w-1/2 text-sm text-left text-white'>
        <thead className='text-xs text-gray-900 uppercase bg-gray-50'>
          <tr>
            <th scope='col' className='text-left py-3 px-6'>
              Title
            </th>
            <th scope='col' className='text-left py-3 px-6'>
              Price
            </th>
            <th scope='col' className='text-left py-3 px-6'>
              Count
            </th>
            <th scope='col' className='text-left py-3 px-6'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              product.count > 0 && (
                <tr
                  key={product.id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                >
                  <th
                    scope='row'
                    className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {product.title}
                  </th>
                  <th
                    scope='row'
                    className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {product.price}
                  </th>
                  <th
                    scope='row'
                    className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {product.count}
                  </th>

                  <th
                    scope='row'
                    className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    <button
                      onClick={() => deleteProduct(product.id)}
                      type='button'
                      className='inline-block px-6 py-2.5 bg-pink-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-pink-300 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-500 active:shadow-lg transition duration-150 ease-in-out'
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CartPage;
