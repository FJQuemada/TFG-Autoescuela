import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';

const Tests = () =>{

    return(
        <MainLayout>
            <div className='flex w-full h-96 justify-center items-center'>
                <Link className='text-white' to={"/tests/1"}>
                <p className="text-white">Test-1</p>
            </Link> 
            </div>
            
        </MainLayout>
    )

}

export default Tests;