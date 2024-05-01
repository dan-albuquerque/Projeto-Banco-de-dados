import React from 'react';

export default function DoctorsTableView({ doctors }) {
    return (
        <div className="container mx-auto mt-8 flex items-center justify-center">
            <table className="w-5/6 table-auto border-collapse border border-gray-300 ml-3">
                <thead>
                    <tr>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">Nome</th>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">CPF</th>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">RQE</th>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">CRM</th>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">Medico Gerente</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Ações</th>

                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.cpf}>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{doctor.nome}</td>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{doctor.cpf}</td>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{doctor.rqe}</td>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{doctor.crm}</td>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{doctor.fk_medico_cpf_gerente}</td>
                            <td className="flex gap-4 items-start justify-start border-b border-gray-300 border-r px-4 py-2 ">
                                <img src="/img/MoreInfo.png" className="w-7 h-7 mt-1.5" alt="perfil icon" />
                                <img src="/img/Update.png" className="w-7 h-7 mt-1.5" alt="perfil icon" />
                                <img src="/img/Delete.png" className="w-7 h-7 mt-1.5" alt="perfil icon" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
