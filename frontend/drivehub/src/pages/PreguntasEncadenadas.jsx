import { getPreguntaAleatoria, corregirPregunta, getRachaMaximaHistorica, actualizarRachaMaximaHistorica } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { UseUser } from "../contexts/UserContext"; // Importamos el contexto del usuario
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Placeholder from "../assets/Placeholder.png"; 


const Test = () => {

  const { rachaMaximaHistorica, setRachaMaximaHistorica } = UseUser(); // Hook para acceder al contexto del usuario y su racha máxima

  const [pregunta, setPregunta] = useState(null); // Estado para almacenar las preguntas
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const [imagenAmpliada, setImagenAmpliada] = useState(false);

  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null); //Estado para alamacenar las respuestas que vamos seleecionando

  const [preguntaCorregida, setPreguntaCorregida] = useState();

  const [rachaAciertos, setRachaAciertos] = useState(0); // Estado para almacenar los aciertos
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

    const rachaMaximaUser = async () => {
      try {
        const rachaMaxima = await getRachaMaximaHistorica(); // Llamada a la API para obtener la racha máxima histórica
        setRachaMaximaHistorica(rachaMaxima.racha_maxima); // Guardamos la racha máxima histórica en el estado
      } catch (error) {
        console.error("Error al obtener la racha máxima histórica:", error);
      }
    }

    fetchPreguntas(); // Llamamos a la función para obtener las preguntas
    rachaMaximaUser(); // Llamamos a la función para obtener la racha máxima histórica

  }, []); // Este efecto depende del id del test

  const handleCorregirPregunta = async () => {
    if (respuestaSeleccionada === null) {
      console.log("Selecciona una respuesta antes de corregir");
      alert("Selecciona una respuesta antes de corregir");
    } else {
      try {
        if (preguntaCorregida) {
          // Si ya hemos corregido la pregunta, volvemos a cargar una nueva pregunta
          const nuevaPregunta = await getPreguntaAleatoria();
          setPregunta(nuevaPregunta);
          setPreguntaCorregida(null); // Reseteamos la corrección
          setRespuestaSeleccionada(null); // Reseteamos la respuesta seleccionada
        }else{
          const respuestaUsuario = {
            pregunta_id: pregunta.pregunta.pk_preg_id,
            respuesta_id: respuestaSeleccionada,
          };
          const pregunta_corregida = await corregirPregunta(respuestaUsuario);
          setPreguntaCorregida(pregunta_corregida);
          if (pregunta_corregida.es_correcta) {
            const nuevaRacha = rachaAciertos + 1;
            setRachaAciertos(nuevaRacha); // Incrementamos la racha de aciertos
            if (nuevaRacha > rachaMaximaHistorica) {
              // Si la racha de aciertos actual es mayor que la racha máxima histórica, la actualizamos
              await actualizarRachaMaximaHistorica(nuevaRacha); // llamada a la API para actualizar la racha máxima histórica pq hay una nueva
              setRachaMaximaHistorica(nuevaRacha); // Actualizamos el estado de la racha máxima histórica
            }
          }else {
            console.log("Respuesta incorrecta");
            if (rachaAciertos > rachaMaximaHistorica) {
              // Si la racha de aciertos actual es mayor que la racha máxima histórica, la actualizamos
              await actualizarRachaMaximaHistorica(rachaAciertos); // llamada a la API para actualizar la racha máxima histórica pq hay una nueva
              setRachaMaximaHistorica(rachaAciertos); // Actualizamos el estado de la racha máxima histórica
            }
            console.log("Racha máxima histórica actualizada:", rachaMaximaHistorica);
            setRachaAciertos(0); // Reseteamos la racha de aciertos si la respuesta es incorrecta
            
          }
          
        }
      } catch (error) {
        console.error("Error al corregir la pregunta:", error);
      }
    }
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

  const estaSeleccionada = (respuestaId) => {
    // Comprobamos si la respuesta seleccionada es la misma que la respuesta actual
    return (respuestaSeleccionada === respuestaId);
  };

  const respuestasDisplay = (respuestas) =>{
    return(
      respuestas.map((respuesta,index) => {
        // Ponemos A,B y C a las respuestas
        return(
          <div key={respuesta.pk_resp_id} className="w-fit p-2 rounded-md m-1 cursor-pointer" onClick={() => setRespuestaSeleccionada(respuesta.pk_resp_id)}>
            <p className="font-semibold dark:text-white">{etiquetar(index)} 
                <span className={` ${estaSeleccionada(respuesta.pk_resp_id) ? "bg-amber-300 dark:bg-amber-500/70":"bg-gray-300 dark:bg-gray-700"} w-fit p-2 rounded-md m-1 cursor-pointer`} >
                  {respuesta.resp_contenido}
                </span>
            </p>
          </div>
        )
      }))
    }

  const respuestasCorregidas = (preguntaCorregida,respuestas) =>{
    console.log("correccion");
    return(respuestas.map((respuesta,index) => {
      let bgColor = "bg-gray-300 dark:bg-gray-700"; // Color por defecto

      if (preguntaCorregida.pk_resp_id === respuesta.pk_resp_id){
        bgColor = "bg-green-300 dark:bg-green-500/70"; // Respuesta correcta
      }

      if (!preguntaCorregida.es_correcta && preguntaCorregida.respuesta_usuario === respuesta.pk_resp_id){
        bgColor = "bg-red-200 dark:bg-red-500/70"; // Respuesta incorrecta del usuario
      }
      

      // Ponemos A,B y C a las respuestas
      return(
        <div key={respuesta.pk_resp_id} className="w-fit p-2 rounded-md m-1 cursor-pointer">
          <p className="font-semibold dark:text-white">{etiquetar(index)} 
              <span className={`${bgColor} w-fit p-2 rounded-md m-1 cursor-pointer`} >
                {respuesta.resp_contenido}
              </span>
          </p>
        </div>
      )
      }))
  }

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
          <>
              <div className="w-full flex justify-around max-[768px]:flex-col max-[768px]:items-center">

                <img
                src={pregunta.pregunta.preg_image}
                alt="Imagen de la pregunta"
                className="max-w-[500px] h-[350px] m-5 cursor-zoom-in max-[768px]:max-w-[200px] max-[768px]:h-[150px]"
                onClick={() => setImagenAmpliada(true)}
                />

                <div className="w-4/12 flex flex-col justify-center m-5 max-[768px]:w-8/12"> 
                  <h1 className="text-2xl font-bold mb-4 dark:text-white">
                    {pregunta.pregunta.preg_enunciado}
                  </h1>
                  {preguntaCorregida ? respuestasCorregidas(preguntaCorregida,pregunta.respuestas) : respuestasDisplay(pregunta.respuestas)}
                  
                  <div className="flex justify-between max-[768px]:justify-center mt-4 w-full">
                    <button 
                      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer" 
                      onClick={() => handleCorregirPregunta()}>
                      {preguntaCorregida ? "Nueva Pregunta" : "Corregir"}
                    </button>
                  </div>

                </div>

              </div>
            <div className="w-full flex flex-col items-center mt-5">
              <p className="text-center text-lg font-semibold mt-4 dark:text-white">
                Racha de aciertos actuales: {rachaAciertos}
              </p>
              <div className="flex items-end justify-center align-middle mt-4">
                <p className="text-lg font-semibold dark:text-white">
                  Racha máxima histórica: {rachaMaximaHistorica} 
                </p>
                <svg fill="#bf3636" width={"30px"} height={"30px"} viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>flame-solid</title> <path d="M31.3,16.32c-1.19-2.09-7.94-14.15-7.94-14.15a1,1,0,0,0-1.75,0l-6,10.64-3-5.28a1,1,0,0,0-1.75,0S5.4,17.43,4.42,19.15A9.3,9.3,0,0,0,3,24.26c0,5.11,3.88,9.65,8.67,9.74H22.48C28.28,34,33,28.62,33,22.44A11.13,11.13,0,0,0,31.3,16.32ZM21.48,32H14.54A4.68,4.68,0,0,1,10,27.41a3.91,3.91,0,0,1,.75-2.34l3.35-5.21a.5.5,0,0,1,.84,0l1.78,2.77,0-.08c.63-1.11,4.23-7.48,4.23-7.48a.5.5,0,0,1,.87,0s3.6,6.38,4.23,7.48A5.83,5.83,0,0,1,27,25.76C27,32,22.1,32,21.48,32Z" className="clr-i-solid clr-i-solid-path-1"></path> <rect x="0" y="0" width="30" height="30" fillOpacity="0"></rect> </g></svg>
              </div>
            </div>
          </>
        ) : (
          <p>No se encontraron preguntas.</p>
        )}
        {imagenAmpliada && (
          <div
            className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
            onClick={() => setImagenAmpliada(false)}
          >
            <img
              src={pregunta.pregunta.preg_image}
              alt="Imagen ampliada"
              className="max-w-[90%] max-h-[90%] object-contain cursor-zoom-out"
            />
          </div>
        )}
    </MainLayout>
  );
};

export default Test;
