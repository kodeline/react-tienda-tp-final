import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Se pide para la pre-entrega
const Productos = ({ agregarProducto }) => {
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const URL = 'https://fakestoreapi.com/products';

  useEffect(() => {
    fetch(URL)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        setError('Error al cargar productos');
        setCargando(false);
      });
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
            <button onClick={() => agregarProducto(producto)}>Agregar</button>
            <Link to={`/productos/${producto.id}`} >Detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;
