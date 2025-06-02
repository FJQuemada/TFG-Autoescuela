import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { inicioSesion } from "../services/api";
import { UseUser } from "../contexts/UserContext";
import BeneficiosLanding from "../components/BeneficiosLanding";
import ComunidadLanding from "../components/ComunidadLanding";
import LoginRegisterLayout from "../layouts/LoginRegisterLayout";

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
    if (verificacion.data.login === true) {
      const userData = {
        id: verificacion.data.id,
        nombre: verificacion.data.nombre,
      }

      const userToken = verificacion.data.access_token;

      loginUser(userData, userToken); // Llama a la función login del contexto

      navigate("/home");
    }else if (verificacion.data.login === false && verificacion.status === 401 || verificacion.status === 404) {
      // Si la respuesta es un error de autenticación, muestra un mensaje de error
      setErrors("Usuario o contraseña incorrectos");
      console.log("Usuario o contraseña incorrectos");
    }else{
      setErrors("Error inesperado. Por favor, inténtalo de nuevo más tarde.");
      console.log("Error inesperado", verificacion.status);
    }
    // Reiniciar los campos de entrada después de enviar el formulario

    setEmail("");
    setPassword("");
  };

   return (
<LoginRegisterLayout>
    <div className="flex flex-col min-h-[90vh] items-center max-w-screen scroll-smooth">
      
      <div className="flex flex-1 flex-col md:flex-row items-center justify-around w-full h-9/12 px-4 md:px-20">
        <div className="w-full md:w-[550px] flex flex-col text-center md:text-left">
          <h1 className="text-5xl md:text-7xl dark:text-gray-100">Bienvenido a DriveHub</h1>
          <p className="mt-6 md:mt-10 text-base md:text-lg dark:text-gray-300 max-[768px]:px-12">
            Practica con tests. Conecta con una comunidad dedicada a obtener
            el permiso de conducción
          </p>
        </div>

        <div className="flex flex-col justify-center items-center mt-10 md:mt-0">
          <h2 className="text-3xl md:text-4xl dark:text-gray-100">Inicia sesión</h2>

          <form
            action=""
            className="flex flex-col items-center mt-4 w-full max-w-md dark:text-gray-100"
            noValidate
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <div className="relative w-80">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                required
                title="Completa este campo"
                className={`${errors ? 'border-red-500' : ''} border-b-2 ${email ? 'border-[#3EB489]' : 'border-gray-300'} no-underline px-3 py-2 focus:outline-none focus:border-[#3EB489] w-80`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors) setErrors("");
                }}
              />
            </div>

            <div className="m-4 relative w-80">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                required
                title="Completa este campo"
                className={`${errors ? 'border-red-500' : ''} border-b-2 ${password ? 'border-[#3EB489]' : 'border-gray-300'} no-underline px-3 py-2 focus:outline-none focus:border-[#3EB489] w-80`}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors) setErrors("");
                }}
              />
              {errors && (
                <p className="text-red-500 text-sm absolute ml-3 mt-1 whitespace-nowrap">{errors}</p>
              )}
            </div>

            <p className="text-sm mt-3 w-full text-center md:text-left">
              ¿No eres usuario?{" "}
              <Link to="/register" className="text-blue-800 dark:text-blue-400 hover:underline">
                Regístrate aquí
              </Link>
            </p>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 cursor-pointer font-bold py-2 px-4 mt-5 rounded text-white w-full"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
    <BeneficiosLanding />
    <ComunidadLanding />
  </LoginRegisterLayout>
);
};

export default Login;
