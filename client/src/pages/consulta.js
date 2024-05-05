import React from 'react';
import '../app/globals.css';
import { useRouter } from 'next/navigation';
import DownerNav from '@/components/DownerNav';
import {CentralizedLayout} from '../app/layout';

export default function ConsultaPage() {
  const router = useRouter();

  return (
    <CentralizedLayout className = "mb-16">
      <div className='w-2/3 mb-10 flex justify-between items-center'>
        <h1 className='text-4xl font-light text-normalBlue'>Inicie sua operação</h1>
        <div className='flex items-center gap-3 '>
          <img src="/img/GreenProgress.png" alt="medico icon" />
          <img src="/img/EmptyProgress.png" alt="medico icon" />
          <img src="/img/EmptyProgress.png" alt="medico icon" />
        </div>

      </div>
        <div className="flex items-center w-2/3 gap-5">
          <button onClick={() => router.push('/ViewConsultas')}
            className="flex flex-col gap-4 text-center items-center py-3 px-3 text-xl w-1/4 bg-customGrey text-black rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
            <img src="/img/Consulta.png" alt="medico icon" style = {{width: '90px', height:'84px'}}/>
            <p className='text-4xl'>Visualizar</p>
            <p className='text-lg font-light'>A consulta de todos os pacientes do hospital</p>
          </button>
          <button onClick={() => router.push('/ConsultaUrgencia')}
            className="flex flex-col gap-4 text-center items-center py-3 px-3 text-xl w-1/4 bg-customGrey text-black rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
            <img src="/img/Urgencia.png" alt="medico icon" />
            <p className='text-4xl'>Criar</p>
            <p className='text-lg font-light'>Uma consulta para um paciente urgente</p>
          </button>
          <button onClick={() => router.push('/ConsultaInternado')}
            className="flex flex-col gap-4 items-center py-3 px-3 text-xl text-center w-1/4 bg-customGrey text-black rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
            <img src="/img/Internado.png" alt="medico icon" />
            <p className='text-4xl'>Criar</p>
            <p className='text-lg font-light'>Uma consulta para um paciente internado</p>
          </button>
          <button onClick={() => router.push('/visualizar-consultas-anteriores')}
            className="flex flex-col gap-4 text-center items-center py-3 px-3 text-xl w-1/4 bg-customGrey text-black rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
            <img src="/img/Patient.svg" alt="medico icon" style = {{width:'90px', height:'84px'}} />
            <p className='text-4xl'>Visualizar</p>
            <p className='text-lg font-light'>Consultas anteriores de um paciente do hospital</p>
          </button>
        </div>
      <DownerNav></DownerNav>
    </CentralizedLayout>
  );
}
