import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Perfil() {
  const [medico, setMedico] = useState({
    cpf: "",
    nome: "",
    rqe: null,
    senha: "",
    especialidade: "",
    crm: "",
    fk_medico_cpf_gerente: null
  });

  const [nomeGerente, setNomeGerente] = useState('');
  const [cpfGerente, setCpfGerente] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const cpf = localStorage.getItem('cpf');
      if (cpf) {
        try {
          const response = await fetch(`http://localhost:8080/medico/${cpf}`);
          if (response.ok) {
            const data = await response.json();
            setMedico(data);
            setCpfGerente(data.fk_medico_cpf_gerente);
            console.log(data);
          }
        } catch (error) {
          console.error('Erro ao buscar informações do médico:', error);
        }
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (cpfGerente) {
        try {
          const response = await fetch(`http://localhost:8080/medico/${cpfGerente}`);
          if (response.ok) {
            const data = await response.json();
            setNomeGerente(data.nome);
            console.log(data.nome);
          }
        } catch (error) {
          console.error('Erro ao buscar informações do médico:', error);
        }
      }
    }
    fetchUserData();
  }, [cpfGerente]);

  return (
    <>
      <Toaster />
      <div>
        <h1>Perfil do Médico</h1>
        <p>CPF: {medico.cpf}</p>
        <p>Nome: {medico.nome}</p>
        <p>RQE: {medico.rqe}</p>
        <p>Especialidade: {medico.especialidade}</p>
        <p>CRM: {medico.crm}</p>  
        {medico.fk_medico_cpf_gerente && <p>Gerente: {nomeGerente}</p>}
        {medico.fk_medico_cpf_gerente === null && <p>Cargo: gerente</p>}
      </div>
    </>
  );
}
