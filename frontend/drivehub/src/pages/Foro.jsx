import { useState } from "react";
import MainLayout from "../layouts/MainLayout"; 

export default function Foro() {
  const [nuevoPost, setNuevoPost] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, contenido: "¡Bienvenido al foro de autoescuela!" },
    { id: 2, contenido: "¿Alguien sabe cuántos fallos se permiten en el examen?" },
  ]);
  const [postRespondiendoId, setPostRespondiendoId] = useState(null);
  const [respuesta, setRespuesta] = useState("");

  const manejarPublicacion = () => {
    if (nuevoPost.trim() === "") return;
    const nuevo = {
      id: posts.length + 1,
      contenido: nuevoPost,
    };
    setPosts([nuevo, ...posts]);
    setNuevoPost("");
  };

  const manejarClickPost = (id) => {
    setPostRespondiendoId((prev) => (prev === id ? null : id)); // alterna visibilidad
    setRespuesta(""); // limpia el textarea al cambiar
  };

  const manejarRespuesta = () => {
    // Aquí iría la lógica de envío de respuesta
    setRespuesta("");
    setPostRespondiendoId(null);
  };

  return (
    <MainLayout>
        <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Foro de estudiantes</h1>

      <div className="bg-white shadow rounded-2xl p-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows={4}
          placeholder="Comparte tu duda o comentario..."
          value={nuevoPost}
          onChange={(e) => setNuevoPost(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl transition"
            onClick={manejarPublicacion}
          >
            Publicar
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 shadow-sm rounded-2xl p-4 cursor-pointer"
            onClick={() => manejarClickPost(post.id)}
          >
            <p className="text-gray-800">{post.contenido}</p>

            {postRespondiendoId === post.id && (
              <div className="mt-3">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  rows={3}
                  placeholder="Escribe tu respuesta..."
                  value={respuesta}
                  onChange={(e) => setRespuesta(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1 rounded-xl transition"
                    onClick={manejarRespuesta}
                  >
                    Responder
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </MainLayout>
  );
}