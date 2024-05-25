import React, { useState } from 'react';
import DownerNav from '@/components/DownerNav';
import MonitoriasBackupTableView from '@/components/MonitoriasBackupTableView';
import UpperNavMonitorias from '@/components/UpperNavMonitorias';
import { Layout } from '@/app/layout';

export async function getServerSideProps() {
  const urls = {
    monitorias: 'http://localhost:8080/backup-monitora',
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

  const [isSearch, setIsSearch] = useState(false);
  const [upperNavSearch, setUpperNavSearch] = useState(null);

  const handleUpperNavSearch = (data) => {
    setIsSearch(true);
    console.log("is Search");
    console.log('data: ', data);
    setUpperNavSearch(data);
  }

  const undoSearch = () => {
    console.log("3. terceira e final etapa. undo search foi acionado. Estou em viewconsultas.js"); 
    setIsSearch(false);
    setUpperNavSearch(null);
  };

  const renderTable = () => {
    if (!Array.isArray(monitorias)) {
      console.log('Monitorias is not an array:', monitorias);
      return <div>No data available</div>;
    }

    if (isSearch && upperNavSearch) {
      return (
        <MonitoriasBackupTableView monitoria={upperNavSearch} />
      );
    }

    return (
      <MonitoriasBackupTableView monitoria={monitorias} />
    );
  };

  return (
    <Layout>
      <UpperNavMonitorias
        onData={handleUpperNavSearch}
        cancelSearch={undoSearch}
      />
      <div className="border border-gray-300 mt-4 rounded-lg bg-customGrey mx-auto shadow-md hover:shadow-lg focus:shadow-xl w-11/12 overflow-auto" style={{ height: '70vh' }}>
        {renderTable()}
      </div>
      <DownerNav />
    </Layout>
  );
}
