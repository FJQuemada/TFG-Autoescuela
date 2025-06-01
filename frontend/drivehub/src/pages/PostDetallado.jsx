import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { getForoPostById, getRespuestasByPostId, postRespuestaByPostId } from '../services/api';

const PostDetalle = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [nuevaRespuesta, setNuevaRespuesta] = useState('');
  const [error, setError] = useState(null);
  const [loadingRespuestas, setLoadingRespuestas] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await getForoPostById(id);
        setPost(response);
      } catch (error) {
        setError('Error al cargar el post.');
      }
    }
    fetchPost();
  }, [id]);

  useEffect(() => {
    cargarRespuestas();
  }, [id]);

  const cargarRespuestas = async () => {
    setLoadingRespuestas(true);
    try {
      const data = await getRespuestasByPostId(id);
      setRespuestas(data);
    } catch (error) {
      setError('Error al cargar las respuestas.');
    } finally {
      setLoadingRespuestas(false);
    }
  };

  const handleSubmitRespuesta = async (e) => {
    e.preventDefault();
    if (!nuevaRespuesta.trim()) return;
    try {
      await postRespuestaByPostId(id, nuevaRespuesta);
      setNuevaRespuesta('');
      cargarRespuestas();
    } catch (error) {
      setError('Error al enviar la respuesta.');
    }
  };

  if (error) return <MainLayout><p className="text-red-500">{error}</p></MainLayout>;
  if (!post) return <MainLayout><p>Cargando post...</p></MainLayout>;

  return (
    <MainLayout>
      <div className="w-[768px] mx-auto p-6 rounded relative ">
        <div
          onClick={() => navigate('/foro')}
          className="absolute left-[-20px] top-[15px] p-2 cursor-pointer"
          title="Volver al foro"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black dark:text-white">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <path d="M4 12H20M4 12L8 8M4 12L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g>
          </svg>
        </div>
        <div className='mb-8'>
          <div className="flex justify-between mb-2 ">
            <span className="font-semibold dark:text-white">👤{post.fk_usus_pofr_usuario__usus_nombre}</span>
            <span className="text-gray-500 dark:text-[#82959b] text-sm">{new Date(post.pofr_fecha).toLocaleString()}</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{post.pofr_titulo}</h1>
          <p className='text-gray-800 dark:text-white leading-relaxed'>{post.pofr_contenido}</p>
        </div>

        <form onSubmit={handleSubmitRespuesta} className="my-6">
          <label htmlFor="respuesta" className="block mb-2 font-semibold text-lg dark:text-white">
            Añadir una respuesta
          </label>
          <textarea
            id="respuesta"
            className="w-full p-2 border border-gray-400 rounded mb-2 dark:text-white dark:placeholder:text-white"
            placeholder=''
            rows="4"
            value={nuevaRespuesta}
            onChange={(e) => setNuevaRespuesta(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Enviar respuesta
          </button>
        </form>

        <div>
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Respuestas</h2>
          {loadingRespuestas ? (
            <p className='text-gray-900 dark:text-white'>Cargando respuestas...</p>
          ) : respuestas.length === 0 ? (
            <p className='text-gray-900 dark:text-white'>No hay respuestas aún.</p>
          ) : (
            respuestas.map((resp) => (
              <div key={resp.pk_refe_id} className="p-3 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow my-4 dark:bg-[#2e2f35]">
                <div className="flex justify-between text-sm mb-1">
                  <span className='text-gray-700 font-semibold dark:text-white'>👤{resp.fk_usus_refe_usuario__usus_nombre || 'Anónimo'}</span>
                  <span className='text-gray-500 dark:text-[#82959b]'>{new Date(resp.refe_fecha).toLocaleString()}</span>
                </div>
                <p className='break-words dark:text-white'>{resp.refe_contenido}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PostDetalle;
