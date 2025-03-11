import React, { useState } from 'react';

import {registroUsuario} from '../services/api';

const Login = () => {

    const [usuario,setUsuario] = useState("")
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSumbit = async(e) => {
        e.preventDefault();

        console.log("Usuario: ", usuario);
        console.log("Email: ", email);
        console.log("Password: ", password);

        const nuevoUsuario = {
            "usus_nombre": usuario,
            "usus_email": email,
            "usus_password": password
        };

        await registroUsuario(nuevoUsuario);
        
        console.log("Nuevo usuario: ", nuevoUsuario);
        
        setEmail("");
        setUsuario("");
        setPassword("");
      };

    return (
        <div className="flex flex-col items-center ">
            <h1 className="text-4xl mt-10">Login</h1>
            <form action="" className="flex flex-col items-center mt-10 group" onSubmit={(e) => handleSumbit(e)}>
                <input type="text" placeholder="Nombre usuario" required value={usuario} onChange={(e) => setUsuario(e.target.value)} className="border border-gray-300 rounded px-3 py-2" />
                <input
                    type="email" 
                    placeholder="Correo electrónico" 
                    required value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="border border-gray-300 rounded px-3 py-2" 
                    pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+{2}$"
                    title="Por favor escribe un correo electrónico válido" />
                <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded px-3 py-2" />
                <button type="submit" className='group-invalid:pointer-events-none group-invalid:opacity-50'>Login</button>
            </form>
        </div>
    );
}
export default Login;
