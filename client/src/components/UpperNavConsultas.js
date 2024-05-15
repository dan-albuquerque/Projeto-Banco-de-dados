import React, { useState } from 'react';
import "../app/globals.css";
import SearchBar from './SearchBar';


  export default function UpperNavConsultas({swapUrgent, swapHospitalized, onData}) {

    const [isUrgent, setIsUrgent] = useState(true);
    const [isHospitalized, setIsHospitalized] = useState(false);
    const [searchData, setSearchData] = useState('');

    const handleSearchData = (data) => {
        setSearchData(data);
        onData(data);
    };

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
                <h1 className="text-3xl font-medium text-customBlue cursor-pointer">Visualizar Consultas</h1>
            </div>
                <ul className="flex gap-4 items-center justify-center">
                    <li className="text-xl font-medium text-black cursor-pointer">Ordenar:</li>
                    <li className="text-xl text-normalBlue font-light cursor-pointer transition-transform duration-200 hover:scale-125">• Data </li>
                    <li className="text-xl text-normalBlue font-light cursor-pointer transition-transform duration-200 hover:scale-125">• CPF Paciente</li>
                    <li className="text-xl text-normalBlue font-light cursor-pointer transition-transform duration-200 hover:scale-125">• CPF Médico</li>
                </ul>

            <SearchBar userType='consulta_internado'
            onSearch={handleSearchData}/>

            <div className="mr-12 flex gap-4"> 
                <p className='text-xl text-normalBlue font-light cursor-pointer transition-transform duration-200 hover:scale-125' onClick={() => {swapUrgent(); handleChooseUrgent();}} style = {{ color: isUrgent ? '#063866' : '#0671D3' }}>Urgencia</p>
                <p className='text-xl text-customBlue font-light cursor-pointer transition-transform duration-200 hover:scale-125' onClick={() => {swapHospitalized(); handleChooseHospitalized();}} style = {{color: isHospitalized? '#063866' : '#0671D3' }}>Internados</p>
            </div>
        </div>
  );
}
