import { useState } from 'react';
import "../app/globals.css";
import Layout from "../app/layout";
import DownerNav from '@/components/DownerNav';

export default function ConsultaUrgencia() {
  const [pacienteCpf, setPacienteCpf] = useState('');
  const [conduta, setConduta] = useState('');
  const [historico, setHistorico] = useState('');
  const [exameFisico, setExameFisico] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('CPF do paciente:', pacienteCpf);
    console.log('Conduta:', conduta);
    console.log('Histórico:', historico);
    console.log('Exame físico:', exameFisico);
    console.log('Data da consulta:', dataConsulta);
    fetch('http://localhost:8080/consulta_internado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pacienteCpf, conduta, historico, exameFisico, dataConsulta }),
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Consulta de internado registrada:', data);
      })
      .catch((error) => console.error('Error:', error));
  }

  return (
    <Layout>
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Consulta de Urgência</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="conduta" className="block text-sm font-medium text-gray-700">Conduta:</label>
          <input id="conduta" type="text" value={conduta} onChange={(e) => setConduta(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="pacienteCpf" className="block text-sm font-medium text-gray-700">CPF do paciente:</label>
          <input id="pacienteCpf" type="text" value={pacienteCpf} onChange={(e) => setPacienteCpf(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div className="col-span-2">
          <label htmlFor="historico" className="block text-sm font-medium text-gray-700">Histórico da doença:</label>
          <textarea id="historico" value={historico} onChange={(e) => setHistorico(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
        <div className="col-span-2">
          <label htmlFor="exameFisico" className="block text-sm font-medium text-gray-700">Exame físico:</label>
          <textarea id="exameFisico" value={exameFisico} onChange={(e) => setExameFisico(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
        <div>
          <label htmlFor="dataConsulta" className="block text-sm font-medium text-gray-700">Data da consulta:</label>
          <input id="dataConsulta" type="date" value={dataConsulta} onChange={(e) => setDataConsulta(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
      </div>
      <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md">Gerar consulta</button>
    </form>
    <DownerNav></DownerNav>
  </Layout>
  )
}
