// pages/consulta/[codigo].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Data from '../Data';

export default function ConsultaDetalhes() {
  const router = useRouter();
  const { codigo, nomeMedico, nomePaciente, data_realizacao} = router.query;
  const [consulta, setConsulta] = useState(null);
  const [comorbidades, setComorbidades] = useState([]);
  const [hipoteses, setHipoteses] = useState([]);
  const [medicacoes, setMedicacoes] = useState([]);

  useEffect(() => {
    if (codigo) {
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
    }
  }, [codigo]);

  if (!consulta) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Detalhes da Consulta</h1>
      <p><strong>Data da Realização:</strong> {data_realizacao}</p>
      <p><strong>Nome do Paciente:</strong> {nomePaciente}</p>
      <p><strong>Nome do Médico:</strong> {nomeMedico}</p>
      <p><strong>Histórico da Doença:</strong> {consulta.historico_doenca || consulta.historicoDoenca}</p>
      <p><strong>Exame Físico:</strong> {consulta.exame_fisico || consulta.exameFisico}</p>
      <p><strong>Registro Código:</strong> {consulta.fk_registro_codigo || consulta.registroCodigo}</p>
      
      <h2 className="text-2xl font-bold mt-4 mb-2">Comorbidades</h2>
      <ul className="list-disc list-inside">
        {comorbidades.map((comorbidade) => (
          <li key={comorbidade.id}>{comorbidade.nome}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-4 mb-2">Hipóteses Diagnósticas</h2>
      <ul className="list-disc list-inside">
        {hipoteses.map((hipotese) => (
          <li key={hipotese.id}>{hipotese.descricao || 'Descrição não disponível'}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-4 mb-2">Medicações</h2>
      <ul className="list-disc list-inside">
        {medicacoes.map((medicacao) => (
          <li key={medicacao.id}>{medicacao.nome}</li>
        ))}
      </ul>
    </div>
  );
}
