import React, { useState } from "react";
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

import Cookies from "js-cookie";


export default function InternTableView({ interns }) {
  const jwtToken = Cookies.get('jwtToken');

  const [hoverContent, setHoverContent] = useState(null);

  const [intern, setIntern] = useState(
    {
      nome: null,
      matricula: null,
    }
  );

  const [cpf, setCpf] = useState(null);

  const handleChange = (e) => {
    setIntern({
      ...intern,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data to be sent to the API:", intern);
    const success = await EditIntern(intern, cpf); // Pass cpf to EditIntern function
    if (success) {
      toast.success('Interno editado com sucesso!');
      window.location.reload();
    } else {
      toast.error('Erro ao editar interno.');
    }
  };

  const handleEditClick = (cpfdata) => {
    setCpf(cpfdata); // Set the cpf state to the intern's cpf
    console.log("Editing intern with CPF: ", cpfdata);
  };

  const EditIntern = async (intern, cpf) => {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log("Attempting to access URL: http://localhost:8080/intern/" + cpf);
    try {
      const response = await fetch(`http://localhost:8080/intern/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(intern),
      });
      if (response.ok) {
        console.log("Intern updated successfully.");
        return true;
      } else {
        console.log("Failed to update intern. Status: " + response.status);
        return false;
      }
    } catch (error) {
      console.error("Error updating intern: ", error);
      return false;
    }
  };

  const handleDeleteIntern = async (cpf) => {
    const isDeleted = await deleteIntern(cpf);

    isDeleted ? toast.success('Interno deletado com sucesso!') : toast.error('Erro ao deletar interno.');
    window.location.reload();
  };

  const deleteIntern = async (cpf) => {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log("Attempting to access URL: http://localhost:8080/intern/" + cpf);

    try {
      const response = await fetch(`http://localhost:8080/intern/${cpf}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        },
      });
      if (response.ok) {
        console.log("Intern deleted successfully.");
        return true;
      } else {
        console.log("Failed to delete intern. Status: " + response.status);
        return false;
      }
    } catch (error) {
      console.error("Error deleting intern: ", error);   
      return false;
    }
  };

  const fetchInternInfo = async (cpfIntern) => {
    // Fetch the CPFs of the patients
    console.log("Fetching CPFs of the patients...");
    return fetch(`http://localhost:8080/monitora/interno/${cpfIntern}`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        // Extract only the fk_paciente_cpf from the data
        const cpfs = data.map(item => item.fk_paciente_cpf);

        // For each CPF, fetch the patient's name
        console.log("Fetching names of the patients...");
        const fetchPromises = cpfs.map(async cpfPaciente => {
          const response = await fetch(`http://localhost:8080/pacient/${cpfPaciente}`, {
            headers: {
              'Authorization': `Bearer ${jwtToken}`
            }
          });
          return await response.json();
        });

        return Promise.all(fetchPromises);
      })
      .then(patients => {
        // Create the hover content
        console.log("Creating hover content...");
        return patients.map(patient => `${patient.cpf} - ${patient.nome}`);
      });
  };

  return (
    <>

      <Toaster />
      <div className="container mx-auto mt-8 flex items-center justify-center">
        <table className="w-5/6 table-auto border-collapse border border-gray-300 ml-3">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-xs text-left">Nome</th>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-sm text-left">CPF</th>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-sm text-left">Matricula</th>
              <th className="border-b-2 border-gray-300 px-5 py-2 text-sm text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {interns && interns.map((intern) => (
              <tr key={intern.cpf}>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left  ">{intern.nome}</td>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left ">{intern.cpf}</td>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left ">{intern.matricula}</td>
                <td className="flex gap-2 items-start justify-start border-b border-gray-300 border-r px-5 py-2">

                  <HoverCard>
                    <HoverCardTrigger onMouseEnter={() => fetchInternInfo(intern.cpf).then(content => setHoverContent(content))}>
                      <img src="/img/MoreInfo.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" />
                    </HoverCardTrigger>
                    {hoverContent && (
                      <HoverCardContent>
                        <p>Paciente(s) monitorados: </p>
                        {hoverContent.map((item, index) => (
                          <div key={index}>
                            <p>• {item}</p>
                          </div>
                        ))}
                      </HoverCardContent>
                    )}
                  </HoverCard>

                  <Sheet>
                    <SheetTrigger onClick={() => handleEditClick(intern.cpf)}>
                      <img src="/img/Update.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" />
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edite um Interno</SheetTitle>
                        <SheetDescription>
                          Preencha <strong>TODOS</strong> os campos abaixo!
                          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6 w-full items-center justify-center">
                            <input type="text" name="nome" onChange={handleChange} placeholder="Nome" className="w-full h-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                            <input type="text" name="matricula" onChange={handleChange} placeholder="Matricula" className="w-full h-10 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                            <button className="bg-customBlue text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full h-10 text-medium transition-transform duration-200 hover:scale-105">Concluir</button>
                          </form>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>

                  <AlertDialog>
                    <AlertDialogTrigger><img src="/img/Delete.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110" alt="perfil icon" /></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação não pode ser desfeita. As informações deste interno serão deletadas permanentemente do banco de dados.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteIntern(intern.cpf)}>Continuar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}


