import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; 
import { useAuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { usuario } = useAuthContext();
  const esAdmin = usuario === 'admin';
  
  return(
    <nav>
      <ul className={styles.lista}>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>Inicio</Link>
          <Link to="/tecnologia" className={styles.link}>Tecnologia</Link>
          <Link to="/moda" className={styles.link}>Moda</Link>
          {esAdmin && 
            <Link to="/admin" className={styles.link}>Admin</Link>
          }
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

