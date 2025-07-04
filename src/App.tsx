import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Electronics from "./pages/electronics";
import Index from "./index";
import Shoes from "./pages/shoes";
import Clothes from "./pages/clothes";
import Furniture from "./pages/furniture";
import Miscellaneous from "./pages/Miscellaneous";
import Home from "./pages/home";
import { CartProvider } from "./context/CartProvider";
import { useCart } from "./hooks/useCart";
import { ShoppingCart } from "lucide-react";

const CartIndicator = () => {
  const { cart } = useCart();

  return (
    <div className="fixed right-0 mr-4 mt-7">
      <button className="relative h-12 w-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 shadow-black shadow-md hover:shadow-none transition-shadow">
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

const App: React.FC = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <div className="text-right text-sm text-gray-500 p-2 pr-4">
          <CartIndicator />
        </div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/miscellaneous" element={<Miscellaneous />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
