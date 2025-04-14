import { useState, createContext, useContext, useEffect } from "react";
import { cerrarSesion } from "../services/api"; // Importamos la función cerrarSesion del servicio api.js

// Crear el contexto, cuyo objetivo es almacenar el nombre, id y token del usuario para que se pueda acceder desde cualquier parte de la aplicación
const UserContext = createContext();

// Hook para usar el contexto de usuario
export const UseUser = () => {
    return useContext(UserContext);
};

// Componente proveedor del contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        nombre: "",
    });
    const [token, setToken] = useState(null);

    // Recuperamos el usuario y token de localStorage cuando el componente se monta, es decir, cuando la aplicación se carga por primera vez
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("access_token");

        // Si existen en localStorage, los seteamos en el estado
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    // Función para actualizar el usuario después de iniciar sesión
    const loginUser = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem("user", JSON.stringify(userData)); // Guardamos el usuario en localStorage
        localStorage.setItem("access_token", userToken);               // Guardamos el token en localStorage
        console.log("Usuario guardado en localStorage", userData);
        console.log("Token guardado en localStorage", userToken);
    };

    // Función para cerrar sesión (restablecer datos del usuario)
    const logoutUser = () => {
        setUser({
            id: null,
            nombre: "",
        });
        setToken(null);
        localStorage.removeItem("user");  // Eliminamos el usuario de localStorage
        localStorage.removeItem("access_token"); // Eliminamos el token de localStorage
        const resultado = cerrarSesion(); // Llamamos a la función cerrarSesion del servicio api.js
        console.log("Sesion cerrada", resultado);
    };

    return (
        <UserContext.Provider value={{ user, token, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

