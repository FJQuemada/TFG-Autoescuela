import { useNavigate,Link } from "react-router-dom";
import { UseUser } from '../contexts/UserContext';

const Header = () =>{
    
    return(
        <div className="flex justify-between align-middle items-center w-full h-25 bg-[#e3d9f0] ">
            <header className="ml-20">
                <img src="src\assets\DriveHub_logo.png" alt="drive_logo" className="w-70 h-20" />
            </header>
            <nav className="flex justify-end space-x-20 w-2/6 mr-20 text-xl font-bold">
                <a href="#beneficios">Beneficios</a>
                <a href="#foro">Foro</a>
                {/*Logout*/}
            </nav>
        </div>

    )
    
}
export default Header