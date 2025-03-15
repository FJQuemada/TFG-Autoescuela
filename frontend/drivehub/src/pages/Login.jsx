import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { inicioSesion } from '../services/api'

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); 

        const creedencialesLogin = {
            "email":email,
            "password":password
        }

        console.log(creedencialesLogin);

        const verificacion = await inicioSesion(creedencialesLogin);

        if (verificacion.login === true){
            navigate("/home")
        }

        setEmail("");
        setPassword("");
    }

    return (
        <div className="flex flex-col items-center">
        <h1 className="text-4xl mt-10">Login</h1>

        <form action="" className='flex flex-col items-center mt-10' noValidate onSubmit={(e) => {handleLogin(e)}}>
            <div className="m-4 relative">
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    required
                    title='Completa este campo'
                    className="border border-gray-300 rounded px-3 py-2"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="m-4 relative">
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    required
                    title='Completa este campo'
                    className="border border-gray-300 rounded px-3 py-2"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Iniciar sesión
            </button>
        </form>

        <p className="text-sm text-white mt-2">
            ¿No eres usuario?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
                Registrate aquí
            </Link>
        </p>
        </div>
        
        
    );
    }

export default Login;