import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center w-full h-full">
        <h1 className="bg-blue-500 align-middle mt-10 w-fit">Home</h1>
        <button onClick={() => navigate("/register")}>Go to Registro</button>
        </div>
    );
    }
export default Home;