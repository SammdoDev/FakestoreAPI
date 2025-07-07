import { useState } from "react";
import { Search, Sun, Moon, Settings, ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownSettings, setIsDropdownSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-orange-600"><a href="#">FakeStore</a></div>

        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu />
        </button>

        <div className="hidden md:flex items-center space-x-4">
          <Search />
          <img
            src="src/assets/profile.jpg"
            className="rounded-full h-[40px]"
            alt="Profile"
          />
        </div>
      </div>

      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:flex md:justify-between md:items-center px-4 pb-4 md:pb-0`}
      >
        <ul className="flex flex-col md:flex-row gap-4 text-sm font-medium text-gray-700">
          <li>
            <Link to="/home" className="hover:text-orange-500 transition">
              Home
            </Link>
          </li>

          <li className="relative">
            <button
              onClick={() => setIsDropdownSettings(!isDropdownSettings)}
              className="hover:text-orange-500 transition flex items-center"
            >
              Products <ChevronDown size={16} className="ml-1" />
            </button>
            {isDropdownSettings && (
              <ul className="absolute bg-white shadow-md mt-2 rounded w-44 p-2 space-y-1 z-10">
                <li>
                  <Link
                    to="/clothes"
                    
                    className="block px-3 py-1 hover:bg-orange-100 rounded"
                  >
                    Clothes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/electronics"
                    className="block px-3 py-1 hover:bg-orange-100 rounded"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/furniture"
                    className="block px-3 py-1 hover:bg-orange-100 rounded"
                  >
                    Furniture
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shoes"
                    className="block px-3 py-1 hover:bg-orange-100 rounded"
                  >
                    Shoes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/miscellaneous"
                    className="block px-3 py-1 hover:bg-orange-100 rounded"
                  >
                    Miscellaneous
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a href="/history" className="hover:text-orange-500 transition">
              History
            </a>
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
                <li className="flex items-center">
                  <Sun size={16} className="mr-2" /> Light Mode
                </li>
                <li className="flex items-center">
                  <Moon size={16} className="mr-2" /> Dark Mode
                </li>
                <li className="flex items-center">
                  <Settings size={16} className="mr-2" /> Default
                </li>
              </ul>
            )}
          </li>
        </ul>

        <div className="flex md:hidden mt-4 space-x-4 items-center justify-center">
          <Search />
          <button className="px-4 py-2 bg-black text-white hover:bg-white hover:text-black border border-black transition rounded-sm">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
