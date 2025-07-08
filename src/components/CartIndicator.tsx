import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { ShoppingCart } from "lucide-react";

const CartIndicator: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 right-0 mr-4 mb-7 z-50">
      <button
        onClick={() => navigate("/checkout")}
        className="relative h-12 w-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 shadow-black shadow-md hover:shadow-none transition-shadow"
      >
        <ShoppingCart className="text-white w-6 h-6" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white shadow">
            {cart.length}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartIndicator;
