import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { inicioSesion, verRespuestas, verPreguntas } from '../services/api'
import { useUser } from '../contexts/UserContext';

const Login = () => {

    const navigate = useNavigate();
    const { loginUser } = useUser(); // Accede a la función loginUser desde el contexto

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); 

        const creedencialesLogin = {
            "email":email,
            "password":password
        }

        console.log(creedencialesLogin);

        const verificacion = await inicioSesion(creedencialesLogin);

        console.log(verificacion);
        if (verificacion.login === true){

            const userData = {
                "id": verificacion.id,
                "nombre": verificacion.nombre,
            }

            const userToken = verificacion.access_token;

            loginUser(userData,userToken); // Llama a la función login del contexto

            navigate("/home")
        }

        setEmail("");
        setPassword("");
    }

    return (
        <div className="flex flex-col items-center max-w-screen">
        <h1 className="text-4xl mt-10">Login</h1>

        <form action="" className='flex flex-col items-center mt-10' noValidate onSubmit={(e) => {handleLogin(e)}}>
            <div className="m-4 relative">
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    required
                    title='Completa este campo'
                    className="no-underline border-b-2 border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
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
                    className="no-underline border-b-2 border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
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

        <button
            onClick={() => verRespuestas()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                respuestas
        </button>

        <button
        onClick={() => verPreguntas(1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            preguntas
        </button>

        </div>
        

        
        
    );
    }

export default Login;