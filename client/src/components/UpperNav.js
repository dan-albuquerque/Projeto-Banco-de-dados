import React,{useState} from 'react';
import "../app/globals.css";

export default function UpperNav({ swapPatient, swapIntern, swapDoctor }) {
    const [isIntern, setIsIntern] = useState(true);
    const [isDoctor, setIsDoctor] = useState(false);
    const [isPatient, setIsPatient] = useState(false);

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

    return (
        <div className="h-16 flex justify-between items-center mt-5">
            <div className="ml-12 flex gap-4">
                <h1 className="text-2xl font-medium text-customBlue">Visualizar</h1>
                <h1 className="text-2xl font-medium text-normalBlue">Inserir</h1>
            </div>
            <div className="mr-12 flex gap-4"> 
                <p className='text-xl text-normalBlue font-light cursor-pointer transform hover:scale-125' onClick={() => {swapPatient(); handleChoosePatient();}} style = {{ color: isPatient ? '#063866' : '#0671D3' }}>Paciente</p>
                <p className='text-xl text-customBlue font-light cursor-pointer transform hover:scale-125' onClick={() => {swapIntern(); handleChooseIntern();}} style = {{color: isIntern? '#063866' : '#0671D3' }}>Interno</p>
                <p className='text-xl text-normalBlue font-light cursor-pointer transform hover:scale-125' onClick={() => {swapDoctor(); handleChooseDoctor();}} style = {{color: isDoctor? '#063866' : '#0671D3'}}>Médico</p>
            </div>
        </div>
    );
}
