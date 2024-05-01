import { useEffect, useState } from 'react';

export default function Registro() {
    const [registros, setRegistros] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRegistro();
    }, []);

    function fetchRegistro() {
        const token = localStorage.getItem('jwtToken'); // Recupera o token do localStorage
        if (token) {
            fetch('http://localhost:8080/registro', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Adiciona o token ao cabeçalho de autorização
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setRegistros(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
        } else {
            setLoading(false);
            console.error('No token found');
        }
    }

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!registros) {
        return <div>Você não está logado.</div>;
    }

    return (
        <div>
            <h1>Registros</h1>
        </div>
    );
}
