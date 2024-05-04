import React from 'react';
import '../app/globals.css';
import { useRouter } from 'next/navigation';
import DownerNav from '@/components/DownerNav';
import Layout from '../app/layout';

export default function ConsultaPage() {
  const router = useRouter();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-12">Painel de Controle do Médico</h1>
        <div className="grid grid-cols-2 gap-6 w-full max-w-4xl px-6">
          <button onClick={() => router.push('/ViewConsultas')}
            className="py-3 text-xl bg-black hover:bg-gray-900 text-white rounded-lg shadow-md transition duration-200">
            Visualizar Consultas
          </button>
          <button onClick={() => router.push('/ConsultaUrgencia')}
            className="py-3 text-xl bg-black hover:bg-gray-900 text-white rounded-lg shadow-md transition duration-200">
            Criar Consulta de Urgência
          </button>
          <button onClick={() => router.push('/criar-consulta-internado')}
            className="py-3 text-xl bg-black hover:bg-gray-900 text-white rounded-lg shadow-md transition duration-200">
            Criar Consulta de Paciente Internado
          </button>
          <button onClick={() => router.push('/visualizar-consultas-anteriores')}
            className="py-3 text-xl bg-black hover:bg-gray-900 text-white rounded-lg shadow-md transition duration-200">
            Visualizar Consultas Anteriores de um Paciente
          </button>
        </div>
      </div>
      <DownerNav></DownerNav>
    </Layout>
  );
}
