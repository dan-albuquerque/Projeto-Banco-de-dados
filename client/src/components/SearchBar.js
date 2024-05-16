import React, {useState} from  'react';

export async function getInterns(searchQuery) {
    const url = `http://localhost:8080/intern?searchName=${searchQuery}`;
    console.log(searchQuery, url);
    try {
        const jwtToken = localStorage.getItem('jwtToken');

        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`
            }
        });
        const interns = await response.json();

        console.log(interns);
        return interns;
    } catch (error) {
        console.log("deu ruim!");
        console.error("Failed to fetch data:", error);
        return null;
    }
}

export async function getConsultasInternado(cpfPaciente) {
    const url = `http://localhost:8080/consulta_internado/paciente/${cpfPaciente}`;
    console.log(cpfPaciente, url);
    console.log("attempting to fetch data from URL:", url);

    try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
    });
    const consultas_urgentes = await response.json();
    console.log(consultas_urgentes);
    return consultas_urgentes;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
    }


}

export async function getConsultasUrgentesByNomePaciente(searchQuery) {
    const url = `http://localhost:8080/consulta_urgencia/paciente/${searchQuery}`;
    console.log(searchQuery, url);
    console.log("attempting to fetch data from URL:", url);

    try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
    });
    const consultas_urgentes = await response.json();
    console.log(consultas_urgentes);
    return consultas_urgentes;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
    }

}

export async function getPatients(searchQuery) {
    const url = `http://localhost:8080/pacient?searchName=${searchQuery}`;
    console.log(searchQuery, url);
    try {
        const jwtToken = localStorage.getItem('jwtToken');

        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`
            }
        });
        const patients = await response.json();

        console.log(patients);
        return patients;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
    }
}

export async function getDoctors(searchQuery) {
    const url = `http://localhost:8080/medico?searchName=${searchQuery}`;
    console.log(searchQuery, url);
    try {
        const jwtToken = localStorage.getItem('jwtToken');

        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`
            }
        });
        const doctors = await response.json();

        console.log(doctors);
        return doctors;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
    }
}

export default function SearchBar({onSearch, userType}) {

    const [searchQuery, setSearchQuery] = useState('');
    const [interns, setInterns] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    
    const handleSearch = async () => {
        setIsLoading(true);
        let data = null;
        if (userType === 'intern') {
            const searchedInterns = await getInterns(searchQuery);
            console.log("chegou no handleSearch", searchedInterns);
            setInterns(searchedInterns);
            data = searchedInterns;
        }else if (userType === 'doctor') {
            const searchedDoctors = await getDoctors(searchQuery);
            setDoctors(searchedDoctors);
            data = searchedDoctors;
        }else if (userType === 'consulta_internado'){
            const searchedConsultas = await getConsultasInternado(searchQuery);
            data = searchedConsultas;
        }else if (userType === 'consulta_urgencia'){
            const searchedConsultas = await getConsultasUrgentesByNomePaciente(searchQuery);
            data = searchedConsultas;
        } else {
            const searchedPatients = await getPatients(searchQuery);
            data = searchedPatients;
        }
        setIsLoading(false);
        onSearch(data);
    };
    

    return (
        <div className='w-1/3 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 flex justify-between'>
          <input
            className='w-full bg-transparent focus:outline-none'
            type="text"
            placeholder="Pesquisar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && searchQuery.trim() !== '') {
                handleSearch();
              }
            }}
          />
          <img
            src="/img/search.png"
            alt="search"
            onClick={() => {
              if (searchQuery.trim() !== '') {
                handleSearch();
              }
            }}
            className="w-6 h-6 ml-2 cursor-pointer"
          />
        </div>
      );
}