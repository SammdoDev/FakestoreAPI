import React from "react";
import type { Product } from "../types/Product";
import { Plus } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="p-4 rounded-xl shadow-2xl hover:shadow-md transition-shadow duration-300 ease-in-out bg-white">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-2 mx-auto"
      />

      <div className="flex flex-row space-x-4">
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold mb-1">{product.title}</h2>
          <p className="text-black font-semibold mb-1">${product.price}</p>
          <p className="text-xs text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-center w-20 h-fit mt-12 bg-orange-600 text-white rounded-full hover:bg-orange-400 transition-colors duration-300 p-4">
          <Plus />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
