import { Navigate, Outlet } from 'react-router-dom';
import { UseUser } from '../contexts/UserContext';

const PrivateRoute = () => {
  // Obtiene el token del localStorage
  //const { token } = UseUser(); // Obtiene el token del contexto de usuario
  const token = localStorage.getItem('access_token'); // Obtiene el token del localStorage
  // Si no hay token, redirige a la página de login
  if (!token) {
    console.log("No hay token, redirigiendo a login");
    return <Navigate to="/" />; // Si no hay token, redirige a login
  }
  return <Outlet />; // Si hay token, renderiza las rutas hijas, que son las rutas protegidas denominadas en AppRoutes.jsx
};

export default PrivateRoute;