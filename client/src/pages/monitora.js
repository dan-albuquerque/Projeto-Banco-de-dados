import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { CentralizedLayout } from '@/app/layout';
import DownerNav from '@/components/DownerNav';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  

export default function Monitora() {
    const [internoCpf, setInternoCpf] = useState('');
    const [pacienteCpf, setPacienteCpf] = useState('');

    const postNewMonitora = async (internoCpf, pacienteCpf) => {
        const jwtToken = localStorage.getItem('jwtToken');
        console.log("interno", internoCpf, "paciente", pacienteCpf);

        try {
            const response = await fetch('http://localhost:8080/monitora', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ fk_paciente_cpf: pacienteCpf, fk_interno_cpf: internoCpf })
            });

            if(!response.ok) {
                console.log('Erro ao inserir monitoramento.');
                return false;
            }
            return true;

        } catch (error) {
            console.error('Erro ao inserir monitoramento:', error);
            return false;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Data to be sent to the API:", "interno: ", internoCpf,"paciente: ", pacienteCpf);
        const success = await postNewMonitora(internoCpf, pacienteCpf);
        success ? toast.success('Monitoramento inserido com sucesso!') : toast.error('Erro ao inserir monitoramento.');
    };

    return (
        <>
            <Toaster />
            <CentralizedLayout>
                <form onSubmit={handleSubmit} className="w-1/2 mx-auto p-8 mb-16 shadow-xl rounded-lg flex flex-col gap-6">
                    <div className='flex justify-between items-center'>
                        <h1 className="text-2xl font-weight self-start text-normalBlue">
                            Monitoramento dos internos
                        </h1>
                        <Popover>
                            <PopoverTrigger><img src = "/img/questionmark.svg" className='w-8 g-8'/></PopoverTrigger>
                            <PopoverContent>
                                <div className='h-56 relative flex flex-col' >
                                    <p className='text-sm'>Em um sistema e-hospital, é comum que internos sejam vinculados a pacientes monitorados.</p>
                                    <p className='text-sm'>Um interno pode acompanhar vários pacientes! Basta inserir o CPF do paciente e do interno abaixo.</p>
                                    <img src="/img/doctorexplaining.svg" alt="Imagem" className="absolute bottom-2 right-2 w-20 h-20 transition-transform duration-200 hover:scale-105" />

                                </div>
                            </PopoverContent>
                        </Popover>

                    </div>
                    <label htmlFor="cpfPaciente" className="block text-sm font-medium text-gray-700">
                        CPF do paciente:
                        <input id="pacienteCpf" type="text" value={pacienteCpf} onChange={(e) => setPacienteCpf(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Insira o CPF do paciente" />
                    </label>
                    <label htmlFor="cpfInterno" className="block text-sm font-medium text-gray-700">
                        CPF do interno:
                        <input id="internoCpf" type="text" value={internoCpf} onChange={(e) => setInternoCpf(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Insira o CPF do interno" />
                    </label>
                    <button type="submit" className="mt-1 w-full px-4 py-2 bg-black hover:bg-gray-800 text-white font-weight rounded-md shadow-lg transition-transform duration-200 hover:scale-105">Enviar</button>
                </form>
            </CentralizedLayout>
            <DownerNav></DownerNav>
        </>
    );
}