import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
} from "react-bootstrap";
import {
  FaGraduationCap,
  FaMusic,
  FaFootballBall,
  FaPalette,
  FaCode,
  FaUsers,
  FaCalendarAlt,
  FaSearch,
  FaTicketAlt,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";
import "../../styles/MisSuscripciones.css";

// Datos de ejemplo para categorías
const categories = [
  { id: 1, name: "Académico", icon: <FaGraduationCap />, color: "#4285F4" },
  { id: 2, name: "Cultural", icon: <FaMusic />, color: "#EA4335" },
  { id: 3, name: "Deportivo", icon: <FaFootballBall />, color: "#34A853" },
  { id: 4, name: "Artístico", icon: <FaPalette />, color: "#FBBC05" },
  { id: 5, name: "Tecnológico", icon: <FaCode />, color: "#FF6D01" },
];

// Datos de ejemplo para eventos
const eventosEjemplo = [
  {
    id: "1",
    name: "Conferencia de React",
    category: "Tecnológico",
    image: "https://mott.pe/noticias/wp-content/uploads/2018/09/6-tips-para-aprender-a-como-tomar-fotos-en-eventos-de-dia-y-noche.png",
    place: "Auditorio Principal",
    date: new Date("2023-10-15"),
    time: "14:00",
    director: "60d5ecb8b176f71d8892d47e", 
    description: "Aprende React con expertos en desarrollo web",
    status: "Por realizar",
    capacity: "100",
    contadorSuscripciones: 42,
    cuposDisponibles: 10,
  },
  {
    id: "2",
    name: "Concierto de Jazz",
    category: "Cultural",
    image: "https://mott.pe/noticias/wp-content/uploads/2018/09/6-tips-para-aprender-a-como-tomar-fotos-en-eventos-de-dia-y-noche.png",
    place: "Teatro Universitario",
    date: new Date("2023-10-20"),
    time: "20:00",
    director: "60d5ecb8b176f71d8892d47f", 
    description: "Disfruta de una noche de jazz con artistas locales e internacionales",
    status: "Por realizar",
    capacity: "200",
    contadorSuscripciones: 35,
    cuposDisponibles: 5,
  },
  {
    id: "3",
    name: "Torneo de Fútbol",
    category: "Deportivo",
    image: "https://mott.pe/noticias/wp-content/uploads/2018/09/6-tips-para-aprender-a-como-tomar-fotos-en-eventos-de-dia-y-noche.png",
    place: "Estadio Universitario",
    date: new Date("2023-10-25"),
    time: "09:00",
    director: "60d5ecb8b176f71d8892d480", 
    description: "Competición interuniversitaria de fútbol",
    status: "Por realizar",
    capacity: "500",
    contadorSuscripciones: 28,
    cuposDisponibles: 0,
  },
];

const EventosDisponibles = () => {
  // Estados para el frontend
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [suscripciones, setSuscripciones] = useState([]);
  const [animatingEventId, setAnimatingEventId] = useState(null);

  // Filtrar eventos
  const eventosFiltrados = useMemo(() => {
    return eventosEjemplo.filter(
      (evento) =>
        (!categoriaSeleccionada || evento.category === categoriaSeleccionada) &&
        (!filtro || evento.name.toLowerCase().includes(filtro.toLowerCase()))
    );
  }, [categoriaSeleccionada, filtro]);

  // Verificar si un evento está suscrito
  const isSuscrito = (eventoId) => {
    return suscripciones.some((e) => e.id === eventoId);
  };

  // Manejar suscripción (simulado)
  const handleToggleSuscripcion = (evento) => {
    if (isSuscrito(evento.id)) {
      setSuscripciones(suscripciones.filter((e) => e.id !== evento.id));
    } else {
      if (evento.cuposDisponibles > 0) {
        setSuscripciones([...suscripciones, evento]);
        setAnimatingEventId(evento.id);
        setTimeout(() => setAnimatingEventId(null), 1000);
      }
    }
  };

  return (
    <section className="eventos-disponibles py-3 py-md-5">
      <Container>
        <h2 className="text-center mb-4">Eventos Disponibles</h2>
        
        {/* Buscador */}
        <Row className="mb-4">
          <Col xs={12} md={6} className="mx-auto">
            <Form className="search-form">
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Buscar eventos..."
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
                <div className="input-group-append">
                  <Button variant="outline-success">
                    <FaSearch />
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>

        {/* Categorías */}
        <div className="categories-container mb-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-item ${
                categoriaSeleccionada === category.name ? "selected" : ""
              }`}
              onClick={() =>
                setCategoriaSeleccionada((prev) =>
                  prev === category.name ? null : category.name
                )
              }
              style={{ backgroundColor: category.color }}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>

        {/* Lista de eventos */}
        <Row>
          {eventosFiltrados.map((evento) => (
            <Col key={evento.id} xs={12} sm={6} lg={4} className="mb-4">
              <Card className={`evento-card h-100 border-success ${evento.cuposDisponibles <= 0 ? 'agotado' : ''}`}>
                <div className="position-relative">
                  <Card.Img variant="top" src={evento.image} />
                  <div className="contador-suscripciones">
                    <FaUsers className="text-white me-1" />
                    <strong>{evento.contadorSuscripciones || 0}</strong>
                  </div>
                  {evento.cuposDisponibles <= 0 && (
                    <div className="sello-agotado">
                      <span>Cupos llenos</span>
                    </div>
                  )}
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-success">
                    {evento.name}
                  </Card.Title>
                  <Card.Text className="flex-grow-1">
                    {evento.description}
                  </Card.Text>
                  <div className="evento-detalles mt-3">
                    <p className="evento-fecha mb-1">
                      <FaCalendarAlt className="text-success me-2" />{" "}
                      {evento.date.toLocaleDateString()} - {evento.time}
                    </p>
                    <p className="evento-categoria mb-1">
                      <FaCode className="text-success me-2" />{" "}
                      {evento.category}
                    </p>
                    <p className="evento-lugar mb-1">
                      <FaMapMarkerAlt className="text-success me-2" />{" "}
                      {evento.place}
                    </p>
                    <p className="cupos-disponibles mb-1">
                      <FaTicketAlt className="text-success me-2" />
                      <strong>{evento.cuposDisponibles}</strong> cupos disponibles
                    </p>
                    <p className="evento-status mb-1">
                      <FaInfoCircle className="text-success me-2" />{" "}
                      Estado: {evento.status}
                    </p>
                  </div>
                  <div className="button-container mt-3">
                    <Button
                      variant={
                        isSuscrito(evento.id) ? "outline-danger" : "success"
                      }
                      onClick={() => handleToggleSuscripcion(evento)}
                      className={`btn-suscribir w-100 ${
                        isSuscrito(evento.id) ? "btn-cancelar" : ""
                      } ${animatingEventId === evento.id ? "animating" : ""}`}
                      disabled={
                        !isSuscrito(evento.id) && evento.cuposDisponibles <= 0
                      }
                    >
                      {isSuscrito(evento.id)
                        ? "Cancelar Suscripción"
                        : "Suscribirse"}
                    </Button>
                    <Badge
                      bg={evento.cuposDisponibles > 0 ? "success" : "danger"}
                      className="position-absolute top-0 end-0 m-2"
                    >
                      {evento.cuposDisponibles > 0
                        ? `${evento.cuposDisponibles} cupos`
                        : "Agotado"}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default EventosDisponibles;