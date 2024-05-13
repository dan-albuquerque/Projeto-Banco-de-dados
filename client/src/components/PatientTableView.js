import React, {use, useState,useEffect} from "react";
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
    const [isInterned, setIsInterned] = useState(false); 
    const [isUrgent, setIsUrgent] = useState(false); 

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
        if(patient.cpf){
            setInternedPatient(prevState => ({
                ...prevState,
                fk_paciente_cpf: patient.cpf
            }));
        }
    }, [patient.cpf]);

    useEffect(() => {
        if(patient.cpf){
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
        if (isInterned){
            console.log("Interned patient data: ", internedPatient);
            await EditPatient(patientData, cpf);
            success = await EditInternedPatient(internedPatient, cpf);
        }else if (isUrgent){
            console.log("Urgent patient data: ", urgentPatient);
            await EditPatient(patientData, cpf);
            success = await EditUrgentPatient(urgentPatient, cpf);
        }else {
            success = await EditPatient(patientData, cpf);
        }
        if (success) {
            toast.success('Paciente editado com sucesso!');
        } else {
            toast.error('Falha ao editar paciente. Tente novamente.');
        }
    };

    const handleEditClick = (cpfdata) => {
        setCpf(cpfdata); 
        TrytoGetInterned(cpfdata);
    };

    const renderExtraFields = () => {  
        if (isUrgent) {
            return (
                <input type="text" name="nivel_triagem" onChange={handleChange} placeholder="Nivel de Triagem" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />   

            )
        }if (isInterned) {
            return (
                <input type="text" name="sala" onChange={handleChange} placeholder="Sala" className="w-full  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-medium" />   

            )
        }else{
            return null;
        }
    }

    const TrytoGetInterned = async (cpf) => {
        const jwtToken = localStorage.getItem('jwtToken');
        console.log("Attempting to access URL: http://localhost:8080/paciente_internado/" + cpf)
            const response = await fetch(`http://localhost:8080/paciente_internado/${cpf}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Data received from the API: ", data);
                setIsInterned(true);
                setIsUrgent(false);
                console.log("O paciente é internado. setIsUrgent está como false e setIsInterned está como true")
            } else {
                setIsInterned(false);
                setIsUrgent(true);
                console.log("O paciente não é internado. setIsUrgent está como true e setIsInterned está como false")
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




    const deletePatient = async (pacientcpf) => {
        const jwtToken = localStorage.getItem('jwtToken');
        console.log("Attempting to access URL: http://localhost:8080/pacient/" + pacientcpf)

        try {
            const response = await fetch(`http://localhost:8080/pacient/${pacientcpf}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
            });
            if (response.ok) {
                console.log("Patient deleted successfully");
                return true;
            } else {
                console.error("Failed to delete patient");
                return false;
            }
        } catch (error) {
            console.error("An error occurred while trying to delete the patient");
            return false;
        }
    };

    const handleDeletePatient  = async (pacientcpf) => {
        console.log("Deleting patient with CPF: ", pacientcpf);

        const isDeleted = await deletePatient(pacientcpf);

        isDeleted ? console.log("Patient deleted successfully") : console.log("Failed to delete patient");
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
                                    <HoverCard>
                                        <HoverCardTrigger onMouseEnter={() => fetchPatientInfo(patient.cpf)}><img src="/img/MoreInfo.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" /></HoverCardTrigger>
                                        {hoverContent && (
                                            <HoverCardContent>
                                                <div>
                                                    {isInterned && (
                                                        <p>Sala: {hoverContent.sala}</p>
                                                    )}
                                                    {isUrgent && (
                                                        <p>Nível de Triagem: {hoverContent.nivel_triagem}</p>
                                                    )}
                                                </div>
                                            </HoverCardContent>
                                        )}
                                    </HoverCard>

                                    <Sheet>
                                        <SheetTrigger onClick={() => handleEditClick(patient.cpf)}> <img src="/img/Update.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110 cursor-pointer" alt="perfil icon" /> </SheetTrigger>
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

                                <AlertDialog>
                                    <AlertDialogTrigger><img src="/img/Delete.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110" alt="perfil icon" /></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Essa ação não pode ser desfeita. As informações deste paciente serão deletadas permanentemente do banco de dados.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeletePatient(patient.cpf)}>Continue</AlertDialogAction>
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