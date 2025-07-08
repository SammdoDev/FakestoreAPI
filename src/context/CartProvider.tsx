import React, { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import { CartContext } from "./CartContext";
import type { CartContextType } from "./CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [productAdded, setProductAdded] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart: CartContextType["addToCart"] = (product) => {
    setCart((prev) => [...prev, product]);
    setProductAdded(product);
    setShowModal(true);
    toast.success(`${product.title} berhasil ditambahkan ke keranjang!`);
    console.log("🛒 Produk ditambahkan ke keranjang:", product);
  };

  const removeFromCart: CartContextType["removeFromCart"] = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    console.log("🗑️ Produk dihapus dari keranjang dengan id:", id);
    toast.error("Gagal menambahkan produk.");
  };

  const clearCart: CartContextType["clearCart"] = () => {
    setCart([]);
    console.log("🧹 Keranjang dikosongkan");
  };

  const closeModal = (cancel?: boolean) => {
    if (cancel && productAdded) {
      removeFromCart(productAdded.id);
      console.log(" Dibatalkan:", productAdded.title);
    }
    setShowModal(false);
    setProductAdded(null);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}

      {showModal && productAdded && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 relative">
            <button
              onClick={() => closeModal(true)}
              className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl"
            >
              &times;
            </button>

            <img
              src={productAdded.image}
              alt={productAdded.title}
              className="h-40 object-contain mx-auto mb-4 rounded-2xl"
            />

            <h2 className="text-lg font-bold mb-2">{productAdded.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {productAdded.description}
            </p>
            <p className="text-md font-semibold text-orange-600">
              ${productAdded.price}
            </p>

            <div className="flex justify-between mt-6 space-x-2">
              <button
                onClick={() => closeModal(true)}
                className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={() => closeModal(false)}
                className="w-1/2 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-500"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
