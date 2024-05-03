import {useState} from 'react';

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
            alert('Interno inserido com sucesso!');
        } else {
            alert('Erro ao inserir interno.');
        }
    }
    
    
    return (
        <div className="container mx-auto mt-8 flex items-center justify-center">
            <form onSubmit ={handleSubmit} className="w-5/6 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Adicionar novo Interno</h1>
                <input type="text" name ="nome" onChange ={handleChange} placeholder="Nome" className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4" />
                <input type="text" name ="cpf" onChange ={handleChange} placeholder="CPF" className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4" />
                <input type="text" name ="matricula" onChange ={handleChange} placeholder="Matricula" className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4" />
                <input type="password" name="senha" onChange ={handleChange} placeholder="Senha" className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4" />
                <button className="w-1/2 bg-blue-500 text-white rounded-lg px-4 py-2">Adicionar</button>
            </form>
        </div>
    );
}
export const postNewIntern = async (intern) => {
    try {
        const response = await fetch('http://localhost:8080/intern', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(intern)
        });
        const data = await response.json();
        console.log('Data:', data);
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}