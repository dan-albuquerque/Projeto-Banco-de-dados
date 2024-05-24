import React from 'react';
import DownerNav from '@/components/DownerNav';
import MonitoriasTableView from '@/components/MonitoriasTableView';
import UpperNavConsultas from '@/components/UpperNavConsultas';
import UpperNavMonitorias from '@/components/UpperNavMonitorias';
import { Layout } from '@/app/layout';
export async function getServerSideProps() {
  const urls = {
    monitorias: 'http://localhost:8080/monitora',
  };

  try {
    const monitoriasRes = await fetch(urls.monitorias);
    const monitorias = await monitoriasRes.json();

    return {
      props: {
        monitorias: monitorias
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
    <Layout>
      <UpperNavMonitorias />
      <div className="border border-gray-300 mt-4 rounded-lg bg-customGrey mx-auto shadow-md hover:shadow-lg focus:shadow-xl w-11/12 overflow-auto" style={{ height: '70vh' }}>
        {renderTable()}
      </div>
      <DownerNav />
    </Layout>
  );
}
