import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const AgregarEvento = () => {
  const [evento, setEvento] = useState({
    nombre: "",
    categoria: "",
    fecha: "",
    facultad: "",
    imagen: "",
    descripcion: "",
    cuposDisponibles: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { nombre, categoria, fecha, facultad, imagen, descripcion, cuposDisponibles } = evento;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento((prevEvento) => ({
      ...prevEvento,
      [name]: name === "cuposDisponibles" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for the new event
      const mockEvent = {
        ...evento,
        id: `mock-id-${Date.now()}`,
        fechaCreacion: new Date().toISOString(),
        cuposDisponibles: parseInt(evento.cuposDisponibles, 10),
      };

      console.log("Evento simulado agregado:", mockEvent);
      
      // Simulate saving to past events
      console.log("Evento simulado guardado en eventos pasados");
      
      alert("Evento agregado con éxito (simulación)");
      navigate("/admin/eventos");
    } catch (e) {
      console.error("Error simulado al agregar el evento: ", e);
      alert("Error simulado al agregar el evento. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agregar-evento-container" style={{ paddingBottom: "24px" }}>
      <Container>
        <h2 className="my-4">Agregar Nuevo Evento</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Evento</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="categoria"
                  value={categoria}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="Académico">Académico</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Deportivo">Deportivo</option>
                  <option value="Artístico">Artístico</option>
                  <option value="Tecnológico">Tecnológico</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  value={fecha}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Facultad</Form.Label>
                <Form.Control
                  type="text"
                  name="facultad"
                  value={facultad}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>URL de la Imagen del Evento</Form.Label>
            <Form.Control
              type="url"
              name="imagen"
              value={imagen}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={descripcion}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cupos Disponibles</Form.Label>
            <Form.Control
              type="number"
              name="cuposDisponibles"
              value={cuposDisponibles}
              onChange={handleChange}
              min="0"
              required
              disabled={loading}
            />
          </Form.Group>
          <Button 
            variant="primary" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Procesando..." : "Agregar Evento"}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AgregarEvento;