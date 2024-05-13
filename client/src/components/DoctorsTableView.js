import React, { useState} from "react";
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
    const [isGerente, setIsGerente] = useState(false);
    const [nomeGerente, setNomeGerente] = useState('');

    const getInfoGerente = async (nomeMedicoGerente) => {
        console.log('cpf gerente: ', nomeMedicoGerente);

        try{
            const response = await fetch(`http://localhost:8080/medico/${nomeMedicoGerente}`);
            if(response.ok){
                const data = await response.json();
                setNomeGerente(data.nome);
            }
            console.log(nomeGerente);
        }
        catch(error){
            console.error('Erro ao buscar informações do médico:', error);
        }
    };

    const handleHoverCard = (doctor) => {
        if(doctor.medicoCpfGerente === null) {
            setIsGerente(true);

        } else {
            setIsGerente(false);
            console.log( 'cpf Gerente: ', doctor.medicoCpfGerente);
            getInfoGerente(doctor.medicoCpfGerente);            
        }
    };

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
                            <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{doctor.medicoCpfGerente}</td>
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

                                <Sheet>
                                    <SheetTrigger> <img src="/img/Update.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" /> </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                                            <SheetDescription>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
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
    );
}
