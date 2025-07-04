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
    <div className="p-4 rounded-xl shadow-2xl hover:shadow-md transition-shadow duration-300 ease-in-out bg-white">
      <img
        src={productCard.image}
        alt={productCard.title}
        className="h-40 object-contain mb-2 mx-auto rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
      />

      <div className="flex flex-row space-x-4">
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold mb-1">{productCard.title}</h2>
          <p className="text-black font-semibold mb-1">${productCard.price}</p>
          <p className="text-xs text-gray-500 line-clamp-2">
            {productCard.description}
          </p>
        </div>
        <button
          onClick={() => addToCart(productCard)}
          className="flex items-center justify-center w-20 h-fit mt-12 bg-orange-600 text-white rounded-full hover:bg-orange-400 transition-colors duration-300 p-4"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};


export default ProductCard;
