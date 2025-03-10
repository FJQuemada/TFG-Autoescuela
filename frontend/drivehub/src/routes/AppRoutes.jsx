import { BrowserRouter, Routes, Route } from "react-router";

import Home from "../pages/Home";
import Registro from "../pages/Registro";
import Login from "../pages/Login";

export default function AppRoutes(){
    return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registro />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)};