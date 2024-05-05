import React,{useState} from 'react';
import "../app/globals.css";
import SearchBar from './SearchBar';
export default function UpperNav({ swapPatient, swapIntern, swapDoctor, searchByCpf, searchByAZ, searchByZA, insert, view, onData}) {
    const [isIntern, setIsIntern] = useState(true);
    const [isDoctor, setIsDoctor] = useState(false);
    const [isPatient, setIsPatient] = useState(false);
    const [isView, setIsView] = useState(true);
    const [isInsert, setIsInsert] = useState(false);
    const [searchData, setSearchData] = useState(null);

    const handleSearchData = (data) => {
        setSearchData(data);
        onData(data);
    };

    const handleChooseIntern = () => {
        setIsIntern(true);
        setIsDoctor(false);
        setIsPatient(false);
    }

    const handleChooseDoctor = () => {
        setIsIntern(false);
        setIsDoctor(true);
        setIsPatient(false);
    }

    const handleChoosePatient = () => {
        setIsIntern(false);
        setIsDoctor(false);
        setIsPatient(true);
    }

    const swapToView = () => {
        console.log("View");
        setIsView(true);
        setIsInsert(false);
    }

    const swapToInsert = () => {
        console.log("Insert");
        setIsView(false);
        setIsInsert(true);
    }

    return (
        <div className="h-16 flex justify-between items-center mt-5 ">
            <div className="ml-12 flex gap-4 items-center justify-center">
                {isView ? (
                    <>
                    <h1 className="text-3xl font-medium text-customBlue cursor-pointer " onClick = {() => {view(); swapToView()}}>Visualizar</h1>
                    <h1 className="text-2xl font-medium text-normalBlue cursor-pointer " onClick = {() => {insert(); swapToInsert()}}>Inserir</h1>
                    </>
                ):(
                    <>
                    <h1 className="text-3xl font-medium text-customBlue cursor-pointer " onClick = {() => {insert(); swapToInsert()}}>Inserir</h1>
                    <h1 className="text-2xl font-medium text-normalBlue cursor-pointer " onClick = {() => {view(); swapToView()}}>Visualizar</h1>
                    </>
                )}
            </div>
            <ul className="flex gap-4 items-center justify-center">
                <li className="text-xl font-medium text-black cursor-pointer">Ordenar:</li>
                <li className="text-xl text-normalBlue font-light cursor-pointer transform hover:scale-125" onClick = {searchByCpf}>• CPF</li>
                <li className="text-xl font-light text-normalBlue cursor-pointer transform hover:scale-125" onClick = {searchByAZ}>• A-Z</li>
                <li className="text-xl font-light text-normalBlue cursor-pointer transform hover:scale-125" onClick = {searchByZA}>• Z-A</li>
            </ul>
            <SearchBar
                onSearch={handleSearchData}
            />
            <div className="mr-12 flex gap-4"> 
                <p className='text-xl text-normalBlue font-light cursor-pointer transform hover:scale-125' onClick={() => {swapPatient(); handleChoosePatient();}} style = {{ color: isPatient ? '#063866' : '#0671D3' }}>Paciente</p>
                <p className='text-xl text-customBlue font-light cursor-pointer transform hover:scale-125' onClick={() => {swapIntern(); handleChooseIntern();}} style = {{color: isIntern? '#063866' : '#0671D3' }}>Interno</p>
                <p className='text-xl text-normalBlue font-light cursor-pointer transform hover:scale-125' onClick={() => {swapDoctor(); handleChooseDoctor();}} style = {{color: isDoctor? '#063866' : '#0671D3'}}>Médico</p>
            </div>
        </div>
    );
}