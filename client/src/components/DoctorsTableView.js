import React from 'react';

export default function DoctorsTableView({ doctors }) {
    return (
        <div className="container mx-auto mt-8 flex items-center justify-center">
            <table className="w-5/6 table-auto border-collapse border border-gray-300 ml-3">
                <thead>
                    <tr>
                        <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-left text-sm">Nome</th>
                        <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-left text-sm">CPF</th>
                        <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-left text-sm">RQE</th>
                        <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-left text-sm">CRM</th>
                        <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-left text-sm">Medico Gerente</th>
                        <th className="border-b-2 border-gray-300 px-5 py-2 text-left text-sm">Ações</th>

                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.cpf}>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{doctor.nome}</td>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{doctor.cpf}</td>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{doctor.rqe}</td>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{doctor.crm}</td>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{doctor.fk_medico_cpf_gerente}</td>
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
