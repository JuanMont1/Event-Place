import { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown, Button, Image } from "react-bootstrap";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; 
import "../../styles/BarraNavegacion.css";

export const BarraNavegacion = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, fetchUserData } = useAuth(); 
  const location = useLocation(); 

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);
    
    // Verificación inicial
    checkMobile();
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [location, fetchUserData]); 

  const toggleMenu = () => setExpanded(!expanded);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  // Barra para móviles
  if (isMobile) {
    return (
      <>
        <div className={`mobile-navbar ${scrolled ? "scrolled" : ""}`}>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {expanded ? <FaTimes /> : <FaBars />}
          </button>
          
          <div className="mobile-search-center">
            <FaSearch className="mobile-search-icon" />
            <input
              type="text"
              className="mobile-search-input"
              placeholder="Buscar eventos..."
            />
          </div>
          
          <div className="mobile-user-icon" onClick={toggleUserMenu}>
            {user ? (
              <Image 
                src={user.profileImage || '/default-user.png'} 
                roundedCircle 
                width="30" 
                height="30" 
              />
            ) : (
              <FaUserCircle />
            )}
          </div>
        </div>

        <div className={`mobile-side-menu ${expanded ? "show" : ""}`}>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={toggleMenu}>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/galeria-de-eventos" onClick={toggleMenu}>Galeria De Eventos</Nav.Link>
            <Nav.Link as={Link} to="/calendario" onClick={toggleMenu}>Calendario</Nav.Link>
            <Nav.Link as={Link} to="/MisSuscripciones" onClick={toggleMenu}>Mis Suscripciones</Nav.Link>
            
            <NavDropdown title="Foro" id="mobile-foro">
              <NavDropdown.Item as={Link} to="/foro/eventos" onClick={toggleMenu}>
                Foro de Eventos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/foro/quejas-reclamos" onClick={toggleMenu}>
                Quejas y Reclamos
              </NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link as={Link} to="/proximos-eventos" onClick={toggleMenu}>Próximos Eventos</Nav.Link>
          </Nav>
        </div>

        {/* Menú de usuario móvil */}
        <div className={`mobile-user-menu ${showUserMenu ? "show" : ""}`}>
          <Nav className="flex-column">
            {user ? (
              <>
                <div className="mobile-user-info">
                  <Image 
                    src={user.profileImage || '/default-user.png'} 
                    roundedCircle 
                    width="40" 
                    height="40" 
                    className="me-2"
                  />
                  <span>{user.name || user.email}</span>
                </div>
                <Nav.Link as={Link} to="/perfil" onClick={toggleUserMenu}>Mi perfil</Nav.Link>
                <Nav.Link onClick={() => { logout(); toggleUserMenu(); }}>Cerrar sesión</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={toggleUserMenu}>Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/registro" onClick={toggleUserMenu}>Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </div>

        {/* Overlay */}
        {(expanded || showUserMenu) && (
          <div 
            className="mobile-menu-overlay" 
            onClick={() => {
              if (expanded) toggleMenu();
              if (showUserMenu) toggleUserMenu();
            }}
          ></div>
        )}
      </>
    );
  }

  // Barra para computador
  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className={`barra-personalizada ${scrolled ? "con-scroll" : ""}`}
      >
        <Container fluid className="px-4">
          <Navbar.Brand as={Link} to="/MisSuscripciones" className="me-0">
            <img
              src="/logo.png" // Ajusta esta ruta
              alt="Universidad de Cundinamarca"
              className={`logo-barra ${scrolled ? "con-scroll" : ""}`}
            />
          </Navbar.Brand>
          
          <div className="busqueda-seccion d-none d-lg-flex">
            <FaSearch className="icono-busqueda" />
            <input
              type="text"
              className="input-busqueda"
              placeholder="Buscar eventos..."
            />
          </div>

          <Navbar.Toggle aria-controls="navbar" className="d-lg-none" />
          
          <Navbar.Collapse id="navbar" className="justify-content-end">
            <Nav className="alineacion-items">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/galeria-de-eventos">Galeria De Eventos</Nav.Link>
              <Nav.Link as={Link} to="/calendario">Calendario</Nav.Link>
              <Nav.Link as={Link} to="/MisSuscripciones">Mis Suscripciones</Nav.Link>
              
              <NavDropdown title="Foro" id="menu-foro">
                <NavDropdown.Item as={Link} to="/foro/eventos">
                  Foro de Eventos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/foro/quejas-reclamos">
                  Quejas y Reclamos
                </NavDropdown.Item>
              </NavDropdown>
              
              <Nav.Link as={Link} to="/proximos-eventos">Próximos Eventos</Nav.Link>
              
              <div className="seccion-usuario">
                {user ? (
                  <NavDropdown
                    title={
                      <>
                        <Image 
                          src={user.profileImage || '/default-user.png'} 
                          roundedCircle 
                          width="30" 
                          height="30" 
                          className="me-2"
                        />
                        <span className="nombre-usuario">{user.name || user.email}</span>
                      </>
                    }
                    id="menu-usuario"
                    align="end"
                  >
                    <NavDropdown.Item as={Link} to="/perfil">
                      Mi perfil
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logout}>
                      Cerrar sesión
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Button as={Link} to="/login" variant="outline-primary" className="ms-2">
                    Iniciar sesión
                  </Button>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};