import { useState } from "react";
import { Search, Sun, Moon, Settings, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownSettings, setIsDropdownSettings] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="text-xl font-bold text-orange-600">FakeStore</div>

        <ul className="flex flex-col md:flex-row gap-4 mt-2 md:mt-0 text-sm font-medium text-gray-700 relative">
          <li>
            <Link
              to="/home"
              className="hover:text-orange-500 transition-colors"
            >
              Home
            </Link>
          </li>

          <li className="relative">
            <button
              onClick={() => setIsDropdownSettings(!isDropdownSettings)}
              className="hover:text-orange-500 transition-colors flex flex-row justify-center items-center text-center"
            >
              Products <ChevronDown height={16} />
            </button>
            {isDropdownSettings && (
              <ul className="absolute bg-white shadow-md mt-2 rounded w-44 p-2 space-y-1 z-10">
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
                    to="/jewelery"
                    className="block px-3 py-1 hover:bg-orange-100 rounded"
                  >
                    Jewelery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/women"
                    className="block px-3 py-1 hover:bg-orange-100 rounded"
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    to="/men"
                    className="block px-3 py-1 hover:bg-orange-100 rounded"
                  >
                    Men's clothing
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a
              href="#history"
              className="hover:text-orange-500 transition-colors"
            >
              History
            </a>
          </li>
          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:text-orange-500 transition-colors flex flex-row justify-center items-center text-center"
            >
              Settings <ChevronDown height={16} />
            </button>
            {isDropdownOpen && (
              <ul className="absolute bg-white shadow-md mt-2 rounded w-44 p-2 space-y-4 z-10">
                <li className="flex flex-row">
                  <Sun width={16} className="mx-4" /> Light Mode
                </li>
                <li className="flex flex-row">
                  <Moon width={16} className="mx-4" /> Dark Mode
                </li>
                <li className="flex flex-row">
                  <Settings width={16} className="mx-4" /> Default
                </li>
              </ul>
            )}
          </li>
        </ul>
        <div className="flex flex-row justify-center items-center space-x-4">
          <Search />
          <img src="src/assets/profile.jpg" className="rounded-full h-[50px]" />
          <button className="flex items-center justify-center px-4 font-semibold py-2 hover:text-black hover:bg-white transition-colors duration-300 bg-black text-white rounded-sm">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
