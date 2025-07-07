import React, { useEffect, useState } from "react";

type PurchaseItem = {
  title: string;
  price: number;
  image?: string;
};

type PurchaseHistoryEntry = {
  id: number;
  date: string;
  total: number;
  items: PurchaseItem[];
};

const History: React.FC = () => {
  const [history, setHistory] = useState<PurchaseHistoryEntry[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("purchaseHistory") || "[]");
    setHistory(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">Riwayat Pembelian</h1>

        {history.length === 0 ? (
          <p className="text-gray-600">Belum ada pembelian.</p>
        ) : (
          history.map((entry) => (
            <div key={entry.id} className="mb-6 border-b pb-4">
              <p className="text-sm text-gray-500">
                Tanggal: {new Date(entry.date).toLocaleString()}
              </p>
              <ul className="mt-2 space-y-1">
                {entry.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    • {item.title} - ${item.price}
                  </li>
                ))}
              </ul>
              <p className="text-right mt-2 font-bold text-orange-600">
                Total: ${entry.total.toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
