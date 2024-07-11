import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elementos/Contenedor';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InicioSesion from './componentes/InicioSesion';
import ListaDeGastos from './componentes/ListaDeGastos'
import RegistrarUsuario from './componentes/RegistrarUsuario';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import EditarGastos from './componentes/EditarGastos';
import { Helmet } from 'react-helmet';
import favicon from './imagenes/logo.png';
import Fondo from './elementos/Fondo';
import { AuthProvider } from './contextos/AuthContext';
import RutaProtegida from './componentes/RutaPrivada';

WebFont.load({
  google: {
    families: ['Work Sans:400,500,600', 'Droid Serif']
  }
});


const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <AuthProvider>
        <BrowserRouter>
          <Contenedor>
            <Routes>
              <Route path="/iniciar-sesion" element={<InicioSesion />} />
              <Route path="/crear-cuenta" element={<RegistrarUsuario />} />

              <Route path='/categorias' element={
                <RutaProtegida>
                  <GastosPorCategoria />
                </RutaProtegida>
              } />

              <Route path='/lista' element={
                <RutaProtegida>
                  <ListaDeGastos />
                </RutaProtegida>
              } />

              <Route path='/editar/:id' element={
                <RutaProtegida>
                  <EditarGastos />
                </RutaProtegida>
              } />

              <Route path='/' element={
                <RutaProtegida>
                  <App />
                </RutaProtegida>
              } />

              {/* Agrega más rutas según sea necesario */}
            </Routes>
          </Contenedor>
        </BrowserRouter>
      </AuthProvider>

      <Fondo />
    </>

  );
}

// Crea la raíz del documento
const root = ReactDOM.createRoot(document.getElementById('root'));

// Usa el método render para montar el componente Index
root.render(<Index />);

