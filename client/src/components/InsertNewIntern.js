import {useState} from 'react';
import cookie from 'cookie';
import {Switch} from './ui/switch.jsx';
import {Toaster, toast} from 'react-hot-toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./ui/select.jsx"
export default function InsertNewIntern() {
    const [intern, setIntern] = useState(
        {
            nome: "",
            cpf: "",
            matricula: "",
            senha: ""
        }
    );


    const handleChange = (e) => {
        setIntern({
            ...intern,
            [e.target.name]: e.target.value
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Data to be sent to the API:", intern);
        const success = await postNewIntern(intern);
        if (success) {
            toast.success('Interno inserido com sucesso!');
        } else {
            toast.error('Erro ao inserir interno.');
        }
    }
   
   
    return (
      <>
      <Toaster />
        <div className="flex flex-col items-center justify-center h-full">   
        <h1 className="text-3xl font-light text-customBlue">Inserir Interno</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6 w-full items-center justify-center">
            <input type="text" name="nome" onChange={handleChange} placeholder="Nome" className="w-1/5 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" />
            <input type="text" name="cpf" onChange={handleChange} placeholder="CPF" className="w-1/5 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" />
            <input type="text" name="matricula" onChange={handleChange} placeholder="Matricula" className="w-1/5 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" />
            <input type="password" name="senha" onChange={handleChange} placeholder="Senha" className="w-1/5  border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" />
            <button className="bg-customBlue text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-1/5 text-xs transition-transform duration-200 hover:scale-105">Adicionar</button>
    </form>
</div>
</>
    );
}
export const postNewIntern = async (intern) => {
    const jwtToken = localStorage.getItem('jwtToken');

        try {
          const response = await fetch('http://localhost:8080/intern', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(intern)
          });
     
          if (!response.ok) {
            console.error("Failed to insert new intern:", response.statusText);
            console.log(response);
            return false;
          }
     
          return true;
        } catch (error) {
          console.error("Failed to insert new intern:", error);
          console.log({intern})
          return false;
        }
     
}
