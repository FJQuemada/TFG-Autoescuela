import axios from 'axios';

// Crear una instancia de Axios para configuraciones específicas sin autenticación
// (por ejemplo, para el registro y el inicio de sesión)
export const apiNoAuth = axios.create({
    baseURL: 'http://localhost:8000/api/',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

// Crear una instancia de Axios para configuraciones específicas
export const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Tu URL base de la API
    withCredentials: true, // Importante para que se envíen cookies, como el refresh_token
  });
  
// Interceptor para agregar el token a las solicitudes
// https://axios-http.com/docs/interceptors
// frontend --> interceptor --> backend
api.interceptors.request.use(
(config) => {
    const access_token = localStorage.getItem('access_token'); // Obtener el token de localStorage
    if (access_token) {
    config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
},
(error) => Promise.reject(error)
);

//Este interceptor es una funcion que se ejecuta al recibir una respuesta de la API
// Interceptor para manejar errores 401 que vienen del backend, como token expirado
// backend --> interceptor --> frontend
api.interceptors.response.use(
response => response,
async (error) => {  // error.config contiene la configuración de la solicitud original que falló, para volver a intentarla
    if (error.response && error.response.status === 401) {
    // Intentar renovar el token si es un error 401 (expiración del token)
    const nuevoAccessToken = await renovarAccessToken();
    if (nuevoAccessToken) {
        // Reintentar la solicitud original con el nuevo token
        error.config.headers['Authorization'] = `Bearer ${nuevoAccessToken}`;
        return axios(error.config); // Reintentar la solicitud original
    } else {
        // Eliminar el token de localStorage si no se pudo renovar
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        // Eliminar el refresh token desde el backend
        await api.post('cerrar_sesion');
    }
    }
    return Promise.reject(error);
}
);

// Función para renovar el access token
const renovarAccessToken = async () => {
try {
    const response = await api.post('/renovar_access_token/'); // Llamar al endpoint para renovar el token
    const newAccessToken = response.data.access_token;
    // No necesitamos obtener ni guardar un nuevo refresh token aquí
    // El backend ya habrá actualizado la cookie si la lógica lo requiere

    // Almacenar el nuevo access token
    localStorage.setItem('access_token', newAccessToken);

    return newAccessToken;
} catch (error) {
    console.error('Error al renovar el token', error);
    return null;
}
};
  
 