import React from 'react'
import { useNavigate,Link } from "react-router-dom";
import Linkedin from '../assets/linkedin.svg'

const Footer = () => {
    return (
        <footer className="bg-gray-300 text-black text-center mt-10 dark:bg-[#2f3038] dark:text-white">
            <p className='pt-3'>© 2024 FjQuemada. Todos los derechos reservados.</p>
            <img src={Linkedin} alt="Linkedin" className='mx-auto size-8 my-1' />
        </footer>   
    )
}


export default Footer