import { useState } from 'react';
import "../app/globals.css";
import Layout from "../app/layout";
import DownerNav from '@/components/DownerNav';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast';

export default function ConsultInternado() {
  const [pacienteCpf, setPacienteCpf] = useState('');
  const [conduta, setConduta] = useState('');
  const [historico, setHistorico] = useState('');
  const [evolucao, setEvolucao] = useState('');
  const currentDate = new Date().toISOString().split('T')[0];
  const [dataConsulta, setDataConsulta] = useState(currentDate);

  const medicoCpf = Cookies.get('cpf');
  const jwtToken = Cookies.get('jwtToken');
  let codigo;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('CPF do paciente:', pacienteCpf);
    console.log('Conduta:', conduta);
    console.log('Histórico de exames:', historico);
    console.log('Evolução:', evolucao);
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
      .then(response => response.ok ? response.json() : Promise.reject('Falha ao criar consulta de internado!' + response.statusText))
      .then((data) => {
        console.log('Registro:', data)
        codigo = data.codigo;
        console.log('Código:', codigo);
        const registroInternadoData = {
          fk_registro_codigo: codigo,
          historico_exames: historico,
          evolucao: evolucao
        };

        console.log('Registro de internado:', registroInternadoData);

        return fetch('http://localhost:8080/registro_internado', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify(registroInternadoData)
        });
      })
      .then(response => response.ok ? response.text() : Promise.reject('Falha ao criar consulta de internado!' + response.statusText))
      .then(() => {
        const consultaInternadoData = {
          fk_registro_internado_codigo: codigo,
          data_realizacao: dataConsulta,
          fk_medico_cpf: medicoCpf,
          fk_paciente_internado_cpf: pacienteCpf
        };

        return fetch('http://localhost:8080/consulta_internado', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify(consultaInternadoData)
        });
      })
      .then(response => response.ok ? response.text() : Promise.reject('Falha ao criar consulta de internado! ' + response.statusText))
      .then(() => {
        toast.success('Consulta de internado criada com sucesso!');
        setPacienteCpf('');
        setConduta('');
        setHistorico('');
        setEvolucao('');
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  }

  return (
    <>
      <Toaster />
      <Layout>
        <form id="registroForm" onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8">
          <h1 className="text-2xl font-weight text-center mb-10 text-blue-500">
            Consulta de Internado
          </h1>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label htmlFor="conduta" className="block text-sm font-medium text-gray-700">Conduta:</label>
              <textarea id="conduta" value={conduta} onChange={(e) => setConduta(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-4 resize-none" />
            </div>
            <div>
              <label htmlFor="historico" className="block text-sm font-medium text-gray-700">Histórico de exames:</label>
              <textarea id="historico" value={historico} onChange={(e) => setHistorico(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-4 resize-none" />
            </div>
            <div>
              <label htmlFor="evolucao" className="block text-sm font-medium text-gray-700">Evolução:</label>
              <textarea id="evolucao" value={evolucao} onChange={(e) => setEvolucao(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-4 resize-none" />
            </div>
            <div>
              <label htmlFor="pacienteCpf" className="block text-sm font-medium text-gray-700">CPF do paciente:</label>
              <input id="pacienteCpf" type="text" value={pacienteCpf} onChange={(e) => setPacienteCpf(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-4" />
            </div>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="mt-1 w-full px-4 py-2 bg-black hover:bg-gray-800 text-white font-weight rounded-md shadow-lg transition-transform duration-200 hover:scale-105">
              Gerar consulta
            </button>
          </div>
        </form>

        <DownerNav></DownerNav>
      </Layout>
    </>
  )
}
