import React from 'react';
import "../app/globals.css";

export default function UpperNav() {
    return (
        <div className="h-16 flex justify-between items-center mt-5" >
        <div className="ml-10 flex gap-4">
            <h1 className="text-2xl font-medium text-customBlue">Visualizar</h1>
            <h1 className="text-2xl font-medium text-normalBlue">Inserir</h1>
        </div>
        <div className="mr-10 flex gap-4">
            <p className='text-xl text-normalBlue font-light'>Paciente</p>
            <p className='text-xl text-customBlue font-light'>Interno</p>
            <p className='text-xl text-normalBlue font-light'>Medico</p>
        </div>
        </div>
    );
    }