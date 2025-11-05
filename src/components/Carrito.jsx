import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

const Carrito = () => {
  
  const { carrito, eliminarDelCarrito } = useContext(CarritoContext);
  
  return (
    <div>
      <h2>Carrito</h2>
      {carrito.map((producto, indice) => (
        <div key={indice}>
          <img src={producto.imagen} alt={producto.nombre} height={80} width={80} />
          <p> {producto.nombre} : {producto.precio}$ </p>
          <button onClick={() => eliminarDelCarrito(indice)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default Carrito;