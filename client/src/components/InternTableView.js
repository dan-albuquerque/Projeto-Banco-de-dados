import React from "react";

export default function InternTableView({ interns }) {
    return (
        <div className="container mx-auto mt-8 flex items-center justify-center">
            <table className="w-5/6 table-auto border-collapse border border-gray-300 ml-3">
                <thead>
                    <tr>
                        <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-sm text-left">Nome</th>
                        <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-sm text-left">CPF</th>
                        <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-sm text-left">Matricula</th>
                        <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-sm text-left">Senha</th>
                        <th className="border-b-2 border-gray-300 px-5 py-2 text-sm text-left">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {interns.map((intern) => (
                        <tr key={intern.cpf}>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{intern.nome}</td>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{intern.cpf}</td>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{intern.matricula}</td>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{intern.senha}</td>
                            <td className="flex gap-2 items-start justify-start border-b border-gray-300 border-r px-5 py-2">
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
