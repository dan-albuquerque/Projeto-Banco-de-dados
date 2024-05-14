import React, { useState } from "react";


export default function ConsultaInternadoTableView({ ConsultasInternado }) {

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

          {ConsultasInternado && ConsultasInternado.map((Consulta) => (
            <tr key={ConsultasInternado.fk_medico_cpf}>
              <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{Consulta.data_realizacao}</td>
              <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{Consulta.nomePaciente}</td>
              <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{Consulta.nomeMedico}</td>
              <td className="flex gap-2 items-start justify-start border-b border-gray-300 border-r px-5 py-2 ">
                <img src="/img/MoreInfo.png" className="w-6 h-6 mt-1" alt="perfil icon" />
                <img src="/img/Update.png" className="w-6 h-6 mt-1" alt="perfil icon" />
                <img src="/img/Delete.png" className="w-6 h-6 mt-1" alt="perfil icon" />
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
