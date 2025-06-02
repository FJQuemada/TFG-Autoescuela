import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import TestCard from '../components/Test/TestCard';
import { verTests } from '../services/api';

const Tests = () =>{

    const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
    const [tests, setTests] = useState([]); // Estado para almacenar los tests obtenidos

    useEffect(() => {
            // Esta función se ejecuta solo una vez cuando el componente se monta
            const fetchTests = async () => {
                try {
                    const listaTests = await verTests(); // Llamada a la API
                    console.log(listaTests);
                    setTests(listaTests)
                    setLoading(false); // Cambiamos el estado de carga
                } catch (error) {
                    console.error('Error al obtener las preguntas:', error);
                    setLoading(false);
                }
            };
    
            fetchTests(); // Llamamos a la función para obtener las preguntas
        }, []); // Este efecto depende del id del test

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-screen">
                    <h1 className="text-2xl font-bold">Cargando tests...</h1>
                </div>
            </MainLayout>
        );
    }

    return(
        <MainLayout>
            <div className='flex flex-wrap justify-center mt-[60px] items-center w-full'>
                {
                    tests && tests.map((test)=>(
                        <TestCard key={test.id} testId={test.id} testNombre={test.nombre} testDificultad={test.dificultad} puntuacion={test?.puntuacion}/>
                    ))
                }
            </div>
            
        </MainLayout>
    )

}

export default Tests;