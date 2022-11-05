import { createContext, ReactNode } from "react";
import { FullProductFragment } from "../graphql/generated/graphql";
import { useCart } from "../hooks/useCart";

export type ProductWithCount = FullProductFragment & { count: number };

export interface Cart {
  products: ProductWithCount[];
  addProduct: (product: FullProductFragment) => void;
  deleteProduct: (id: FullProductFragment["id"]) => void;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<Cart | undefined>(undefined);

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const cart = useCart();
  if (!cart) return null;

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};
