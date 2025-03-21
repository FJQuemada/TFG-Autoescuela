import { NavLink } from "react-router";
import { useNavigate,Link } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="">
            <div className="flex flex-col items-center w-full h-full">
                <header>
                    <h1 className="text-5xl mt-4">Drivehub</h1>
                </header>
                <nav className="flex justify-between w-2/6 ">
                    <Link to="/home" className="text-lg mt-10">
                        <p className="text-white">Home</p>
                    </Link>
                    <Link to="/" className="text-lg mt-10">
                        <p className="text-white">Tests</p>
                    </Link>
                    <Link to="/" className="text-lg mt-10">
                        <p className="text-white">Foro</p>
                    </Link>
                    <Link to="/" className="text-lg mt-10">
                        <p className="text-white">Stats</p>
                    </Link>
                </nav>
            </div>

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

                <div className="flex w-4/12 h-[65vh] mt-15 bg-[#ffffff21] ">
                    <div className="flex flex-col w-4/6 h-full">
                        <div className="h-[58%] bg-green-400 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl border-4 border-green-600 hover:border-green-800">
                            Ultimo test/continua test
                        </div>
                        <div className="flex h-[42%] space-x-4">
                            <div className="flex-1 bg-red-400 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl">
                                rojo1
                            </div>
                            <div className="flex-1 bg-red-400 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl">
                                rojo2
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-[40%] h-full">
                        <div className="h-[42%] bg-gray-400 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl">
                            test aleatorio
                        </div>
                        <div className="h-[58%] bg-yellow-400 hover:cursor-pointer hover:scale-104 m-5 duration-400 flex justify-center items-center rounded-2xl">
                            test aleatorio
                        </div>
                       
                    </div>

                    
                </div>

            </div>

            
        </div>
    );
    
}
export default Home;