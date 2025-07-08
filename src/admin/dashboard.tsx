import { BarChartBig, Users2, PackageSearch, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import ApexCharts from "apexcharts";
import type { Category, Product } from "../types/product";

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role !== "admin") navigate("/");
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const [productRes, userRes, categoryRes] = await Promise.all([
        fetch("https://api.escuelajs.co/api/v1/products"),
        fetch("https://api.escuelajs.co/api/v1/users"),
        fetch("https://api.escuelajs.co/api/v1/categories"),
      ]);

      const [products, users, categories] = await Promise.all([
        productRes.json(),
        userRes.json(),
        categoryRes.json(),
      ]);

      setTotalProducts(products.length);
      setTotalUsers(users.length);
      setTotalCategories(categories.length);

      const counts: Record<number, number> = {};
      products.forEach((product: Product) => {
        const catId = product.category?.id;
        if (catId) counts[catId] = (counts[catId] || 0) + 1;
      });

      const chartItems = categories.map((cat: Category) => ({
        x: cat.name,
        y: counts[cat.id] || 0,
      }));

      setChartData(chartItems);
    } catch (err) {
      console.error("Gagal memuat data dashboard:", err);
    }
  };

  useEffect(() => {
    fetchStats();
    const intervalId = setInterval(fetchStats, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (chartData.length === 0) return;

    const options = {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        type: "category",
      },
      series: [
        {
          name: "Jumlah Produk",
          data: chartData,
        },
      ],
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [chartData]);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleNavigate={handleNavigate}
        handleLogout={handleLogout}
      />

      <div className="flex-1 w-full lg:ml-0">
        <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          <div className="w-10" />
        </div>

        <main className="flex-1 p-4 max-h-screen sm:p-6 lg:p-10 overflow-auto">
          <div className="bg-white p-6 rounded-xl shadow-md w-full min-w-[320px]">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Dashboard Admin
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <BarChartBig className="text-white w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Produk
                  </h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {totalProducts}
                </p>
                <p className="text-sm text-gray-600">Total produk tersedia</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Users2 className="text-white w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Pengguna
                  </h3>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  {totalUsers}
                </p>
                <p className="text-sm text-gray-600">Pengguna aktif</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <PackageSearch className="text-white w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Kategori
                  </h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  {totalCategories}
                </p>
                <p className="text-sm text-gray-600">Kategori produk</p>
              </div>
            </div>

            <div id="chart" className="w-full" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
