import { BrowserRouter, Routes, Route } from "react-router";

import App from "../App";
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import Login from "../pages/Login";

export default function AppRoutes(){
    return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<App />} />
      <Route path="/register" element={<Registro />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)};