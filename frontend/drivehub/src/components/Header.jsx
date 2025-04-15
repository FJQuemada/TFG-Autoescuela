import { useNavigate,Link } from "react-router-dom";
import { UseUser } from '../contexts/UserContext';

const Header = () =>{

    const { user,logoutUser } = UseUser();
    return(
        <div className="flex justify-around align-middle items-center w-full h-full">
            <header>
                <h1 className="text-5xl mt-10">Drivehub</h1>
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
                {/*Logout*/}
                <Link to="/" className="text-lg mt-10" onClick={logoutUser}>
                    <p className="text-white">Logout</p>
                </Link>
            </nav>
        </div>

    )
    
}
export default Header