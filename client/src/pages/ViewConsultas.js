import React from 'react';
import cookie from 'cookie';

export async function getServerSideProps(context) {
    const { req, res } = context;
    const parsedCookies = cookie.parse(req ? req.headers.cookie || "" : "");

    const jwtToken = parsedCookies.jwtToken;

    const fetchWithAuth = (url) => fetch(url, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
        .then((response) => {
            if (!response.ok) {
                console.log('Response not ok:', response);
                res.writeHead(302, { Location: '/login' });
                res.end();
                return { props: {} };
            }
            return response;
        })
        .catch((error) => {
            console.error('Failed to fetch data:', error);
            return { props: {} };
        });

    const urls = {
        consultationUrgent: 'http://localhost:8080/consulta_urgencia',
        consultatioHospitalized: 'http://localhost:8080/consultainternado',
        doctors: 'http://localhost:8080/medico'
    };

    try {
        const [doctorsRes, consultationUrgentRes, consultatioHospitalizedRes] = await Promise.all([
            fetchWithAuth(urls.doctors),
            fetchWithAuth(urls.consultationUrgent),
            fetchWithAuth(urls.consultatioHospitalized)
        ]);

        const [doctors, consultationUrgent, consultatioHospitalized] = await Promise.all([
            doctorsRes.json(),
            consultationUrgentRes.json(),
            consultatioHospitalizedRes.json()
        ]);

        if (!doctors || !doctorsRes.ok) {
            console.log('Doctors not found or response not ok:', doctors, doctorsRes);
            return { notFound: true };
        }
        return {
            props: {
                doctors,
                consultationUrgent,
                consultatioHospitalized
            },
        };
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return { notFound: true };
    }
}

export default function ViewConsultas({ consultationUrgents }) {
    console.log(consultationUrgents);
    return (
        <div className="container mx-auto mt-8 flex items-center justify-center">
        <table className="w-5/6 table-auto border-collapse border border-gray-300 ml-3">
            <thead>
                <tr>
                    <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-left text-sm">Data realizacao</th>
                    <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-left text-sm">paciente</th>
                    <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-left text-sm">medico</th>
                    <th className="border-b-2 border-gray-300 px-5 py-2 text-left text-sm">Ações</th>
                </tr>
            </thead>
            <tbody>
                {consultationUrgents && consultationUrgents.map((consultationUrgent) => (
                    <tr key={consultationUrgent.fk_medico_cpf}>
                        <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{consultationUrgent.data_realizacao}</td>
                        <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{consultationUrgent.fk_paciente_cpf}</td>
                        <td className="border-b border-gray-300 border-r px-5 py-2 text-left text-sm">{consultationUrgent.fk_medico_cpf}</td>
                        <td className="flex gap-2 items-start justify-start border-b border-gray-300 border-r px-5 py-2 ">
                            <img src="/img/MoreInfo.png" className="w-6 h-6 mt-1" alt="perfil icon" />
                            <img src="/img/Update.png" className="w-6 h-6 mt-1" alt="perfil icon" />
                            <img src="/img/Delete.png" className="w-6 h-6 mt-1" alt="perfil icon" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}
