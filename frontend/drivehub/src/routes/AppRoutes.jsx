import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import Login from "../pages/Login";

export default function AppRoutes(){
    return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registro />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
)};