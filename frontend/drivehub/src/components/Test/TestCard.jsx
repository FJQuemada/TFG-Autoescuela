import React, { use } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TestCard = ({ testId, testNombre, testDificultad, puntuacion }) => {

    const colorTest = () =>{
      if (puntuacion.teus_fallos <= 3){
        return 'bg-green-200';
      }else if (puntuacion.teus_fallos > 3){
        return 'bg-red-200';
      }
    }

    let dificultadColor;

    if (testDificultad == "Fácil") {
      dificultadColor = "bg-green-400";

    } else if (testDificultad == "Intermedio") {
      dificultadColor = "bg-yellow-400";
    }
    else if (testDificultad == "Difícil") {
        dificultadColor = "bg-red-400";
    }
    else if (testDificultad == "Experto") {
        dificultadColor = "bg-purple-400";
    }

    return (
      <Link id={testId} className={`items-center w-64 h-48 ${puntuacion ? colorTest() : "bg-gray-200 dark:bg-[#b0b5cf]"} rounded-lg shadow-md p-4 m-4 cursor-pointer`} to={`/test/${testId}`}>
        <p className="font-semibold">{testNombre}</p>
        <div className="flex flex-col mt-2">
          <div className="flex items-center mb-2">
            <div className={`w-5 h-5 rounded-full mr-2 ${dificultadColor}`}></div>
            <p>{testDificultad}</p>
          </div>  
          {puntuacion ? (
            <>
              <h3 className="text-sm font-semibold text-gray-700">Mejor puntuación</h3>
              <div className="mt-1 text-xs text-gray-600 space-y-1">
                <p>✅ Aciertos: {puntuacion.teus_aciertos} &nbsp; ❌ Fallos: {puntuacion.teus_fallos}</p>
                {/* <p>⏱️ Tiempo: {puntuacion.teus_tiempo}</p> */}
              </div>
            </>
          ) : (
            <p className="text-xs text-gray-500 italic">No has realizado este test</p>
          )}
        </div>
      </Link>
    );
  };

export default TestCard
