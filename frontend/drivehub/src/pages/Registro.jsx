import React, { useState } from 'react';
import { registroUsuario } from '../services/api';
import { useNavigate,Link } from 'react-router-dom';



const Registro = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const [errors, setErrors] = useState({});

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const comprobarPassword = () => {
        if (password !== passwordRepeat) {
            return "Las contraseñas no coinciden"
        } else {
            return null;
        }
    }

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

        const passwordError = comprobarPassword();
        
        if (passwordError){
            setErrorPassword(passwordError);
        }else{
            const data = await registroUsuario(nuevoUsuario);
        console.log("Data: ", data);

        if (data) {
            const newErrors = {};
            console.log(email);
    
            Object.keys(data).forEach((key) => {
                // Si hay un error con el email, personalizamos según la situación
                if (data[key][0].includes("exists")) {
                   newErrors[key] = "El correo ya está en uso.";
                    
                } else {
                    newErrors[key] = data[key][0];
                }
            });
    
            setErrors(newErrors);
        } else {
            setUsuario("");
            setEmail("");

            await delay(300);
            navigate("/");
           
        } 
        }
    
    setPassword("");
    setPasswordRepeat("");

    };

    return (
        <div className="flex flex-col items-center text-base dark:bg-[#1e1f24] h-screen">
            {/* Mostramos los errores debajo de cada campo */}
            <div className="flex justify-between align-middle items-center w-full h-25 bg-gradient-to-b from-[#b697df] to-[#f0f0f0] dark:from-[#b697df] dark:to-[#1e1f24] ">
                <header className="ml-20 flex cursor-pointer" title='Volver al login' onClick={() => navigate("/")}>
                    <img src="src\assets\DriveHub_logo.png" alt="drive_logo" className="w-70 h-20"/>
                </header>
            </div>
            <form className="flex flex-col items-center mt-10" onSubmit={(e) => handleSumbit(e)} noValidate>
                <h1 className="text-4xl mt-10 mx-auto dark:text-white">Registro</h1>
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
                        className={`${errors.usus_nombre ? 'border-red-500' : null} border-b-2 ${usuario ? 'border-b-2 border-[#3EB489]' : 'border-b-2 border-gray-300'} no-underline  px-3 py-2 focus:outline-none focus:border-[#3EB489] w-80 md:w-100 dark:text-white`}
                        title="Rellene este campo"
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
                            setEmail(e.target.value);
                        
                            const newErrors = { ...errors };
                            newErrors.usus_email = null;
                            setErrors(newErrors);
                        } 
                        } 
                        className={`${errors.usus_email ? 'border-red-500' : null} border-b-2 ${email ? 'border-b-2 border-[#3EB489]' : 'border-b-2 border-gray-300'} no-underline  px-3 py-2 focus:outline-none focus:border-[#3EB489] w-80 md:w-100 dark:text-white`}
                        title="Rellene este campo"
                    />
                    
                    {errors.usus_email && (
                        <div>
                            <p className="text-red-500 text-sm absolute text-nowrap">{errors.usus_email}</p>
                        </div>
                        
                    )}
                </div>

                <div className="m-4 relative">
                    <input
                        type="password"
                        placeholder="Contraseña"
                        required
                        value={password}
                        onChange={(e) =>{
                            setPassword(e.target.value);
                        
                            const newErrors = { ...errors };
                            newErrors.usus_password = null;
                            setErrors(newErrors);
                        } 
                        } 
                        className={`${errors.usus_password ? 'border-red-500' : null} border-b-2 ${password ? 'border-b-2 border-[#3EB489]' : 'border-b-2 border-gray-300'} no-underline px-3 py-2 focus:outline-none focus:border-[#3EB489] w-80 md:w-100 dark:text-white`}
                        title="Rellene este campo"
                    />
                    {errors.usus_password && (
                        <p className="text-red-500 text-sm absolute text-nowrap ">{errors.usus_password}</p>
                    )}
                </div>

                <div className="m-4 relative">
                    <input
                        type="password"
                        placeholder="Repite la contraseña"
                        required
                        value={passwordRepeat}
                        onChange={(e) =>{
                            setPasswordRepeat(e.target.value);
                        
                            setErrorPassword(null);
                        } 
                        } 
                        className={`${errorPassword ? 'border-red-500' : null} border-b-2 ${passwordRepeat ? 'border-b-2 border-[#3EB489]' : 'border-b-2 border-gray-300'} no-underline px-3 py-2 focus:outline-none focus:border-[#3EB489] w-80 md:w-100 dark:text-white`}
                        title="Rellene este campo"
                    />
                    {errorPassword && (
                        <p className="text-red-500 text-sm absolute text-nowrap ">{errorPassword}</p>
                    )}
                </div>

                <button type="submit" className='bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded m-4'>
                    Dar de alta
                </button>
                <p className="text-sm  mt-2 dark:text-white">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/" className="text-blue-600 hover:underline dark:text-blue-400">
                        Inicia sesión aquí
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Registro;
