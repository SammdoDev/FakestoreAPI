// src/context/CartContext.ts
import { createContext } from "react";
import type { Product } from "../types/Product";

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);
