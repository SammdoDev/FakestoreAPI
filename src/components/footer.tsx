import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 mb-4 text-sm">
        <Link to="/home" className="hover:text-white">
          Home
        </Link>
        <span className="text-gray-500">|</span>
        <Link to="/clothes" className="hover:text-white">
          Clothes
        </Link>
        <span className="text-gray-500">|</span>
        <Link to="/electronics" className="hover:text-white">
          Electronics
        </Link>
        <span className="text-gray-500">|</span>
        <Link to="/furniture" className="hover:text-white">
          Furniture
        </Link>
        <span className="text-gray-500">|</span>
        <Link to="/shoes" className="hover:text-white">
          Shoes
        </Link>
        <span className="text-gray-500">|</span>
        <Link to="/miscellaneous" className="hover:text-white">
          Misc
        </Link>
      </div>

      <p className="text-sm">
        &copy; {new Date().getFullYear()} FakeStore. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
