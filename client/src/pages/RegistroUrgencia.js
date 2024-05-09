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
  const jwtToken = Cookies.get('jwtToken');
  const id_registro = Cookies.get('id_registro');
  const [hipotese, setHipotese] = useState('');
  const [hipoteses, setHipoteses] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setHipoteses([...hipoteses, hipotese]);
    setHipotese('');
  }

  const handleRemoveHipotese = (index) => {
    const newHipoteses = hipoteses.filter((_, idx) => idx !== index);
    setHipoteses(newHipoteses);
  }

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
          <div className="mb-6 flex items-stretch">  {/* Change here */}
          
            <div className="flex-grow">
              <label htmlFor="hipóteses" className="block text-sm font-medium text-gray-700">Hipóteses:</label>
              <textarea id="hipotese" value={hipotese} onChange={(e) => setHipotese(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-4 resize-none" placeholder="Insira uma hipótese" />
            </div>
            <button type="submit" className="align-self-stretch ml-4 px-6 py-2 bg-black hover:bg-gray-800 text-white font-weight rounded-md shadow-lg transition-transform duration-200">ADD</button>
          </div>
          {hipoteses.map((h, index) => (
            <div key={index} className="flex items-center mb-2">
              <input readOnly className="flex-1 border border-gray-300 rounded-md shadow-sm p-2 text-sm" value={h} />
              <button type="button" onClick={() => handleRemoveHipotese(index)} className="ml-2 p-2 bg-red-500 hover:bg-red-700 text-white rounded-md">
                x
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
      </CentralizedLayout>
    </>
  )
}
