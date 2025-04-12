import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const PrivateRoute = () => {
  const { token } = useUser(); // Extraemos el token del contexto de usuario
  // Si no hay token, redirige a la página de login
  if (!token) {
    console.log("No hay token, redirigiendo a login");
    return <Navigate to="/" />; // Si no hay token, redirige a login
  }
  return <Outlet />; // Si hay token, renderiza las rutas hijas, que son las rutas protegidas denominadas en AppRoutes.jsx
};

export default PrivateRoute;