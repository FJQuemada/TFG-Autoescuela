import { useNavigate,Link } from "react-router-dom";
import { UseUser } from '../contexts/UserContext';

const Header = () =>{

    const { user,logoutUser } = UseUser();
    return(
        <div className="flex justify-between align-middle items-center w-full h-25 bg-[#e3d9f0] ">
            <header className="ml-20">
                <img src="src\assets\DriveHub_logo.png" alt="drive_logo" className="w-70 h-20" />
            </header>
            <nav className="flex justify-between w-2/6 mr-20 ">
                <Link to="/home" className="text-lg">
                    <p className="">Home</p>
                </Link>
                <Link to="/tests" className="text-lg">
                    <p className="">Tests</p>
                </Link>
                <Link to="/" className="text-lg">
                    <p className="">Foro</p>
                </Link>
                <Link to="/" className="text-lg">
                    <p className="">Stats</p>
                </Link>
                {/*Logout*/}
                <Link to="/" className="text-lg" onClick={logoutUser}>
                    <p className="">Logout</p>
                </Link>
            </nav>
        </div>

    )
    
}
export default Header