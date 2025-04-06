import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '../contexts/UserContext';

const MainLayout = ({ children }) => {
    
    const { user,token } = useUser(); // Accede a los datos del usuario desde el contexto
    return (
        <div className="h-full w-full">
            <h1>{user.nombre}</h1>
            <h2>{token}</h2>
            <Header />
            {children}
            {/* <Footer /> */}
        </div>
    )
}
export default MainLayout