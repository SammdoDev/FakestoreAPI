// src/pages/AddProduct.tsx
import React, { useState } from "react";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number>(1); // ID kategori default
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

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

      setMessage("Produk berhasil ditambahkan!");
      setTitle("");
      setPrice(0);
      setDescription("");
      setImage("");
    } catch (error) {
      setMessage("Terjadi kesalahan saat menambahkan produk.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">
        Tambah Produk Baru
      </h2>

      {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama Produk"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Harga"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="ID Kategori (misal: 1)"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="url"
          placeholder="URL Gambar Produk"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-500"
        >
          Tambah Produk
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
