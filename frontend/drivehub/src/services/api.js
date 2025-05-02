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
    const response = await api.post(`tests/${testId}/correccion`, respuestas);
    console.log('Resultado de la corrección:', response.data);
    return response.data; // Devuelve el resultado de la corrección
  } catch (error) {
    console.error('Error al corregir el test:', error);
    return error.response.data; // Devuelve el error si ocurre
  }
}
