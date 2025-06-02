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

    if (localStorage.getItem('testCorregido')) {
      localStorage.removeItem('testCorregido'); // Eliminar el booleano de localStorage
      // Si el test ya ha sido corregido, redirigir a la página de tests y evitar la corrección de nuevo
      navigate('/tests');
      return;
    }else{
      // Guardo en el localStorage el booleano de si el test ha sido corregido o no
      localStorage.setItem('testCorregido', true);
    }
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
    return preguntas.map((preguntaElement,index) =>{  
      // Buscamos la corrección correspondiente a la pregunta actual, aunque todas las preguntas van en orden, es mejor buscarla por si acaso
      let corregida = correccion.resultado_final.find((correccionElement) => correccionElement.pregunta_id === preguntaElement.pregunta.fk_preg_pgte_pregunta__pk_preg_id)
      return(
        <div key={corregida.pregunta_id} className='w-full flex justify-center items-center max-[768px]:flex-col-reverse'>
          <div className='w-1/2 p-2 max-[768px]:w-full'>
            {corregida.correcta ? (
              <div className='items-center mt-3'>
                <h2 className='bg-green-200 p-3 rounded-2xl dark:text-gray-800'><span className="text-green-500">✔️</span>{index + 1} {corregida.pregunta_enunciado}</h2>
              </div>
            ) : (
              <div className='items-center mt-3'>
                <h2 className='bg-red-200 p-3 rounded-2xl dark:text-gray-800'><span className="text-red-500">❌</span>{index + 1} {corregida.pregunta_enunciado}</h2>
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
              return <p key={respuesta.pk_resp_id} className={`${backgroundColor} rounded-md p-1 mt-1`}>{etiquetar(index)}<span className='p-2'>{respuesta.resp_contenido}</span></p>
            })}
          </div>
          <div className='p-2'>
            <img src={preguntaElement.pregunta.fk_preg_pgte_pregunta__preg_image} alt="palceholder" className='w-[200px] p-3' />
          </div>
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
      
      <div className="w-2/3 mx-auto mt-10 p-5 flex flex-col justify-around bg-white rounded-lg shadow-md dark:bg-[#30323a] dark:text-white">
        {correccion ? (
          <div className='flex flex-col justify-center items-center align-middle'>
            <h1 className="text-2xl font-bold  max-[768px]:text-center">Resultado de la corrección</h1>
            <p>Has acertado {correccion.preguntas_acertadas + " de " + correccion.preguntas_totales}</p>
            <p>Fallos: {correccion.preguntas_totales - correccion.preguntas_acertadas}</p>
            {(correccion.preguntas_totales - correccion.preguntas_acertadas) <= 3 ? (
              <p className="text-green-700 font-semibold  max-[768px]:text-center">¡Felicidades! Has aprobado el test.</p>
            ) : (
              <p className="text-red-700 font-semibold  max-[768px]:text-center">Lo siento, has suspendido el test.</p>
            )}
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