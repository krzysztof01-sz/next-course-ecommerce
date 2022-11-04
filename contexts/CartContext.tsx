import { createContext, ReactNode } from "react";
import { useCart } from "../hooks/useCart";

interface CartProduct {
  id: number;
  title: string;
  price: number;
  count: number;
}

export interface Cart {
  products: CartProduct[];
  addProduct: (product: Omit<CartProduct, "count">) => void;
  deleteProduct: (id: CartProduct["id"]) => void;
}

interface CartContextProviderProps {
  children: ReactNode;
}

const defaultContext: Cart = {
  products: [],
  addProduct: () => {},
  deleteProduct: () => [],
};

export const CartContext = createContext<Cart | undefined>(undefined);

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const cart = useCart();
  if (!cart) return null;

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};
