import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    
    return (
        <div className="h-full w-full">
            <Header />
            {children}
            {/* <Footer /> */}
        </div>
    )
}
export default MainLayout