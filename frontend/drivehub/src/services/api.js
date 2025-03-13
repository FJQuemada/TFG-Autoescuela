import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

export const verUsuarioPrimi = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuarioprimi`)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

export const registroUsuario = async (usuario) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/`, usuario)
    console.log(`Usuario recien añadido`,response)
  } catch (error) {
    console.error('ESTE ES EL ERROR',error)
    return error.response.data
  }
}
