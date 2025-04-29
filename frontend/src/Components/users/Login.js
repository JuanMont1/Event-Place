import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import udecLogo from '../../archivos/img/logoyu.png';
import '../../styles/Login.css';

const Login = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emailHistory, setEmailHistory] = useState([]);
  const navigate = useNavigate();

  // Cargar historial de correos al montar el componente
  useEffect(() => {
    const savedEmails = JSON.parse(localStorage.getItem('emailHistory')) || [];
    setEmailHistory(savedEmails);
    
    // Si hay correos guardados, poner el último usado como valor predeterminado
    
  }, []);

  const handleRegisterClick = () => {
    setFadeOut(true);
    setTimeout(() => navigate('/register'), 500); 
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      console.log("Iniciando sesión con Google...");
      setTimeout(() => {
        navigate('/MisSuscripciones');
      }, 1000);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setError("Ocurrió un error al iniciar sesión con Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://back-eventplace.onrender.com/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const ApiRespuesta = await response.json();

      if (response.ok) {
        // Guardar token y actualizar historial de correos
        localStorage.setItem('token', ApiRespuesta.data.token);
        
       
        const updatedHistory = [
          email,
          ...emailHistory.filter(e => e !== email)
        ].slice(0, 5); // Limitar a 5 correos recientes
        
        localStorage.setItem('emailHistory', JSON.stringify(updatedHistory));
        setEmailHistory(updatedHistory);
        
        navigate('/perfil');
      } else {
        setError(ApiRespuesta.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`login-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="login-box">
        <img src={udecLogo} alt="Logo UdeC" className="login-logo" />
        <h1 className="login-title"> ¡Los eventos te esperan! </h1>
        <p className="login-subtitle">
          Bienvenido al sistema de eventos de la Universidad de Cundinamarca
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Correo institucional</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="usuario@ucundinamarca.edu.co" 
            required
            list="emailHistory"
          />
          <datalist id="emailHistory">
            {emailHistory.map((email, index) => (
              <option key={index} value={email} />
            ))}
          </datalist>

          <label>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="********" 
            required 
          />

          <button type="submit" className="login-btn">
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>

        <p className="forgot-password">
          ¿Olvidaste tu contraseña? <button>Recupérala aquí</button>
        </p>

        <div className="divider">_________________ o ________________</div>

        <button onClick={handleGoogleLogin} className="google-btn" disabled={isLoading}>
          {isLoading ? (
            "Cargando..."
          ) : (
            <>
              <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="Google" 
                className="google-icon" 
              />
              Iniciar sesión con Google
            </>
          )}
        </button>

        <p className="register">
          ¿No tienes cuenta? 
          <button onClick={handleRegisterClick} style={{ cursor: 'pointer' }}>
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;