import { Link } from "react-router-dom";
import { UseUser } from '../contexts/UserContext';
import DriveHub_logo from '../assets/DriveHub_logo.png'
import React from 'react';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const page = window.location.pathname;
  const { user, logoutUser } = UseUser();
    const navigate = useNavigate();

  return (
    <div className="w-full bg-gradient-to-b dark:text-white from-[#b697df] to-[#f0f0f0] dark:from-[#b697df] dark:to-[#1e1f24] relative">
      {/* Cabecera completa */}
      <div className="flex items-center justify-between px-4 py-3 md:justify-start">
        <img src={DriveHub_logo} alt="drive_logo" onClick={() => navigate("/home")} title="Volver al home" className="w-[200px] h-[68px] mx-auto md:mx-0 md:ml-4 cursor-pointer"/>

        {/* Drawer móvil (solo visible en sm) */}
        <div className="flex md:hidden">
          <input type="checkbox" id="drawer-toggle" className="sr-only peer" />
          <label htmlFor="drawer-toggle" className="z-30 fixed top-4 left-4 inline-block p-3 transition-all duration-300 bg-purple-200 rounded-lg peer-checked:left-48 cursor-pointer">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                >
                <path d="M4 18H10" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12L16 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </label>

          <div className="fixed top-0 left-0 z-20 w-64 h-full transition-all duration-300 transform -translate-x-full bg-white dark:bg-[#1e1f24] shadow-lg peer-checked:translate-x-0 flex flex-col p-6 gap-4 text-lg">
            <Link to="/home" className={`${page === '/home' ? 'font-bold underline' : ''}`} onClick={() => document.getElementById('drawer-toggle').checked = false}>Home</Link>
            <Link to="/tests" className={`${page === '/tests' ? 'font-bold underline' : ''}`} onClick={() => document.getElementById('drawer-toggle').checked = false}>Tests</Link>
            <Link to="/foro" className={`${page === '/foro' ? 'font-bold underline' : ''}`} onClick={() => document.getElementById('drawer-toggle').checked = false}>Foro</Link>
            <Link to="/stats" className={`${page === '/stats' ? 'font-bold underline' : ''}`} onClick={() => document.getElementById('drawer-toggle').checked = false}>Stats</Link>
            <div className="mt-4">
              <p>👤 {user.nombre}</p>
              <Link
                to="/"
                onClick={() => {
                  logoutUser();
                  document.getElementById('drawer-toggle').checked = false;
                }}
                className="mt-2 block p-1 rounded-xl transition"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>

        {/* Navegación para pantallas grandes (igual que tenías) */}
        <nav className="hidden md:flex mx-auto w-2/6 items-center text-lg">
          <Link to="/home" className="flex-1 flex justify-center items-center hover:bg-purple-400/20 duration-150 ease-in p-1 rounded-lg">
            <p className={`${page === '/home' ? 'border-b-2' : ''}`}>Home</p>
          </Link>
          <Link to="/tests" className="flex-1 flex justify-center items-center hover:bg-purple-400/20 duration-150 ease-in p-1 rounded-lg">
            <p className={`${page === '/tests' ? 'border-b-2' : ''}`}>Tests</p>
          </Link>
          <Link to="/foro" className="flex-1 flex justify-center items-center hover:bg-purple-400/20 duration-150 ease-in p-1 rounded-lg">
            <p className={`${page === '/foro' ? 'border-b-2' : ''}`}>Foro</p>
          </Link>
          <Link to="/stats" className="flex-1 flex justify-center items-center hover:bg-purple-400/20 duration-150 ease-in p-1 rounded-lg">
            <p className={`${page === '/stats' ? 'border-b-2' : ''}`}>Stats</p>
          </Link>
        </nav>

        {/* Usuario y logout (solo visible en md+) */}
        <div className="hidden md:flex items-center">
          <h2 className="mr-2 text-lg">👤 {user.nombre} |</h2>
          <Link to="/" className="text-lg mr-6 px-3 py-2 rounded-xl cursor-pointer hover:bg-[#56698681] duration-300 ease-in-out" onClick={logoutUser}>
            <p>Logout</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
