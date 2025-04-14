import Header from '../components/Header';
import Footer from '../components/Footer';
import { UseUser } from '../contexts/UserContext';

const MainLayout = ({ children }) => {
    
    const { user,token,logoutUser } = UseUser(); // Accede a los datos del usuario desde el contexto
    return (
        <div className="h-full w-full">
            <h1>{user.nombre}</h1>
            <h2>{token}</h2>
            <button onClick={logoutUser}>Cerrar sesión</button>
            <Header />
            {children}
            {/* <Footer /> */}
        </div>
    )
}
export default MainLayout