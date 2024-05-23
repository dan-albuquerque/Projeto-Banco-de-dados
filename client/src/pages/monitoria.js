import React from 'react';
import '../app/globals.css';
import { useRouter } from 'next/navigation';
import DownerNav from '@/components/DownerNav';
import {CentralizedLayout} from '../app/layout';

export default function ConsultaPage() {
  const router = useRouter();

  return (
    <CentralizedLayout className = "mb-16">
      
        <div className="flex items-center w-3/5 gap-5 justify-center mb-16 flex-col">
        <div className='w-full flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-light text-normalBlue'>Inicie sua operação</h1>

      </div>
          <div className='w-full flex flex-row justify-between items-center gap-8'>
            <button onClick={() => router.push('/viewmonitorias')}
              className="flex flex-col gap-4 text-center items-center py-3 px-3 text-xl w-3/4 bg-customGrey text-black rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
              <img src="/img/Consulta.png" alt="medico icon" style = {{width: '90px', height:'84px'}}/>
              <p className='text-4xl'>Visualizar</p>
              <p className='text-lg font-light'>As monitorias entre internos e pacientes</p>
            </button>
            <button onClick={() => router.push('/monitora')}
              className="flex flex-col gap-4 text-center items-center py-3 px-3 text-xl w-3/4 bg-customGrey text-black rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
              <img src="/img/Urgencia.png" alt="medico icon" />
              <p className='text-4xl'>Criar</p>
              <p className='text-lg font-light'>Uma nova relação de monitoria</p>
            </button>
          </div>
        </div>
      <DownerNav></DownerNav>
    </CentralizedLayout>
  );
}
