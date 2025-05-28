import { NavLink } from "react-router";
import { useNavigate,Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { UseUser } from "../contexts/UserContext";

const Home = () => {
    const navigate = useNavigate();
    const { rachaMaximaHistorica } = UseUser(); // Accede a la función loginUser desde el contexto
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
                            <div className="h-[42%] bg-gray-400 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl">
                                <p className="p-5">Este test esta suspenso, ¿que tal si lo intentas de nuevo? / Todos los tests que has realizado estan aprobados, ¡genial!</p>
                            </div>
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