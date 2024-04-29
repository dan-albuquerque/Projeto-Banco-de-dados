import React from "react";

export default function PatientTableView({ patients }) {
    return (
        <div className="container mx-auto mt-8">
            <table className="w-5/6 table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">Nome</th>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">CPF</th>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">Telefone Residencial</th>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">Telefone Pessoal</th>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">Cidade</th>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">Bairro</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Rua</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.cpf}>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{patient.nome}</td>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{patient.cpf}</td>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{patient.telefone_residencial}</td>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{patient.telefone_pessoal}</td>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{patient.cidade}</td>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{patient.bairro}</td>
                            <td className="border-b border-gray-300 px-4 py-2 text-left">{patient.rua}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}