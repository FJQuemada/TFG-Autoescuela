import { NavLink } from "react-router";
import { useNavigate,Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { UseUser } from "../contexts/UserContext";
import { getTestSuspenso, getUltimaMedalla } from "../services/api";
import { useEffect,useState } from "react";

const Home = () => {
    const navigate = useNavigate();
    const { rachaMaximaHistorica } = UseUser(); // Accede a la función loginUser desde el contexto
    const [testSuspenso, setTestSuspenso] = useState(null); // Estado para almacenar el test suspendido
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
    const [ultimaMedalla, setUltimaMedalla] = useState(null); // Estado para almacenar la última medalla
    useEffect(() => {
        const fetchGetTestSuspenso = async() =>{
                try {
                    const response = await getTestSuspenso();
                    setTestSuspenso(response); // Guardamos el test suspendido en el estado
                    console.log("Test suspendido aleatorio:", response);
                    setLoading(false); // Cambiamos el estado de carga a false
                    // Aquí puedes manejar la respuesta como desees, por ejemplo, mostrar un mensaje o redirigir al usuario
                } catch (error) {
                    console.error("Error al obtener el test suspendido aleatorio:", error);
            };
        }
        const fetchUltimaMedalla = async() =>{
            try {
                const response = await getUltimaMedalla();
                setUltimaMedalla(response); // Guardamos la última medalla en el estado
                console.log("Última medalla obtenida:", response);
            } catch (error) {
                console.error("Error al obtener la última medalla:", error);
            }
        }
        fetchUltimaMedalla();
        fetchGetTestSuspenso();
    }
    , []);


    return (
    <MainLayout>
            <div className="">
                <div className="w-full h-full flex justify-center">
                    <div className="flex w-5/12 h-[65vh] max-[600px]:h-full max-[600px]:flex-col max-[600px]:w-10/12 max-[600px]:items-center mt-15 ">
                        <div className="flex flex-col w-4/6 max-[600px]:w-5/6 h-full">
                            <div className="h-[58%] max-[600px]:py-20 bg-linear-to-bl from-blue-300 to-purple-300 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl">
                                <h2 className="font-semibold">Último test/continua test</h2>
                            </div>
                            <div className="flex h-[42%] space-x-4">
                                <div className="flex-1 max-[600px]:py-20 bg-linear-to-bl from-cyan-400 to-green-400 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl"
                                    onClick={() => {
                                        navigate('/stats');
                                    }}>
                                    {ultimaMedalla?.fk_logr_lgus_logro__logr_nombre ?
                                    <div className="flex flex-col items-center">
                                        <h2 className="text-center font-semibold">Última medalla obtenida</h2>
                                        <p className="text-center text-sm">{ultimaMedalla.fk_logr_lgus_logro__logr_nombre}</p>
                                        <p className="text-sm text-gray-500 italic">{ultimaMedalla.fk_logr_lgus_logro__logr_descripcion}</p>
                                    </div>:
                                    <p className="p-5 text-center font-semibold">No has obtenido ninguna medalla aún</p>
                                    }
                                </div>
                                
                            </div>
                        </div>

                        <div className="flex flex-col w-[40%] max-[600px]:w-[80%] h-full">
                            {loading ?
                            <div className="h-[58%] bg-gray-200 m-5 flex justify-center items-center rounded-2xl">
                                <p className="p-5">Cargando...</p>
                                
                                </div> 
                                    :   testSuspenso ?
                            <div className="h-[58%] bg-red-200 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl hover"
                                onClick={() => {
                                    navigate(`/test/${testSuspenso.fk_tsts_teus_test}`);
                                }}>
                                <p className="p-5 font-semibold">
                                    ¡Tienes un test suspendido con {testSuspenso.teus_fallos} fallos! Pulsa aquí para intentalo de nuevo
                                </p>
                            </div> :
                            <div className="h-[58%] bg-cyan-200 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl">
                                <p className="p-5 font-semibold">
                                    No tienes ningún test suspenso, ¡genial!
                                </p>
                            </div>}
                            
                            <div className="h-[58%] bg-linear-to-bl from-rose-400 to-orange-400 p-5 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex flex-col justify-center items-center rounded-2xl"
                                onClick={() => {
                                    navigate('/preguntasEncadenadas');
                                }}>
                                <h2 className="text-center font-semibold">Preguntas encadenadas</h2>
                                <p className="text-sm text-gray-800 p-5 text-center">Contesta preguntas aleatorias de todos los tests.</p>
                                <p className=""> Tu racha máxima es de : {<span className="font-bold">{rachaMaximaHistorica}</span>}</p>
                            </div>        
                        </div> 
                        
                          
                    </div>
                </div>
            </div>
        </MainLayout>
    );
    
}
export default Home;