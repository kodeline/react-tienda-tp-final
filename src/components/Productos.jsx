import { Link } from "react-router-dom";
import { useProductosContext } from "../context/ProductosContext";
import { useState } from "react";

const Productos = () => {
  // Usamos los contextos
  const { productos, cargando, error } = useProductosContext();
  
  // Logica de Paginacion 
  const productosPorPagina = 8; 
  const [paginaActual, setPaginaActual] = useState(1);
  
  if (cargando) return "Cargando productos...";
  if (error) return error;

  // Calcular el índice de los productos a mostrar en la página actual
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);

  // Cambiar de pagina
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Productos
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {productosActuales.map((producto) => (
          <div key={producto.id}>
            <img
              alt={producto.nombre}
              src={producto.imagen}
              className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link to={`/productos/${producto.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {producto.nombre}
                  </Link>
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-900">
                ${producto.precio}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Paginador */}
      <div className="flex justify-center gap-2 my-8">
        {Array.from({ length: totalPaginas }, (_, indice) => (
          <button
            key={indice + 1}
            className={`px-4 py-2 rounded ${
              paginaActual === indice + 1 
                ? "bg-black text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => cambiarPagina(indice + 1)}
          >
            {indice + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Productos;