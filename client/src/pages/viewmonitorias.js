import React from 'react';
import DownerNav from '@/components/DownerNav';
import MonitoriasTableView from '@/components/MonitoriasTableView';

export async function getServerSideProps() {
  const urls = {
    monitorias: 'http://localhost:8080/monitora',
  };

  try {
    const monitoriasRes = await fetch(urls.monitorias);
    const monitorias = await monitoriasRes.json();

    const monitoriasWithNames = await Promise.all(monitorias.map(async (monitoria) => {
      const responsePaciente = await fetch(`http://localhost:8080/pacient/${monitoria.fk_paciente_cpf}`);
      const paciente = await responsePaciente.json();

      const responseInterno = await fetch(`http://localhost:8080/intern/${monitoria.fk_interno_cpf}`);
      const interno = await responseInterno.json();

      return { ...monitoria, nomePaciente: paciente.nome, nomeInterno: interno.nome };
    }));

    return {
      props: {
        monitorias: monitoriasWithNames,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { notFound: true };
  }
}

export default function ViewMonitorias({ monitorias }) {
  const renderTable = () => {
    // Certifica-se de que monitorias é um array antes de passar para MonitoriasTableView
    if (!Array.isArray(monitorias)) {
      console.log('Monitorias is not an array:', monitorias);
      return <div>No data available</div>;
    }

    return (
      <MonitoriasTableView monitoria={monitorias} />
    );
  };

  return (
    <>
      <div className="border border-gray-300 mt-4 rounded-lg bg-customGrey mx-auto shadow-md hover:shadow-lg focus:shadow-xl w-11/12 overflow-auto" style={{ height: '70vh' }}>
        {renderTable()}
      </div>
      <DownerNav />
    </>
  );
}
