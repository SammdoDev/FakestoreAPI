import React, { useState, useEffect } from "react";
import {
  Search,
  Sun,
  Moon,
  Settings,
  ChevronDown,
  Menu,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownProducts, setIsDropdownProducts] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("avatar");
    if (stored) setAvatarUrl(stored);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("Logout berhasil!");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-orange-600">
          <Link to="/">FakeStore</Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari produk..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 relative">
          <ul className="flex gap-4 text-sm font-medium text-gray-700">
            <li>
              <Link to="/home" className="hover:text-orange-500 transition">
                Home
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={() => setIsDropdownProducts(!isDropdownProducts)}
                className="hover:text-orange-500 transition flex items-center"
              >
                Products <ChevronDown size={16} className="ml-1" />
              </button>
              {isDropdownProducts && (
                <ul className="absolute bg-white shadow-md mt-2 rounded w-44 p-2 space-y-1 z-10">
                  {["clothes", "electronics", "furniture", "shoes", "miscellaneous"].map((item) => (
                    <li key={item}>
                      <Link
                        to={`/${item}`}
                        className="block px-3 py-1 hover:bg-orange-100 rounded capitalize"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link to="/history" className="hover:text-orange-500 transition">
                History
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-orange-500 transition flex items-center"
              >
                Settings <ChevronDown size={16} className="ml-1" />
              </button>
              {isDropdownOpen && (
                <ul className="absolute bg-white shadow-md mt-2 rounded w-44 p-2 space-y-2 z-10">
                  <li className="flex items-center px-2 py-1">
                    <Sun size={16} className="mr-2" /> Light Mode
                  </li>
                  <li className="flex items-center px-2 py-1">
                    <Moon size={16} className="mr-2" /> Dark Mode
                  </li>
                  <li className="flex items-center px-2 py-1">
                    <Settings size={16} className="mr-2" /> Default
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Avatar & Logout Dropdown */}
          <div className="relative">
            <img
              src={avatarUrl || "/default-avatar.png"}
              alt="Profile"
              className="rounded-full h-10 w-10 object-cover cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded shadow-md z-20">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition"
            />
            <button type="submit">
              <Search className="text-gray-500" />
            </button>
          </form>

          <ul className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            <li><Link to="/home" className="hover:text-orange-500">Home</Link></li>
            <li>
              <button
                onClick={() => setIsDropdownProducts(!isDropdownProducts)}
                className="hover:text-orange-500 flex items-center w-full"
              >
                Products <ChevronDown size={16} className="ml-1" />
              </button>
              {isDropdownProducts && (
                <ul className="ml-4 mt-2 space-y-1">
                  {["clothes", "electronics", "furniture", "shoes", "miscellaneous"].map((item) => (
                    <li key={item}><Link to={`/${item}`}>{item}</Link></li>
                  ))}
                </ul>
              )}
            </li>
            <li><Link to="/history" className="hover:text-orange-500">History</Link></li>
            <li>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-orange-500 flex items-center w-full"
              >
                Settings <ChevronDown size={16} className="ml-1" />
              </button>
              {isDropdownOpen && (
                <ul className="ml-4 mt-2 space-y-1">
                  <li className="flex items-center"><Sun size={16} className="mr-2" /> Light Mode</li>
                  <li className="flex items-center"><Moon size={16} className="mr-2" /> Dark Mode</li>
                  <li className="flex items-center"><Settings size={16} className="mr-2" /> Default</li>
                </ul>
              )}
            </li>
          </ul>

          {/* Mobile avatar + logout */}
          <div className="pt-4 border-t flex flex-col items-center">
            <img
              src={avatarUrl || "/default-avatar.png"}
              alt="Profile"
              className="rounded-full h-12 w-12 object-cover cursor-pointer mb-2"
              onClick={() => handleLogout()}
            />
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-1 text-sm text-gray-700 hover:bg-orange-100 rounded"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
