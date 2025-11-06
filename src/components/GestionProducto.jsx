import { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import EditarProducto from "./EditarProducto";
import styles from './GestionProducto.module.css';
import CirclePlus from "../assets/CirclePlus";

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const API = "https://68d5d31de29051d1c0afa93e.mockapi.io/productos";

  // Cargar productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(API);
      const datos = await respuesta.json();
      setProductos(datos);

    } catch (error) {
      console.error("Error al cargar productos:", error);
      alert("Error al cargar los productos");

    } finally {
      setCargando(false);
    }
  };

  // Función para seleccionar un producto
  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  if (cargando) 
    return <div>Cargando productos...</div>;

  // Funcion para agregar el producto a la API
  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto)
      });

      if (!respuesta.ok) 
        throw new Error("Error al agregar el producto.");

      const datos = await respuesta.json();
      console.log("Producto agregado: ", datos);
      alert("Producto agregado correctamente");

      //Agregar el nuevo producto a la lista
      setProductos([...productos, datos]);

    } catch (error) {
        console.error(error.message);
        alert("Hubo un problema al agregar el producto.");
    }
  };

  // Funcion para eliminar producto de la API
  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar?");

    if (confirmar) {
      try {
        const respuesta = await fetch(`${API}/${id}`, {
            method: "DELETE",
          }
        );

        if (!respuesta.ok) 
          throw new Error("Error al eliminar");  
        // Filtra y crea un nuevo array sin el producto eliminado
        setProductos(productos.filter(p => p.id !== id));
      } 
      catch (error) {
        console.error(error.message);
        alert("Hubo un problema al eliminar el producto.");
      }
    }
  };

  return (
    <div>
      <div className={styles.container}>
        {/* Lista de productos */}
        <div className={styles.panel}>

          <div className={styles.botonAgregarProducto}>
            <CirclePlus /> 
            <p>Agregar Producto</p>
          </div>    
          {productos.map((producto) => (
            <div
              key={producto.id}
              onClick={() => seleccionarProducto(producto)}
              className={styles.productoItem}
            > 
              <img className={styles.imagen} src={producto.imagen} />
              <h3>{producto.nombre}</h3>
              <p>Precio: ${producto.precio}</p>
              <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
            </div>
          ))}
        </div>
        {/* Formulario para editar producto */}
        <div className={styles.panel}>
          <FormProducto onAgregar={agregarProducto} />
          <EditarProducto
            productoSeleccionado={productoSeleccionado}
          />
        </div>
      </div>
    </div>
  );
};

export default GestionProductos;