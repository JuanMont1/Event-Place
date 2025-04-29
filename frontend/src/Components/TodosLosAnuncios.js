import React, { useState, useEffect } from 'react';
import { FaBullhorn, FaCalendarAlt, FaUsers, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/TodosLosAnuncios.css';

const TodosLosAnuncios = () => {
  const [anuncios, setAnuncios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnunciosSimulados = async () => {
      const dataSimulada = [
        {
          id: '1',
          titulo: 'Cambio de Horarios',
          descripcion: 'Los horarios del segundo semestre han sido actualizados.',
          tipo: 'calendario',
          fecha: new Date().toISOString()
        },
        {
          id: '2',
          titulo: 'Voluntariado Ambiental',
          descripcion: 'Únete a la jornada de reforestación este fin de semana.',
          tipo: 'voluntarios',
          fecha: new Date().toISOString()
        },
        {
          id: '3',
          titulo: 'Festival Cultural',
          descripcion: 'Música, arte y gastronomía en el campus principal.',
          tipo: 'evento',
          fecha: new Date().toISOString()
        },
        {
          id: '4',
          titulo: 'Semana de la Ciencia',
          descripcion: 'Conferencias y actividades para fomentar la investigación.',
          tipo: 'evento',
          fecha: new Date().toISOString()
        }
      ];

      // Simula latencia de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnuncios(dataSimulada);
    };

    fetchAnunciosSimulados();
  }, []);

  const getIcono = (tipo) => {
    switch (tipo) {
      case 'evento': return <FaBullhorn />;
      case 'calendario': return <FaCalendarAlt />;
      case 'voluntarios': return <FaUsers />;
      default: return <FaBullhorn />;
    }
  };

  const formatearFecha = (fecha) => {
    const parsedDate = new Date(fecha);
    return isNaN(parsedDate.getTime()) ? 'Fecha inválida' : parsedDate.toLocaleDateString();
  };

  return (
    <div className="todos-los-anuncios">
      <div className="anuncios-header">
        <button className="btn-volver" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver
        </button>
        <h1>Todos los Anuncios</h1>
      </div>
      <div className="anuncios-container">
        <div className="anuncios-grid">
          {anuncios.map((anuncio) => (
            <div key={anuncio.id} className="anuncio-card">
              <div className="anuncio-icono">{getIcono(anuncio.tipo)}</div>
              <div className="anuncio-contenido">
                <h3>{anuncio.titulo}</h3>
                <p>{anuncio.descripcion}</p>
                <span className="anuncio-fecha">{formatearFecha(anuncio.fecha)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodosLosAnuncios;
