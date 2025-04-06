import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log("No hay token, redirigiendo a login");
    return <Navigate to="/" />; // Si no hay token, redirige a login
  }
  return <Outlet />; // Si hay token, renderiza las rutas hijas, que son las rutas protegidas denominadas en AppRoutes.jsx
};

export default PrivateRoute;