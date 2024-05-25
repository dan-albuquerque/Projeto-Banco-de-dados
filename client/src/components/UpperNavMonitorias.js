import React, { useState } from 'react';
import "../app/globals.css";
import SearchBar from './SearchBar';

export default function UpperNavMonitorias({ onData, cancelSearch, monitoraType }) {
  const [searchData, setSearchData] = useState('');

  const handleSearchData = (data) => {
    setSearchData(data);
    onData(data);
  };


  return (
    <div className="h-16 flex justify-between items-center mt-5 mr-12">
      <div className="ml-12 flex gap-4 items-center justify-center">
        <h1 className="text-3xl font-medium text-customBlue">Visualizar Monitorias</h1>
      </div>

      <SearchBar
        onSearch={handleSearchData}
        onCancelSearch={() => {
          cancelSearch();
          console.log("2. Estou na segunda etapa. fui passado de searchbar para uppernavmonitorias");
        }}
        userType={monitoraType}
      />
    </div>
  );
}
