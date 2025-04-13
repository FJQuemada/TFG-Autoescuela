import axios from 'axios';

const apiNoAuth = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const verUsuarioPrimi = async () => {
//   try {
//     const response = await api.get('usuarioprimi');
//     console.log(response);
//   } catch (error) {
//     console.error(error)
//   }
// }

export const registroUsuario = async (usuario) => {
  try {
    const response = await apiNoAuth.post('usuarios/', usuario);
    console.log(`Usuario recien añadido`,response);
  } catch (error) {
    console.error('ESTE ES EL ERROR',error);
    return error.response.data;
  }
}

export const inicioSesion = async (usuario) => {
  try{
    const response = await apiNoAuth.post('inicio_sesion', usuario);
    return response.data;
  } catch (error){
    console.error('No se ha podido iniciar sesion', error);
    return error.response.data;
  }
}

export const verRespuestas = async(preguntaId) =>{
  try{
    const response = await api.get(`preguntas/${preguntaId}/respuestas`);
    console.log(response);
    return response.data;
  }catch(error){
    console('No se ha podido',error);
    return error.response.data;
  }
    
} 

export const verPreguntas = async(testId) =>{
  try{
    const response = await api.get(`/preguntas_en_test/${testId}`);
    console.log(response.data)
    return response.data;
  }catch(error){
    console('No se ha podido',error);
    return error.response.data;
  }
    
} 

export const verTests = async() =>{
  try{
    const response = await api.get('tests_page');
    return (response.data);
  }catch(error){
    console.log("No se han podido obtener los tests",error);
     return error.response;
  }
 
}

// Crear una instancia de Axios para configuraciones específicas
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Tu URL base de la API
  withCredentials: true, // Importante para que se envíen cookies, como el refresh_token
});

// Interceptor para agregar el token a las solicitudes
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
    window.location.href = '/'; // Redirigir al login si no se pudo renovar el token
    return null;
  }
};

// Interceptor para manejar errores 401 (token expirado)
api.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Intentar renovar el token si es un error 401 (expiración del token)
      const nuevoAccessToken = await renovarAccessToken();
      if (nuevoAccessToken) {
        // Reintentar la solicitud original con el nuevo token
        error.config.headers['Authorization'] = `Bearer ${nuevoAccessToken}`;
        return axios(error.config); // Reintentar la solicitud original
      } else {
        // Si no se pudo renovar el token, redirigir a login
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Función para obtener el usuario "primi"
export const verUsuarioPrimi = async () => {
  try {
    const response = await api.get('usuarioprimi');
    console.log('Usuario primi:', response.data);
  } catch (error) {
    console.error('Error al obtener el usuario primi:', error);
  }
};
