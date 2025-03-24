import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import Login from "../pages/Login";
import Tests from "../pages/Tests";

export default function AppRoutes(){
    return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registro />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tests" element={<Tests />} />
      <Route path="/tests/:testId" element={<Tests />} />
    </Routes>
  </BrowserRouter>
)};