import { useContext } from 'react';
import Navbar from './Navbar';
import styles from './Header.module.css';
import BagIcon from '../assets/BagIcon';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';

const Header = () => {
  const { carrito } = useContext(CarritoContext);
  const {usuario, logout} = useAuthContext();
  const estaLogeado = !!usuario;
  const contadorEnCarrito = carrito.length;

  return (
    <header className={styles.header}>
      {/* Seccion Izquierda: Logo */}
      <div className={styles.logo}>
        ONE PIECE
      </div>
      {/* Seccion Central: Componente NavBar */}
      <div className={styles.navbarContainer}>
        <Navbar />
      </div>
      {/* Seccion Derecha: Iconos */}
      <div className={styles.iconsContainer}>
        { estaLogeado ? 
          <button onClick={logout} className={styles.login}>Cerrar Sesion </button> 
          :
          <Link to="/login">
            <button className={styles.login}>Ingresá</button>
          </Link>
        }
        <div className={styles.iconoDeCarrito}>
          <Link to="/carrito">
          <BagIcon className={styles.icono} />
          {/* Renderiza el contador solo si es mayor que 0 */}
          {contadorEnCarrito > 0 && (
            <span className={styles.contadorDeCarrito}>
              {contadorEnCarrito}
            </span>
          )}
          </Link>
        </div>
      </div>
    </header>   
  );
};

export default Header;
