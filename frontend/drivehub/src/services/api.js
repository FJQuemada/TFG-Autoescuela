import axios from 'axios';
import { api, apiNoAuth } from './apiAuth'; // Importa la instancia de Axios que ya tiene configurado el interceptor

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
    return response;
  } catch (error){
    console.error('No se ha podido iniciar sesion', error);
    return error.response;
  }
}

export const cerrarSesion = async () => {
  try{
    // Eliminar el refresh token desde el backend
    const response = await api.post('cerrar_sesion');
    console.log('Sesion cerrada',response);
    window.location.href = '/'; // Redirigir a la página de inicio o login
  }catch(error){
    console.error('No se ha podido cerrar sesion',error);
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

// Función para obtener el usuario "primi"
export const verUsuarioPrimi = async () => {
  try {
    const response = await api.get('usuarioprimi');
    console.log('Usuario primi:', response.data);
  } catch (error) {
    console.error('Error al obtener el usuario primi:', error);
  }
};

export const corregirTest = async (testId, respuestas) => {
  try {
    const response = await api.post(`test/${testId}/correccion`, respuestas);
    console.log('Resultado de la corrección:', response.data);
    return response.data; // Devuelve el resultado de la corrección
  } catch (error) {
    console.error('Error al corregir el test:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
}

export const getStats = async () => {
  try {
    const response = await api.get('/get_stats');
    console.log('Estadísticas obtenidas:', response.data);
    return response.data; // Devuelve las estadísticas obtenidas
  } catch (error) {
    console.error('Error al obtener las estadísticas:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
}

export const getPreguntaAleatoria = async () => {
  try {
    const response = await api.get('/pregunta_aleatoria');
    console.log('Pregunta aleatoria obtenida:', response.data);
    return response.data; // Devuelve la pregunta aleatoria obtenida
  } catch (error) {
    console.error('Error al obtener la pregunta aleatoria:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
}

export const corregirPregunta = async (respuestaUsuario) => {
  try {
    const response = await api.post('/corregir_pregunta', respuestaUsuario);
    console.log('Resultado de la corrección de la pregunta:', response.data);
    return response.data; // Devuelve el resultado de la corrección
  } catch (error) {
    console.error('Error al corregir la pregunta:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
}

export const getRachaMaximaHistorica = async () => {
  try {
    const response = await api.get('/get_racha_maxima_historica');
    console.log('Racha máxima histórica obtenida:', response.data);
    return response.data; // Devuelve la racha máxima histórica obtenida
  } catch (error) {
    console.error('Error al obtener la racha máxima histórica:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
}

export const actualizarRachaMaximaHistorica = async (rachaMaxima) => {
  try {
    const response = await api.put('/actualizar_racha_maxima_historica', { racha_maxima: rachaMaxima });
    console.log('Racha máxima histórica actualizada:', response.data);
    return response.data; // Devuelve la racha máxima histórica actualizada
  } catch (error) {
    console.error('Error al actualizar la racha máxima histórica:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
}

export const getTestSuspenso = async () => {
  try {
    const response = await api.get('/get_test_suspenso');
    console.log('Test suspenso aleatorio obtenido:', response.data);
    return response.data; // Devuelve el test suspenso aleatorio obtenido
  } catch (error) {
    console.error('Error al obtener el test suspenso aleatorio:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
}