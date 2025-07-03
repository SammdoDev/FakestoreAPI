// src/App.tsx
import React from "react";
import ProductList from "./components/ProductList";

const App: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-6">🛍️ FakeStore Products</h1>
      <ProductList />
    </div>
  );
};

export default App;
