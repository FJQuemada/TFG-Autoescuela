import { NavLink } from "react-router";
import { useNavigate,Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { UseUser } from "../contexts/UserContext";
import { getTestSuspenso } from "../services/api";
import { useEffect,useState } from "react";

const Home = () => {
    const navigate = useNavigate();
    const { rachaMaximaHistorica } = UseUser(); // Accede a la función loginUser desde el contexto
    const [testSuspenso, setTestSuspenso] = useState(null); // Estado para almacenar el test suspendido

    useEffect(() => {
        const fetchGetTestSuspenso = async() =>{
                try {
                    const response = await getTestSuspenso();
                    setTestSuspenso(response); // Guardamos el test suspendido en el estado
                    console.log("Test suspendido aleatorio:", response);
                    // Aquí puedes manejar la respuesta como desees, por ejemplo, mostrar un mensaje o redirigir al usuario
                } catch (error) {
                    console.error("Error al obtener el test suspendido aleatorio:", error);
            };
        }
        fetchGetTestSuspenso();
    }
    , []);


    return (
        <div className="">
            <MainLayout>
                <div className="w-full h-full flex justify-center">
                    <div id="noticias" className="flex flex-col w-3/12 items-center mt-5">
                        <h2 className="text-3xl mt-10">Noticias</h2>
                        <div className="flex flex-col w-2/6">
                            <div className="flex flex-col mt-4">
                                <h3 className="text-2xl">Noticia 1</h3>
                                <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-5/12 h-[65vh] mt-15 bg-[#ffffff21] ">
                        <div className="flex flex-col w-4/6 h-full">
                            <div className="h-[58%] bg-green-400 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl border-4 border-green-600 hover:border-green-800">
                                Último test/continua test
                            </div>
                            <div className="flex h-[42%] space-x-4">
                                <div className="flex-1 bg-red-400 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl">
                                    Última medalla obtenida
                                </div>
                                
                            </div>
                        </div>

                        <div className="flex flex-col w-[40%] h-full">
                            {testSuspenso ?
                            <div className="h-[58%] bg-red-200 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl"
                                onClick={() => {
                                    navigate(`/test/${testSuspenso.fk_tsts_teus_test}`);
                                }}>
                                <p className="p-5">
                                    ¡Tienes un test suspendido con {testSuspenso.teus_fallos} fallos! Pulsa aquí para intentalo de nuevo
                                </p>
                            </div> :
                            <div className="h-[58%] bg-cyan-200 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl">
                                <p className="p-5">
                                    No tienes ningún test suspenso, ¡genial!
                                </p>
                            </div>}
                            
                            <div className="h-[58%] bg-yellow-400 p-5 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex flex-col justify-center items-center rounded-2xl"
                                onClick={() => {
                                    navigate('/preguntasEncadenadas');
                                }}>
                                <h2 className="text-center">Preguntas encadenadas</h2>
                                <p className="text-sm text-gray-500 p-5 text-center">Contesta preguntas aleatorias de todos los tests Tu racha es de :{rachaMaximaHistorica}</p>
                            </div>        
                        </div>   
                    </div>
                </div>
            </MainLayout>
            
        </div>
    );
    
}
export default Home;