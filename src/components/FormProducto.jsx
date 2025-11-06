import { useState, useContext } from "react";
import { ProductoContext } from '../context/ProductoContext'; 

const FormProducto = ({onAgregar}) => {
  //const { agregarProducto, editarProducto } = useContext(ProductoContext); 
  const [errores, setErrores] = useState({});
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    descripcion: ''
  });
  
  const manejarChange = (evento) => {
    const {name, value} =  evento.target;
    setProducto({...producto, [name]: value});
  };

  const validarForm = () => {
    const nuevosErrores = {};

    if(!producto.nombre.trim())
      nuevosErrores.nombre = 'El nombre es obligatorio.'

    if(!producto.precio || producto.precio < 0)
      nuevosErrores.precio = 'El precio debe ser mayor a 0.'

    if (!producto.imagen.trim() || producto.imagen.length < 6)  
      nuevosErrores.imagen = 'Debes subir la URL de una imagen valida.'; 

    if (!producto.descripcion.trim() || producto.descripcion.length < 10)  
      nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres.';  
 
    setErrores(nuevosErrores); 
    return Object.keys(nuevosErrores).length === 0; 
  }; 

  const manejarSubmit = (evento) => {
    evento.preventDefault();
  
    if (!validarForm())
      return; 
    
    const productoAEnviar = {
      ...producto,
      precio: parseFloat(producto.precio) 
    };
    
    onAgregar(productoAEnviar);
    // Limpiamos el formulario
    setProducto({nombre: '', precio:'', imagen:'', descripcion:''});
    setErrores({});
  }
 
  return(
    <>
      <form onSubmit={manejarSubmit}>
        <h2>Agregar Producto</h2>
        <div>
          <label>Nombre:</label>
          <br/>
          <input
            type='text'
            name='nombre'
            value={producto.nombre}
            onChange={manejarChange}    
          />
          {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>} 
        </div>
        <div>
          <label>Precio:</label>
          <br/>
          <input
            type='number'
            name='precio'
            value={producto.precio}
            onChange={manejarChange}
            min={0}
            step='any'
          />
          {errores.precio && <p style={{ color: 'red' }}>{errores.precio}</p>} 
        </div>
        <div>
          <label>URL de Imagen:</label>
          <br/>
          <input
            type='text'
            name='imagen'
            value={producto.imagen}
            onChange={manejarChange}    
          />
          {errores.imagen && <p style={{ color: 'red' }}>{errores.imagen}</p>} 
        </div>
        <div>
          <label>Descripcion:</label>
          <br/>
          <textarea
            name='descripcion'
            value={producto.descripcion}
            onChange={manejarChange}
          />
          {errores.descripcion && <p style={{ color: 'red' }}>{errores.descripcion}</p>} 
        </div>
        <button type='submit'>Agregar Productos</button>  
      </form>   
    </>
  );
}

export default FormProducto;