import React, { use } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TestCard = ({ testId, testNombre, testDificultad }) => {

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
      <Link id={testId} className="items-center w-52 h-32 bg-gray-200 rounded-lg shadow-md p-4 m-4 cursor-pointer" to={`/test/${testId}`}>
        <p className="font-semibold">{testNombre}</p>
        <div className="flex mt-2">
            <div className={`w-5 h-5 rounded-full mr-2 ${dificultadColor}`}></div>
            <p>{testDificultad}</p>
        </div>
      </Link>
    );
  };

export default TestCard
