import { createContext, useState } from 'react';
// Crear el contexto
export const ProductoContext = createContext();
// Proveedor del contexto
export function ProductoProvider({ children }) {
    
    return (
        <ProductoContext.Provider value={{ eliminarProducto, agregarProducto, producto  }}>
            {children}
        </ProductoContext.Provider>
    );
}
