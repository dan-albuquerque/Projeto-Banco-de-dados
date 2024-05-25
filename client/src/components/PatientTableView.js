import React, { use, useState, useEffect } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { to } from "react-spring";


export default function PatientTableView({ patients }) {
  const [isInterned, setIsInterned] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [hoverContent, setHoverContent] = useState(null);
  const [roomNumber, setRoomNumber] = useState(null);
  const [nivelTriagem, setTriagemNivel] = useState(null);

  const [patient, setPatient] = useState(
    {
      nome: null,
      cpf: null,
      telefone_residencial: null,
      telefone_pessoal: null,
      cidade: null,
      bairro: null,
      rua: null
    }
  );

  const [internedPatient, setInternedPatient] = useState(
    {
      fk_paciente_cpf: null,
      sala: null,
    });

  const [urgentPatient, setUrgentPatient] = useState(
    {
      fk_paciente_cpf: null,
      nivel_triagem: null,
    });

  const [cpf, setCpf] = useState(null);
  const [deleteCpf, setDeleteCpf] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Always update the patient info regardless of patient type
    setPatient(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Update internedPatient or urgentPatient based on the type
    if (isInterned) {
      setInternedPatient(prevState => ({
        ...prevState,
        [name]: name === 'sala' ? value : prevState.sala, // Only update 'sala' if it's the field being changed
        fk_paciente_cpf: patient.cpf // Always use the current patient's cpf
      }));
    } else if (isUrgent) {
      setUrgentPatient(prevState => ({
        ...prevState,
        [name]: name === 'nivel_triagem' ? value : prevState.nivel_triagem, // Only update 'nivel_triagem' if it's the field being changed
        fk_paciente_cpf: patient.cpf // Always use the current patient's cpf
      }));
    }
  };
  useEffect(() => {
    if (patient.cpf) {
      setInternedPatient(prevState => ({
        ...prevState,
        fk_paciente_cpf: patient.cpf
      }));
    }
  }, [patient.cpf]);

  useEffect(() => {
    if (patient.cpf) {
      setUrgentPatient(prevState => ({
        ...prevState,
        fk_paciente_cpf: patient.cpf
      }));
    }
  }, [patient.cpf]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientData = { ...patient, cpf };
    let success = false;
    if (isInterned) {
      console.log("Interned patient data: ", internedPatient);
      await EditPatient(patientData, cpf);
      success = await EditInternedPatient(internedPatient, cpf);
    } else if (isUrgent) {
      console.log("Urgent patient data: ", urgentPatient);
      await EditPatient(patientData, cpf);
      success = await EditUrgentPatient(urgentPatient, cpf);
    } else {
      success = await EditPatient(patientData, cpf);
    }
    if (success) {
      toast.success('Paciente editado com sucesso!');
      window.location.reload();
    } else {
      toast.error('Falha ao editar paciente. Tente novamente.');
    }
  };

  const handleEditClick = (pacient) => {
    setCpf(pacient.cpf);
    fetchPatientInfo(pacient);
  };

  const handleDeleteClick = (pacient) => {
    setDeleteCpf(pacient.cpf);
    TrytoGetInterned(pacient);
  };

  const renderExtraFields = () => {
    if (isUrgent) {
      return (
        <input type="text" name="nivel_triagem" onChange={handleChange} placeholder="Nivel de Triagem" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
      )
    } if (isInterned) {
      return (
        <input type="text" name="sala" onChange={handleChange} placeholder="Sala" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
      )
    } else {
      return null;
    }
  };

  const TrytoGetInterned = (pacient) => {
    if (pacient.sala !== -1) {
      setIsInterned(true);
      setIsUrgent(false);
      console.log("O paciente  é internado.");
    } else if (pacient.nivel_triagem !== -1){
      setIsInterned(false);
      setIsUrgent(true);
      console.log("O paciente é de urgência.");
    }else{
      console.log("O paciente não é internado nem urgente, algo esta errado.");
    }
  };

  const handleHospitalize = async (cpf, sala) => {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log("numero da sala: ", roomNumber);
    try {
      const response = await fetch(`http://localhost:8080/pacienturgencia/${cpf}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      if (response.ok) {
        try {
          const response = await fetch('http://localhost:8080/paciente_internado', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({ fk_paciente_cpf: cpf, sala: sala })
          });
          if (response.ok) {
            toast.success('Paciente internado com sucesso!');
            window.location.reload();
            return true;
          }
          else {
            toast.error('Falha ao internar paciente. Tente novamente.');
            return false;
          }
        }
        catch (error) {
          console.error('Error:', error);
          return false;
        }
      };
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const handleUrgent = async (cpf, nivel_triagem) => {
    const jwtToken = localStorage.getItem('jwtToken');
    try {
      const response = await fetch('http://localhost:8080/pacienturgencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({ fk_paciente_cpf: cpf, nivel_triagem: nivel_triagem })
      });
      if (response.ok) {
        toast.success('Paciente se tornou urgente com sucesso!');
        window.location.reload();
        return true;
      }
      else {
        toast.error('Falha ao internar paciente. Tente novamente.');
        return false;
      }
    }
    catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const EditPatient = async (patient, cpf) => {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log("Attempting to access URL: http://localhost:8080/pacient/" + cpf)
    try {
      const response = await fetch(`http://localhost:8080/pacient/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(patient)
      });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const EditInternedPatient = async (internedPatient, cpf) => {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log("Now in step 2. Attempting to access URL: http://localhost:8080/paciente_internado/" + cpf)
    try {
      const response = await fetch(`http://localhost:8080/paciente_internado/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(internedPatient)
      });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const EditUrgentPatient = async (urgentPatient, cpf) => {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log("Now in step 2. Attempting to access URL: http://localhost:8080/pacienturgencia/" + cpf)
    try {
      const response = await fetch(`http://localhost:8080/pacienturgencia/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(urgentPatient)
      });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    }
    catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const fetchPatientInfo = async (pacient) => {
    console.log("sala: ", pacient.sala, "nivel_triagem: ", pacient.nivel_triagem);
    if (pacient.sala !== -1) {
      setIsInterned(true);
      setIsUrgent(false);
      setHoverContent(pacient.sala);
      console.log("O paciente é internado. setIsInterned está como true e setIsUrgent está como false");
    } else if (pacient.nivel_triagem !== -1) {
      setIsInterned(false);
      setIsUrgent(true);
      setHoverContent(pacient.nivel_triagem);
      console.log("O paciente é de urgência. setIsUrgent está como true e setIsInterned está como false");
    } else {
      setIsInterned(false);
      setIsUrgent(false);
      console.log("O paciente não é internado nem de urgência. setIsUrgent e setIsInterned estão como false");
    }
  };

  const deletePatient = async (patient) => {
    console.log("Patient to be deleted: ", patient.cpf);
    const jwtToken = localStorage.getItem('jwtToken');
    let deleteUrl;
    if (patient.sala !== -1) {
      deleteUrl = `http://localhost:8080/paciente_internado/${patient.cpf}`;
    } else if (patient.nivel_triagem !== -1) {
      deleteUrl = `http://localhost:8080/pacienturgencia/${patient.cpf}`;
    } else {
      deleteUrl = `url-invalida`;
    }
    console.log("Attempting to access URL: ", deleteUrl)
    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });

      if (response.ok) {
        toast.success('Paciente deletado com sucesso!');
        window.location.reload();
      } else {
        toast.error('Falha ao deletar paciente. Tente novamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao deletar paciente.');
    }
  };

  return (
    <>
      <Toaster />
      <div className="container mx-auto mt-8 flex items-center justify-center">
        <table className="table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-xs text-left">Nome</th>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-xs text-left">CPF</th>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-xs text-left">Telefone Residencial</th>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-xs text-left">Telefone Pessoal</th>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-xs text-left">Cidade</th>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-xs text-left">Bairro</th>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-xs text-left">Rua</th>
              <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-xs text-left">Ações</th>
              <th className="border-b-2 border-gray-300 px-5 py-2 text-xs text-left">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {patients && patients.map((patient) => (
              <tr key={patient.cpf}>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.nome}</td>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.cpf}</td>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.telefone_residencial}</td>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.telefone_pessoal}</td>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.cidade}</td>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.bairro}</td>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.rua}</td>
                <td className="flex gap-2 items-start justify-start border-b border-gray-300 border-r px-5 py-2 ">
                  <HoverCard>
                    <HoverCardTrigger onMouseEnter={() => fetchPatientInfo(patient)}><img src="/img/MoreInfo.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" /></HoverCardTrigger>
                    {(hoverContent !== null && hoverContent !== undefined) && (
                      <HoverCardContent>
                        <div>
                          {isInterned && (
                            <p>Sala: {hoverContent}</p>
                          )}
                          {isUrgent && (
                            <p>Nível de Triagem: {hoverContent}</p>
                          )}
                          {
                            (!isInterned && !isUrgent) && (
                              <p>Paciente cadastrado</p>
                            )

                          }
                        </div>
                      </HoverCardContent>
                    )}
                  </HoverCard>
                  <Sheet>
                    <SheetTrigger onClick={() => handleEditClick(patient)}> <img src="/img/Update.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" /> </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edite um Paciente</SheetTitle>
                        <SheetDescription>
                          Preencha os campos abaixo!
                          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6 w-full items-center justify-center">
                            <input type="text" name="nome" onChange={handleChange} placeholder="Nome" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                            <input type="text" name="telefone_residencial" onChange={handleChange} placeholder="Telefone Residencial" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                            <input type="text" name="telefone_pessoal" onChange={handleChange} placeholder="Telefone Pessoal" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                            <input type="text" name="cidade" onChange={handleChange} placeholder="Cidade" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                            <input type="text" name="bairro" onChange={handleChange} placeholder="Bairro" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                            <input type="text" name="rua" onChange={handleChange} placeholder="Rua" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                            {renderExtraFields()}
                            <button className="bg-customBlue text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full text-medium transition-transform duration-200 hover:scale-105">Concluir</button>
                          </form>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                  {((patient.sala !== -1) || (patient.nivel_triagem !== -1)) &&
                  <AlertDialog>
                    <AlertDialogTrigger onClick={() => handleDeleteClick(patient)}><img src="/img/discharge.svg" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110" alt="perfil icon" /></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Você está prestes a dar alta a um paciente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deletePatient(patient)}>Continuar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  }
                  
                    
                   {((patient.sala === -1) && 
                    <DropdownMenu>
                      <DropdownMenuTrigger><img src = "img/moreoptions.svg" className="mt-1 w-6 h-6 transition-transform duration-200 hover:scale-110"/></DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Mais opções</DropdownMenuLabel>
                        <div className="flex flex-col">
                          {patient.nivel_triagem === -1 && patient.sala === -1 && (
                          <AlertDialog>
                            <AlertDialogTrigger>
                            <div className="flex items-center justify-center px-2 py-2 ">
                              <img src="/img/urgent_patient.svg" className="w-6 h-6 transition-transform duration-200 hover:scale-110" alt="perfil icon" />
                              <p className="text-sm ">Transferir para urgência</p>
                            </div></AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Você gostaria de tornar esse paciente urgente?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Você está prestes a tornar um paciente urgente.
                                  <br/>
                                  Insira o nível da triagem para tornar urgente o paciente.
                                  <input type="number" onChange={(e) => setTriagemNivel(e.target.value)} placeholder="Nível da triagem" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium mt-6" />
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleUrgent(patient.cpf, nivelTriagem)}>Continuar</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>)}
                          {(patient.nivel_triagem !== -1 || (patient.nivel_triagem === -1 && patient.sala === -1)) && (
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <div className="flex items-center px-2 py-2 gap-1">
                              <img src="/img/hospitalized.svg" className="w-6 h-6 transition-transform duration-200 hover:scale-110" alt="perfil icon" />
                              <p className="text-sm ">Internar Paciente</p>
                            </div></AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Você gostaria de internar esse paciente?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Você está prestes a internar um paciente.
                                  <br/>
                                  Insira o número da sala para internar o paciente.
                                  <input type="number" onChange={(e) => setRoomNumber(e.target.value)} placeholder="Número da Sala" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium mt-6" />
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleHospitalize(patient.cpf, roomNumber)}>Continuar</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>)}
                        </div>

                      </DropdownMenuContent>
                    </DropdownMenu>
                    )}
                </td>
                <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">
                  {patient.sala !== -1 && (
                    <HoverCard>
                      <HoverCardTrigger onMouseEnter={() => fetchPatientInfo(patient)}><img src="/img/hospitalized_status.svg" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" /></HoverCardTrigger>
                      {(hoverContent !== null && hoverContent !== undefined) && (
                        <HoverCardContent>
                          <div>
                            <p>Paciente internado</p>
                          </div>
                        </HoverCardContent>
                      )}
                    </HoverCard>
                  )}
                  {patient.nivel_triagem !== -1 && (
                    <HoverCard>
                      <HoverCardTrigger onMouseEnter={() => fetchPatientInfo(patient)}><img src="/img/urgent_status.svg" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" /></HoverCardTrigger>
                      {(hoverContent !== null && hoverContent !== undefined) && (
                        <HoverCardContent>
                          <div>
                            <p>Paciente urgente</p>
                          </div>
                        </HoverCardContent>
                      )}
                    </HoverCard>
                  )}
                  {patient.sala === -1 && patient.nivel_triagem === -1 && (
                    <HoverCard>
                      <HoverCardTrigger onMouseEnter={() => fetchPatientInfo(patient)}><img src="/img/normal_status.svg" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" /></HoverCardTrigger>
                      {(hoverContent !== null && hoverContent !== undefined) && (
                        <HoverCardContent>
                          <div>
                            <p>Paciente cadastrado</p>
                          </div>
                        </HoverCardContent>
                      )}
                    </HoverCard>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
