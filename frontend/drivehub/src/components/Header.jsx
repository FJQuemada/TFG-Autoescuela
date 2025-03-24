import { useNavigate,Link } from "react-router-dom";

const Header = () =>{
    return(
        <div className="flex flex-col items-center w-full h-full">
            <header>
                <h1 className="text-5xl mt-4">Drivehub</h1>
            </header>
            <nav className="flex justify-between w-2/6 ">
                <Link to="/home" className="text-lg mt-10">
                    <p className="text-white">Home</p>
                </Link>
                <Link to="/tests" className="text-lg mt-10">
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

    )
    
}
export default Header