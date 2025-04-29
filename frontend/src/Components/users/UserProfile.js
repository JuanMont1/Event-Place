import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/UserProfile.css";
import {
  FaCalendarAlt, FaUsers, FaTicketAlt, FaGraduationCap,
  FaArrowLeft, FaSignOutAlt, FaEnvelope, FaCalendarCheck, FaClock,
  FaHistory, FaTrophy, FaChartBar, FaBuilding
} from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { authFetch } from '../utils/authFetch';
import { useAuth } from '../context/AuthContext';

// componentes dentro perfil
const TarjetaEvento = React.memo(({ evento, manejarDesuscripcion, manejarSuscripcion }) => {
  const navigate = useNavigate();
  
  return (
    <div className="tarjeta-evento">
      <div className="evento-imagen" style={{ backgroundImage: `url(${evento.imagen})` }}></div>
      <div className="evento-contenido">
        <h3>{evento.nombre}</h3>
        <p><FaCalendarAlt /> {evento.fecha}</p>
        <p><FaGraduationCap /> {evento.categoria}</p>
        <p><FaUsers /> <strong>{Object.keys(evento.suscripciones || {}).length}</strong> suscriptores</p>
        <p><FaTicketAlt /> <strong>{evento.cuposDisponibles}</strong> cupos</p>
        <p className="evento-descripcion">{evento.descripcion}</p>
        <div className="evento-acciones">
          {manejarDesuscripcion && (
            <button onClick={() => manejarDesuscripcion(evento.id)} className="btn-desuscribir">
              Cancelar Suscripción
            </button>
          )}
          {manejarSuscripcion && (
            <button onClick={() => manejarSuscripcion(evento.id)} className="btn-suscribir">
              Suscribirse
            </button>
          )}
          <button onClick={() => navigate(`/foro/${evento.id}`)} className="btn-foro">
            Ir al Foro
          </button>
        </div>
      </div>
    </div>
  );
});

const UserProfile = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth(); 

  const [userData, setUserData] = useState({
    email: "",
    name: "",
    program: "",
    rol: "",
    photoURL: "https://via.placeholder.com/150",
    faculty: "",
    intereses: [],
    logros: []
  });
  const [suscripciones, setSuscripciones] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [logros, setLogros] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // datos de usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authFetch('https://back-eventplace.onrender.com/student/profile');
        if (!response.ok) throw new Error('Failed to fetch user data');
        
        const data = await response.json();
        if (data.success) {
          setUserData({
            email: data.data.email || "",
            name: data.data.name || "",
            program: data.data.program || "",
            rol: data.data.rol || "Estudiante",
            photoURL: data.data.photoURL || "https://via.placeholder.com/150",
            faculty: data.data.faculty || "",
            intereses: data.data.intereses || [],
            logros: data.data.logros || []
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fetch suscripciones
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await authFetch('https://back-eventplace.onrender.com/student/subscriptions');
        if (!response.ok) throw new Error('error al suscribirse');
        
        const data = await response.json();
        if (data.success) {
          setSuscripciones(data.data || []);
        }
      } catch (err) {
        console.error("Error al obtener suscripciones:", err);
        
        setSuscripciones([
          {
            id: "evento1",
            nombre: "Conferencia de IA",
            fecha: "2023-11-15",
            categoria: "Tecnologico",
            imagen: "https://media.licdn.com/dms/image/v2/C5612AQGbvv_Zj5JQ1w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1551108267663?e=2147483647&v=beta&t=uau57Gh-xmNbI30zoJ5FHU3tvWHjKyGhaz6uxuN5Rjc",
            descripcion: "Aprende sobre inteligencia artificial",
            cuposDisponibles: 20,
            facultad: "Ingeniería",
            suscripciones: {}
          }
        ]);
      }
    };

    fetchSubscriptions();
  }, []);

  // eventos disponibles
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await authFetch('https://media.licdn.com/dms/image/v2/C5612AQGbvv_Zj5JQ1w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1551108267663?e=2147483647&v=beta&t=uau57Gh-xmNbI30zoJ5FHU3tvWHjKyGhaz6uxuN5Rjcs');
        if (!response.ok) throw new Error('Failed to fetch events');
        
        const data = await response.json();
        if (data.success) {
          setEventos(data.data || []);
        }
      } catch (err) {
        console.error("Error al obtener eventos:", err);
        
        setEventos([
          {
            id: "evento1",
            nombre: "Conferencia de IA",
            fecha: "2023-11-15",
            categoria: "Tecnologico",
            imagen: "https://media.licdn.com/dms/image/v2/C5612AQGbvv_Zj5JQ1w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1551108267663?e=2147483647&v=beta&t=uau57Gh-xmNbI30zoJ5FHU3tvWHjKyGhaz6uxuN5Rjc",
            descripcion: "Aprende sobre inteligencia artificial",
            cuposDisponibles: 20,
            facultad: "Ingeniería",
            suscripciones: {}
          },
          {
            id: "evento2",
            nombre: "Taller de Pintura",
            fecha: "2023-12-01",
            categoria: "Artistico",
            imagen: "https://media.licdn.com/dms/image/v2/C5612AQGbvv_Zj5JQ1w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1551108267663?e=2147483647&v=beta&t=uau57Gh-xmNbI30zoJ5FHU3tvWHjKyGhaz6uxuN5Rjc",
            descripcion: "Expresa tu creatividad",
            cuposDisponibles: 15,
            facultad: "Artes",
            suscripciones: {}
          }
        ]);
      }
    };

    fetchEvents();
  }, []);

  // fetch logros
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await authFetch('https://back-eventplace.onrender.com/student/achievements');
        if (!response.ok) throw new Error('Failed to fetch achievements');
        
        const data = await response.json();
        if (data.success) {
          setLogros(data.data || []);
        }
      } catch (err) {
        console.error("Error al obtener logros:", err);
        
        setLogros([
          { id: "evento1", nombre: "Primer evento", descripcion: "Asististe a tu primer evento", icono: "🥇" },
          { id: "evento3", nombre: "Tecnólogo", descripcion: "Participaste en 3 eventos tecnológicos", icono: "💻" }
        ]);
      }
    };

    fetchAchievements();
  }, []);

  // suscripcion eventos
  const manejarSuscripcion = useCallback(async (eventoId) => {
    try {
      const response = await authFetch(`https://back-eventplace.onrender.com/events/${eventoId}/subscribe`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSuscripciones(prev => [...prev, eventos.find(e => e.id === eventoId)]);
        }
      }
    } catch (err) {
      console.error("Error al suscribirse a un evento:", err);
      
      setSuscripciones(prev => {
        const yaEstabaSuscrito = prev.some(e => e.id === eventoId);
        if (yaEstabaSuscrito) return prev;
        const nuevoEvento = eventos.find(e => e.id === eventoId);
        return nuevoEvento ? [...prev, nuevoEvento] : prev;
      });
    }
  }, [eventos]);

  // desuscribirse eventos
  const manejarDesuscripcion = useCallback(async (eventoId) => {
    try {
      const response = await authFetch(`https://back-eventplace.onrender.com/events/${eventoId}/unsubscribe`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSuscripciones(prev => prev.filter(e => e.id !== eventoId));
        }
      }
    } catch (err) {
      console.error("Error al desuscribirse:", err);
      
      setSuscripciones(prev => prev.filter(e => e.id !== eventoId));
    }
  }, []);

  // cerrar sesion
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  // perfil guardado


// Modifica tu handleSaveProfile para actualizar el contexto
const handleSaveProfile = useCallback(async () => {
  try {
    const response = await authFetch('https://back-eventplace.onrender.com/student/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        intereses: userData.intereses
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        setUserData(prev => ({ ...prev, name: newName }));
        setEditMode(false);
        // Actualiza el contexto de autenticación
        updateUser({ name: newName });
      }
    }
  } catch (err) {
    console.error("Error actualizar perfil:", err);
    setUserData(prev => ({ ...prev, name: newName }));
    setEditMode(false);
    updateUser({ name: newName });
  }
}, [newName, userData.intereses, updateUser]);
  // intereses
  const toggleInteres = useCallback((interes) => {
    setUserData(prev => ({
      ...prev,
      intereses: prev.intereses.includes(interes)
        ? prev.intereses.filter(i => i !== interes)
        : [...prev.intereses, interes]
    }));
  }, []);

  // consultar eventos recomendados
  const eventosRecomendados = useMemo(() => {
    if (userData.intereses.length === 0) return eventos.slice(0, 3);
    
    return eventos.filter(evento => 
      userData.intereses.includes(evento.categoria) && 
      !suscripciones.some(e => e.id === evento.id)
    ).slice(0, 3);
  }, [userData.intereses, eventos, suscripciones]);

  // consultar estadisticas de participación
  const estadisticasParticipacion = useMemo(() => (
    suscripciones.reduce((acc, evento) => {
      acc[evento.categoria] = (acc[evento.categoria] || 0) + 1;
      return acc;
    }, {})
  ), [suscripciones]);

  if (loading) return <div className="loading">Cargando perfil...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-profile">
      <header className="profile-header">
        <button onClick={() => navigate('/')} className="back-link">
          <FaArrowLeft /> Volver
        </button>
        <h1>Perfil de Usuario</h1>
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </header>

      <main className="profile-content">
        <section className="user-info">
          <div className="user-avatar">
            <img src={userData.photoURL} alt="Foto de perfil" className="profile-image" />
          </div>
          <div className="user-details">
            {editMode ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="edit-name-input"
                placeholder="Nuevo nombre"
              />
            ) : (
              <h2>{userData.name}</h2>
            )}
            <p className="user-role"><FaGraduationCap /> {userData.rol}</p>
            <p className="user-email"><FaEnvelope /> {userData.email}</p>
            <p className="user-faculty"><FaBuilding /> {userData.program || 'No especificado'}</p>
            <p className="user-faculty"><FaBuilding /> {userData.faculty || 'No especificada'}</p>
            {editMode ? (
              <button onClick={handleSaveProfile} className="save-btn">Guardar Cambios</button>
            ) : (
              <button onClick={() => {
                setEditMode(true);
                setNewName(userData.name);
              }} className="edit-btn">Editar Perfil</button>
            )}
          </div>
          <div className="user-interests">
            <h3>Intereses</h3>
            <div className="interest-tags">
              {['Académico', 'Cultural', 'Deportivo', 'Tecnologico', 'Artistico'].map(interes => (
                <button
                  key={interes}
                  className={`interest-tag ${userData.intereses.includes(interes) ? 'active' : ''}`}
                  onClick={() => toggleInteres(interes)}
                >
                  {interes}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="user-stats">
          <div className="stat-item">
            <FaCalendarCheck />
            <span>{suscripciones.length}</span>
            <p>Eventos Suscritos</p>
          </div>
          <div className="stat-item">
            <FaClock />
            <span>{suscripciones.filter(e => new Date(e.fecha) > new Date()).length}</span>
            <p>Eventos Próximos</p>
          </div>
          <div className="stat-item">
            <FaHistory />
            <span>{suscripciones.filter(e => new Date(e.fecha) <= new Date()).length}</span>
            <p>Eventos Pasados</p>
          </div>
        </section>

        <section className="eventos-suscritos">
          <h2>Eventos Suscritos</h2>
          <div className="eventos-grid">
            {suscripciones.length > 0 ? (
              suscripciones.map((evento) => (
                <TarjetaEvento
                  key={evento.id}
                  evento={evento}
                  manejarDesuscripcion={manejarDesuscripcion}
                />
              ))
            ) : (
              <p className="no-eventos">No estás suscrito a ningún evento.</p>
            )}
          </div>
        </section>

        <section className="user-achievements">
          <h2><FaTrophy /> Logros</h2>
          <div className="achievements-grid">
            {logros.map(logro => (
              <div key={logro.id} className={`achievement-item ${userData.logros.includes(logro.id) ? 'obtenido' : 'bloqueado'}`}>
                <span className="logro-icono">{logro.icono}</span>
                <p className="logro-nombre">{logro.nombre}</p>
                <p className="logro-descripcion">{logro.descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="estadisticas-participacion">
          <h2><FaChartBar /> Estadísticas de Participación</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.entries(estadisticasParticipacion).map(([name, value]) => ({ name, value }))}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="eventos-recomendados">
          <h2>Eventos Recomendados</h2>
          <div className="eventos-grid">
            {eventosRecomendados.length > 0 ? (
              eventosRecomendados.map((evento) => (
                <TarjetaEvento
                  key={evento.id}
                  evento={evento}
                  manejarSuscripcion={manejarSuscripcion}
                />
              ))
            ) : (
              <p className="no-eventos">No hay eventos recomendados disponibles.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;