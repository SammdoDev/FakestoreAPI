import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

const ListProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=10");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Gagal memuat produk:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      const token = sessionStorage.getItem("token");
      await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Anda harus login terlebih dahulu.");
      return;
    }

    try {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/${currentProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentProduct),
      });

      if (!res.ok) throw new Error("Gagal mengedit produk");

      const updated = await res.json();
      alert("✅ Produk berhasil diubah!");
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      alert("❌ Terjadi kesalahan saat mengedit produk.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleNavigate={handleNavigate}
        handleLogout={handleLogout}
      />

      <main className="flex-1 p-4 max-h-screen sm:p-6 lg:p-10 overflow-auto">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar Produk</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
                  <th className="p-4">Gambar</th>
                  <th className="p-4">Nama Produk</th>
                  <th className="p-4">Harga</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-4">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-4">{product.title}</td>
                    <td className="p-4">$ {product.price.toLocaleString()}</td>
                    <td className="p-4 flex space-x-2 justify-center">
                      <button
                        onClick={() => {
                          setCurrentProduct(product);
                          setIsEditModalOpen(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <p className="text-center py-8 text-gray-500">Belum ada produk.</p>
            )}
          </div>
        </div>
      </main>

      {/* Modal Edit Produk */}
      {isEditModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <h2 className="text-xl font-semibold mb-4">Edit Produk</h2>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <input
                type="text"
                value={currentProduct.title}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, title: e.target.value })
                }
                className="w-full p-3 border rounded"
                placeholder="Nama Produk"
                required
              />
              <input
                type="number"
                value={currentProduct.price}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    price: Number(e.target.value),
                  })
                }
                className="w-full p-3 border rounded"
                placeholder="Harga Produk"
                required
              />
              <input
                type="url"
                value={currentProduct.images[0]}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    images: [e.target.value],
                  })
                }
                className="w-full p-3 border rounded"
                placeholder="URL Gambar"
                required
              />

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
