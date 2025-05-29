import Header from '../components/Header';
import HeaderLogin from '../components/HeaderLogin';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header />
            <div className='flex-1'>
                {children}
            </div>
            <Footer />
        </div>
    )
}
export default MainLayout