import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../archivos/img/logo.png";
import '../../styles/BarraNavegacion.css'; 

export const BarraNavegacionAdmin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
       
        await new Promise(resolve => setTimeout(resolve, 300));
        
        
        const mockUserData = {
          id: 'admin123',
          name: 'Administrador',
          email: 'admin@universidad.edu',
          role: 'admin',
          avatar: 'https://via.placeholder.com/30'
        };
        
        setUser(mockUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
    
      await new Promise(resolve => setTimeout(resolve, 200));
      
     
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleProfileClick = () => {
    navigate('/admin/perfil');
  };

  const handleAddEvent = () => {
    navigate('/admin/gestionar-eventos');
  };

  if (loading) {
    return (
      <Navbar bg="light" expand="lg" className="barra-personalizada">
        <Container fluid>
          <Navbar.Brand as={Link} to="/admin-dashboard">
            <img src={logo} alt="Logo" height="30" className="d-inline-block align-top logo-barra" />
          </Navbar.Brand>
          <div className="ms-auto">Cargando...</div>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar bg="light" expand="lg" className="barra-personalizada">
      <Container fluid>
        <Navbar.Brand as={Link} to="/admin-dashboard">
          <img src={logo} alt="Logo" height="30" className="d-inline-block align-top logo-barra" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/admin-usuarios">Usuarios</Nav.Link>
            <Nav.Link as={Link} to="/admin-reportes">Reportes</Nav.Link>
            <Button 
              variant="success" 
              className="mx-2"
              onClick={handleAddEvent}
            >
              Gestionar Eventos
            </Button>
            <NavDropdown 
              title={user ? `${user.name || user.email}` : 'Usuario'} 
              id="admin-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={handleProfileClick}>Mi Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};