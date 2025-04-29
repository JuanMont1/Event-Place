import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { BarraNavegacion } from './Components/common/BarraNavegacion';
import MisSuscripciones from './pages/MisSuscripciones';
import UserProfile from './Components/users/UserProfile';
import Login from './Components/users/Login';
import Register from './Components/users/register'; 
import PaginaPrincipal from './pages/PaginaPrincipal';
import TodosLosAnuncios from './Components/TodosLosAnuncios';
import GaleriaEventos from './pages/galeriaDeeventos';
import PaginaCalendario from './pages/PaginaCalendario';
import ForoEventos from './pages/ForoEventos';
import ProximosEventos from './pages/proximos-eventos';

function AppContent() {
  const location = useLocation();
  // Rutas donde no se debe mostrar la barra de navegación
  const hideNavbar = ['/login', '/register', '/register', '/todos-los-anuncios', '/galeria-de-eventos', '/foro/eventos', '/proximos-eventos', '/perfil'].includes(location.pathname);

  return (
    <div className="App">
      {!hideNavbar && <BarraNavegacion />}
      <Routes>
        <Route path="/MisSuscripciones" element={<MisSuscripciones />} />
        <Route path="/perfil" element={<UserProfile />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/todos-los-anuncios" element={<TodosLosAnuncios />} />
        <Route path="/galeria-de-eventos" element={<GaleriaEventos />} />
        <Route path="/calendario" element={<PaginaCalendario />} />
        <Route path="/foro/eventos" element={<ForoEventos />} />
        <Route path="/proximos-eventos" element={<ProximosEventos />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;