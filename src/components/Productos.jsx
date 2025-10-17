import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
// Se pide para la pre-entrega
const Productos = () => {
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Usar el contexto 
  const { agregarAlCarrito } = useContext(CarritoContext);

  const URL = 'https://fakestoreapi.com/products';

  useEffect(() => {
    fetch(URL)
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch((error) => setError('Error al cargar productos'))
      .finally(() => setCargando(false))
  },[]);

  if (cargando) return 'Cargando productos...';
  if (error) return error;

  return(
    <div>
      <h2>Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.title} : {producto.price}$
            <img src={producto.image} height={80} width={80}/>
            <button onClick={() => agregarAlCarrito(producto)}>Agregar</button>
            <Link to={`/productos/${producto.id}`} >Detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;
