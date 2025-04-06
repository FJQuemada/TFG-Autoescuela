import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import TestCard from '../components/Test/TestCard';
import { verTests } from '../services/api';

const Tests = () =>{

    const tests = async() =>{
        let resultado = await verTests();
        console.log(resultado);
    }  
    return(
        <MainLayout>
            <TestCard testNombre={"test1"}/>
            <button onClick={tests}>Ver tests</button>
        </MainLayout>
    )

}

export default Tests;