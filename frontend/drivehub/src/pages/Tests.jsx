import { verPreguntas, verRespuestas} from '../services/api'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Tests = () => {
    const [preguntas, setPreguntas] = useState(null); // Estado para almacenar las preguntas
    const [loading, setLoading] = useState(true); // Estado para controlar la carga
    const [respuestas, setRespuestas] = useState(null); // Estado para almacenar las respuestas

    useEffect(() => {
        // Esta función se ejecuta solo una vez cuando el componente se monta
        const fetchPreguntas = async () => {
            try {
                const preguntas = await verPreguntas(1); // Llamada a la API
                setPreguntas(preguntas); // Guardamos el resultado en el estado

                const resultados = await verRespuestas(2);
                setRespuestas(resultados);
                setLoading(false); // Cambiamos el estado de carga a false
            } catch (error) {
                console.error('Error al obtener las preguntas:', error);
                setLoading(false);
            }
        };

        fetchPreguntas(); // Llamamos a la función para obtener las preguntas
    }, []); // El array vacío hace que solo se ejecute una vez

    if (loading) {
        return <div>Cargando preguntas...</div>; // Mientras se cargan las preguntas
    }

    return (
        <div>
            <h1>Preguntas del Test</h1>
            <div>
                {respuestas ? (
                    <ul>
                        {respuestas.map((respuesta,index) => (
                            <li key={respuesta.pk_resp_id} className='text-black flex p-10'>
                                <h1>Respuesta{index}</h1>
                                {respuesta.resp_contenido}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No se encontraron preguntas.</p>
                )}
            </div>
            {preguntas ? (
                <ul>
                    {preguntas.map((pregunta,index) => (
                        <li key={pregunta.fk_preg_pgte_pregunta__pk_preg_id} className='text-black flex p-10'>
                            <h1>Pregunta{index}</h1>
                            {pregunta.fk_preg_pgte_pregunta__preg_enunciado}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron preguntas.</p>
            )}
        </div>
    );
};

export default Tests