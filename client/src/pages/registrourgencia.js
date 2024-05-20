import { useState } from 'react';
import "../app/globals.css";
import { CentralizedLayout } from "../app/layout";
import DownerNav from '@/components/DownerNav';
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function RegistroUrgencia() {
  const navigate = useRouter();
  const medicoCpf = Cookies.get('cpf');
  const pacienteCpf = Cookies.get('paciente_cpf');
  const jwtToken = Cookies.get('jwtToken');
  const id_registro = Cookies.get('id_registro');
  const [hipotese, setHipotese] = useState('');
  const [hipoteses, setHipoteses] = useState([]);
  const [medicacao, setMedicacao] = useState('');
  const [medicacoes, setMedicacoes] = useState([]);
  const [comorbidade, setComorbidade] = useState('');
  const [comorbidades, setComorbidades] = useState([]);

  const handleHipotese = async (event) => {
    event.preventDefault();
    setHipoteses([...hipoteses, hipotese]);
    setHipotese('');
  }

  const handleMedicacao = async (event) => {
    event.preventDefault();
    setMedicacoes([...medicacoes, medicacao]);
    setMedicacao('');
  }

  const handleComorbidade = async (event) => {
    event.preventDefault();
    setComorbidades([...comorbidades, comorbidade]);
    setComorbidade('');
  }

  const handleRemoveHipotese = (index) => {
    const newHipoteses = hipoteses.filter((_, idx) => idx !== index);
    setHipoteses(newHipoteses);
  }

  const handleRemoveMedicacao = (index) => {
    const newMedicacoes = medicacoes.filter((_, idx) => idx !== index);
    setMedicacoes(newMedicacoes);
  }

  const handleRemoveComorbidade = (index) => {
    const newComorbidades = comorbidades.filter((_, idx) => idx !== index);
    setComorbidades(newComorbidades);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (let i = 0; i < hipoteses.length; i++) {
      const descricao = hipoteses[i];
      const response = await fetch('http://localhost:8080/hipotese', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          fk_registro_codigo: id_registro,
          id: i + 1, // ID incrementando a partir de 1
          descricao: descricao
        })
      });

      // Verifica se a resposta é bem-sucedida
      if (!response.ok) {
        const message = `Erro ao enviar hipótese: ${response.statusText}`;
        toast.error(message);
        console.error(message);
        break; // Interrompe o loop se houver erro
      } else {
        const message = `Hipótese ${i + 1} enviada com sucesso!`;
        toast.success(message);
        console.log(message);
      }
    }

    for (let i = 0; i < medicacoes.length; i++) {
      const nome = medicacoes[i];
      const response = await fetch('http://localhost:8080/medicacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          fk_registro_urgencia_codigo: id_registro,
          id: i + 1, // ID incrementando a partir de 1
          nome: nome
        })
      });

      // Verifica se a resposta é bem-sucedida
      if (!response.ok) {
        const message = `Erro ao enviar medicação: ${response.statusText}`;
        toast.error(message);
        console.error(message);
        break; // Interrompe o loop se houver erro
      } else {
        const message = `Medicação ${i + 1} enviada com sucesso!`;
        toast.success(message);
        console.log(message);
      }
    }

    for (let i = 0; i < comorbidades.length; i++) {
      const nome = comorbidades[i];
      const response = await fetch('http://localhost:8080/comorbidade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          fk_registro_urgencia_codigo: id_registro,
          id: i + 1, // ID incrementando a partir de 1
          nome: nome
        })
      });

      if (!response.ok) {
        const message = `Erro ao enviar comborbidade: ${response.statusText}`;
        toast.error(message);
        console.error(message);
        break; // Interrompe o loop se houver erro
      } else {
        const message = `Comorbidade ${i + 1} enviada com sucesso!`;
        toast.success(message);
        console.log(message);
      }

      navigate.push({
        pathname: `/consultaurgencia/${id_registro}/${medicoCpf}/${pacienteCpf}`
      });
    }

    // Limpa os estados após o envio
    setHipoteses([]);
    setHipotese('');
    setMedicacoes([]);
    setMedicacao('');
    setComorbidades([]);
    setComorbidade('');
  };


  return (
    <>
      <Toaster />
      <CentralizedLayout>
        <form id="registroForm" onSubmit={handleSubmit} className="w-1/2 mx-auto p-8 mb-16 shadow-xl rounded-lg">
          <div className='flex justify-between items-center mb-10'>
            <h1 className="text-3xl font-weight self-start text-normalBlue">
              Consulta de Urgência
            </h1>
            <div className="flex items-center gap-3">
              <img src="/img/GreenProgress.png" alt="medico icon" />
              <img src="/img/GreenProgress.png" alt="medico icon" />
              <img src="/img/GreenProgress.png" alt="medico icon" />
            </div>
          </div>
          <div className="mb-2 flex items-stretch">
            <div className="flex-grow">
              <div className="flex justify-between items-center gap-4 ">
                <div className='flex flex-col w-full'><label htmlFor="hipoteses" className="block text-sm font-medium text-gray-700">Hipóteses:</label>
                  <textarea id="hipotese" value={hipotese} onChange={(e) => setHipotese(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-4 resize-none items-center" placeholder="Insira uma hipótese" />
                </div>
                <button
                  type="button"
                  onClick={handleHipotese}
                  className={`items-center justify-center px-2 py-2 w-12 h-12 mt-4 bg-green-600 hover:bg-gray-800 text-white text-medium text-3xl rounded-full shadow-lg transition-transform duration-200 ${!hipotese.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!hipotese.trim()}
                >
                  <p>+</p>
                </button>
              </div>

            </div>
          </div>
          {hipoteses.map((h, index) => (
            <div key={index} className="flex items-center mb-2 gap-3">
              <textarea readOnly className="mt-2 block w-full border border-gray-300 rounded-md resize-none items-center shadow-sm p-2 text-sm" placeholder=" Nova hipótese" value={h} />
              <button type="button" onClick={() => handleRemoveHipotese(index)} className="ml-2 w-10 h-10 rounded-full text-xl bg-red-500 hover:bg-red-700 text-white justify-center items-center shadow-lg">
                <p>x</p>
              </button>
            </div>
          ))}<div className="mb-2 flex items-stretch">
            <div className="flex-grow">
              <div className="flex justify-between items-center gap-4 ">
                <div className='flex flex-col w-full'><label htmlFor="comorbidades" className="block text-sm font-medium text-gray-700">Comorbidade:</label>
                  <textarea id="hipotese" value={comorbidade} onChange={(e) => setComorbidade(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-4 resize-none items-center" placeholder="Insira uma comorbidade" />
                </div>
                <button
                  type="button"
                  onClick={handleComorbidade}
                  className={`items-center justify-center px-2 py-2 w-12 h-12 mt-4 bg-green-600 hover:bg-gray-800 text-white text-medium text-3xl rounded-full shadow-lg transition-transform duration-200 ${!comorbidade.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!comorbidade.trim()}
                >
                  <p>+</p>
                </button>
              </div>
            </div>
          </div>
          {comorbidades.map((h, index) => (
            <div key={index} className="flex items-center mb-2 gap-3">
              <textarea readOnly className="mt-2 block w-full border border-gray-300 rounded-md resize-none items-center shadow-sm p-2 text-sm" placeholder=" Nova comorbidade" value={h} />
              <button type="button" onClick={() => handleRemoveComorbidade(index)} className="ml-2 w-10 h-10 rounded-full text-xl bg-red-500 hover:bg-red-700 text-white justify-center items-center shadow-lg">
                <p>x</p>
              </button>
            </div>
          ))}

          <div className="mb-2 flex items-stretch">
            <div className="flex-grow">
              <div className="flex justify-between items-center gap-4 ">
                <div className='flex flex-col w-full'><label htmlFor="medicacoes" className="block text-sm font-medium text-gray-700">Medicação:</label>
                  <textarea id="medicacao" value={medicacao} onChange={(e) => setMedicacao(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-4 resize-none items-center" placeholder="Insira uma medicação" />
                </div>
                <button
                  type="button"
                  onClick={handleMedicacao}
                  className={`items-center justify-center px-2 py-2 w-12 h-12 mt-4 bg-green-600 hover:bg-gray-800 text-white text-medium text-3xl rounded-full shadow-lg transition-transform duration-200 ${!medicacao.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!medicacao.trim()}
                >
                  <p>+</p>
                </button>
              </div>

            </div>
          </div>
          {medicacoes.map((h, index) => (
            <div key={index} className="flex items-center mb-2 gap-3">
              <textarea readOnly className="mt-2 block w-full border border-gray-300 rounded-md resize-none items-center shadow-sm p-2 text-sm" placeholder=" Nova medicação" value={h} />
              <button type="button" onClick={() => handleRemoveMedicacao(index)} className="ml-2 w-10 h-10 rounded-full text-xl bg-red-500 hover:bg-red-700 text-white justify-center items-center shadow-lg">
                <p>x</p>
              </button>
            </div>
          ))}

          <div className="flex justify-center">
            <button type="submit" className="mt-1 w-full px-4 py-2 bg-black hover:bg-gray-800 text-white font-weight rounded-md shadow-lg transition-transform duration-200 hover:scale-105">
              Gerar consulta
            </button>
          </div>
        </form>

        <DownerNav></DownerNav>
      </CentralizedLayout >
    </>
  )
}
