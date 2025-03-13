import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const Navigate = useNavigate();

    return (
        <div>
        <h1 className="bg-amber-600">Login</h1>

        <button onClick={() => Navigate("/register")}>
            ir al registro
        </button>
        </div>

        
    );
    }

export default Login;