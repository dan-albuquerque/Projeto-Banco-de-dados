import React, { useState } from 'react';
import "../app/globals.css";
import SearchBar from './SearchBar';

export default function UpperNavConsultas({ swapUrgent, swapHospitalized, onData, toggleMyConsultas, isMyConsultas, cancelSearch }) {

  const [isUrgent, setIsUrgent] = useState(true);
  const [isHospitalized, setIsHospitalized] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [isSearch, setIsSearch] = useState(false);



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

  const chooseUserType = () => {
    if (isUrgent) {
      return 'consulta_urgencia';
    } else if (isHospitalized) {
      return 'consulta_internado';
    }
  }


  return (
    <div className="h-16 flex justify-between items-center mt-5 ">
      <div className="ml-12 flex gap-4 items-center justify-center">
        <h1 className="text-3xl font-medium text-customBlue">Visualizar Consultas</h1>
      </div>
      <p
        onClick={toggleMyConsultas}
        className=" text-normalBlue cursor-pointer transition-transform duration-200 hover:scale-105 text-lg"
      >
        {isMyConsultas ? '• Ver Todas Consultas' : '• Ver Minhas Consultas'}
      </p>

      <SearchBar userType={chooseUserType()}
        onSearch={handleSearchData} 
        onCancelSearch={()=>[cancelSearch(), console.log("2. Estou na segunda etapa. fui passado de searchbar para uppernavconsultas")]}
        searchText={'Pesquise por pacientes...'}

        sear/>

      <div className="mr-12 flex gap-4">
        <p className='text-xl text-normalBlue font-light cursor-pointer transition-transform duration-200 hover:scale-125' onClick={() => { swapUrgent(); handleChooseUrgent(); }} style={{ color: isUrgent ? '#063866' : '#0671D3' }}>Urgencia</p>
        <p className='text-xl text-customBlue font-light cursor-pointer transition-transform duration-200 hover:scale-125' onClick={() => { swapHospitalized(); handleChooseHospitalized(); }} style={{ color: isHospitalized ? '#063866' : '#0671D3' }}>Internados</p>
      </div>
    </div>
  );
}