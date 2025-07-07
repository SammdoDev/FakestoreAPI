import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import type { Category } from "../types/Product";

const AddProduct = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number>(1);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.map((cat: Category) => ({
          id: cat.id,
          name: cat.name,
        }));
        setCategories(filtered);
      })
      .catch((err) => console.error("Gagal memuat kategori:", err));

    const role = sessionStorage.getItem("role");
    if (role !== "admin") navigate("/");
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      setMessage("Anda harus login terlebih dahulu.");
      return;
    }

    const newProduct = {
      title,
      price,
      description,
      categoryId,
      images: [image],
    };

    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Gagal menambahkan produk");

      setMessage("✅ Produk berhasil ditambahkan!");
      setTitle("");
      setPrice(0);
      setDescription("");
      setImage("");
    } catch (error) {
      setMessage("❌ Terjadi kesalahan saat menambahkan produk.");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleNavigate={handleNavigate}
        handleLogout={handleLogout}
      />

      <main className="flex-1 w-full max-h-screen sm:p-6 lg:p-10 overflow-x-auto">
        <div className="lg:hidden flex items-center justify-between mb-6 fixed bg-white py-4 shadow-lg w-full top-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Tambah Produk</h2>
          <div className="w-6" />
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-6">
            Tambah Produk Baru
          </h2>

          {message && (
            <p className="mb-4 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded">
              {message}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Nama Produk
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-3 border rounded-lg placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Contoh: Sepatu Sneakers"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Harga</label>
              <input
                min={1}
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="p-3 border rounded-lg focus:outline-none placeholder-gray-700 focus:ring-2 focus:ring-orange-400"
                placeholder="Contoh: 250000"
                required
              />
            </div>

            <div className="md:col-span-2 flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-3 border rounded-lg focus:outline-none placeholder-gray-700 focus:ring-2 focus:ring-orange-400"
                placeholder="Tulis deskripsi produk"
                rows={4}
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              >
                <option value="">Pilih kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                URL Gambar
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="p-3 border rounded-lg focus:outline-none placeholder-gray-700 focus:ring-2 focus:ring-orange-400"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            {image && (
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Preview Gambar:
                </label>
                <img
                  src={image}
                  alt="Preview"
                  className="max-h-64 rounded border border-gray-200 shadow-sm"
                />
              </div>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full sm:w-auto bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition"
              >
                Tambah Produk
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
