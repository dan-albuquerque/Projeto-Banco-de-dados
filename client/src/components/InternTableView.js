import React from "react";

export default function InternTableView({ interns }) {
    return (
        <div className="container mx-auto mt-8">
            <table className="w-5/6 table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">Nome</th>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">CPF</th>
                        <th className="border-b-2 border-gray-300 border-r px-4 py-2 text-left">Matricula</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Senha</th>
                    </tr>
                </thead>
                <tbody>
                    {interns.map((intern) => (
                        <tr key={intern.cpf}>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{intern.nome}</td>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{intern.cpf}</td>
                            <td className="border-b border-gray-300 border-r px-4 py-2 text-left">{intern.matricula}</td>
                            <td className="border-b border-gray-300 px-4 py-2 text-left">{intern.senha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
