import { Link } from 'react-router-dom';

const ComunidadLanding = () => (
  <div id="foro" className="px-4 py-16 md:p-24 max-w-screen-lg mx-auto">
    <div className="flex flex-col md:flex-row mb-8 items-center md:justify-around space-y-10 md:space-y-0 p-3">
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">Únete a la comunidad</h2>
        <p className="text-gray-600 mb-2 dark:text-gray-300">
          Comparte dudas, resuelve errores y aprende en comunidad.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Únete al espacio colaborativo donde los usuarios intercambian experiencias, resuelven preguntas y comparten recursos útiles para aprobar el examen teórico.
        </p>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img
          src="src/assets/Placeholder.png"
          alt="Placeholder"
          className="mx-auto max-w-full h-auto max-h-[350px] object-contain p-10"
        />
      </div>
    </div>

    <div className="text-center pt-10 md:pt-20">
      <p className="text-lg text-gray-700 mb-4 dark:text-gray-100">
        Comienza de manera gratuita tu preparación hoy y comparte el camino con otros aprendices.
      </p>
      <Link to="/register" className="text-lg text-indigo-600 hover:underline dark:text-blue-400">
        Regístrate ya
      </Link>
      <p className="text-gray-500 text-sm mt-2 dark:text-white">
        ¿Ya tienes cuenta?{' '}
        <a href="#" className="text-indigo-500 hover:text-indigo-700 dark:text-blue-400">
          Inicia sesión
        </a>
      </p>
    </div>
  </div>
);

export default ComunidadLanding;