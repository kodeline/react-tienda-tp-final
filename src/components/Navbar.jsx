import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul className="flex md:flex-row flex-col md:gap-10 gap-8 items-center md:items-center">
        <li>
          <Link 
            to="/tecnologia" 
            className="text-gray-700 md:text-lg text-2xl font-medium hover:text-black transition-colors duration-200 hover:underline underline-offset-4"
          >
            Hombre
          </Link>
        </li>
        <li>
          <Link 
            to="/moda" 
            className="text-gray-700 md:text-lg text-2xl font-medium hover:text-black transition-colors duration-200 hover:underline underline-offset-4"
          >
            Mujer
          </Link>
        </li>
        <li>
          <Link 
            to="/moda" 
            className="text-gray-700 md:text-lg text-2xl font-medium hover:text-black transition-colors duration-200 hover:underline underline-offset-4"
          >
            Infantil
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
