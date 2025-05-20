import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { corregirTest } from '../services/api';

const Resultados = () => {

  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [correccion, setCorreccion] = useState(null); // Estado para almacenar la corrección
  const [preguntas, setPreguntas] = useState(location.state.preguntas); // Estado para almacenar las preguntas

  useEffect(() => {
      // Esta función se ejecuta solo una vez cuando el componente se monta
      const fetchCorreccion = async () => {
        try {
          setPreguntas(location.state.preguntas); // Guardamos las preguntas en el estado
          const correccion = await corregirTest(testId, location.state.respuestasParaBackend); // Llamada a la API
          console.log("Corrección realizada:", correccion);
          setCorreccion(correccion); // Guardamos el resultado en el estado
          console.log("Pregunatas:", preguntas);
        } catch (error) {
          console.error("Error al obtener correccion:", error);
        }
      };
  
      fetchCorreccion(); // Llamamos a la función para obtener las preguntas
    }, []); // Este efecto depende del id del test


  const displaySolucion = (preguntas,correccion) => {
    return preguntas.map((preguntaElement) =>{
      let corregida = correccion.resultado_final.find((correccionElement) => correccionElement.pregunta_id === preguntaElement.pregunta.fk_preg_pgte_pregunta__pk_preg_id)
      console.log("encontrado",corregida);

      return(
        <div key={corregida.pregunta_id} >
          {corregida.correcta ? (
            <div className='flex items-center'>
              <h1 className='bg-green-200 p-3 rounded-2xl'><span className="text-green-500">✔️</span>{corregida.pregunta_enunciado}</h1>
            </div>
          ) : (
            <div className='flex items-center'>
              <h1 className='bg-red-200 p-3 rounded-2xl'><span className="text-red-500">❌</span>{corregida.pregunta_enunciado}</h1>
            </div>
          )}
          
          {preguntaElement.respuestas.map((respuesta,index)=>{

            let backgroundColor = '';

            if (corregida.correcta && respuesta.pk_resp_id == corregida.respuesta_usuario_id){
              backgroundColor = 'bg-green-500';
            }else if(!corregida.correcta){
              if(respuesta.pk_resp_id == corregida.respuesta_usuario_id){
                backgroundColor = 'bg-red-500';
              }

              if(respuesta.pk_resp_id == corregida.respuesta_correcta_id){
                backgroundColor = 'bg-green-500';
              }
              
            }else{
              backgroundColor = '';
            }
            return <p key={respuesta.pk_resp_id} className={`${backgroundColor} w-full`}>{etiquetar(index) + ' ' + respuesta.resp_contenido}</p>
          })}
        </div>
      );
    })  

    };

  const etiquetar = (index) =>{
    if (index === 0){
      return "A";
    }else if (index === 1){
      return "B";
    }else if (index === 2){
      return "C";
    }
  }

  return (
    <MainLayout>
      
      <div className="">
        {correccion ? (
          <div className='w-full'>
            <h1 className="text-2xl font-bold">Resultado de la corrección</h1>
            <p>Has acertado {correccion.preguntas_acertadas + " de " + correccion.preguntas_totales}</p>
            <p>Fallos: {correccion.preguntas_totales - correccion.preguntas_acertadas}</p>
            {displaySolucion(preguntas,correccion)}
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <h1 className="text-2xl font-bold">Cargando resultado...</h1>
          </div>
        )}
      </div>
    </MainLayout>
  );
}


export default Resultados;