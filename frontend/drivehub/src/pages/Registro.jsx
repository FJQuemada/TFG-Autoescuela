import React, { useState } from 'react';
import { registroUsuario } from '../services/api';

const Registro = () => {

    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;

    const handleSumbit = async (e) => {
        e.preventDefault();

        console.log("Usuario: ", usuario);
        console.log("Email: ", email);
        console.log("Password: ", password);

        const nuevoUsuario = {
            "usus_nombre": usuario,
            "usus_email": email,
            "usus_password": password
        };

        const data = await registroUsuario(nuevoUsuario);
        console.log("Data: ", data);

        if (data) {
            const newErrors = {};

            Object.keys(data).forEach((key) => {
                // Si el error es por email duplicado, mostramos un mensaje personalizado
                if(email !== "" && !regexEmail.test(email)){
                    newErrors.usus_email = "El correo no es válido";
                }

                if(key === "usus_email" && email !== ""){
                    newErrors[key] = "El correo ya está en uso";
                }else{
                    newErrors[key] = data[key][0];
                }
            });

            setErrors(newErrors);

        }else{
            
            setUsuario("");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="flex flex-col items-center">

            <h1 className="text-4xl mt-10">Registro</h1>

            {/* Mostramos los errores debajo de cada campo */}
            <form className="flex flex-col items-center mt-10" onSubmit={(e) => handleSumbit(e)} noValidate>
                <div className="m-4 relative">
                    <input
                        type="text"
                        placeholder="Nombre usuario"
                        required
                        value={usuario}
                        onChange={(e) =>{
                            setUsuario(e.target.value)
                        
                            const newErrors = { ...errors };
                            newErrors.usus_nombre = null;
                            setErrors(newErrors);
                        } 
                        } 
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.usus_nombre && (
                        <p className="text-red-500 text-sm absolute text-nowrap">{errors.usus_nombre}</p>
                    )}
                </div>

                <div className="m-4 relative">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        required
                        value={email}
                        onChange={(e) =>{
                            setEmail(e.target.value)
                        
                            const newErrors = { ...errors };
                            newErrors.usus_email = null;
                            setErrors(newErrors);
                        } 
                        } 
                        className="border border-gray-300 rounded px-3 py-2"
                        title="Por favor escribe un correo electrónico válido"
                        pattern='^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$'
                    />
                    {errors.usus_email && (
                        <p className="text-red-500 text-sm absolute text-nowrap">{errors.usus_email}</p>
                    )}
                </div>

                <div className="m-4 relative">
                    <input
                        type="password"
                        placeholder="Contraseña"
                        required
                        value={password}
                        onChange={(e) =>{
                            setPassword(e.target.value)
                        
                            const newErrors = { ...errors };
                            newErrors.usus_password = null;
                            setErrors(newErrors);
                        } 
                        } 
                        className={`${errors.usus_password ? 'border-red-500' : null} border ${password ? 'border-green-500' : 'border-gray-300'} border-gray-300 rounded px-3 py-2`}
                    />
                    {errors.usus_password && (
                        <p className="text-red-500 text-sm absolute text-nowrap ">{errors.usus_password}</p>
                    )}
                </div>

                <button type="submit" className='m-4'>
                    Registro
                </button>
            </form>
        </div>
    );
};

export default Registro;
