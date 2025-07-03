import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Women from "./pages/women";
import Men from "./pages/men";
import Electronics from "./pages/electronics";
import Jewelery from "./pages/jewelery";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/jewelery" element={<Jewelery />} />
          <Route path="/electronics" element={<Electronics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
