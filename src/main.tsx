// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./AuthContext/CartContext"; // adjust path based on your folder structure
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
