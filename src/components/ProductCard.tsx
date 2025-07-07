import React from "react";
import type { Product } from "../types/Product";
import { Plus } from "lucide-react";
import { useCart } from "../hooks/useCart";

type ProductCardProps = {
  productCard: Product;
  onAddToCart?: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ productCard }) => {
  const { addToCart } = useCart();

  return (
    <div className="p-4 rounded-xl shadow-2xl hover:shadow-md transition-shadow duration-300 ease-in-out bg-white h-full flex flex-col justify-between">
      <img
        src={productCard.image}
        alt={productCard.title}
        className="h-40 object-contain mb-4 mx-auto rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
      />

      <div className="flex flex-col flex-1 justify-between">
        <div className="mb-4">
          <h2 className="text-sm font-semibold mb-1">{productCard.title}</h2>
          <p className="text-black font-semibold mb-1">${productCard.price}</p>
          <p className="text-xs text-gray-500 line-clamp-2 min-h-[2.5rem] overflow-y-auto">
            {productCard.description}
          </p>
        </div>

        <button
          onClick={() => addToCart(productCard)}
          className="mt-auto flex items-center justify-center w-full bg-orange-600 text-white rounded-full hover:bg-orange-400 transition-colors duration-300 py-2 shadow-md hover:shadow-none"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
