import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Resu = () => {

  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [sumario, setSumario] = useState(0);
  const respuestasParaBackend = location.state?.respuestasParaBackend;
  console.log("Respuestas para el backend: ", respuestasParaBackend);
  console.log("Resultado Teste");
  return (
    <div className="container">
      <h1>Resultado Test</h1>
      <p>Resultado do teste aqui...</p>
    </div>
  );
}

export default Resu;