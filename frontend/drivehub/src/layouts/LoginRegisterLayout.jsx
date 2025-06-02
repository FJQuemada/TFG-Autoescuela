import HeaderLogin from '../components/HeaderLogin';
import Footer from '../components/Footer';

const LoginRegisterLayout = ({ children }) => {
    
    return (
        <div className="flex flex-col min-h-screen w-full dark:bg-[#1e1f24]">
            <HeaderLogin />
            <div className='flex-1'>
                {children}
            </div>
            <Footer />
        </div>
    )
}
export default LoginRegisterLayout