import React, { useState } from 'react';
import DownerNav from '@/components/DownerNav';
import MonitoriasBackupTableView from '@/components/MonitoriasBackupTableView';
import UpperNavMonitorias from '@/components/UpperNavMonitorias';
import { Layout } from '@/app/layout';
import cookie from 'cookie';

export async function getServerSideProps(context) {
  const urls = {
    monitorias: 'http://localhost:8080/backup-monitora',
  };

  const { req, res } = context;

  const parsedCookies = cookie.parse(req ? req.headers.cookie || "" : "");
  const docCpf = parsedCookies.cpf
  const jwtToken = parsedCookies.jwtToken;

  const fetchWithAuth = async (url) => {
    return await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
  }

  try {
    const monitoriasRes = await fetchWithAuth(urls.monitorias);
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
  const [monitoraType, setMonitoraType] = useState('backup-monitora');

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
        monitoraType={monitoraType}
      />
      <div className="border border-gray-300 mt-4 rounded-lg bg-customGrey mx-auto shadow-md hover:shadow-lg focus:shadow-xl w-11/12 overflow-auto" style={{ height: '70vh' }}>
        {renderTable()}
      </div>
      <DownerNav />
    </Layout>
  );
}
