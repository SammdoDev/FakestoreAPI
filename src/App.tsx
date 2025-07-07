import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Electronics from "./pages/electronics";
import Index from "./index";
import Shoes from "./pages/shoes";
import Clothes from "./pages/clothes";
import Furniture from "./pages/furniture";
import Miscellaneous from "./pages/miscellaneous";
import Home from "./pages/home";
import { CartProvider } from "./context/CartProvider";
import { useCart } from "./hooks/useCart";
import { ShoppingCart } from "lucide-react";
import AddProduct from "./admin/addProduct";
import SignUp from "./signUp";
import Dashboard from "./admin/dashboard";
import ListProduct from "./admin/listProduct";
import ListUsers from "./admin/listUsers";
import Checkout from "./pages/checkOut";
import { useNavigate } from "react-router-dom";
import Invoice from "./pages/invoice";
import History from "./pages/history";
import SearchPage from "./pages/searchPages";
import Footer from "./components/footer";
import ListHistory from "./admin/listHistory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartIndicator = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 right-0 mr-4 mb-7 z-50">
      <button
        onClick={() => navigate("/checkout")}
        className="relative h-12 w-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 shadow-black shadow-md hover:shadow-none transition-shadow"
      >
        <ShoppingCart className="text-white w-6 h-6" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white shadow">
            {cart.length}
          </span>
        )}
      </button>
    </div>
  );
};

const AppLayout = () => {
  const location = useLocation();
  const path = location.pathname;

  const noNavbarPages = [
    "/",
    "/signUp",
    "/AddProduct",
    "/dashboard",
    "/listProduct",
    "/listUsers",
    "/listHistory",
  ];
  const role = sessionStorage.getItem("role");
  const isAdminPage = path === "/dashboard" && role === "admin";
  const hideNavbar = noNavbarPages.includes(path) || isAdminPage;

  const adminPaths = [
    "/dashboard",
    "/AddProduct",
    "/listProduct",
    "/listUsers",
    "/listHistory",
  ];
  const isAdminArea = adminPaths.includes(path);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      {!hideNavbar && <Navbar />}
      {!hideNavbar && (
        <div className="text-right text-sm text-gray-500 p-2 pr-4">
          <CartIndicator />
        </div>
      )}

      <Routes>
        <Route path="/history" element={<History />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/listUsers" element={<ListUsers />} />
        <Route path="/listProduct" element={<ListProduct />} />
        <Route path="/listHistory" element={<ListHistory />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/miscellaneous" element={<Miscellaneous />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>

      {!isAdminArea && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
