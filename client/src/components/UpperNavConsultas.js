import React, { useState } from 'react';
import "../app/globals.css";

export default function UpperNavConsultas({swapUrgent, swapHospitalized }) {

    const [isUrgent, setIsUrgent] = useState(true);
    const [isHospitalized, setIsHospitalized] = useState(false);

    const handleChooseUrgent = () => {
        setIsUrgent(true);
        setIsHospitalized(false);
    };

    const handleChooseHospitalized = () => {
        setIsUrgent(false);
        setIsHospitalized(true);
    };

    return (
        <div className="h-16 flex justify-between items-center mt-5 ">
            <div className="ml-12 flex gap-4 items-center justify-center">
                <h1 className="text-3xl font-medium text-customBlue cursor-pointer">Visualizar</h1>
            </div>
                <ul className="flex gap-4 items-center justify-center">
                    <li className="text-xl font-medium text-black cursor-pointer">Ordenar:</li>
                    <li className="text-xl text-normalBlue font-light cursor-pointer transform hover:scale-125">• Data </li>
                    <li className="text-xl text-normalBlue font-light cursor-pointer transform hover:scale-125">• CPF Paciente</li>
                    <li className="text-xl text-normalBlue font-light cursor-pointer transform hover:scale-125">• CPF Médico</li>
                </ul>
            <div className="mr-12 flex gap-4"> 
                <p className='text-xl text-normalBlue font-light cursor-pointer transform hover:scale-125' onClick={() => {swapUrgent(); handleChooseUrgent();}} style = {{ color: isUrgent ? '#063866' : '#0671D3' }}>Urgencia</p>
                <p className='text-xl text-customBlue font-light cursor-pointer transform hover:scale-125' onClick={() => {swapHospitalized(); handleChooseHospitalized();}} style = {{color: isHospitalized? '#063866' : '#0671D3' }}>Internados</p>
            </div>
        </div>
    );
}
