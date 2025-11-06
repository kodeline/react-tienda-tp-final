import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { ProductoProvider } from './context/ProductoContext'; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductoProvider>
          <CarritoProvider>
            <App />
          </CarritoProvider>
        </ProductoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
