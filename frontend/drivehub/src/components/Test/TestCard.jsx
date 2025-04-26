import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TestCard = ({testId,testNombre}) => {
    return(
        <div className='flex w-full h-96 justify-center items-center'>
                <Link id={testId} className='' to={"/test/1"}>
                    <p className="">{testNombre}</p>
                </Link> 
        </div>
    )
}

export default TestCard
