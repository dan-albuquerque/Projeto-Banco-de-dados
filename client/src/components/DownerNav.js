import React from 'react';
import '../app/globals.css';

export default function DownerNav() {
    return (
        <div className="h-16 flex justify-center items-center mt-5 shadow-above ">
            <div className=" flex gap-16">
                <div className="flex flex-col items-center justify-center">
                    <img src="/img/database.png" className="w-8 h-8" alt="database icon" />
                    <p className='text-l text-black font-light cursor-pointer transform hover:scale-125'>Dados</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <img src="/img/medico.png" className="w-8 h-8" alt="medico icon" />
                    <p className='text-l text-black font-light cursor-pointer transform hover:scale-125'>Consulta</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <img src="/img/perfil.png" className="w-8 h-8" alt="perfil icon" />
                    <p className='text-l text-black font-light cursor-pointer transform hover:scale-125'>Perfil</p>
                </div>
            </div>
        </div>
    );
}
