import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import { ProductProvider } from "./Context/ProductContext";
import { CartProvider } from "./Context/CartContext";
import { OrderProvider } from "./Context/OrderContext";
import { FavoriteProvider } from "./Context/FavoriteContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <CartProvider>
            <FavoriteProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </FavoriteProvider>
          </CartProvider>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
