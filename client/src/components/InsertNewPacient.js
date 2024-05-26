import React, { useState } from 'react';
import "../app/globals.css";
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.jsx"



export default function InsertNewPacient() {

  const [Urgency, setUrgency] = useState(false);
  const [Interned, setInterned] = useState(false);

  const handleChangeUrgency = () => {
    console.log("Urgency");
    setUrgency(true);
    setInterned(false);
  }

  const handleChangeInterned = () => {
    console.log("Interned");
    setUrgency(false);
    setInterned(true);
  }

  // Defining the state of the pacient object   
  const [pacient, setPacient] = useState({
    cpf: null,
    nome: null,
    telefone_residencial: null,
    telefone_pessoal: null,
    cidade: null,
    bairro: null,
    rua: null,
    numero: null,
  });

  const [paciente_internado, setpaciente_internado] = useState({
    fk_paciente_cpf: null,
    sala: null,
  });

  const [paciente_urgencia, setpaciente_urgencia] = useState({
    fk_paciente_cpf: null,
    nivel_triagem: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (Interned) {
      setpaciente_internado(prevState => ({
        ...prevState,
        [name]: value
      }));
      setPacient(prevState => ({
        ...prevState,
        [name]: value
      }));

    } else if (Urgency) {
      setpaciente_urgencia(prevState => ({
        ...prevState,
        [name]: value
      }));
      setPacient(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setPacient(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    if (pacient.cpf) {
      setpaciente_internado(prevState => ({
        ...prevState,
        fk_paciente_cpf: pacient.cpf
      }));
    }
  }, [pacient.cpf]);  // This effect updates the interned patient's foreign key

  useEffect(() => {
    if (pacient.cpf) {
      setpaciente_urgencia(prevState => ({
        ...prevState,
        fk_paciente_cpf: pacient.cpf
      }));
    }
  }, [pacient.cpf]); // This effect updates the urgency patient's foreign key

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pacientData = { ...pacient }; // Clone the pacient data
    let success = false;
    let successPostGenericPatient = false;
    let haveInsertedGenericPatient = false;

    if (Interned) {
      console.log(`Data to be sent to the API:  ${JSON.stringify(paciente_urgencia)}`);
      successPostGenericPatient = await postNewPacient(pacientData);
      success = await postNewInternedPacient(paciente_internado);
    }
    else if (Urgency) {
      console.log(`Data to be sent to the API: ${JSON.stringify(paciente_urgencia)}`);
      successPostGenericPatient = await postNewPacient(pacientData);
      success = await postNewUrgencyPacient(paciente_urgencia);
    }
    else {
      successPostGenericPatient = await postNewPacient(pacientData);
      haveInsertedGenericPatient = true;
    }
    if (successPostGenericPatient && haveInsertedGenericPatient) {
      toast.success('Paciente inserido com sucesso!');
      window.location.reload();
    } else if (success && successPostGenericPatient ) {
      toast.success('Paciente inserido com sucesso!');
      window.location.reload();
    } else {
      toast.error('Erro ao inserir paciente.');
    }
  };

  const handleValueChange = (value) => {
    switch (value) {
      case 'interned':
        handleChangeInterned();
        break;
      case 'urgent':
        handleChangeUrgency();
        break;
      default:
        console.log('Unhandled selection');
    }
  };

  const renderExtraFields = () => {
    if (Urgency) {
      return (
        <input type="text" name="nivel_triagem" value={paciente_urgencia.nivel_triagem || ''} onChange={handleChange} placeholder="Nivel de Triagem" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
      );
    }
    if (Interned) {
      return (
        <input type="text" name="sala" value={paciente_internado.sala || ''} onChange={handleChange} placeholder="Sala" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
      );
    }
    return null;
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-light text-customBlue">Inserir Paciente</h1>
        <div className="flex gap-3 mt-6 items-center">
          <p>Tipo de Paciente:</p>
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Genérico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="interned" onClick={handleChangeInterned}>Paciente Internado</SelectItem>
              <SelectItem value="urgent" onClick={handleChangeUrgency}>Paciente Urgencia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
          <input type="text" name="cpf" value={pacient.cpf} onChange={handleChange} placeholder="CPF" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <input type="text" name="nome" value={pacient.nome} onChange={handleChange} placeholder="Nome" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <input type="text" name="telefone_residencial" value={pacient.telefone_residencial} onChange={handleChange} placeholder="Telefone Residencial" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <input type="text" name="telefone_pessoal" value={pacient.telefone_pessoal} onChange={handleChange} placeholder="Telefone Pessoal" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <input type="text" name="cidade" value={pacient.cidade} onChange={handleChange} placeholder="Cidade" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <input type="text" name="bairro" value={pacient.bairro} onChange={handleChange} placeholder="Bairro" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <input type="text" name="rua" value={pacient.rua} onChange={handleChange} placeholder="Rua" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          <input type="number" name="numero" value={pacient.numero} onChange={handleChange} placeholder="Número" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" style={{ width: "400px" }} />
          {renderExtraFields()}
          <button className="bg-customBlue text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 text-xs focus:ring-blue-600 transition-transform duration-200 hover:scale-105">Adicionar</button>
        </form>
      </div>
    </>
  );
}

export const postNewPacient = async (pacient) => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');

    const response = await fetch('http://localhost:8080/pacient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },

      body: JSON.stringify(pacient)
    });

    if (!response.ok) {
      console.error("Failed to insert new pacient:", response.statusText);
      console.log(response);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to insert new pacient:", error);
    console.log({ pacient })
    return false;
  }
};

export const postNewInternedPacient = async (paciente_internado) => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');

    const response = await fetch('http://localhost:8080/paciente_internado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },

      body: JSON.stringify(paciente_internado)
    });

    if (!response.ok) {
      console.error("Failed to insert new pacient:", response.statusText);
      console.log(response);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to insert new pacient:", error);
    console.log(paciente_internado)
    return false;
  }
}

export const postNewUrgencyPacient = async (paciente_urgencia) => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');

    const response = await fetch('http://localhost:8080/pacienturgencia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },

      body: JSON.stringify(paciente_urgencia)
    });

    if (!response.ok) {
      console.error("Failed to insert new pacient:", response.statusText);
      console.log(response);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to insert new pacient:", error);
    console.log(paciente_urgencia)
    return false;
  }
}
