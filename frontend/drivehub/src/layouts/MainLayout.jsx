import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '../contexts/UserContext';

const MainLayout = ({ children }) => {
    
    const { user } = useUser(); // Accede a los datos del usuario desde el contexto
    console.log(user); // Muestra los datos del usuario en la consola
    return (
        <div className="h-full w-full">
            <h1>{user.nombre}</h1>
            <Header />
            {children}
            {/* <Footer /> */}
        </div>
    )
}
export default MainLayout