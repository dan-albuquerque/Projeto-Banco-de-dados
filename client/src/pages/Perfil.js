import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { CentralizedLayout } from '@/app/layout';
import DownerNav from '@/components/DownerNav';
export default function Perfil() {
  const [medico, setMedico] = useState({
    cpf: "",
    nome: "",
    rqe: null,
    senha: "",
    especialidade: "",
    crm: "",
    fk_medico_cpf_gerente: null
  });

  const [nomeGerente, setNomeGerente] = useState('');
  const [cpfGerente, setCpfGerente] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const cpf = localStorage.getItem('cpf');
      if (cpf) {
        try {
          const response = await fetch(`http://localhost:8080/medico/${cpf}`);
          if (response.ok) {
            const data = await response.json();
            setMedico(data);
            setCpfGerente(data.fk_medico_cpf_gerente);
            console.log(data);
          }
        } catch (error) {
          console.error('Erro ao buscar informações do médico:', error);
        }
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (cpfGerente) {
        try {
          const response = await fetch(`http://localhost:8080/medico/${cpfGerente}`);
          if (response.ok) {
            const data = await response.json();
            setNomeGerente(data.nome);
            console.log(data.nome);
          }
        } catch (error) {
          console.error('Erro ao buscar informações do médico:', error);
        }
      }
    }
    fetchUserData();
  }, [cpfGerente]);

  return (
    <CentralizedLayout>
      <Toaster />
      <div className='w-4/4 flex justify-between gap-10' style={{ height: '50vh' }}>
        <div className='w-1/2 h-full'>
          <div className='h-full w-full rounded-full bg-blue-200 border-customBlue border-8'>
            <img className='w-full h-full object-cover rounded-full' src='img/doctor.svg' alt='Foto do médico' />
          </div>
        </div>
        <div className='flex items-start w-1/2 flex-col gap-20'>
          <div className='gap-3'>
            <h1 className='text-7xl'>{medico.nome}</h1>
            <p className='italic text-4xl text-gray-600'>{medico.especialidade}</p>
          </div>
          <div className='flex flex-col gap-8'>
            <div className='flex gap-4 text-3xl'>
              <p><b>CRM:</b> {medico.crm}</p>
              <p><b>RQE:</b> {medico.rqe}</p>
            </div>
            <div className='flex flex-col'>
              {medico.fk_medico_cpf_gerente && <p className='text-2xl'><b>Gerente:</b> {nomeGerente}</p>}
              {medico.fk_medico_cpf_gerente === null && <p className='text-2xl'><b>Cargo:</b> gerente</p>}
            </div>
          </div>
        </div>
      </div>
      <DownerNav />
    </CentralizedLayout>
  );
}
