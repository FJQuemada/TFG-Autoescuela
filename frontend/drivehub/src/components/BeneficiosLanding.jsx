const BeneficiosLanding = () => {
  return (
    <div id="beneficios" className="mx-auto text-center bg-[#eceaea] dark:bg-[#2b2c33] py-16 px-6">
      <h2 className="text-4xl md:text-6xl mb-6 p-4 md:p-10 dark:text-white">Beneficios</h2>
      <p className="text-gray-600 max-w-3xl mx-auto mb-10 dark:text-gray-200">
        Aprender solo puede resultar frustrante y aburrido, ¡Conecta con nuestra comunidad dedicada al mundo de la conducción!
      </p>
      <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 justify-center px-4 md:px-20">
        <div className="bg-white flex-1 rounded-lg shadow-[#e3d9f0] dark:shadow-none shadow-md p-6 max-w-sm mx-auto">
          <img
            src="src/assets/Placeholder.png"
            alt="Placeholder"
            className="mx-auto p-6 max-w-full h-48 md:h-60 object-contain"
          />
          <h3 className="text-xl font-semibold mb-2">Tests actualizados y personalizables</h3>
          <p className="text-gray-600 text-sm">
            Completa nuestra amplia selección de tests o atrévete con los mejores retos creados por la comunidad.
          </p>
        </div>
        <div className="bg-white flex-1 rounded-lg shadow-[#e3d9f0] dark:shadow-none shadow-md p-6 max-w-sm mx-auto">
          <img
            src="src/assets/Placeholder.png"
            alt="Placeholder"
            className="mx-auto p-6 max-w-full h-48 md:h-60 object-contain"
          />
          <h3 className="text-xl font-semibold mb-2">Corrección al momento</h3>
          <p className="text-gray-600 text-sm">Tras finalizar tus tests o revisando tu perfil.</p>
        </div>
        <div className="bg-white flex-1 rounded-lg shadow-[#e3d9f0] dark:shadow-none shadow-md p-6 max-w-sm mx-auto">
          <img
            src="src/assets/Placeholder.png"
            alt="Placeholder"
            className="mx-auto p-6 max-w-full h-48 md:h-60 object-contain"
          />
          <h3 className="text-xl font-semibold mb-2">Compite</h3>
          <p className="text-gray-600 text-sm">
            Lleva tu aprendizaje al siguiente nivel y compite no solo contigo mismo, sino también con otros usuarios de la comunidad.
          </p>
        </div>
      </div>
    </div>
  );
};
export default BeneficiosLanding;