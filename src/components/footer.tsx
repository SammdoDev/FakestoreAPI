import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="mb-4">
        <Link to="/home" className="mx-2 hover:text-white">Home</Link>|
        <Link to="/clothes" className="mx-2 hover:text-white">Clothes</Link>|
        <Link to="/electronics" className="mx-2 hover:text-white">Electronics</Link>|
        <Link to="/furniture" className="mx-2 hover:text-white">Furniture</Link>|
        <Link to="/shoes" className="mx-2 hover:text-white">Shoes</Link>|
        <Link to="/miscellaneous" className="mx-2 hover:text-white">Misc</Link>
      </div>
      <p className="text-sm">&copy; {new Date().getFullYear()} FakeStore. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
