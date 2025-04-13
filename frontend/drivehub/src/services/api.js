import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
  headers: {
      'Content-Type': 'application/json',
  },
});

export const registroUsuario = async (usuario) => {
  try {
    const response = await api.post('usuarios/', usuario);
    console.log(`Usuario recien añadido`,response);
  } catch (error) {
    console.error('ESTE ES EL ERROR',error);
    return error.response.data;
  }
}

export const inicioSesion = async (usuario) => {
  try{
    const response = await api.post('inicio_sesion', usuario);
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
