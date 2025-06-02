import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Linkedin from '../assets/linkedin.svg';
import DriveHub_logo from '../assets/DriveHub_logo.png';

const HeaderLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gradient-to-b from-[#b697df] to-[#f0f0f0] dark:from-[#b697df] dark:to-[#1e1f24] relative text-black dark:text-white">
      {/* Cabecera visible */}
      <div className="flex items-center justify-between px-4 py-3 ">
        <img
          src={DriveHub_logo}
          alt="drive_logo"
          onClick={() => navigate("/")}
          className="w-[200px] h-[68px] cursor-pointer mx-auto md:mx-0 md:ml-4"
        />

        {/* Drawer para móvil */}
        <div className="flex md:hidden">
          <input type="checkbox" id="drawer-toggle" className="sr-only peer" />
          <label htmlFor="drawer-toggle" className="z-30 fixed top-4 left-4 inline-block p-3 transition-all duration-300 bg-purple-200 rounded-lg peer-checked:left-48 cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" width={24} height={24}>
              <path d="M4 18H10" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 12L16 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </label>

          <div className="fixed top-0 left-0 z-20 w-64 h-full transition-all duration-300 transform -translate-x-full bg-white dark:bg-[#1e1f24] shadow-lg peer-checked:translate-x-0 flex flex-col p-6 gap-4 text-lg">
            <a href="#beneficios" onClick={() => document.getElementById('drawer-toggle').checked = false}>Beneficios</a>
            <a href="#foro" onClick={() => document.getElementById('drawer-toggle').checked = false}>Foro</a>
            <div className="flex space-x-3 mt-4">
              <img src={Linkedin} alt="Linkedin" className='size-7' />
              <img src={Linkedin} alt="Linkedin" className='size-7' />
              <img src={Linkedin} alt="Linkedin" className='size-7' />
            </div>
          </div>
        </div>

        {/* Navegación visible solo en escritorio */}
        <nav className="hidden md:flex justify-end items-center space-x-10 w-2/6 mr-20 text-xl font-bold">
          <a href="#beneficios">Beneficios</a>
          <a href="#foro">Foro</a>
          <div className="flex space-x-3">
            <img src={Linkedin} alt="Linkedin" className='size-7' />
            <img src={Linkedin} alt="Linkedin" className='size-7' />
            <img src={Linkedin} alt="Linkedin" className='size-7' />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HeaderLogin;