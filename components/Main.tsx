import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main className='mx-auto w-full grid gap-6 md:gap-10'>{children}</main>
  );
};
