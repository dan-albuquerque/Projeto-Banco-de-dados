// pages/consulta/[codigo].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CentralizedLayout } from '@/app/layout';
import DownerNav from '@/components/DownerNav';
import Cookies from 'js-cookie';

export default function ConsultaDetalhes() {
  const router = useRouter();
  const { codigo, cpf_medico, cpf_paciente } = router.query;
  const [consulta, setConsulta] = useState(null);
  const [hipoteses, setHipoteses] = useState([]);
  const [detalhesConsulta, setDetalhesConsulta] = useState({
    data_realizacao: '',
    nomePaciente: '',
    nomeMedico: '',
  });

  const jwtToken = Cookies.get('jwtToken');

  const fetchWithAuth = async (url) => {
    return await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
  }

  useEffect(() => {
    if (codigo) {
      // Fetch the consulta details using the codigo
      fetchWithAuth(`http://localhost:8080/registro_internado/${codigo}`)
        .then(res => res.json())
        .then(data => {
          console.log("Consulta data:", data);
          setConsulta(data);
        })
        .catch(error => console.error('Error fetchWithAuthing consulta:', error));

      // fetchWithAuth the hipoteses using the codigo
      fetchWithAuth(`http://localhost:8080/hipotese/${codigo}`)
        .then(res => res.json())
        .then(data => {
          console.log("Hipoteses data:", data);
          setHipoteses(data);
        })
        .catch(error => console.error('Error fetchWithAuthing hipoteses:', error));
    }// fetchWithAuth consulta details using the codigo, cpf_medico and cpf_paciente
    fetchWithAuth(`http://localhost:8080/consulta_internado/details/${codigo}/${cpf_medico}/${cpf_paciente}`)
      .then(res => res.json())
      .then(data => setDetalhesConsulta(data))
      .catch(error => console.error('Error fetching consulta details:', error));
  }, [codigo, cpf_medico, cpf_paciente]);

  if (!consulta) {
    return <div>Loading...</div>;
  }

  return (
    <CentralizedLayout>
      <div className="flex flex-col items-start justify-center w-2/3 gap-10 mb-16" style={{ height: '80vh' }}>
        <div>
          <h1 className="text-3xl font-medium mb-1">Detalhes da Consulta de {detalhesConsulta.nomePaciente} e {detalhesConsulta.nomeMedico}</h1>
          <div className='flex gap-6 text-lg'>
            <p className='italic text-grey-600'>Data da Realização: {detalhesConsulta.data_realizacao}</p>
          </div>
        </div>
        <div className='flex items-center justify-between gap-10 w-full'>
          <div className='relative flex flex-col w-full border h-56 px-6 py-4 border-blue-400 shadow-md rounded-md overflow-auto'>
            <p className='w-2/3'><strong>Evolução:</strong> {consulta.evolucao}</p>
            <p className='w-2/3'><strong>Histórico de exames:</strong> {consulta.historico_exames}</p>
            <img src="/img/consulta.svg" alt="Imagem" className="absolute bottom-2 right-2 w-36 h-36" />
          </div>
        </div>
        <div className='flex items-start justify-between gap-10 w-full'>
          <div className='relative flex flex-col w-full border h-56 px-6 py-4 border-blue-400 shadow-md rounded-md overflow-auto'>
            <h2 className="text-2xl font-bold">Hipóteses Diagnósticas</h2>
            <ul className="list-disc list-inside">
              {Array.isArray(hipoteses) && hipoteses.length > 0 ? (
                hipoteses.map((hipotese) => (
                  <li className="w-2/3" key={hipotese.id}>{hipotese.descricao || 'Descrição não disponível'}</li>
                ))
              ) : (
                <li>Sem hipóteses diagnósticas disponíveis</li>
              )}
            </ul>
            <img src="/img/doctorexplaining.svg" alt="Imagem" className="absolute bottom-2 right-2 w-36 h-36" />
          </div>
        </div>
      </div>
      <DownerNav />
    </CentralizedLayout>
  );
}
