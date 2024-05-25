import React from 'react';
import { useRouter } from 'next/navigation';

export default function MonitoriasBackupTableView({ monitoria }) {
  const router = useRouter();

  // Verifica se monitoria é um array
  if (!Array.isArray(monitoria)) {
    console.log('Monitoria is not an array:', monitoria);
    return <div>No data available</div>;
  }

  return (
    <div className="container mx-auto mt-8 flex items-center justify-center">
      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-sm text-left">Nome do paciente</th>
            <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-sm text-left">Nome do interno</th>
            <th className="border-b-2 border-gray-300 px-5 py-2 text-left text-sm">Data de término</th>
          </tr>
        </thead>
        <tbody>
          {monitoria.map((relacao, index) => (
            <tr key={index}>
              <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{relacao.nomePaciente}</td>
              <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{relacao.nomeInterno}</td>
              <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{relacao.deletedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
