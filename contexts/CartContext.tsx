import { createContext, ReactNode, useEffect, useState } from "react";

interface CartProduct {
  id: number;
  title: string;
  price: number;
  count: number;
}

interface Cart {
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

  if (!cart) return null;

  return (
    <CartContext.Provider
      value={{
        products: cart.products,
        addProduct: (product) => {
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
        },
        deleteProduct: (id) => {
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
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
