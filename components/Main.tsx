import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main className='bg-gray-700 flex-grow mx-auto w-full grid p-6 gap-6 md:gap-10 md:grid-cols-2'>
      {children}
    </main>
  );
};
