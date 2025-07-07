import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Simpan ke session untuk invoice
    sessionStorage.setItem("invoiceCart", JSON.stringify(cart));
    sessionStorage.setItem("invoiceTotal", total.toString());

    // Ambil history lama
    const existingHistory = JSON.parse(localStorage.getItem("purchaseHistory") || "[]");

    // Tambah invoice baru ke history
    const newEntry = {
      id: Date.now(),
      items: cart,
      total,
      date: new Date().toISOString()
    };

    const updatedHistory = [...existingHistory, newEntry];
    localStorage.setItem("purchaseHistory", JSON.stringify(updatedHistory));

    navigate("/invoice");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">Checkout</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Keranjang belanja kamu kosong.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <h2 className="text-xl font-bold">Total</h2>
              <p className="text-xl font-semibold text-orange-600">${total.toFixed(2)}</p>
            </div>

            <button
              className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-500 transition"
              onClick={handleCheckout}
            >
              Bayar Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
