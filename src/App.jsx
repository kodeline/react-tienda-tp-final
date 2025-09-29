import { useState } from 'react';
import Carrito from './components/carrito';
import Header from './components/Header';
import Inicio from './pages/Inicio';
import Moda from './pages/Moda';
import { Routes, Route } from 'react-router-dom';
import ProductoDetalle from './pages/ProductoDetalle';
import RutaProtegida from './components/RutaProtegida';
import Admin from './components/Admin';


function App() {
   const [estaAutenticado, setEstaAutenticado] = useState(false);
  // Renderizado y Estructura
  return (
    <>
      <Header/>
        <Routes> 
        <Route path='/' element={<Inicio/>}/> 
        <Route path='/moda' element={<Moda/>}/> 
        <Route path='/productos/:id' element={<ProductoDetalle/>}/>
        <Route 
          path='/carrito' 
          element={
            <RutaProtegida estaAutenticado={estaAutenticado}>
              <Carrito/>
            </RutaProtegida>
          }
        />
        <Route 
          path='/admin'
          element={
            <RutaProtegida>
              <Admin/>
            </RutaProtegida>
          }
        />
      </Routes>         
    </>
  )
}

export default App
