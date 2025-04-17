import { Link } from 'react-router-dom';

const ComunidadLanding = () =>
    <div id='foro' className="p-24">
        <div className="mb-8 flex justify-around items-center">
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Únete a la comunidad</h2>
                <p className="text-gray-600">Comparte dudas, resuelve errores y aprende en comunidad.</p>
                <p className="text-gray-600">Únete al espacio colaborativo donde los usuarios intercambian experiencias, resuelven preguntas y comparten recursos útiles para aprobar el examen teórico.</p>
            </div>
            <div className="bg-gray-200 rounded-md w-96 flex items-center justify-center text-gray-400">
                <img src="src\assets\Placeholder.png" alt="Placeholder" className='object-cover' />
            </div>
        </div>

        <div className="text-center pt-20">
            <p className="text-lg text-gray-700">Comienza de manera gratuita tu preparación hoy y comparte el camino con otros aprendices.</p>
            <Link to="/register" className="text-lg">
                    <p className="">Registrate ya</p>
                </Link>
            <p className="text-gray-500 text-sm mt-2">
                ¿Ya tienes cuenta? <a href="#" className="text-indigo-500 hover:text-indigo-700">Inicia sesión</a>
            </p>
        </div>
    </div>

export default ComunidadLanding;