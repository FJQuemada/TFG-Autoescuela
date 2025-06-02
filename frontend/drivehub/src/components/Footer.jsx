import React from 'react'
import { useNavigate,Link } from "react-router-dom";
import Linkedin from '../assets/linkedin.svg'

const Footer = () => {
    return (
        <footer className="bg-gray-300 text-black text-center mt-10 dark:bg-[#2f3038] dark:text-white space-y-2 ">
            <p className='pt-5'>© 2024 FjQuemada</p>
            <img src={Linkedin} alt="Linkedin" className='mx-auto size-8 my-1' />
        </footer>   
    )
}


export default Footer