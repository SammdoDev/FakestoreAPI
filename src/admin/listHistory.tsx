import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";

interface PurchaseItem {
  id: number;
  title: string;
  price: number;
  image?: string;
}

interface PurchaseEntry {
  id: number;
  date: string;
  items: PurchaseItem[];
  total: number;
}

const ListHistory: React.FC = () => {
  const [history, setHistory] = useState<PurchaseEntry[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
      return;
    }

    const stored = localStorage.getItem("purchaseHistory");
    if (stored) {
      try {
        setHistory(JSON.parse(stored) as PurchaseEntry[]);
      } catch {
        console.error("Format purchaseHistory salah");
      }
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleNavigate={handleNavigate}
        handleLogout={handleLogout}
      />

      <main className="flex-1 p-4 max-h-screen sm:p-6 lg:p-10 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Riwayat Pembelian
        </h1>

        {history.length === 0 ? (
          <p className="text-gray-600">Belum ada riwayat pembelian.</p>
        ) : (
          <div className="space-y-8">
            {history.map((purchase, idx) => (
              <div
                key={purchase.id}
                className="bg-white rounded-lg shadow p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    Pembelian #{idx + 1}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(purchase.date).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>

                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 border-b">Gambar</th>
                      <th className="p-2 border-b">Nama Barang</th>
                      <th className="p-2 border-b">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchase.items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="p-2 border-b">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded" />
                          )}
                        </td>
                        <td className="p-2 border-b">{item.title}</td>
                        <td className="p-2 border-b">
                          $ {item.price.toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end">
                  <span className="text-lg font-semibold">
                    Total: $ {purchase.total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ListHistory;
