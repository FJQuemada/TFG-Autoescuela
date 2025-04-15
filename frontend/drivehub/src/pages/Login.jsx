import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { inicioSesion, verRespuestas, verPreguntas } from "../services/api";
import { UseUser } from "../contexts/UserContext";
import HeaderLogin from "../components/HeaderLogin";
import Beneficios from "../components/Beneficios";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = UseUser(); // Accede a la función loginUser desde el contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const creedencialesLogin = {
      email: email,
      password: password,
    };

    console.log(creedencialesLogin);

    const verificacion = await inicioSesion(creedencialesLogin);

    console.log(verificacion);
    if (verificacion.login === true) {
      const userData = {
        id: verificacion.id,
        nombre: verificacion.nombre,
      };

      const userToken = verificacion.access_token;

      loginUser(userData, userToken); // Llama a la función login del contexto

      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div>
    <div className="flex flex-col items-center max-w-screen h-screen">
      <HeaderLogin />

    <div className="flex items-center justify-around p-32 w-full h-screen">

        <div className="w-[550px] flex flex-col">
        <h1 className="text-7xl">Bienvenido a DriveHub</h1>
        <p className="mt-10">Practica con tests. Conecta con una comunidad dedicada a obtener el permiso de conducción</p>
        </div>

        <div className="flex flex-col justify-center align-middle items-center">
            <h1 className="text-4xl mt-10">Inicia sesión</h1>

            <form
            action=""
            className="flex flex-col items-center mt-4"
            noValidate
            onSubmit={(e) => {
                handleLogin(e);
            }}
            >
            <div className="m-4 relative">
                <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                required
                title="Completa este campo"
                className="no-underline border-b-2 border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 w-100"
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="m-4 relative">
                <input
                type="password"
                placeholder="Contraseña"
                value={password}
                required
                title="Completa este campo"
                className="no-underline border-b-2 border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 w-100"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <p className="text-sm  mt-3">
                ¿No eres usuario?{" "}
                <Link to="/register" className="text-blue-800 hover:underline">
                    Registrate aquí
                </Link>
            </p>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 cursor-pointer  font-bold py-2 px-4 mt-5 rounded"
                >
                Iniciar sesión
            </button>
            </form>

        </div>
      </div>
    </div>
    <Beneficios />
    </div>
  );
};

export default Login;
