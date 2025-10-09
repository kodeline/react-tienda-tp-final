import { Navigate } from "react-router-dom";
// se ve en clase 7 no se pide para la Pre-entrega
const RutaProtegida = ({estaAutenticado, children}) => {
  
  if(!estaAutenticado)
    return <Navigate to="/login" replace />;
  
  return children;
}

export default RutaProtegida;