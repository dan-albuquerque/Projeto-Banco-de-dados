import React, { useState } from 'react';
import "../app/globals.css";
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function CriarMedico() {
  const [medico, setMedico] = useState({
    cpf: "",
    nome: "",
    rqe: null,
    senha: "",
    especialidade: "",
    crm: "",
    fk_medico_gerente: null
  });

  const handleChange = (e) => {
    setMedico({ ...medico, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(medico);
    try {
      const response = await fetch('http://localhost:8080/medico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({
          cpf: medico.cpf,
          rqe: parseInt(medico.rqe), // Certifique-se de que rqe é um número inteiro
          nome: medico.nome,
          senha: medico.senha,
          especialidade: medico.especialidade,
          crm: medico.crm,
          fk_medico_cpf_gerente: medico.fk_medico_gerente
        })
      });
      if (response.ok) {
        toast.success('Médico inserido com sucesso!');
      } else {
        throw new Error('Falha ao inserir médico!');
      }
    } catch (error) {
      console.error('Erro ao inserir médico:', error);
      toast.error('Erro ao inserir médico: ' + error.message);
    }
  }

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-light text-customBlue">Inserir Médico</h1>
        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
          <input type="text" name="cpf" value={medico.cpf} onChange={handleChange} placeholder="CPF" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <input type="text" name="nome" value={medico.nome} onChange={handleChange} placeholder="Nome" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <input type="text" name="rqe" value={medico.rqe} onChange={handleChange} placeholder="RQE" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <input type="text" name="senha" value={medico.senha} onChange={handleChange} placeholder="Senha" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <input type="text" name="especialidade" value={medico.especialidade} onChange={handleChange} placeholder="Especialidade" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <input type="text" name="crm" value={medico.crm} onChange={handleChange} placeholder="CRM" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <input type="text" name="fk_medico_gerente" value={medico.fk_medico_gerente} onChange={handleChange} placeholder="CPF do médico gerente (apenas se o médico tiver um gerente)" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <button className="bg-customBlue text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 text-xs focus:ring-blue-600 transition-transform duration-200 hover:scale-105">Adicionar</button>
        </form>
      </div>
    </>
  );
}
