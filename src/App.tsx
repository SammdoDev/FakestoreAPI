import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import CartIndicator from "./components/CartIndicator";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartProvider";

import Index from "./index";
import Home from "./pages/home";
import Shoes from "./pages/shoes";
import Clothes from "./pages/clothes";
import Furniture from "./pages/furniture";
import Electronics from "./pages/electronics";
import Checkout from "./pages/checkOut";
import Invoice from "./pages/invoice";
import History from "./pages/history";
import SearchPage from "./pages/searchPages";
import SignUp from "./signUp";

import AddProduct from "./admin/addProduct";
import Dashboard from "./admin/dashboard";
import ListProduct from "./admin/listProduct";
import ListUsers from "./admin/listUsers";
import ListHistory from "./admin/listHistory";

import Miscellaneous from "./pages/Miscellaneous";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  const role = sessionStorage.getItem("role");

  const noNavbarPages = [
    "/",
    "/signUp",
    "/AddProduct",
    "/dashboard",
    "/listProduct",
    "/listUsers",
    "/listHistory",
  ];

  const noFooterPages = [
    "/",
    "/signUp",
    "/AddProduct",
    "/dashboard",
    "/listProduct",
    "/listUsers",
    "/listHistory",
  ];

  const userPages = [
    "/home",
    "/clothes",
    "/electronics",
    "/furniture",
    "/shoes",
    "/miscellaneous",
    "/checkout",
    "/invoice",
    "/history",
    "/search",
  ];

  const adminPages = [
    "/dashboard",
    "/AddProduct",
    "/listProduct",
    "/listUsers",
    "/listHistory",
  ];

  // 🔒 Admin mencoba akses halaman user → redirect ke "/"
  if (role === "admin" && userPages.includes(path)) {
    window.location.replace("/"); // langsung ganti URL, tidak render halaman dulu
    return null; // hentikan render komponen
  }

  // 🔒 User mencoba akses halaman admin → redirect ke "/"
  if (role === "user" && adminPages.includes(path)) {
    window.location.replace("/");
    return null;
  }

  const isAdminPage = path === "/dashboard" && role === "admin";
  const hideNavbar = noNavbarPages.includes(path) || isAdminPage;

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
        <Route path="/" element={<Index />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/miscellaneous" element={<Miscellaneous />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/history" element={<History />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/listProduct" element={<ListProduct />} />
        <Route path="/listUsers" element={<ListUsers />} />
        <Route path="/listHistory" element={<ListHistory />} />
      </Routes>

      {!noFooterPages.includes(path) && <Footer />}
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
