import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LoginContextProvider } from "./store/login-context";
import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from "./store/cart-Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoginContextProvider>
    <CartContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartContextProvider>
  </LoginContextProvider>
);
