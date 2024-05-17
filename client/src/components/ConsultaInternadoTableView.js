import React, { useState } from "react";
import { useRouter } from 'next/navigation';


export default function ConsultaInternadoTableView({ ConsultasInternado, isSearch }) {
  const router = useRouter();

  const handleMoreInfoClick = (codigo, nomeMedico, nomePaciente, data_realizacao) => {
    router.push({
      pathname: `/consultainternado/${codigo}`,
      query: { nomeMedico, nomePaciente, data_realizacao }
    });
  };

  return (
    <div className="container mx-auto mt-8 flex items-center justify-center">
      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-sm text-left">Data Realização</th>
            <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-sm text-left">Nome do paciente</th>
            <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-sm text-left">Nome do médico</th>
            <th className="border-b-2 border-gray-300 px-5 py-2 text-left text-sm">Ações</th>
          </tr>
        </thead>
        <tbody>

          {ConsultasInternado && ConsultasInternado.map((consulta) => (
            <tr key={ConsultasInternado.fk_medico_cpf}>
              <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{consulta.data_realizacao}</td>
              <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{consulta.nomePaciente}</td>
              <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{consulta.nomeMedico}</td>
              <td className="flex gap-2 items-start justify-start border-b border-gray-300 border-r px-5 py-2 ">
              <img
                  src="/img/MoreInfo.png"
                  className="w-6 h-6 mt-1 cursor-pointer transition-transform duration-200 hover:scale-125"
                  alt="Mais informações"
                  onClick={() => handleMoreInfoClick(consulta.fk_registro_internado_codigo, consulta.nomeMedico, consulta.nomePaciente, consulta.data_realizacao)}
                />

              </td>
            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}