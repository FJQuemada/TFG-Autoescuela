const BeneficiosLanding = () =>{

    return(
        <div id="beneficios" className=" mx-auto text-center bg-[#eceaea]">
            <h2 className="text-6xl mb-6 p-10">Beneficios</h2>
            <p className="text-gray-600">Aprender solo puede resultar frustrante y aburrido, ¡Conecta con nuestra comunidad dedicada al mundo de la conducción!</p>
            <div className="flex space-x-18 justify-center px-42 py-10">
                <div className="bg-white flex-1 rounded-lg shadow-[#e3d9f0] shadow-md p-6">
                    <img src="src\assets\Placeholder.png" alt="Placeholder" className=" mx-auto p-10" />
                    <h3 className="text-xl font-semibold mb-2">Tests actualizados y personalizables</h3>
                    <p className="text-gray-600 text-sm">Completa nuestra amplia selección de tests o atrévete con los mejores retos creados por la comunidad.</p>
                </div>
                <div className="bg-white flex-1 rounded-lg shadow-[#e3d9f0] shadow-md p-6">
                    <img src="src\assets\Placeholder.png" alt="Placeholder" className=" mx-auto p-10" />
                    <h3 className="text-xl font-semibold mb-2">Corrección al momento</h3>
                    <p className="text-gray-600 text-sm">Tras finalizar tus tests o revisando tu perfil.</p>
                </div>
                <div className="bg-white flex-1 rounded-lg shadow-[#e3d9f0] shadow-md p-6">
                    <img src="src\assets\Placeholder.png" alt="Placeholder" className=" mx-auto p-10" />
                    <h3 className="text-xl font-semibold mb-2">Compite</h3>
                    <p className="text-gray-600 text-sm">Lleva tu aprendizaje al siguiente nivel y compite no solo contigo mismo, sino también con otros usuarios de la comunidad.</p>
                </div>
            </div>
    </div>
    )
    
}
export default BeneficiosLanding;