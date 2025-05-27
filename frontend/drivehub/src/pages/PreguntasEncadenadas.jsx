import { verPreguntas,  corregirTest, getPreguntaAleatoria } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Placeholder from "../assets/Placeholder.png"; 


const Test = () => {

  const navigate = useNavigate(); // Hook para navegar entre rutas

  const [pregunta, setPregunta] = useState(null); // Estado para almacenar las preguntas
  const [respuesta, setRespuesta] = useState(null); // Estado para almacenar la respuesta
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null); //Estado para alamacenar las respuestas que vamos seleecionando

  useEffect(() => {
    // Esta función se ejecuta solo una vez cuando el componente se monta
    const fetchPreguntas = async () => {
 
      try {
        const pregunta = await getPreguntaAleatoria(); // Llamada a la API
        setPregunta(pregunta); // Guardamos el resultado en el estado
        console.log(pregunta);
        setLoading(false); // Cambiamos el estado de carga
      } catch (error) {
        console.error("Error al obtener las preguntas:", error);
        setLoading(false);
      }
    };

    fetchPreguntas(); // Llamamos a la función para obtener las preguntas
  }, []); // Este efecto depende del id del test

  const handleCorregirTest = async () => {
    if (respuestasParaBackend.length < preguntas.length) {
      console.log("contesta todas las preguntas antes");
    }else{
      navigate(`/test/${testId}/resultado`, {
        state: { respuestasParaBackend,preguntas}
      });
    }
  };

  const handleRespuestasSeleccionada = (respuesta) => {
    //añade o actualiza, cada pregunta la respuesta que selecciona el usuario
    setRespuestaSeleccionada(respuesta);
  };

  //object entries convierte el objeto en un array de pares clave-valor, y luego lo mapeamos para crear el nuevo array de objetos
  // En este caso, cada objeto tendrá la forma { pregunta_id: ..., respuesta_id: ... }


  const etiquetar = (index) =>{
    if (index === 0){
      return "A";
    }else if (index === 1){
      return "B";
    }else if (index === 2){
      return "C";
    }
  }

  const estaSeleccionada = (respuestaId) => {
    // Comprobamos si la respuesta seleccionada es la misma que la respuesta actual
    return (respuestaSeleccionada === respuestaId);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">Cargando pregunta aleatoria...</h1>
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
        {pregunta ? (
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-around">

              <img src={Placeholder} alt="Placeholder" className='w-1/4 m-5' />

              <div className="w-4/12 flex flex-col justify-center m-5"> 
                <h1 className="text-2xl font-bold mb-4">
                  {pregunta.pregunta.preg_enunciado}
                </h1>
                  {pregunta.respuestas.map((respuesta,index) => (
                    // Ponemos A,B y C a las respuestas
                    <div
                      key={respuesta.pk_resp_id}
                      className="w-fit p-2 rounded-md m-1 cursor-pointer" 
                      onClick={() => handleRespuestasSeleccionada(respuesta.pk_resp_id)}>
                     <p className="font-semibold">{etiquetar(index)} 
                        <span className={` ${estaSeleccionada(respuesta.pk_resp_id) ? "bg-amber-300":"bg-green-400"} w-fit p-2 rounded-md m-1 cursor-pointer`} >{respuesta.resp_contenido}</span>
                     </p>
                    </div>
                  ))}
                
                <div className="flex justify-between mt-4 w-3/4">
                  <button 
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer" 
                    onClick={() => {
                      // Aquí puedes manejar la lógica para finalizar el test
                      console.log("Test finalizado", respuestasSeleccionada);
                    }}>
                      Finalizar test
                  </button>
                </div>

              </div>

            </div>
          </div>
        ) : (
          <p>No se encontraron preguntas.</p>
        )}
    </MainLayout>
  );
};

export default Test;
