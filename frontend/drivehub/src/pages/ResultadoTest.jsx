import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { corregirTest } from '../services/api';

const Resu = () => {

  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [correccion, setCorreccion] = useState(null); // Estado para almacenar la corrección
  useEffect(() => {
      // Esta función se ejecuta solo una vez cuando el componente se monta
      const fetchCorreccion = async () => {
        try {
          const correccion = await corregirTest(testId, location.state.respuestasParaBackend); // Llamada a la API
          console.log("Corrección realizada:", correccion);
          setCorreccion(correccion); // Guardamos el resultado en el estado
        } catch (error) {
          console.error("Error al obtener correccion:", error);
        }
      };
  
      fetchCorreccion(); // Llamamos a la función para obtener las preguntas
    }, []); // Este efecto depende del id del test

  return (
    <div className="container">
      {correccion ? (
        <div>
          <h1 className="text-2xl font-bold">Resultado de la corrección</h1>
          <p>Tu puntuación es: {correccion.puntuacion}</p>
          <p>Comentarios: {correccion.comentarios}</p>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">Cargando resultado...</h1>
        </div>
      )}
    </div>
  );
}

export default Resu;