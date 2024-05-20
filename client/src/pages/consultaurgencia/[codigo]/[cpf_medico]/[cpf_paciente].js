import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CentralizedLayout } from '@/app/layout';
import DownerNav from '@/components/DownerNav';

export default function ConsultaDetalhes() {
  const router = useRouter();
  const { codigo, cpf_medico, cpf_paciente } = router.query;
  const [consulta, setConsulta] = useState(null);
  const [comorbidades, setComorbidades] = useState([]);
  const [hipoteses, setHipoteses] = useState([]);
  const [medicacoes, setMedicacoes] = useState([]);
  const [detalhesConsulta, setDetalhesConsulta] = useState({
    data_realizacao: '',
    nomePaciente: '',
    nomeMedico: '',
  });

  useEffect(() => {
    if (codigo && cpf_medico && cpf_paciente) {
      // Fetch the consulta details using the codigo
      fetch(`http://localhost:8080/registro_urgencia/${codigo}`)
        .then(res => res.json())
        .then(data => setConsulta(data))
        .catch(error => console.error('Error fetching consulta:', error));

      // Fetch the comorbidades using the codigo
      fetch(`http://localhost:8080/comorbidade/${codigo}`)
        .then(res => res.json())
        .then(data => setComorbidades(data))
        .catch(error => console.error('Error fetching comorbidades:', error));

      // Fetch the hipoteses using the codigo
      fetch(`http://localhost:8080/hipotese/${codigo}`)
        .then(res => res.json())
        .then(data => setHipoteses(data))
        .catch(error => console.error('Error fetching hipoteses:', error));

      // Fetch the medicacoes using the codigo
      fetch(`http://localhost:8080/medicacao/${codigo}`)
        .then(res => res.json())
        .then(data => setMedicacoes(data))
        .catch(error => console.error('Error fetching medicacoes:', error));

      // Fetch consulta details using the codigo, cpf_medico and cpf_paciente
      fetch(`http://localhost:8080/consulta_urgencia/details/${codigo}/${cpf_medico}/${cpf_paciente}`)
        .then(res => res.json())
        .then(data => setDetalhesConsulta(data))
        .catch(error => console.error('Error fetching consulta details:', error));
    }
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
            <p className='italic text-grey-600'>Código de Registro: {consulta.fk_registro_codigo || consulta.registroCodigo}</p>
            <p className='italic text-grey-600'>Data da consulta: {detalhesConsulta.data_realizacao}</p>
          </div>
        </div>
        <div className='flex items-center justify-between gap-10 w-full'>
          <div className='relative flex flex-col w-full border h-56 px-6 py-4 border-blue-400 shadow-md rounded-md overflow-auto'>
            <p className='w-2/3'><strong>Histórico da Doença:</strong> {consulta.historico_doenca || consulta.historicoDoenca}</p>
            <p className='w-2/3'><strong>Exame Físico:</strong> {consulta.exame_fisico || consulta.exameFisico}</p>
            
            <img src="/img/consulta.svg" alt="Imagem" className="absolute bottom-2 right-2 w-36 h-36" />
          </div>
          <div className='relative flex flex-col border h-56 px-6 py-4 border-blue-400 shadow-md rounded-md w-full overflow-auto'>
            <h2 className="text-2xl font-bold">Comorbidades</h2>
            <ul className="list-disc list-inside">
              {comorbidades.map((comorbidade) => (
                <li className="w-2/3" key={comorbidade.id}>{comorbidade.nome}</li>
              ))}
            </ul>
            <img src="/img/sickpatient.svg" alt="Imagem" className="absolute bottom-2 right-2 w-36 h-36" />
            
          </div>
        </div>
        <div className='flex items-start justify-between gap-10 w-full'>
          <div className='relative flex flex-col w-1/2 border h-56 px-6 py-4 border-blue-400 shadow-md rounded-md overflow-auto'>
            <h2 className="text-2xl font-bold">Hipóteses Diagnósticas</h2>
            <ul className="list-disc list-inside">
              {hipoteses.map((hipotese) => (
                <li className="w-2/3" key={hipotese.id}>{hipotese.descricao || 'Descrição não disponível'}</li>
              ))}
            </ul>
            <img src="/img/doctorexplaining.svg" alt="Imagem" className="absolute bottom-2 right-2 w-36 h-36" />
          </div>
          <div className='relative flex flex-col w-1/2 border h-56 px-6 py-4 border-blue-400 shadow-md rounded-md overflow-auto'>
            <h2 className="text-2xl font-bold">Medicações</h2>
            <ul className="list-disc list-inside">
              {medicacoes.map((medicacao) => (
                <li className="w-2/3" key={medicacao.id}>{medicacao.nome}</li>
              ))}
            </ul>
            <img src="/img/receita.svg" alt="Imagem" className="absolute bottom-2 right-2 w-36 h-36" />
          </div>
        </div>
      </div>
      <DownerNav />
    </CentralizedLayout>
  );
}
