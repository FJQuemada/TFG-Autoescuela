import { verPreguntas } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Placeholder from "../assets/Placeholder.png"; 


const Test = () => {

  const navigate = useNavigate(); // Hook para navegar entre rutas

  const { testId } = useParams(); // Obtenemos el id del test de los parámetros de la URL

  const [preguntas, setPreguntas] = useState(null); // Estado para almacenar las preguntas
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  const [preguntaActual, setPreguntaActual] = useState(null); // Estado para almacenar la pregunta actual, como esta definido asi, al cambiar preguntaActual, se vuelve a renderizar el componente, haciendo asi que siempre este en constante renderizado
  const [indicePreguntaActual, setIndicePreguntaActual] = useState(0); // Estado para almacenar el índice de la pregunta actual
  const [respuestasSeleccionada, setRespuestasSeleccionada] = useState({}); //Estado para alamacenar las respuestas que vamos seleecionando

  const [imagenAmpliada, setImagenAmpliada] = useState(false);

  useEffect(() => {
    // Esta función se ejecuta solo una vez cuando el componente se monta
    const fetchPreguntas = async () => {
      localStorage.removeItem("testCorregido"); // Eliminar el booleano de localStorage
      try {
        const preguntas = await verPreguntas(testId); // Llamada a la API
        setPreguntas(preguntas); // Guardamos el resultado en el estado
        setPreguntaActual(preguntas[indicePreguntaActual]); // Guardamos la primera pregunta en el estado
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
      alert("Por favor, responde a todas las preguntas antes de finalizar el test.");
    }else{
      navigate(`/test/${testId}/resultado`, {
        state: { respuestasParaBackend,preguntas}
      });
    }
  };

  const handleRespuestasSeleccionada = (respuesta) => {
    //añade o actualiza, cada pregunta la respuesta que selecciona el usuario
    setRespuestasSeleccionada({
      ...respuestasSeleccionada,
      [preguntaActual.pregunta.fk_preg_pgte_pregunta__pk_preg_id]: respuesta,
    });
  };

  //object entries convierte el objeto en un array de pares clave-valor, y luego lo mapeamos para crear el nuevo array de objetos
  // En este caso, cada objeto tendrá la forma { pregunta_id: ..., respuesta_id: ... }
  const respuestasParaBackend = Object.entries(respuestasSeleccionada).map(([preguntaId, respuestaId]) => ({
    "pregunta_id": parseInt(preguntaId),
    "respuesta_id": respuestaId,
  }));

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
    return (
      respuestasSeleccionada[preguntaActual.pregunta.fk_preg_pgte_pregunta__pk_preg_id] === respuestaId
    );
  };

  // hasOwnProperty es un método que se utiliza para comprobar si un objeto tiene una propiedad específica. En este caso, estamos comprobando si el objeto respuestasSeleccionada tiene una propiedad con el id de la pregunta actual.
  // Por ejemplo, si el id de la pregunta actual es "123", entonces estamos comprobando si respuestasSeleccionada tiene una propiedad o key "123". Si la propiedad existe, significa que la pregunta ha sido respondida.
  const preguntaRespondida = (preguntaId) => {
    // Comprobamos si la pregunta ha sido respondida
    return respuestasSeleccionada.hasOwnProperty(preguntaId);
  };

  useEffect(() => {
    console.log("Pregunta actual actualizada:", respuestasSeleccionada);
  }, [respuestasSeleccionada]);

  const cambiarPreguntaPorIndice = (nuevoIndice) => {
    if (preguntas && nuevoIndice >= 0 && nuevoIndice < preguntas.length) {
      setIndicePreguntaActual(nuevoIndice);
      setPreguntaActual(preguntas[nuevoIndice]);
    }
  };

  const irAPreguntaAnterior = () => {
    cambiarPreguntaPorIndice(indicePreguntaActual - 1);
  };

  const irAPreguntaSiguiente = () => {
    cambiarPreguntaPorIndice(indicePreguntaActual + 1);
  };

  const displayPreguntas = (preguntas) => {
    return preguntas.map((pregunta, index) => {
      const respondida = preguntaRespondida(pregunta.pregunta.fk_preg_pgte_pregunta__pk_preg_id);
      const esActual = preguntaActual?.pregunta?.fk_preg_pgte_pregunta__pk_preg_id === pregunta.pregunta.fk_preg_pgte_pregunta__pk_preg_id;

      let backgroundColorClass = "bg-blue-200"; // Color por defecto

      if (respondida && esActual) {
        backgroundColorClass = "bg-amber-300"; // Si ya se respondió
      } else if (esActual) {
        backgroundColorClass = "bg-blue-500/70"; // Si es la pregunta actual y no respondida
      } else if (respondida) {
        backgroundColorClass = "bg-amber-500"; // Si ya se respondió
      }
      
      return (
        <div
          key={pregunta.pregunta.fk_preg_pgte_pregunta__pk_preg_id}
          className={`w-fit ${backgroundColorClass} flex p-7 rounded-xl cursor-pointer m-2`}
          onClick={() => {
            cambiarPreguntaPorIndice(index);
          }}
        >
          <h1>Pregunta {index + 1}</h1>{" "}
          
          {/* Aquí el pk de la pregunta lo dejo solo para debug */}
        </div>
      );
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">Cargando preguntas...</h1>
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
        {preguntas ? (
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-around">

              <img
                src={preguntaActual.pregunta.fk_preg_pgte_pregunta__preg_image}
                alt="Imagen de la pregunta"
                className="max-w-[500px] h-[350px] m-5 cursor-zoom-in"
                onClick={() => setImagenAmpliada(true)}
              />

              <div className="w-4/12 flex flex-col justify-center "> 
                <h1 className="text-2xl font-bold mb-4 dark:text-white">
                  {preguntaActual.pregunta.fk_preg_pgte_pregunta__preg_enunciado}
                </h1>
                  {preguntaActual.respuestas.map((respuesta,index) => (
                    // Ponemos A,B y C a las respuestas
                    <div
                      key={respuesta.pk_resp_id}
                      className="w-fit p-2 rounded-md m-1 cursor-pointer" 
                      onClick={() => handleRespuestasSeleccionada(respuesta.pk_resp_id)}>
                     <p className="font-semibold dark:text-white">{etiquetar(index)} 
                        <span className={` ${estaSeleccionada(respuesta.pk_resp_id) ? "bg-amber-300 dark:bg-amber-500/70":"bg-gray-300 dark:bg-gray-700"} w-fit p-2 rounded-md m-1 cursor-pointer`} >{respuesta.resp_contenido}</span>
                     </p>
                    </div>
                  ))}
                
                <div className="flex justify-between mt-4 w-3/4">
                  <button
                    onClick={irAPreguntaAnterior}
                    disabled={indicePreguntaActual === 0}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={irAPreguntaSiguiente}
                    disabled={indicePreguntaActual === preguntas.length - 1}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                  <button 
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer" 
                    onClick={() => {
                      // Aquí puedes manejar la lógica para finalizar el test
                      console.log("Test finalizado", respuestasSeleccionada);
                      // Redirigir a otra página o mostrar un mensaje de éxito
                      handleCorregirTest();
                      // console.log(respuestasParaBackend);
                    }}
                  >
                      Finalizar test
                  </button>
                </div>

              </div>

            </div>
            
            
            <div className="flex flex-wrap justify-center items-center align-middle">
              {displayPreguntas(preguntas)}
            </div>
          </div>
        ) : (
          <p>No se encontraron preguntas.</p>
        )}
        {imagenAmpliada && (
          <div
            className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
            onClick={() => setImagenAmpliada(false)}
          >
            <img
              src={preguntaActual.pregunta.fk_preg_pgte_pregunta__preg_image}
              alt="Imagen ampliada"
              className="max-w-[90%] max-h-[90%] object-contain cursor-zoom-out"
            />
          </div>
        )}
    </MainLayout>
  );
};

export default Test;
