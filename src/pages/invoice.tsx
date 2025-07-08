import React from "react";
import type { Product } from "../types/product";

const Invoice: React.FC = () => {
  // Ambil data dari sessionStorage
  const cart: Product[] = JSON.parse(
    sessionStorage.getItem("invoiceCart") || "[]"
  );
  const total = parseFloat(sessionStorage.getItem("invoiceTotal") || "0");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">
          Transaksi Mu
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Tidak ada data invoice.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-4 border-t mt-4">
              <h2 className="text-xl font-bold">Total</h2>
              <p className="text-xl font-bold text-orange-600">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
