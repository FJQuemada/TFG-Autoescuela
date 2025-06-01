import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    
    return (
        <div className="flex flex-col min-h-screen w-full dark:bg-[#1e1f24]">
            <Header />
            <div className='flex-1'>
                {children}
            </div>
            <Footer />
        </div>
    )
}
export default MainLayout