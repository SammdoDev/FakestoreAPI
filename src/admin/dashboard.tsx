import { BarChartBig, Users2, PackageSearch, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role !== "admin") navigate("/");
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

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

        <main className="p-4 sm:p-6 max-h-screen lg:p-8 overflow-x-auto">
          <div className="bg-white p-6 rounded-xl shadow-md w-full min-w-[320px]">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Dashboard Admin
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <BarChartBig className="text-white w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Produk
                  </h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">120</p>
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
                <p className="text-3xl font-bold text-green-600">38</p>
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
                <p className="text-3xl font-bold text-purple-600">5</p>
                <p className="text-sm text-gray-600">Kategori produk</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
