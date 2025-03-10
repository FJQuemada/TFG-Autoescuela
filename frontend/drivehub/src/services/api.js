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