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
    router.push('/login');
  }

  return (
    <div className="h-16 flex justify-center items-center mb-2 shadow-above fixed bottom-0 w-full bg-white opacity-80">
      <div className=" flex gap-16">
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => router.push('/Data')} className="w-8 h-8 flex items-center justify-center">
            <img src="/img/database.png" className="w-8 h-8 transition-transform duration-200 hover:scale-125" alt="database icon" />
          </button>
          <button onClick={() => router.push('/Data')} className="w-8 h-8 flex items-center justify-center">
            <p className='text-l text-black font-light cursor-pointer transition-transform duration-200 hover:scale-125'>Dados</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => router.push('/consulta')} className="w-8 h-8 flex items-center justify-center transition-transform duration-200 hover:scale-125">
            <img src="/img/medico.png" className="w-8 h-8 transition-transform duration-200 hover:scale-125" alt="medico icon" />
          </button>
          <button onClick={() => router.push('/consulta')} className="w-8 h-8 flex items-center justify-center">
            <p className='text-l text-black font-light cursor-pointer transition-transform duration-200 hover:scale-125'>Consulta</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
        <img onClick={() => router.push('/Monitora')}    src="/img/basichospital.svg" className="w-8 h-8 transition-transform duration-200 hover:scale-125 cursor-pointer                " alt="monitora icon" />
          <button onClick={() => router.push('/Monitora')} className="w-8 h-8 flex items-center justify-center">
            <p className='text-l text-black font-light cursor-pointer transition-transform duration-200 hover:scale-125'>Monitorias</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => router.push('/Perfil')} className="w-8 h-8 flex items-center justify-center">
            <img src="/img/perfil.png" className="w-8 h-8 transition-transform duration-200 hover:scale-125" alt="perfil icon" />
          </button>
          <button onClick={() => router.push('/Perfil')} className="w-8 h-8 flex items-center justify-center">
            <p className='text-l text-black font-light cursor-pointer transition-transform duration-200 hover:scale-125'>Perfil</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={handleLogout} className="w-8 h-8 flex items-center justify-center">
            <img src="/img/logout.png" className="w-8 h-8 transition-transform duration-200 hover:scale-125" alt="logout icon" />
          </button>
          <button onClick={handleLogout} className="w-8 h-8 flex items-center justify-center">
            <p className='text-l text-black font-light cursor-pointer transition-transform duration-200 hover:scale-125'>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
}
