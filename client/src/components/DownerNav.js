"use client";

import React, { useState, useEffect } from 'react';
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

  const [isGerente, setisGerente] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const cpf = Cookies.get('cpf');
      if (cpf) {
        try {
          const response = await fetch(`http://localhost:8080/medico/${cpf}`);
          if (response.ok) {
            const data = await response.json();
            if (data.fk_medico_cpf_gerente === null) {
              setisGerente(true);
            }
          }
        } catch (error) {
          console.error('Erro ao buscar informações do médico:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="h-16 flex justify-center items-center mb-2 shadow-above fixed bottom-0 w-full bg-white opacity-80">
      <div className=" flex gap-16">
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => router.push('/Data')} className="w-8 h-8 flex items-center justify-center">
          <img src="/img/database.png" className="w-8 h-8" alt="database icon" />
          </button>
          <button onClick={() => router.push('/Data')} className="w-8 h-8 flex items-center justify-center">
          <p className='text-l text-black font-light cursor-pointer transform hover:scale-125'>Dados</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => router.push('/consulta')} className="w-8 h-8 flex items-center justify-center">
          <img src="/img/medico.png" className="w-8 h-8" alt="medico icon" />
          </button>
          <button onClick={() => router.push('/consulta')} className="w-8 h-8 flex items-center justify-center">
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
        {isGerente && (
          <div className="flex flex-col items-center justify-center">
            <button onClick={() => router.push('/CriarMedico')} className="w-8 h-8 flex items-center justify-center">
              <img src="/img/gerente.png" className="w-8 h-8" alt="gerente icon" />
            </button>
            <button onClick={() => router.push('/CriarMedico')} className="w-8 h-8 flex items-center justify-center">
              <p className='text-l text-black font-light cursor-pointer transform hover:scale-125'>Gerente</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
