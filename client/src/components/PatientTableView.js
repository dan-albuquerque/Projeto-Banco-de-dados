import React, {useState} from "react";
import {Toaster, toast} from 'react-hot-toast';
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

export default function PatientTableView({ patients }) {
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
    const [cpf, setCpf] = useState(null);

    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Data to be sent to the API:", patient);
        const success = await EditPatient(patient, cpf); // Pass cpf to EditPatient function
        if (success) {
            toast.success('Paciente editado com sucesso!');
        } else {
            toast.error('Erro ao editar paciente.');
        }
    }

    const handleEditClick = (cpfdata) => {
        setCpf(cpfdata); // Set the cpf state to the patient's cpf
        console.log("Editing patient with CPF: ", cpfdata );
    }
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
    }

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
                        <th className="border-b-2 border-gray-300 px-5 py-2 text-xs text-left">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.cpf}>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.nome}</td>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.cpf}</td>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.telefone_residencial}</td>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.telefone_pessoal}</td>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.cidade}</td>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.bairro}</td>
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-xs text-left">{patient.rua}</td>
                            <td className="flex gap-2 items-start justify-start border-b border-gray-300 border-r px-5 py-2 ">
                            <img src="/img/MoreInfo.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" />
                                
                            <Sheet>
                                    <SheetTrigger onClick= {()=>handleEditClick(patient.cpf)}> <img src="/img/Update.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" /> </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                        <SheetTitle>Edite um Paciente</SheetTitle>
                                        <SheetDescription>
                                            Preencha os campos abaixo!
                                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6 w-full items-center justify-center">
                                                <input type="text" name="nome" onChange={handleChange} placeholder="Nome" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                                                <input type="text" name="cpf" onChange={handleChange} placeholder="CPF" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                                                <input type="text" name="telefone_residencial" onChange={handleChange} placeholder="Telefone Residencial" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                                                <input type="text" name="telefone_pessoal" onChange={handleChange} placeholder="Telefone Pessoal" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                                                <input type="text" name="cidade" onChange={handleChange} placeholder="Cidade" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                                                <input type="text" name="bairro" onChange={handleChange} placeholder="Bairro" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                                                <input type="text" name="rua" onChange={handleChange} placeholder="Rua" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />
                                                <button className="bg-customBlue text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full text-medium transition-transform duration-200 hover:scale-105">Concluir</button>
                                            </form>
                                        </SheetDescription>
                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>

                                <AlertDialog>
                                    <AlertDialogTrigger><img src="/img/Delete.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110" alt="perfil icon" /></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction>Continue</AlertDialogAction>
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