import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

// export const verUsuarioPrimi = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/usuarioprimi`);
//     console.log(response);
//   } catch (error) {
//     console.error(error)
//   }
// }

export const registroUsuario = async (usuario) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/`, usuario);
    console.log(`Usuario recien añadido`,response);
  } catch (error) {
    console.error('ESTE ES EL ERROR',error);
    return error.response.data;
  }
}

export const inicioSesion = async (usuario) => {
  try{
    const response = await axios.post(`${API_URL}/inicio_sesion`, usuario);
    console.log(`Login correcto`,response);
    return response.data;
  } catch (error){
    console.error('No se ha podido iniciar sesion', error);
    return error.response.data;
  }
}

export const verRespuestas = async(preguntaId) =>{
  try{
    const response = await axios.get(`${API_URL}/preguntas/${preguntaId}/respuestas`);
    console.log(response);
    return response.data;
  }catch(error){
    console('No se ha podido',error);
    return error.response.data;
  }
    
} 

export const verPreguntas = async(testId) =>{
  try{
    const response = await axios.get(`${API_URL}/preguntas_en_test/${testId}`);
    console.log(response.data)
    return response.data;
  }catch(error){
    console('No se ha podido',error);
    return error.response.data;
  }
    
} 

export const verTests = async() =>{
  try{
    const response = await axios.get(`${API_URL}/tests_page`);
    return (response.data);
  }catch(error){
    console.log("No se han podido obtener los tests",error);
     return error.response;
  }
 
}
