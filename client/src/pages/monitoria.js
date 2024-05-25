import React from 'react';
import '../app/globals.css';
import { useRouter } from 'next/navigation';
import DownerNav from '@/components/DownerNav';
import {CentralizedLayout} from '../app/layout';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function ConsultaPage() {
  const router = useRouter();

  return (
    <CentralizedLayout className = "mb-16">
      
        <div className="flex items-center w-3/5 gap-5 justify-center mb-16 flex-col">
        <div className='w-full flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-light text-normalBlue'>Inicie sua operação</h1>
        <Popover>
                            <PopoverTrigger><img src = "/img/questionmark.svg" className='w-8 g-8 transition-transform duration 200 hover:scale-125'/></PopoverTrigger>
                            <PopoverContent>
                                <div className='h-56 relative flex flex-col' >
                                    <p className='text-sm'>Em um sistema e-hospital, é comum que internos sejam vinculados a pacientes monitorados.</p>
                                    <p className='text-sm'>Um interno pode acompanhar vários pacientes! Basta inserir o CPF do paciente e do interno abaixo.</p>
                                    <img src="/img/doctorexplaining.svg" alt="Imagem" className="absolute bottom-2 right-2 w-20 h-20 transition-transform duration-200 hover:scale-105" />

                                </div>
                            </PopoverContent>
                        </Popover>


      </div>
          <div className='w-full flex flex-row justify-between items-center gap-8'>
            <button onClick={() => router.push('/viewmonitorias')}
              className="flex flex-col gap-4 text-center items-center py-3 px-3 text-xl w-1/2 bg-customGrey text-black rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
              <img src="/img/idk.svg" alt="medico icon" style = {{width: '90px', height:'84px'}}/>
              <p className='text-4xl'>Visualizar</p>
              <p className='text-lg font-light'>As monitorias entre internos e pacientes</p>
            </button>
            <button onClick={() => router.push('/monitora')}
              className="flex flex-col gap-4 text-center items-center py-3 px-3 text-xl w-1/2 bg-customGrey text-black rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
              <img src="/img/users.svg" alt="medico icon" style = {{width: '90px', height:'84px'}} />
              <p className='text-4xl'>Atribuir</p>
              <p className='text-lg font-light'>Um interno à um paciente monitorado</p>
            </button>
            <button onClick={() => router.push('/viewbackupmonitorias')}
              className="flex flex-col gap-4 text-center items-center py-3 px-3 text-xl w-1/2 bg-customGrey text-black rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
              <img src="/img/idk.svg" alt="medico icon" style = {{width: '90px', height:'84px'}}/>
              <p className='text-4xl'>Backup</p>
              <p className='text-lg font-light'>Das antigas monitorias entre internos e pacientes</p>
            </button>
          </div>
        </div>
      <DownerNav></DownerNav>
    </CentralizedLayout>
  );
}
