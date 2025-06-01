import { NavLink } from "react-router";
import { useNavigate,Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useState, useEffect, use } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend, BarChart, Bar, ResponsiveContainer, XAxis, YAxis  } from "recharts";
import { getStats, getLogrosUsuario, getRankingUsers } from "../services/api";

const Stats = () => {    
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [logrosUsuario, setLogrosUsuario] = useState([]); // Estado para almacenar los logros del usuario
    const [ranking, setRanking] = useState([]); // Estado para almacenar el ranking

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
        const fetchLogrosUsuario = async () => {
            try {
                const logros = await getLogrosUsuario(); // Asumiendo que getStats también devuelve los logros del usuario
                setLogrosUsuario(logros);
                // Aquí podrías actualizar el estado con los logros obtenidos si es necesario
            } catch (error) {
                console.error('Error al obtener los logros del usuario:', error);
            }
        }
        const fetchRanking = async () => {
            try {
                const rankingData = await getRankingUsers(); // Asumiendo que getRankingUsers devuelve el ranking de usuarios
                setRanking(rankingData);
                // Aquí podrías actualizar el estado con los datos del ranking si es necesario
            } catch (error) {
                console.error('Error al obtener el ranking de usuarios:', error);
            }
        }

        fetchRanking(); // Llamamos a la función para obtener el ranking de usuarios
        fetchLogrosUsuario(); // Llamamos a la función para obtener los logros del usuario
        fetchStats(); // Llamamos a la función para obtener las estadísticas
    }, []); // Este efecto se ejecuta una vez al montar el componente

    return (
        <div className="">
            <MainLayout>
                <div className="w-full h-full flex max-[600px]:flex-col max-[600px]:items-center max-[600px]:justify-center">
                    <div className="flex p-10 w-3/12 bg-[#ffffff21]">
                        <div className="flex flex-col p-10 h-full items-center w-full">
                            <PieChart width={300} height={300}>
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

                    <div className="flex flex-col items-center w-5/12 max-[600px]:w-9/12 h-full p-10 bg-[#ffffff21]">
                        <h1>Logros</h1>
                        <div className="flex flex-wrap items-center w-full h-full">
                            {logrosUsuario.length > 0 ? (
                                logrosUsuario.map((logro, index) => (
                                    <div key={index} className={`text-center space-y-1 mx-auto flex flex-col items-center w-[180px] h-[130px] p-2 m-2 ${logro.tiene_logro ? "bg-gradient-to-br from-green-300 via-green-400 to-green-500 cursor-" : "bg-gray-200"} rounded-lg`}>
                                        <h2 className="font-semibold mt-2">{logro.nombre}</h2>
                                        <p className="text-sm text-gray-500 p-3">{logro.descripcion}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">No tienes logros aún.</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col max-[600px]:w-8/12 w-4/12 h-full p-10">
                        <h1 className="text-3xl font-bold mb-5">Ranking</h1>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart
                                layout="vertical"
                                data={ranking}
                                margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis type="number" ticks={[0,5,10,15,20,25,30,35]} />
                                    <YAxis dataKey="usus_nombre" type="category" />
                                    <Tooltip />
                                    <Bar dataKey="usus_racha" fill="#80003e" />
                                </BarChart>
                            </ResponsiveContainer>
                                    
                    </div>


                </div>
            </MainLayout>
            
{/* import React, { PureComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Page A', uv: 4000},
  { name: 'Page B', uv: 3000},
  { name: 'Page C', uv: 2000},
  { name: 'Page D', uv: 2780},
  { name: 'Page E', uv: 1890},
  { name: 'Page F', uv: 2390},
  { name: 'Page G', uv: 3490},
];

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" ticks={[0, 1000, 2000, 3000, 4000, 5000]} />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="uv" fill="#8984d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
} */}

        </div>
    );
    
}
export default Stats;