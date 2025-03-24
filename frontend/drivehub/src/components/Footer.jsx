import React from 'react'
import { useNavigate,Link } from "react-router-dom";
import Linkedin from '../assets/linkedin.svg'

const Footer = () => {
    return (
        <footer className="bg-gray-300 text-black text-center mt-10">
            <p className='p-10'>© 2024 FjQuemada. Todos los derechos reservados.</p>
            <img src={Linkedin} alt="Linkedin" className='mx-auto size-10' />
        </footer>   
    )
}


export default Footer