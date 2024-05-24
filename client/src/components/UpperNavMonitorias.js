import React, { useState } from 'react';
import "../app/globals.css";
import SearchBar from './SearchBar';

export default function UpperNavMonitorias() {

  return (
    <div className="h-16 flex justify-between items-center mt-5 mr-12">
      <div className="ml-12 flex gap-4 items-center justify-center">
        <h1 className="text-3xl font-medium text-customBlue">Visualizar Monitorias</h1>
      </div>

      <SearchBar/>

    </div>
  );
}
