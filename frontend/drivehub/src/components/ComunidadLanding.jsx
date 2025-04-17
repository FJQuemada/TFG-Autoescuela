const ComunidadLanding = () =>
    <div className="p-32 shadow-md ">
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Únete a la comunidad</h2>
                <p className="text-gray-600">Comparte dudas, resuelve errores y aprende en comunidad.</p>
                <p className="text-gray-600">Únete al espacio colaborativo donde los usuarios intercambian experiencias, resuelven preguntas y comparten recursos útiles para aprobar el examen teórico.</p>
            </div>
            <div className="bg-gray-200 rounded-md aspect-w-1 aspect-h-1 flex items-center justify-center text-gray-400">
                Foto del foro cuando este listo
            </div>
        </div>

        <div className="text-center">
            <p className="text-lg text-gray-700 mb-4">Comienza de manera gratuita tu preparación hoy y comparte el camino con otros aprendices.</p>
            <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline">
                Regístrate ya
            </a>
            <p className="text-gray-500 text-sm mt-2">
                ¿Ya tienes cuenta? <a href="#" className="text-indigo-500 hover:text-indigo-700">Inicia sesión</a>
            </p>
        </div>
    </div>

export default ComunidadLanding;