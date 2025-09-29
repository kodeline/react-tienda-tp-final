import NavBar from "./NavBar";
import styles from "./Header.module.css";
import UserIcon from "../assets/UserIcon";
import BagIcon from "../assets/BagIcon";

const Header = ({cartItemCount = 10}) => {
  return (
    <header className={styles.header}>
      {/* Seccion Izquierda: Logo */}
      <div className={styles.logo}>
        One Piece
      </div>
      {/* Seccion Central: Componente NavBar */}
      <div className={styles.navbarContainer}>
        <NavBar/>
      </div>
      {/* Seccion Derecha: Iconos */}
      <div className={styles.iconsContainer}>
        {/* Icono de Usuario */}
        <div className={styles.icon}>
          <UserIcon />
        </div>
        {/* Icono de Carrito con Contador */}
        <div className={styles.cartIconWrapper}>
          <BagIcon className={styles.icon} />
          {/* Renderiza el contador solo si es mayor que 0 */}
          {cartItemCount > 0 && (
            <span className={styles.cartCounter}>
              {cartItemCount}
            </span>
          )}
        </div>
      </div>
    </header>   
  );
};

export default Header;
