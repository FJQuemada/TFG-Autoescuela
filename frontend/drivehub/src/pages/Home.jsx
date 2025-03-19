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
            <div className="flex w-full h-full">
                <div id="noticias" className="flex flex-col w-5/12 items-center">
                    <h2 className="text-3xl mt-10">Noticias</h2>
                    <div className="flex flex-col w-2/6">
                        <div className="flex flex-col mt-4">
                            <h3 className="text-2xl">Noticia 1</h3>
                            <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="w-7/12 h-[75vh] mt-10 flex px-10">
                    <div className="bg-amber-900 w-4/6 h-full pr-40">
                        <div className="w-full h-7/12 bg-green-400">
                            hola
                        </div>
                        <div className="h-full w-full flex space-x-10">
                            <div className="w-1/2 h-5/12 bg-red-400">
                                hola
                            </div>
                            <div className="w-1/2 h-5/12 bg-red-400">
                                hola
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-500 w-2/6 h-full">

                    </div>
                </div>
            </div>
            
            
        </div>
    );
    
}
export default Home;