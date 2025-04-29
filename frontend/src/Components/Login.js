import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Asegúrate de que la ruta sea correcta
import { authFetch } from './utils/authFetch'; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authFetch('https://back-eventplace.onrender.com/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Guardar el token en localStorage
          localStorage.setItem('token', data.token);
          
          // Obtener los datos del usuario
          const userResponse = await authFetch('https://back-eventplace.onrender.com/student/profile');
          if (userResponse.ok) {
            const userData = await userResponse.json();
            // Actualizar el contexto de autenticación con los datos del usuario
            login(userData.data);
            navigate('/'); // Redirigir al usuario a la página principal
          } else {
            throw new Error('Error al obtener los datos del usuario');
          }
        } else {
          setError(data.message || 'Error al iniciar sesión');
        }
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
      console.error('Error de login:', err);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Iniciar Sesión</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Iniciar Sesión
        </Button>
      </Form>
      <p className="mt-3">
        ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </Container>
  );
};

export default Login;