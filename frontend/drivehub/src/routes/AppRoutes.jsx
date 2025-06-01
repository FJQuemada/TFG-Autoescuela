import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import Login from "../pages/Login";
import Test from "../pages/Test";
import Tests from "../pages/Tests"
import ResultadoTest from "../pages/ResultadoTest";
import Stats from "../pages/Stats";
import PrivateRoute from "../components/PrivateRoute";
import PreguntasEncadenadas from "../pages/PreguntasEncadenadas";
import Foro from "../pages/Foro";
import PostDetallado from "../pages/PostDetallado";

export default function AppRoutes(){
    return(
  <BrowserRouter>
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registro />} />
      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/test/:testId" element={<Test />} />
        <Route path="/test/:testId/resultado" element={<ResultadoTest />}></Route>
        <Route path="/stats" element={<Stats />}></Route>
        <Route path="/preguntasEncadenadas" element={<PreguntasEncadenadas />}></Route>
        <Route path="/foro" element={<Foro />}></Route>
        <Route path="/foro/post/:id" element={<PostDetallado />} />
      </Route>
    </Routes>
  </BrowserRouter>
)};