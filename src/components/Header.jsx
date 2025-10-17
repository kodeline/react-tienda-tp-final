import Navbar from './Navbar';
import styles from './Header.module.css';
import UserIcon from '../assets/UserIcon';
import BagIcon from '../assets/BagIcon';
import { Link } from 'react-router-dom';
// Se pide para la pre-entrega
const Header = ({contadorEnCarrito = 5}) => {
  return (
    <header className={styles.header}>
      {/* Seccion Izquierda: Logo */}
      <div className={styles.logo}>
        ONEPIECE
      </div>
      {/* Seccion Central: Componente NavBar */}
      <div className={styles.navbarContainer}>
        <Navbar />
      </div>
      {/* Seccion Derecha: Iconos */}
      <div className={styles.iconsContainer}>
        {/* Icono de Usuario */}
        <div className={styles.icono}>
          <UserIcon />
        </div>
        {/* Icono de Carrito con Contador */}
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
