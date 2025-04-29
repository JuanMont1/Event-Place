import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GaleriaEventos.css';

const GaleriaEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        // Simulamos un retraso de red
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Datos simulados de eventos pasados
        const mockEventos = [
          {
            id: '1',
            nombre: 'Conferencia de Inteligencia Artificial',
            fecha: '15 Marzo 2023',
            categoria: 'Tecnología',
            descripcion: 'Evento anual sobre los últimos avances en IA y machine learning',
            imagen: 'https://via.placeholder.com/400x225?text=Conferencia+IA'
          },
          {
            id: '2',
            nombre: 'Festival de Arte Contemporáneo',
            fecha: '22 Abril 2023',
            categoria: 'Arte',
            descripcion: 'Exhibición de obras de artistas emergentes nacionales',
            imagen: 'https://via.placeholder.com/400x225?text=Festival+Arte'
          },
          {
            id: '3',
            nombre: 'Torneo Interuniversitario de Fútbol',
            fecha: '10 Mayo 2023',
            categoria: 'Deportivo',
            descripcion: 'Competencia anual entre universidades de la región',
            imagen: 'https://via.placeholder.com/400x225?text=Torneo+Fútbol'
          },
          {
            id: '4',
            nombre: 'Seminario de Educación Financiera',
            fecha: '5 Junio 2023',
            categoria: 'Académico',
            descripcion: 'Talleres prácticos sobre manejo de finanzas personales',
            imagen: 'https://via.placeholder.com/400x225?text=Seminario+Finanzas'
          },
          {
            id: '5',
            nombre: 'Concierto de Música Clásica',
            fecha: '18 Julio 2023',
            categoria: 'Cultural',
            descripcion: 'Presentación de la orquesta sinfónica universitaria',
            imagen: 'https://via.placeholder.com/400x225?text=Concierto+Clásica'
          },
          {
            id: '6',
            nombre: 'Hackathon de Innovación',
            fecha: '30 Agosto 2023',
            categoria: 'Tecnología',
            descripcion: 'Competencia de desarrollo de soluciones tecnológicas innovadoras',
            imagen: 'https://via.placeholder.com/400x225?text=Hackathon'
          }
        ];

        console.log('Eventos simulados obtenidos:', mockEventos);
        setEventos(mockEventos);
      } catch (error) {
        console.error("Error simulando fetch de eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const eventosFiltrados = filtroCategoria === 'Todos' 
    ? eventos 
    : eventos.filter(evento => evento.categoria === filtroCategoria);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="galeria-eventos">
        <button onClick={handleGoBack} className="btn-regresar">
          ← Regresar
        </button>
        <div className="cargando-contenedor">
          <p>Cargando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="galeria-eventos">
      <button onClick={handleGoBack} className="btn-regresar">
        ← Regresar
      </button>
      <h1 className="galeria-titulo">Galería de Eventos Pasados</h1>
      <p className="galeria-descripcion">
        Explora nuestra colección de eventos memorables que han dado forma a nuestra comunidad a lo largo del tiempo.
      </p>
      
      <div className="filtros-container">
        <select 
          value={filtroCategoria} 
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="filtro-select"
        >
          <option value="Todos">Todos los eventos</option>
          <option value="Académico">Académicos</option>
          <option value="Cultural">culturales</option>
          <option value="Deportivo">deportivos</option>
          <option value="Tecnología">tecnología</option>
          <option value="Arte">arte</option>
        </select>
      </div>

      <div className="eventos-grid">
        {eventosFiltrados.length > 0 ? (
          eventosFiltrados.map(evento => (
            <div key={evento.id} className="evento-card">
              <div className="evento-imagen-container">
                <img src={evento.imagen} alt={evento.nombre} className="evento-imagen" />
              </div>
              <div className="evento-info">
                <h3 className="evento-titulo">{evento.nombre}</h3>
                <div className="evento-meta">
                  <span className="evento-fecha">{evento.fecha}</span>
                  <span className="evento-categoria">{evento.categoria}</span>
                </div>
                <p className="evento-descripcion">{evento.descripcion}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="sin-eventos">
            <p>No hay eventos disponibles en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GaleriaEventos;