// src/pages/SearchPage.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { Product, Category } from "../types/product";
import ProductCard from "../components/ProductCard";

type APIProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt: string;
  updatedAt: string;
};

const SearchPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data: APIProduct[] = await res.json();

        // Adaptasi ke Product
        const adapted: Product[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          slug: item.title.toLowerCase().replace(/\s+/g, "-"),
          price: item.price,
          description: item.description,
          image: item.images[0] || "", // ambil gambar pertama
          category: {
            id: item.category.id,
            name: item.category.name,
            slug:
              item.category.slug ||
              item.category.name.toLowerCase().replace(/\s+/g, "-"),
            image: item.category.image,
            creationAt: item.category.creationAt,
            updatedAt: item.category.updatedAt,
          },
        }));

        // Filter berdasarkan query
        const filtered = adapted.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Hasil untuk: <span className="text-orange-600">{query}</span>
      </h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-600"></div>
        </div>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-600 py-20">
          Maaf, tidak ada produk yang sesuai dengan kata kunci{" "}
          <strong>{query}</strong>.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((product) => (
            <ProductCard key={product.id} productCard={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
