import { useState } from 'react';
import "../app/globals.css";
import Layout from "../app/layout";
import DownerNav from '@/components/DownerNav';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast';

export default function ConsultaUrgencia() {
  const [pacienteCpf, setPacienteCpf] = useState('');
  const [conduta, setConduta] = useState('');
  const [historico, setHistorico] = useState('');
  const [exameFisico, setExameFisico] = useState('');
  const currentDate = new Date().toISOString().split('T')[0];
  const [dataConsulta, setDataConsulta] = useState(currentDate);

  const medicoCpf = Cookies.get('cpf');
  const jwtToken = Cookies.get('jwtToken');
  let codigo;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('CPF do paciente:', pacienteCpf);
    console.log('Conduta:', conduta);
    console.log('Histórico:', historico);
    console.log('Exame físico:', exameFisico);
    console.log('Data da consulta:', dataConsulta);
    const registroData = {
      conduta: conduta
    };

    return fetch('http://localhost:8080/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },
      body: JSON.stringify(registroData)
    })
      .then(response => response.ok ? response.json() : Promise.reject('Falha ao criar consulta de urgência!' + response.statusText))
      .then((data) => {
        console.log('Registro:', data)
        codigo = data.codigo;
        console.log('Código:', codigo);
        const registroUrgenciaData = {
          fk_registro_codigo: codigo,
          historico_doenca: historico,
          exame_fisico: exameFisico
        };

        console.log('Registro de urgência:', registroUrgenciaData);

        return fetch('http://localhost:8080/registro_urgencia', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify(registroUrgenciaData)
        });
      })
      .then(response => response.ok ? response.text() : Promise.reject('Falha ao criar consulta de urgência!' + response.statusText))
      .then(() => {
        const consultaUrgenciaData = {
          fk_registro_urgencia_codigo: codigo,
          data_realizacao: dataConsulta,
          fk_medico_cpf: medicoCpf,
          fk_paciente_urgencia_cpf: pacienteCpf
        };

        return fetch('http://localhost:8080/consulta_urgencia', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify(consultaUrgenciaData)
        });
      })
      .then(response => response.ok ? response.text() : Promise.reject('Falha ao criar consulta de urgência! ' + response.statusText))
      .then(() => {
        toast.success('Consulta de urgência criada com sucesso!');
        setPacienteCpf('');
        setConduta('');
        setHistorico('');
        setExameFisico('');
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  return (
    <>
      <Toaster />
      <Layout>
        <form id="registroForm" onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-center mb-10">
            Consulta de Urgência
          </h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-2">
              <label htmlFor="conduta" className="block text-sm font-medium text-gray-700">Conduta:</label>
              <textarea id="conduta" value={conduta} onChange={(e) => setConduta(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" />
            </div>
            <div className="col-span-2">
              <label htmlFor="historico" className="block text-sm font-medium text-gray-700">Histórico da doença:</label>
              <textarea id="historico" value={historico} onChange={(e) => setHistorico(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" />
            </div>
            <div className="col-span-2">
              <label htmlFor="exameFisico" className="block text-sm font-medium text-gray-700">Exame físico:</label>
              <textarea id="exameFisico" value={exameFisico} onChange={(e) => setExameFisico(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" />
            </div>
            <div className="col-span-2">
              <label htmlFor="pacienteCpf" className="block text-sm font-medium text-gray-700">CPF do paciente:</label>
              <input id="pacienteCpf" type="text" value={pacienteCpf} onChange={(e) => setPacienteCpf(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-bold rounded-md shadow-lg transition-transform duration-200 hover:scale-105">
              Gerar consulta
            </button>
          </div>
        </form>
        <DownerNav></DownerNav>
      </Layout>
    </>
  )
}
