import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { inicioSesion } from "../services/api";
import { UseUser } from "../contexts/UserContext";
import HeaderLogin from "../components/HeaderLogin";
import BeneficiosLanding from "../components/BeneficiosLanding";
import ComunidadLanding from "../components/ComunidadLanding";
import Footer from "../components/Footer";

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
    <div className="">
      <div className="flex flex-col items-center max-w-screen h-screen scroll-smooth">
        <HeaderLogin />

        <div className="flex items-center justify-around w-full h-9/12">
          <div className="w-[550px] flex flex-col">
            <h1 className="text-7xl">Bienvenido a DriveHub</h1>
            <p className="mt-10">
              Practica con tests. Conecta con una comunidad dedicada a obtener
              el permiso de conducción
            </p>
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
              <div className=" relative">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  required
                  title="Completa este campo"
                  className={`${errors ? 'border-red-500' : null} border-b-2 ${email ? 'border-b-2 border-[#3EB489]' : 'border-b-2 border-gray-300'} no-underline px-3 py-2 focus:outline-none focus:border-[#3EB489] w-100`}
                  onChange={(e) =>{
                    setEmail(e.target.value);
                    if (errors) {
                      setErrors("");
                      }
                    }
                  }
                />
                
              </div>

              <div className="m-4 relative">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  required
                  title="Completa este campo"
                  className={`${errors ? 'border-red-500' : null} border-b-2 ${password ? 'border-b-2 border-[#3EB489]' : 'border-b-2 border-gray-300'} no-underline px-3 py-2 focus:outline-none focus:border-[#3EB489] w-100`}
                  onChange={(e) =>{
                    setPassword(e.target.value);
                    if (errors) {
                      setErrors("");
                      }
                    }
                  }
                />
                {errors && (
                        <p className="text-red-500 text-sm absolute ml-3 mt-1 text-nowrap">{errors}</p>
                )}
              </div>

              <p className="text-sm  mt-3">
                ¿No eres usuario?{" "}
                <Link to="/register" className="text-blue-800 hover:underline">
                  Registrate aquí
                </Link>
              </p>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 cursor-pointer  font-bold py-2 px-4 mt-5 rounded text-white"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
      <BeneficiosLanding />
      <ComunidadLanding />
      <Footer />
    </div>
  );
};

export default Login;
