import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product, APIProduct } from "../types/Product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://api.escuelajs.co/api/v1/products")
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="p-6 space-x-4">
      <Slider {...settings} className="mb-8">
        <div>
          <img
            src="src/assets/promo1.jpg"
            className="w-full h-full md:h-[400px] object-contain"
          />
        </div>
        <div className="mx-4">
          <img
            src="src/assets/promo2.jpg"
            className="w-full h-full md:h-[400px] object-contain"
          />
        </div>
        <div>
          <img
            src="src/assets/promo3.jpg"
            className="w-full h-full md:h-[400px] object-contain"
          />
        </div>
      </Slider>

      <h1 className="text-4xl font-bold mb-4 text-orange-600">Home</h1>

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

export default Home;
