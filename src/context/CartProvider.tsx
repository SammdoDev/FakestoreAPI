import React, { useState } from "react";
import { CartContext } from "./CartContext";
import type { Product } from "../types/Product";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [productAdded, setProductAdded] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    setProductAdded(product);
    setShowModal(true);
  };

  const closeModal = (cancel?: boolean) => {
    if (cancel && productAdded) {
      setCart((prev) => {
        const index = prev.findIndex((p) => p.id === productAdded.id);
        if (index !== -1) {
          const updatedCart = [...prev];
          updatedCart.splice(index, 1); // hapus item berdasarkan index
          console.log("Dibatalkan:", productAdded.title);
          return updatedCart;
        }
        return prev;
      });
    }

    setShowModal(false);
    setProductAdded(null);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}

      {showModal && productAdded && (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-row items-center justify-center w-full h-full">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 relative ">
            <button
              onClick={ () => closeModal()}
              className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl"
            >
              &times;
            </button>

            <img
              src={productAdded.image}
              alt={productAdded.title}
              className="h-40 object-contain mx-auto mb-4 rounded-2xl"
            />

            <div className="flex flex-col justify-between">
              <h2 className="text-lg font-bold mb-2">{productAdded.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                {productAdded.description}
              </p>
              <p className="text-md font-semibold text-orange-600">
                ${productAdded.price}
              </p>
            </div>

            <div className="flex justify-between mt-6 space-x-2">
              <button
                onClick={ () => closeModal(true)}
                className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={ () => closeModal(false)}
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
