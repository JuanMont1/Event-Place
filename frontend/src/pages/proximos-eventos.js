import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { FaClock, FaMapMarkerAlt, FaSearch, FaArrowLeft, FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/ProximosEventos.css";

const ProximosEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        // Simulamos un retraso de red
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Datos simulados de próximos eventos
        const mockEventos = [
          {
            id: "1",
            nombre: "Conferencia de Inteligencia Artificial",
            descripcion: "Evento anual sobre los últimos avances en IA y machine learning",
            imagen: "https://via.placeholder.com/300x200?text=Conferencia+IA",
            fecha: "15 Noviembre 2023",
            hora: "10:00 AM",
            lugar: "Auditorio Principal",
            categoria: "Tecnología"
          },
          {
            id: "2",
            nombre: "Festival de Cine Universitario",
            descripcion: "Proyección de cortometrajes realizados por estudiantes",
            imagen: "https://via.placeholder.com/300x200?text=Festival+Cine",
            fecha: "20 Noviembre 2023",
            hora: "4:00 PM",
            lugar: "Sala de Proyecciones",
            categoria: "Cultural"
          },
          {
            id: "3",
            nombre: "Taller de Desarrollo Web",
            descripcion: "Aprende las bases de HTML, CSS y JavaScript",
            imagen: "https://via.placeholder.com/300x200?text=Taller+Web",
            fecha: "25 Noviembre 2023",
            hora: "2:00 PM",
            lugar: "Laboratorio de Computación 3",
            categoria: "Educación"
          },
          {
            id: "4",
            nombre: "Feria de Empleo",
            descripcion: "Conoce las oportunidades laborales con empresas asociadas",
            imagen: "https://via.placeholder.com/300x200?text=Feria+Empleo",
            fecha: "30 Noviembre 2023",
            hora: "9:00 AM - 5:00 PM",
            lugar: "Plaza Central",
            categoria: "Profesional"
          }
        ];

        setEventos(mockEventos);
      } catch (error) {
        console.error("Error simulando fetch de eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const eventosFiltrados = eventos.filter((evento) =>
    evento.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    evento.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) {
    return (
      <div className="proximos-eventos-page">
        <Container className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p>Cargando próximos eventos...</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="proximos-eventos-page">
      <Button 
        variant="link" 
        className="btn-volver" 
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Volver
      </Button>

      <Container>
        <h1 className="text-center mb-5">Próximos Eventos en la UdeC</h1>
        
        <Form className="mb-5">
          <Form.Group as={Row} className="justify-content-center">
            <Col md={6}>
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Busca tu próximo evento..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="search-input"
                />
              </div>
            </Col>
          </Form.Group>
        </Form>

        <div className="timeline-container">
          {eventosFiltrados.length > 0 ? (
            eventosFiltrados.map((evento, index) => (
              <div key={evento.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="evento-imagen">
                    <Image src={evento.imagen} alt={evento.nombre} fluid />
                  </div>
                  <div className="evento-info">
                    <h3 className="evento-titulo">{evento.nombre}</h3>
                    <div className="evento-fecha">{evento.fecha}</div>
                    <div className="evento-detalles">
                      {evento.hora && <p><FaClock /> {evento.hora}</p>}
                      {evento.lugar && <p><FaMapMarkerAlt /> {evento.lugar}</p>}
                      {evento.categoria && <p><FaTag /> {evento.categoria}</p>}
                    </div>
                    <p className="evento-descripcion">{evento.descripcion}</p>
                    <Button variant="outline-success" className="btn-mas-info">Más información</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <p>No se encontraron eventos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProximosEventos;