import { useEffect, useState } from "react";
import { ProductWithCount } from "../contexts/CartContext";
import {
  FullProductFragment,
  LightProductFragment,
} from "../graphql/generated/graphql";

interface Cart {
  products: ProductWithCount[];
  addProduct: (product: FullProductFragment) => void;
  deleteProduct: (id: FullProductFragment["id"]) => void;
}

const defaultContext: Cart = {
  products: [],
  addProduct: () => {},
  deleteProduct: () => [],
};

export const useCart = (): Cart => {
  const [cart, setCart] = useState<Cart>();

  useEffect(() => {
    const localStorageCart = localStorage.getItem("NEXT_SHOPPING_CART");
    if (localStorageCart) {
      const cart = JSON.parse(localStorageCart);
      if (cart) {
        return setCart({ ...defaultContext, products: cart });
      }
    }
    return setCart(defaultContext);
  }, []);

  useEffect(() => {
    if (cart && cart.products) {
      localStorage.setItem("NEXT_SHOPPING_CART", JSON.stringify(cart.products));
    }
  }, [cart]);

  const addProduct = (product: FullProductFragment) => {
    if (!cart) return defaultContext;

    const existingProduct = cart.products.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      const newProducts = cart.products.map((item) => {
        if (item.id === product.id) {
          return { ...item, count: item.count + 1 };
        }
        return { ...item };
      });

      return setCart((prevCart) => ({
        ...(prevCart as Cart),
        products: newProducts,
      }));
    }

    return setCart((prevCart) => ({
      ...(prevCart as Cart),
      products: [...cart.products, { ...product, count: 1 }],
    }));
  };

  const deleteProduct = (id: LightProductFragment["id"]) => {
    if (!cart) return defaultContext;

    const newProducts = cart.products
      .map((item) => {
        if (item.id === id) {
          return { ...item, count: item.count - 1 };
        }
        return { ...item };
      })
      .filter(({ count }) => count > 0);

    return setCart((prevCart) => ({
      ...(prevCart as Cart),
      products: newProducts,
    }));
  };

  if (!cart) return defaultContext;

  return { addProduct, deleteProduct, products: cart.products };
};
