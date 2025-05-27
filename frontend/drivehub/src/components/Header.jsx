import { useNavigate,Link } from "react-router-dom";
import { UseUser } from '../contexts/UserContext';
import DriveHub_logo from '../assets/DriveHub_logo.png'

const Header = () =>{
    const page = window.location.pathname;
    const { user,logoutUser } = UseUser();
    return(
        <div className="flex align-middle items-center w-full h-25 bg-gradient-to-b from-[#b697df] to-[#f0f0f0] ">
            <header className="">
                <img src={DriveHub_logo} alt="drive_logo" className="w-50 h-15" />
            </header>
            <nav className="flex mx-auto w-2/6 align-middle items-center text-lg font-bold">
                <Link to="/home" className={`flex-1 flex justify-center items-center hover:bg-purple-400/20 p-1 rounded-lg`}>
                    <p className={`${page === '/home' ? 'border-b-2' : ''}`}>Home</p>
                </Link>
                <Link to="/tests" className={`flex-1 flex justify-center items-center hover:bg-purple-400/20 p-1 rounded-lg`}>
                    <p className={`${page === '/tests' ? 'border-b-2' : ''}`}>Tests</p>
                </Link>
                <Link to="/"className={`flex-1 flex justify-center items-center hover:bg-purple-400/20 p-1 rounded-lg`}>
                   <p className={`${page === '/foro' ? 'border-b-2' : ''}`}>Foro</p>
                </Link>
                <Link to="/stats" className={`flex-1 flex justify-center items-center hover:bg-purple-400/20 p-1 rounded-lg`}>
                    <p className={`${page === '/stats' ? 'border-b-2' : ''}`}>Stats</p>
                </Link>
            </nav>
            {/*Logout*/}
            <h2 className="mr-2 font-bold text-lg">👤 {user.nombre} |</h2>
            <Link to="/" className="text-lg mr-20 font-bold bg-gradient-to-br to-[#f5f1c5] p-3 rounded-xl  hover:bg-[#ffffff] duration-500" onClick={logoutUser}>
                <p className=""> Logout</p>
            </Link>
            
        </div>

    )
    
}
export default Header