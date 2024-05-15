// pages/consulta/[codigo].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Detalhes da Consulta</h1>
      <p><strong>Data da Realização:</strong> {data_realizacao}</p>
      <p><strong>Nome do Paciente:</strong> {nomePaciente}</p>
      <p><strong>Nome do Médico:</strong> {nomeMedico}</p>
      <p><strong>Evolução:</strong> {consulta.evolucao}</p>
      <p><strong>Histórico de exames:</strong> {consulta.historico_exames}</p>
      <p><strong>Registro Código:</strong> {consulta.fk_registro_codigo || consulta.registroCodigo}</p>
      
      <h2 className="text-2xl font-bold mt-4 mb-2">Hipóteses Diagnósticas</h2>
      <ul className="list-disc list-inside">
        {Array.isArray(hipoteses) && hipoteses.length > 0 ? (
          hipoteses.map((hipotese) => (
            <li key={hipotese.id}>{hipotese.descricao || 'Descrição não disponível'}</li>
          ))
        ) : (
          <li>Sem hipóteses diagnósticas disponíveis</li>
        )}
      </ul>
    </div>
  );
}
