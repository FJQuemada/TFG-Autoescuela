import { verPreguntas, verRespuestas} from '../services/api'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const Tests = () => {

    const { testId } = useParams(); // Obtenemos el id del test de los parámetros de la URL

    const [preguntas, setPreguntas] = useState(null); // Estado para almacenar las preguntas
    const [loading, setLoading] = useState(true); // Estado para controlar la carga
    const [respuestas, setRespuestas] = useState(null); // Estado para almacenar las respuestas

    const Respuestas = () => {
        for (let i = 0; i < preguntas.length; i++) {
            const pregunta = preguntas[i];
            const respuestas = verRespuestas(pregunta.fk_preg_pgte_pregunta__pk_preg_id);
            setRespuestas(respuestas);
        }
    }
    

    useEffect(() => {
        // Esta función se ejecuta solo una vez cuando el componente se monta
        const fetchPreguntas = async () => {
            try {
                const preguntas = await verPreguntas(testId); // Llamada a la API
                setPreguntas(preguntas); // Guardamos el resultado en el estado
                setLoading(false); // Cambiamos el estado de carga
            } catch (error) {
                console.error('Error al obtener las preguntas:', error);
                setLoading(false);
            }
        };

        fetchPreguntas(); // Llamamos a la función para obtener las preguntas
    }, [testId]); // Este efecto depende del id del test

    if (loading) {
        return <div>Cargando preguntas...</div>; // Mientras se cargan las preguntas
    }

    return (
        <MainLayout>
            <h1>Preguntas del Test</h1>
            <div>
                <Link to="/tests">Volver a la lista de tests</Link>
            </div>
            <button onClick={Respuestas}>Ver respuestas</button>
            
            {preguntas ? (
                <ul>
                    {preguntas.map((pregunta) => (
                        <li key={pregunta.pregunta.fk_preg_pgte_pregunta__pk_preg_id} className="text-black flex p-10">
                            <h1>Pregunta {pregunta.pregunta.fk_preg_pgte_pregunta__pk_preg_id}</h1>
                            {pregunta.pregunta.fk_preg_pgte_pregunta__preg_enunciado}
                            <ul>
                                {pregunta.respuestas.map((respuesta) => (
                                    <li key={respuesta.pk_resp_id}>
                                        {respuesta.resp_contenido}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron preguntas.</p>
            )}
        </MainLayout>
    );
};

export default Tests