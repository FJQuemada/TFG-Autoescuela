import { useState, createContext, useContext } from "react";

// Crear el contexto
const UserContext = createContext();

// Componente proveedor del contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        nombre: ""
    });

    // Función para actualizar el usuario después de iniciar sesión
    const loginUser = (userData) => {
        setUser(userData);
    };

    // Función para cerrar sesión (restablecer datos del usuario)
    const logoutUser = () => {
        setUser({
            id: null,
            nombre: ""
        });
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook para acceder al contexto
export const useUser = () => useContext(UserContext);