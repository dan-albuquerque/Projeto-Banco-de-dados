import React, {useState} from 'react';
import "../app/globals.css";

export default function InsertNewPacient() {
    const [pacient, setPacient] = useState({
        cpf: "",
        nome: "",
        telefone_residencial: "",
        telefone_pessoal: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPacient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Data to be sent to the API:", pacient);
        const success = await postNewPacient(pacient);
        if (success) {
            alert('Paciente inserido com sucesso!');
        } else {
            alert('Erro ao inserir paciente.');
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-light text-customBlue">Inserir Paciente</h1>
            <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
                <input type="text" name = "cpf" value={pacient.cpf} onChange={handleChange} placeholder="CPF" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" style={{ width: "400px" }} />
                <input type="text" name = "nome" value={pacient.nome} onChange={handleChange} placeholder="Nome" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" style={{ width: "400px" }} />
                <input type="text" name = "telefone_residencial" value={pacient.telefone_residencial} onChange={handleChange} placeholder="Telefone Residencial" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" style={{ width: "400px" }} />
                <input type="text" name = "telefone_pessoal" value={pacient.telefone_pessoal} onChange={handleChange} placeholder="Telefone Pessoal" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" style={{ width: "400px" }} />
                <input type="text" name = "cidade" value={pacient.cidade} onChange={handleChange} placeholder="Cidade" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" style={{ width: "400px" }} />
                <input type="text" name = "bairro" value={pacient.bairro} onChange={handleChange} placeholder="Bairro" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" style={{ width: "400px" }} />
                <input type="text" name = "rua" value={pacient.rua} onChange={handleChange} placeholder="Rua" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" style={{ width: "400px" }} />
                <input type="number" name = "numero" value={pacient.numero} onChange={handleChange} placeholder="Número" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" style={{ width: "400px" }} />
                <button className="bg-customBlue text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">Inserir</button>
            </form>
        </div>
    );
}
export const postNewPacient = async (pacient) => {
    try {
      const response = await fetch('http://localhost:8080/pacient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
      console.log({pacient})
      return false;
    }
  };