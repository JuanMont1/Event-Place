import React, { useState, useMemo } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/MisSuscripciones.css";
import { BarraNavegacion } from '../Components/common/BarraNavegacion';
import EventosDisponibles from '../Components/eventos/EventosDisponibles'; 
import PieDePagina from "../Components/common/pieDePagina";
import EventosDestacadosSection from '../Components/eventos/EventosDestacadosSection';
import VideoPromoSection from '../Components/VideoPromoSection';


// Datos de ejemplo para eventos
const eventosEjemplo = [
  {
    id: "1",
    nombre: "Conferencia de React",
    descripcion: "Aprende React con expertos",
    imagen: "https://mott.pe/noticias/wp-content/uploads/2018/09/6-tips-para-aprender-a-como-tomar-fotos-en-eventos-de-dia-y-noche.png",
    fecha: "15 Oct 2023",
    categoria: "Tecnológico",
    facultad: "Ingeniería",
    contadorSuscripciones: 42,
    cuposDisponibles: 10,
    destacado: true
  },
  {
    id: "2",
    nombre: "Concierto de Jazz",
    descripcion: "Disfruta de una noche de jazz",
    imagen: "https://mott.pe/noticias/wp-content/uploads/2018/09/6-tips-para-aprender-a-como-tomar-fotos-en-eventos-de-dia-y-noche.png",
    fecha: "20 Oct 2023",
    categoria: "Cultural",
    facultad: "Artes",
    contadorSuscripciones: 35,
    cuposDisponibles: 5,
    destacado: true
  },
  {
    id: "3",
    nombre: "Torneo de Fútbol",
    descripcion: "Competición interuniversitaria",
    imagen: "https://mott.pe/noticias/wp-content/uploads/2018/09/6-tips-para-aprender-a-como-tomar-fotos-en-eventos-de-dia-y-noche.png",
    fecha: "25 Oct 2023",
    categoria: "Deportivo",
    facultad: "Deportes",
    contadorSuscripciones: 28,
    cuposDisponibles: 0,
    destacado: false
  }
];

const MisSuscripciones = () => {
  const [eventosDisponibles, setEventosDisponibles] = useState(eventosEjemplo);
  const [suscripciones, setSuscripciones] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Función simulada para suscripciones
  const toggleSuscripcion = (evento) => {
    if (suscripciones.some(e => e.id === evento.id)) {
      // Cancelar suscripción
      setSuscripciones(suscripciones.filter(e => e.id !== evento.id));
      setEventosDisponibles(eventosDisponibles.map(e => 
        e.id === evento.id 
          ? { ...e, cuposDisponibles: e.cuposDisponibles + 1 } 
          : e
      ));
    } else {
      // Suscribirse
      if (evento.cuposDisponibles > 0) {
        setSuscripciones([...suscripciones, evento]);
        setEventosDisponibles(eventosDisponibles.map(e => 
          e.id === evento.id 
            ? { ...e, cuposDisponibles: e.cuposDisponibles - 1 } 
            : e
        ));
      } else {
        alert("Lo sentimos, no hay cupos disponibles para este evento.");
      }
    }
  };

  // Filtrar eventos
  const eventosFiltrados = useMemo(() => {
    return eventosDisponibles.filter(
      (evento) =>
        (categoriaSeleccionada ? evento.categoria === categoriaSeleccionada : true) &&
        (evento.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          evento.categoria.toLowerCase().includes(filtro.toLowerCase()) ||
          evento.facultad.toLowerCase().includes(filtro.toLowerCase()))
    );
  }, [eventosDisponibles, categoriaSeleccionada, filtro]);

  // Verificar suscripción
  const isSuscrito = (eventoId) => {
    return suscripciones.some(e => e.id === eventoId);
  };

  return (
    <div>
      <BarraNavegacion />

      <BienvenidaSection />

      <EventosDestacadosSection 
        eventosDisponibles={eventosDisponibles.filter(e => e.destacado)}
        titulo="Eventos Destacados"
        descripcion="Descubre los eventos más emocionantes y populares de nuestra universidad"
      />

      <EventosDisponibles 
        eventosFiltrados={eventosFiltrados}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        filtro={filtro}
        setFiltro={setFiltro}
        isSuscrito={isSuscrito}
        toggleSuscripcion={toggleSuscripcion}
        eventosDisponibles={eventosDisponibles}
        setEventosDisponibles={setEventosDisponibles}
      />

      <VideoPromoSection />

      <PieDePagina />
    </div>
  );
};

// Componentes de sección 
const BienvenidaSection = () => (
  <section className="bienvenida">
    <Container>
      <Row className="align-items-center">
        {/* Columna de texto - Cambio de orden en móvil */}
        <Col xs={12} md={6} className="order-2 order-md-1 text-center text-md-start mb-4 mb-md-0">
          <h1 className="display-4 fw-bold bienvenida-titulo">¡Gracias por unirte a EventPlace!</h1>
          <p className="lead bienvenida-texto">
            Descubre y suscríbete a los mejores eventos de la Universidad de Cundinamarca. 
            No te pierdas ninguna oportunidad de aprender, crecer y divertirte.
          </p>
          <Button 
            variant="success" 
            size="lg" 
            className="rounded-pill px-4 py-2 bienvenida-boton"
          >
            Explorar Eventos
          </Button>
        </Col>
        
        {/* Columna de imagen - Cambio de orden en móvil */}
        <Col xs={12} md={6} className="order-1 order-md-2 mb-4 mb-md-0">
          <div className="imagen-container">
            <img 
              src="https://noticias.udec.cl/wp-content/uploads/2022/09/CADEC-06-1024x683.jpg" 
              alt="Eventos Universitarios" 
              className="imagen-eventos img-fluid rounded-3 shadow-sm"
            />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);



export default MisSuscripciones;