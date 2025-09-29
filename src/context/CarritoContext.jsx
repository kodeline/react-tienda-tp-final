import { createContext, useState } from "react";
// creamos el context
export const CarritoContext = createContext();
// proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  }
  
  const vaciarCarrito = () => {
    setCarrito([]);
  }
  
  return(
    <CarritoContext.Provider 
      value={{carrito, agregarAlCarrito, vaciarCarrito}}
    >
      {children}
    </CarritoContext.Provider>
  );
}

