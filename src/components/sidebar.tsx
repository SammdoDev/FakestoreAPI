import { Home, Plus, PackageSearch, LogOut, X, History } from "lucide-react";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleNavigate: (path: string) => void;
  handleLogout: () => void;
};

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  handleNavigate,
  handleLogout,
}: Props) {
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0 lg:static lg:flex-shrink-0 flex flex-col max-h-screen`}
      >
        <div className="flex justify-between items-center p-4 lg:hidden border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 border-b border-gray-700 hidden lg:block">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => handleNavigate("/dashboard")}
            className="w-full flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg"
          >
            <Home className="w-5 h-5" />
            <span>Beranda</span>
          </button>

          <button
            onClick={() => handleNavigate("/AddProduct")}
            className="w-full flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah Produk</span>
          </button>

          <button
            onClick={() => handleNavigate("/listProduct")}
            className="w-full flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg"
          >
            <PackageSearch className="w-5 h-5" />
            <span>Daftar Produk</span>
          </button>

          <button
            onClick={() => handleNavigate("/listProduct")}
            className="w-full flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg"
          >
            <History className="w-5 h-5" />
            <span>History Pembelian</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg text-red-300"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
