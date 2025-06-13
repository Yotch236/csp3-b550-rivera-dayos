import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "notyf/notyf.min.css";
import App from "./App";
import UserProvider from "./context/UserProvider";
import CartProvider from "./context/CartProvider";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
