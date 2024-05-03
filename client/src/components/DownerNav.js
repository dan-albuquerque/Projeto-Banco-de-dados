"use client";

import React from 'react';
import '../app/globals.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function DownerNav({doctors}) {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    Cookies.remove('jwtToken');
    router.push('/login');
  }

  return (
    <div className="h-16 flex justify-center items-center mb-8 shadow-above fixed bottom-0 w-full ">
      <div className=" flex gap-16">
        <div className="flex flex-col items-center justify-center">
          <img src="/img/database.png" className="w-8 h-8" alt="database icon" />
          <p className='text-l text-black font-light cursor-pointer transform hover:scale-125'>Dados</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => router.push('/ViewConsultas')} className="w-8 h-8 flex items-center justify-center">
          <img src="/img/medico.png" className="w-8 h-8" alt="medico icon" />
          </button>
          <button onClick={() => router.push('/ViewConsultas')} className="w-8 h-8 flex items-center justify-center">
          <p className='text-l text-black font-light cursor-pointer transform hover:scale-125'>Consulta</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src="/img/perfil.png" className="w-8 h-8" alt="perfil icon" />
          <p className='text-l text-black font-light cursor-pointer transform hover:scale-125'>Perfil</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={handleLogout} className="w-8 h-8 flex items-center justify-center">
            <img src="/img/logout.png" className="w-8 h-8" alt="logout icon" />
          </button>
          <button onClick={handleLogout} className="w-8 h-8 flex items-center justify-center">
            <p className='text-l text-black font-light cursor-pointer transform hover:scale-125'>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
}
