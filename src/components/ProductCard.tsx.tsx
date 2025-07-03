// src/components/ProductCard.tsx
import React from "react";
import type { Product } from "../types/Product";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-2 mx-auto"
      />
      <h2 className="text-sm font-semibold mb-1">{product.title}</h2>
      <p className="text-green-600 font-semibold mb-1">${product.price}</p>
      <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
    </div>
  );
};

export default ProductCard;
