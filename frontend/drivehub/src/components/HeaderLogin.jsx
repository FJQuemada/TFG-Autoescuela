import { useNavigate,Link } from "react-router-dom";
import { UseUser } from '../contexts/UserContext';
import Linkedin from '../assets/linkedin.svg'

const Header = () =>{
    
    return(
        <div className="flex justify-between align-middle items-center w-full h-25 bg-gradient-to-b from-[#b697df] to-[#f0f0f0] ">
            <header className="ml-20">
                <img src="src\assets\DriveHub_logo.png" alt="drive_logo" className="w-70 h-20" />
            </header>
            <nav className="flex justify-end align-middle space-x-10 w-2/6 mr-20 text-xl font-bold">
                <a href="#beneficios">Beneficios</a>
                <a href="#foro">Foro</a>
                <div className="flex space-x-3">
                    <img src={Linkedin} alt="Linkedin" className='size-7' />
                    <img src={Linkedin} alt="Linkedin" className='size-7' />
                    <img src={Linkedin} alt="Linkedin" className='size-7' />
                </div>
            </nav>
        </div>

    )
    
}
export default Header