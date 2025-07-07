import React, { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import type { Product } from "../types/Product";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [productAdded, setProductAdded] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Ambil cart dari localStorage saat pertama kali render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Simpan cart ke localStorage setiap kali cart berubah
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    setProductAdded(product);
    setShowModal(true);
    console.log("🛒 Produk ditambahkan ke keranjang:", product);
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    console.log("🗑️ Produk dihapus dari keranjang dengan id:", id);
  };

  const closeModal = (cancel?: boolean) => {
    if (cancel && productAdded) {
      const updatedCart = cart.filter((item) => item.id !== productAdded.id);
      setCart(updatedCart);
      console.log("❌ Dibatalkan:", productAdded.title);
    }

    setShowModal(false);
    setProductAdded(null);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
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
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
