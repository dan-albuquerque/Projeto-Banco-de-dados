"use client";

import React, { useState, useEffect } from 'react';
import '../app/globals.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function DownerNav({ doctors }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    Cookies.remove('jwtToken');
    router.push('/');
  }

  return (
    <div className="h-16 flex justify-center items-center shadow-above fixed bottom-0 w-full bg-white">
      <div className=" flex gap-16 items-center justify-center mt-4">
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => router.push('/data')} className="w-7 h-7 flex items-center justify-center">
            <img src="/img/database.png" className="w-7 h-7 transition-transform duration-200 hover:scale-125" alt="database icon" />
          </button>
          <button onClick={() => router.push('/data')} className="w-7 h-7 flex items-center justify-center">
            <p className='text-l text-black font-light cursor-pointer transition-transform duration-200 hover:scale-125'>Dados</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => router.push('/consulta')} className="w-7 h-7 flex items-center justify-center transition-transform duration-200 hover:scale-125">
            <img src="/img/medico.png" className="w-7 h-7 transition-transform duration-200 hover:scale-125" alt="medico icon" />
          </button>
          <button onClick={() => router.push('/consulta')} className="w-7 h-7 flex items-center justify-center">
            <p className='text-l text-black font-light cursor-pointer transition-transform duration-200 hover:scale-125'>Consulta</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
        <img onClick={() => router.push('/monitoria')}    src="/img/basichospital.svg" className="w-7 h-7 transition-transform duration-200 hover:scale-125 cursor-pointer                " alt="monitora icon" />
          <button onClick={() => router.push('/monitoria')} className="w-7 h-7 flex items-center justify-center">
            <p className='text-l text-black font-light cursor-pointer transition-transform duration-200 hover:scale-125'>Monitorias</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => router.push('/perfil')} className="w-7 h-7 flex items-center justify-center">
            <img src="/img/perfil.png" className="w-7 h-7 transition-transform duration-200 hover:scale-125" alt="perfil icon" />
          </button>
          <button onClick={() => router.push('/perfil')} className="w-7 h-7 flex items-center justify-center">
            <p className='text-l text-black font-light cursor-pointer transition-transform duration-200 hover:scale-125'>Perfil</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={handleLogout} className="w-7 h-7 flex items-center justify-center">
            <img src="/img/logout.png" className="w-7 h-7 transition-transform duration-200 hover:scale-125" alt="logout icon" />
          </button>
          <button onClick={handleLogout} className="w-7 h-7 flex items-center justify-center">
            <p className='text-l text-black font-light cursor-pointer transition-transform duration-200 hover:scale-125'>Logout</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => router.push('/home')} className="w-7 h-7 flex items-center justify-center">
            <img src="/img/home.svg" className="w-7 h-7 transition-transform duration-200 hover:scale-125" alt="home icon" />
          </button>
          <button onClick={() => router.push('/home')} className="w-7 h-7 flex items-center justify-center">
            <p className='text-l text-black font-light cursor-pointer transition-transform duration-200 hover:scale-125'>Home</p>
          </button>
      </div>
      </div>
    </div>
  );
}
