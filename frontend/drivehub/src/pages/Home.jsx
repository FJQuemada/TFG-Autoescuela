import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center w-full h-full">
            <h1 className="text-4xl mt-10">Home</h1>
            <NavLink to="/login">Ir a Login</NavLink>
            <NavLink to="/register">Ir a Registro</NavLink>
            <button onClick={() => navigate("/login")}>Go to Login</button>
            <button onClick={() => navigate("/register")}>Go to Registro</button>
        </div>
    );
    }
export default Home;