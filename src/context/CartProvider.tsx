// src/context/CartProvider.tsx
import React, { useState } from "react";
import { CartContext } from "./CartContext";
import type { Product } from "../types/Product";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    console.log("Added to cart:", product.title);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
