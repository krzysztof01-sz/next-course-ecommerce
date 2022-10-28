import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export const useCartContext = () => {
  const state = useContext(CartContext);

  if (!state) {
    throw new Error("Missing CartContext");
  }

  return state;
};
