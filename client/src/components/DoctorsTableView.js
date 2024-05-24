import React, { useState, useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function DoctorsTableView({ doctors }) {
  const [medico, setMedico] = useState({
    nome: null,
    rqe: null,
    crm: null,
    especialidade: null,
    fk_medico_cpf_gerente: null,
    ativo: true,
    senha: null
  });
  const [isGerente, setIsGerente] = useState(false);
  const [nomeGerente, setNomeGerente] = useState('');
  const [cpf, setCpf] = useState('');

  const [User, setUser] = useState({
    cpf: "",
    nome: "",
    rqe: null,
    senha: "",
    especialidade: "",
    crm: "",
    ativo: true,
    fk_medico_cpf_gerente: null
  });
  const [fkCpfGerente, setFkCpfGerente] = useState('');

  const [isUserGerente, setIsUserGerente] = useState(false);

  const [isUserAtivo, setIsUserAtivo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedico({
      ...medico,
      [name]: value
    });
    console.log('medico: ', medico);
  };

  const canEditOrDelete = (doctor) => {
    return isUserGerente && User.cpf === doctor.fk_medico_cpf_gerente;
  };

  useEffect(() => {
    console.log('medico: ', medico);
  }, [medico]);

  useEffect(() => {
    if (cpf) {
      console.log('Updated CPF in state: ', cpf);
      // Any other logic that needs to run when cpf changes can go here
    }
  }, [cpf]); // This effect runs whenever `cpf` changes.

  const handleEditClick = (cpfdata) => {
    setCpf(cpfdata);
  };

  const EditDoctor = async (cpf) => {
    console.log('Edit Doctor CPF: ', cpf);
    try {
      const response = await fetch(`http://localhost:8080/medico/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(medico)
      });
      if (response.ok) {
        console.log('Médico atualizado com sucesso!');
        toast.success('Médico atualizado com sucesso!');
      }
    }
    catch (error) {
      console.error('Erro ao atualizar médico:', error);
      toast.error('Erro ao atualizar médico.');
    }
  };

  const handleSubmit = (e, cpf) => {
    e.preventDefault();
    EditDoctor(cpf);
  };

  const fireDoctor = async (cpf) => {
    try {
      const response = await fetch(`http://localhost:8080/medico/desativar/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        console.log('Médico inativado com sucesso!');
        toast.success('Médico inativado com sucesso!');
        window.location.reload();
      }
    }
    catch (error) {
      console.error('Erro ao inativar médico:', error);
      toast.error('Erro ao inativar médico.');
    }
  };

  const hireDoctor = async (cpf) => {
    try {
      const response = await fetch(`http://localhost:8080/medico/ativar/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        console.log('Médico ativado com sucesso!');
        toast.success('Médico ativado com sucesso!');
        window.location.reload();
      }
    }
    catch (error) {
      console.error('Erro ao ativar médico:', error);
      toast.error('Erro ao ativar médico.');
    }
  };

  const getInfoGerente = async (nomeMedicoGerente) => {
    console.log('cpf gerente: ', nomeMedicoGerente);

    try {
      const response = await fetch(`http://localhost:8080/medico/${nomeMedicoGerente}`);
      if (response.ok) {
        const data = await response.json();
        setNomeGerente(data.nome);
      }
      console.log('Nome Gerente: ', nomeGerente);
    }
    catch (error) {
      console.error('Erro ao buscar informações do médico:', error);
    }
  };

  useEffect(() => {
    const handleIsUserAtivo = async () => {
      const cpf = localStorage.getItem('cpf');
      if (cpf) {
        try {
          const response = await fetch(`http://localhost:8080/medico/${cpf}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
            setIsUserAtivo(data.ativo);
          }
        } catch (error) {
          console.error('Erro ao buscar informações do médico:', error);
        }
      }
    }
    handleIsUserAtivo();
  }, []);

  useEffect(() => {
    const handleIsUserGerente = async () => {
      const cpf = localStorage.getItem('cpf');
      console.log('CPF usuario: ', cpf);
      if (cpf) {
        try {
          console.log('url: ', `http://localhost:8080/medico/${cpf}`);
          const response = await fetch(`http://localhost:8080/medico/${cpf}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
            setFkCpfGerente(User.fk_medico_cpf_gerente);
            console.log('cpf gerente: ', data.fk_medico_cpf_gerente);

            if (data.fk_medico_cpf_gerente === null) {
              console.log(' É gerente');
              setIsUserGerente(true);
            } else {
              console.log(' nao é gerente');
              setIsUserGerente(false);
            }
          }
        } catch (error) {
          console.error('Erro ao buscar informações do médico:', error);
        }
      }
    };
    handleIsUserGerente();
  }, []);

  const handleHoverCard = (doctor) => {
    if (doctor.fk_medico_cpf_gerente === null) {
      setIsGerente(true);
    } else {
      setIsGerente(false);
      getInfoGerente(doctor.fk_medico_cpf_gerente);
    }
  };

  return (
    <>
      <Toaster />
      <div className="container mx-auto mt-8 flex items-center justify-center gap-4">
        <table className="w-5/6 table-auto border-collapse border border-gray-300 ml-3">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-left text-sm">Nome</th>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-left text-sm">CPF</th>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-left text-sm">RQE</th>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-left text-sm">CRM</th>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-left text-sm">Médico Gerente</th>
              <th className="border-b-2 border-gray-300 px-5 py-2 text-left text-sm">Ações</th>
            </tr>
          </thead>
          <tbody>
            {doctors && doctors.map((doctor) => (
              <tr key={doctor.cpf}>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{doctor.nome}</td>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{doctor.cpf}</td>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{doctor.rqe}</td>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{doctor.crm}</td>
                
                <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{doctor.fk_medico_cpf_gerente}</td>
                <td className="flex gap-2 items-start justify-start border-b border-gray-300 border-r px-5 py-2 ">
                  <HoverCard>
                    <HoverCardTrigger onMouseEnter={() => handleHoverCard(doctor)}> <img src="/img/MoreInfo.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" /> </HoverCardTrigger>
                    <HoverCardContent>
                      {isGerente ? (
                        <div>
                          <p>• Especialidade: {doctor.especialidade}</p>
                        </div>
                      ) : (
                        <div>
                          <p>• Especialidade: {doctor.especialidade}</p>
                          <p>• Médico gerente: {nomeGerente}</p>
                        </div>
                      )}
                    </HoverCardContent>
                  </HoverCard>

                  {canEditOrDelete(doctor) &&
                    <Sheet>
                      <SheetTrigger> <img onClick={() => handleEditClick(doctor.cpf)} src="/img/Update.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" /> </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Edite um médico</SheetTitle>
                          <SheetDescription>
                            <p>Preencha os campos abaixo para atualizar as informações do médico.</p>
                            <form onSubmit={(e) => handleSubmit(e, cpf)}>
                              <div className="mt-4 flex flex-col gap-4">
                                <input type="text" name="nome" id="nome" onChange={handleChange} placeholder="Nome" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                                <input type="text" name="rqe" id="rqe" onChange={handleChange} placeholder="RQE" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                                <input type="text" name="crm" id="crm" onChange={handleChange} placeholder="CRM" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                                <input type="text" name="especialidade" id="especialidade" placeholder="Especialidade" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                                <input type="text" name="senha" id="senha" placeholder="senha" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                                <input type="text" name="medicoCpfGerente" id="medicoCpfGerente" placeholder="Médico Gerente (Caso exista)" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                                <button className="bg-customBlue text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full text-medium transition-transform duration-200 hover:scale-105">Atualizar</button>
                              </div>
                            </form>
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>
                  }

                  {canEditOrDelete(doctor) && (doctor.ativo ? (
                    <AlertDialog>
                      <AlertDialogTrigger><img onClick={() => handleEditClick(doctor.cpf)} src="/img/redcancel.svg" className="w-8 h-8 transition-transform duration-200 hover:scale-110" alt="perfil icon" /></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Desativar médico?</AlertDialogTitle>
                          <AlertDialogDescription>
                            O status do médico passará a ser inativo.                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => fireDoctor(cpf)}>Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger><img onClick={() => handleEditClick(doctor.cpf)} src="/img/plus.svg" className="w-8 h-8 transition-transform duration-200 hover:scale-110" alt="perfil icon" /></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Ativar médico?</AlertDialogTitle>
                          <AlertDialogDescription>
                            O status do médico passará a ser ativo.                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => hireDoctor(cpf)}>Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )
                  )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="mt-7">
         {doctors && doctors.map((doctor) => (
          <li key={doctor.cpf}>
                  <div className="mt-1 flex gap-3 items-center">
                  <p className={`text-4xl ${doctor.ativo ? "text-green-500" : "text-red-500"}`} style={{ textShadow: doctor.ativo ? '0 0 15px green' : '0 0 15px green' }}>•</p>

                    <p className="text-xs">{doctor.ativo ? "Ativo" : "Inativo"}</p>
                  </div>
          </li>
         ))}
        </ul>

      </div>
    </>

  );
}
