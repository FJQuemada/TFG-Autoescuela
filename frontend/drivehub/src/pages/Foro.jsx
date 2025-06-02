import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout"; 
import { getForoPosts, postForoPost } from "../services/api";
import { useNavigate } from "react-router-dom";

const ForoPage = () => {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    cargarPosts();
  }, []);

  const cargarPosts = async () => {
    const data = await getForoPosts();
    if (!data || data.error) {
      alert('Error al cargar los posts del foro');
      return;
    }
    setPosts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postForoPost(titulo, contenido);
      setTitulo('');
      setContenido('');
      cargarPosts(); // Refresca los posts
    } catch (err) {
      alert('Error al publicar el post');
    }
  };

  return (
    <MainLayout>
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-medium mb-4 dark:text-white">Crea tu post</h1>

          <form onSubmit={handleSubmit} className="mb-6 dark:text-white">
            <input
              type="text"
              placeholder="Título del post"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded mb-2 dark:text-white dark:placeholder:text-white"
              required
            />
            <textarea
              placeholder="Contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded mb-2 h-24 dark:text-white dark:placeholder:text-white"
              required
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Publicar
            </button>
          </form>

          <div className="space-y-4">
            {posts.map((post) => (
              <div 
                key={post.pk_pofr_id} 
                className="p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow dark:bg-[#2e2f35]">     
                <div className="flex items-center text-sm text-gray-500 mb-1 dark:text-white">
                  <span className="font-semibold text-gray-700 dark:text-white">👤{post.fk_usus_pofr_usuario__usus_nombre}</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-500 dark:text-[#82959b] italic">{new Date(post.pofr_fecha).toLocaleString()}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{post.pofr_titulo}</h2>
                <p className="text-gray-800 dark:text-white leading-relaxed ml-3">{post.pofr_contenido}</p>
                <div className="mt-3 italic inline-block text-gray-600 dark:text-white cursor-pointer"
                  onClick={() => navigate(`/foro/post/${post.pk_pofr_id}`)}>
                  Responder / Ver respuestas ({post.numero_respuestas})
                </div>
              </div>
            ))}
          </div>
      </div>
    </MainLayout>
    );
}

export default ForoPage;