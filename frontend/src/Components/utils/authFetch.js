export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token'); // Obtener token del localStorage
  
    // Configurar cabeceras con el token (si existe)
    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }), 
    };
  
    const response = await fetch(url, {
      ...options,
      headers,
    });
  
    return response;
  };