import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-grow p-5 bg-gray-700'>{children}</div>
      <Footer />
    </div>
  );
};
