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
        medicoCpfGerente: null,
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
        fk_medico_cpf_gerente: null
    });
    const [fkCpfGerente, setFkCpfGerente] = useState('');

    const [isUserGerente, setIsUserGerente] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedico({
            ...medico,
            [name]: value
        });
        console.log('medico: ', medico);
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

    const deleteDoctor = async (cpf) => {
        console.log('Delete Doctor CPF: ', cpf);
        try {
            const response = await fetch(`http://localhost:8080/medico/${cpf}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log('Médico deletado com sucesso!');
                toast.success('Médico deletado com sucesso!');
            }
        }
        catch (error) {
            console.error('Erro ao deletar médico:', error);
            toast.error('Erro ao deletar médico.');
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
                        }else{
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
        if (doctor.medicoCpfGerente === null) {
            setIsGerente(true);
        } else {
            setIsGerente(false);
            getInfoGerente(doctor.medicoCpfGerente);
        }
    };

    return (
        <>
            <Toaster />
            <div className="container mx-auto mt-8 flex items-center justify-center">
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

                                    {isUserGerente &&
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

                                    {isUserGerente &&
                                        <AlertDialog>
                                            <AlertDialogTrigger><img onClick={() => handleEditClick(doctor.cpf)} src="/img/Delete.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110" alt="perfil icon" /></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Essa ação não pode ser desfeita. As informações deste médico serão deletadas permanentemente do banco de dados. Continue apenas se o médico não trabalhar mais no hospital.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => deleteDoctor(cpf)}>Continuar</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    );
}