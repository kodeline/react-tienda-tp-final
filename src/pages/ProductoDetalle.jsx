import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductoDetalle = () => {
  
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`https://68d5d31de29051d1c0afa93e.mockapi.io/productos/${id}`)
      .then(respuesta => respuesta.json())
      .then(dato => setProducto(dato));
  },[id]);

  if(!producto)
    return <p>Cargando ......</p>
  
  return(
    <>
      <h2>Detalles del Producto Nro {id}</h2>
      <img src={producto.imagen} alt={producto.nombre} width={100} height={100} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
    </>
    
  );
}

export default ProductoDetalle;