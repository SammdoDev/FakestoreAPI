import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.tsx";
import type { Product, APIProduct } from "../types/Product.ts";

const Miscellaneous = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://api.escuelajs.co/api/v1/products/?categorySlug=miscellaneous")
        .then((res) => res.json())
        .then((data: APIProduct[]) => {
          const adapted: Product[] = data.map((item) => ({
            id: item.id,
            title: item.title,
            slug: item.title.toLowerCase().replace(/\s+/g, "-"),
            price: item.price,
            description: item.description,
            image: item.images[0],
            category: {
              id: item.category.id,
              name: item.category.name,
              slug:
                item.category.slug ??
                item.category.name.toLowerCase().replace(/\s+/g, "-"),
              image: item.category.image,
              creationAt: item.category.creationAt,
              updatedAt: item.category.updatedAt,
            },
          }));

          setProducts(adapted);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Gagal mengambil produk:", err);
          setLoading(false);
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4 text-orange-600">Miscellaneous</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {products.map((product) => (
            <ProductCard key={product.id} productCard={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Miscellaneous;
