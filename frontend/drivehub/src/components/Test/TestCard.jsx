import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TestCard = ({testNombre}) => {
    return(
        <div className='flex w-full h-96 justify-center items-center'>
                <Link className='text-white' to={"/test/1"}>
                <p className="text-white">{testNombre}</p>
                </Link> 
        </div>
    )
}

export default TestCard
