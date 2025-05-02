import { useNavigate,Link } from "react-router-dom";
import { UseUser } from '../contexts/UserContext';
import DriveHub_logo from '../assets/DriveHub_logo.png'

const Header = () =>{

    const { user,logoutUser } = UseUser();
    return(
        <div className="flex align-middle items-center w-full h-25 bg-gradient-to-b from-[#b697df] to-[#f0f0f0] ">
            <header className="">
                <img src={DriveHub_logo} alt="drive_logo" className="w-50 h-15" />
            </header>
            <nav className="flex mx-auto justify-between w-2/6 align-middle items-center text-lg font-bold">
                <Link to="/home" className="">
                    <p className="">Home</p>
                </Link>
                <Link to="/tests" className="">
                    <p className="">Tests</p>
                </Link>
                <Link to="/" className="">
                    <p className="">Foro</p>
                </Link>
                <Link to="/" className="">
                    <p className="">Stats</p>
                </Link>
            </nav>
            {/*Logout*/}
            <Link to="/" className="text-lg mr-20 font-bold bg-gradient-to-br to-[#f5f1c5] p-3 rounded-xl  hover:bg-[#ffffff] duration-500" onClick={logoutUser}>
                <p className="">Logout</p>
            </Link>
        </div>

    )
    
}
export default Header