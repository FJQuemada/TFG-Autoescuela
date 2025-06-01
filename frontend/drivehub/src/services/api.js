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

export const getLogrosUsuario = async () => {
  try {
    const response = await api.get('/get_logros_usuario');
    console.log('Logros del usuario obtenidos:', response.data);
    return response.data; // Devuelve los logros del usuario obtenidos
  } catch (error) {
    console.error('Error al obtener los logros del usuario:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
}

export const getUltimaMedalla = async () => {
  try {
    const response = await api.get('/get_ultimo_logro_usuario');
    console.log('Última medalla obtenida:', response.data);
    return response.data; // Devuelve la última medalla obtenida
  } catch (error) {
    console.error('Error al obtener la última medalla:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
}

export const getRankingUsers = async () => {
  try {
    const response = await api.get('/get_ranking_users');
    console.log('Ranking de usuarios obtenido:', response.data);
    return response.data; // Devuelve el ranking de usuarios obtenido
  } catch (error) {
    console.error('Error al obtener el ranking de usuarios:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
}

/**
 * FORO
 */

export const getForoPosts = async () => {
  try {
    const response = await api.get('/posts_foro');
    console.log('Posts del foro obtenidos:', response.data);
    return response.data; // Devuelve los posts del foro obtenidos
  } catch (error) {
    console.error('Error al obtener los posts del foro:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
}

export const postForoPost = async (titulo,contenido) => {
  try {
    const response = await api.post('/posts_foro', {pofr_titulo: titulo,
      pofr_contenido: contenido});  //lo paso directamente asi para no tener que diseccionar el objeto en el backend
    console.log('Post del foro creado:', response.data);
    return response.data; // Devuelve el post del foro creado
  } catch (error) {
    console.error('Error al crear el post del foro:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
}

export const getForoPostById = async (id) => {
  try {
    const response = await api.get(`/posts_foro/${id}`); // Asegúrate que esta ruta existe en tu backend
    console.log('Post del foro creado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el post:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
};

export const getRespuestasByPostId = async (postId) => {
  try{
    const response = await api.get(`/respuestas_post_foro/${postId}`);
    console.log('Respuestas del post obtenidas:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las respuestas del post:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
};

export const postRespuestaByPostId = async (postId, contenido) => {
  try {
    const response = await api.post(`/respuestas_post_foro/${postId}`, { refe_contenido: contenido });
    console.log('Respuesta del post creada:', response.data);
    return response.data; // Devuelve la respuesta del post creada
  } catch (error) {
    console.error('Error al crear la respuesta del post:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
};