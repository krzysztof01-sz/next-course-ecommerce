import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const { route } = useRouter();

  return (
    <header className='mx-auto w-full'>
      <nav className='text-white bg-gray-800 px-6 py-4'>
        <p>Navigation</p>

        <ul className='flex'>
          <li
            className={`${
              route === "/" ? "underline font-bold mr-2" : undefined
            } mr-2`}
          >
            <Link href='/'>Homepage</Link>
          </li>
          <li
            className={`${
              route === "/about" ? "underline font-bold mr-2" : undefined
            } mr-2`}
          >
            <Link href='/about'>About</Link>
          </li>
          <li
            className={`${
              route === "/products" ? "underline font-bold mr-2" : undefined
            } mr-2`}
          >
            <Link href='/products'>Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
