import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

export const verDificultades = async () => {
  try {
    const response = await axios.get(`${API_URL}/dificultad`)
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
    console.error(error)
  }
}
