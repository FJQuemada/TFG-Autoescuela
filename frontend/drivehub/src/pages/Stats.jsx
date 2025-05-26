import { NavLink } from "react-router";
import { useNavigate,Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useState, useEffect, use } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend  } from "recharts";
import { getStats } from "../services/api";

const Stats = () => {    
    const navigate = useNavigate();
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const stats = await getStats();
                setData(stats);
                // Aquí podrías actualizar el estado con los datos obtenidos si es necesario
            } catch (error) {
                console.error('Error al obtener las estadísticas:', error);
            }
        };

        fetchStats(); // Llamamos a la función para obtener las estadísticas
    }, []); // Este efecto se ejecuta una vez al montar el componente

    return (
        <div className="">
            <MainLayout>
                <div className="w-full h-full flex">
                    <div className="flex p-10 w-4/12 h-[65vh] bg-[#ffffff21]">
                        <div className="flex flex-col p-10 h-full items-center w-full">
                            <PieChart width={500} height={500}>
                                <Pie data={data} dataKey="valor" nameKey="nombre" startAngle={180} endAngle={0} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                    <Legend verticalAlign="top" height={36}/>
                                </Pie>
                                
                                <Tooltip />
                            </PieChart>
                        </div>
                    </div>
                    <div className="flex flex-col w-4/12 h-full p-10">
                        <h1 className="text-3xl font-bold mb-5">Estadísticas de Tests</h1>
                        <p className="text-lg mb-2">Total de tests realizados: 45</p>
                        <p className="text-lg mb-2">Tests aprobados: 30</p>
                        <p className="text-lg mb-2">Tests suspensos: 10</p>
                        <p className="text-lg mb-2">Tests sin hacer: 5</p>
                        <p className="text-lg mb-2">Mejor puntuación: 95/100</p>
                        <p className="text-lg mb-2">Peor puntuación: 60/100</p>
                        <p className="text-lg mb-2">Tiempo medio por test: 15 minutos</p>
                                    
                        <p className="text-lg mb-2">Test más difícil: Test de Matemáticas</p>
                        <p className="text-lg mb-2">Test más fácil: Test de Geografía</p>
                        <p className="text-lg mb-2">Test más reciente: Test de Historia</p>
                        <p className="text-lg mb-2">Test más antiguo: Test de Lengua</p>
                                    
                    </div>

                    <div className="flex flex-col items-center w-4/12 h-full p-10 bg-[#ffffff21]">
                        <h1>Medallas</h1>
                        <div className="flex flex-col items-center w-full h-full">
                            <div className="flex flex-col items-center bg-yellow-300 p-5 m-2 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold">Medalla de Oro</h2>
                                <p>Por completar 10 tests con una puntuación superior al 80%</p>
                            </div>
                            <div className="flex flex-col items-center bg-silver-300 p-5 m-2 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold">Medalla de Plata</h2>
                                <p>Por completar 5 tests con una puntuación superior al 70%</p>
                            </div>
                            <div className="flex flex-col items-center bg-bronze-300 p-5 m-2 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold">Medalla de Bronce</h2>
                                <p>Por completar 3 tests con una puntuación superior al 60%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
            
        </div>
    );
    
}
export default Stats;