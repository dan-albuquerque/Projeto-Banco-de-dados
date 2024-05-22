import { useState } from 'react';
import "../app/globals.css";
import { CentralizedLayout } from "../app/layout";
import DownerNav from '@/components/DownerNav';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ConsultInternado() {

  const navigate = useRouter();
  const [pacienteCpf, setPacienteCpf] = useState('');
  const [conduta, setConduta] = useState('');
  const [historicoExames, setHistorico] = useState('');
  const [evolucao, setEvolucao] = useState('');
  const currentDate = new Date().toISOString().split('T')[0];
  const [dataConsulta, setDataConsulta] = useState(currentDate);

  const medicoCpf = Cookies.get('cpf');
  const jwtToken = Cookies.get('jwtToken');
  let codigo;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const consultaData = {
      pacienteCpf: pacienteCpf,
      medicoCpf: medicoCpf,
      conduta: conduta,
      evolucao: evolucao,
      historicoExames: historicoExames,
      dataConsulta: dataConsulta
    };

    try {
      const response = await fetch('http://localhost:8080/consulta_internado/procedure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(consultaData)
      });

      if (!response.ok) {
        throw new Error('Falha ao criar consulta de internado! ' + response.statusText);
      }

      const responseText = await response.text();
      const match = responseText.match(/Registro Código: (\d+)/);

      if (match) {
        const registroCodigo = match[1];
        codigo = registroCodigo;
        toast.success(`Consulta de internado criada com sucesso! Registro Código: ${registroCodigo}`);
      } else {
        toast.success('Consulta de internado criada com sucesso!');
      }
        Cookies.set('paciente_cpf', pacienteCpf, {
          expires: 7,
          secure: true,
          sameSite: 'Strict'
        });
        Cookies.set('id_registro', codigo, {
          expires: 7,
          secure: true,
          sameSite: 'Strict'
        });
        navigate.push('/registrointernado');
      } catch (error) {
        toast.error(error.message);
      }
    };

    return (
      <>
        <Toaster />
        <CentralizedLayout>
          <form id="registroForm" onSubmit={handleSubmit} className="w-1/2 mx-auto p-8 mb-16 shadow-xl rounded-lg">
            <div className='flex justify-between items-center mb-6'>
              <h1 className="text-2xl font-weight self-start text-normalBlue">
                Consulta de Internado
              </h1>
              <div className="flex items-center gap-3">
                <img src="/img/GreenProgress.png" alt="medico icon" />
                <img src="/img/GreenProgress.png" alt="medico icon" />
                <img src="/img/EmptyProgress.png" alt="medico icon" />
              </div>

            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label htmlFor="conduta" className="block text-sm font-medium text-gray-700">Conduta:</label>
                <textarea id="conduta" value={conduta} onChange={(e) => setConduta(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" placeholder="Insira como deve ser a conduta" />
              </div>
              <div>
                <label htmlFor="historico" className="block text-sm font-medium text-gray-700">Histórico de exames:</label>
                <textarea id="historico" value={historicoExames} onChange={(e) => setHistorico(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" placeholder="Insira um historico de exames" />
              </div>
              <div>
                <label htmlFor="evolucao" className="block text-sm font-medium text-gray-700">Evolução:</label>
                <textarea id="evolucao" value={evolucao} onChange={(e) => setEvolucao(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" placeholder="Insira evolucao" />
              </div>
              <div>
                <label htmlFor="pacienteCpf" className="block text-sm font-medium text-gray-700">CPF do paciente:</label>
                <input id="pacienteCpf" type="text" value={pacienteCpf} onChange={(e) => setPacienteCpf(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Insira o CPF do paciente" />
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="mt-1 w-full px-4 py-2 bg-black hover:bg-gray-800 text-white font-weight rounded-md shadow-lg transition-transform duration-200 hover:scale-105">
                Gerar consulta
              </button>
            </div>
          </form>

          <DownerNav></DownerNav>
        </CentralizedLayout>
      </>
    )
  }
