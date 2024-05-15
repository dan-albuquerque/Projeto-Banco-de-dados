// pages/consulta/[codigo].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CentralizedLayout } from '@/app/layout';
import DownerNav from '@/components/DownerNav';
export default function ConsultaDetalhes() {
  const router = useRouter();
  const { codigo, nomeMedico, nomePaciente, data_realizacao } = router.query;
  const [consulta, setConsulta] = useState(null);
  const [hipoteses, setHipoteses] = useState([]);

  useEffect(() => {
    if (codigo) {
      // Fetch the consulta details using the codigo
      fetch(`http://localhost:8080/registro_internado/${codigo}`)
        .then(res => res.json())
        .then(data => {
          console.log("Consulta data:", data);
          setConsulta(data);
        })
        .catch(error => console.error('Error fetching consulta:', error));

      // Fetch the hipoteses using the codigo
      fetch(`http://localhost:8080/hipotese/${codigo}`)
        .then(res => res.json())
        .then(data => {
          console.log("Hipoteses data:", data);
          setHipoteses(data);
        })
        .catch(error => console.error('Error fetching hipoteses:', error));
    }
  }, [codigo]);

  if (!consulta) {
    return <div>Loading...</div>;
  }

  return (
    <CentralizedLayout>
  <div className="flex flex-col items-start justify-center w-2/3 gap-10 mb-16" style={{ height: '80vh' }}>
    <div>
      <h1 className="text-3xl font-medium mb-1">Detalhes da Consulta de {nomePaciente} e {nomeMedico}</h1>
      <div className='flex gap-6 text-lg'>
        <p className='italic text-grey-600'>Data da Realização: {data_realizacao}</p>
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