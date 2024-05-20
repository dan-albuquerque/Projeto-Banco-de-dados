import cookie from 'cookie';
import { Layout } from '../app/layout';
import DownerNav from '@/components/DownerNav';

export const getServerSideProps = async (context) => {
    const { req } = context;
    const parsedCookies = cookie.parse(req ? req.headers.cookie || "" : "");
    const jwtToken = parsedCookies.jwtToken;

    const fetchWithAuth = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    });
    const urls = {
        latestConsultations: `http://localhost:8080/dashboard/ultimas-consultas`,
        doctorsCount: `http://localhost:8080/dashboard/quantidade-medicos`,
        internsCount: `http://localhost:8080/dashboard/quantidade-internos`
    };

    try {
        const [latestConsultationsResponse, doctorsCountResponse, internsCountResponse] = await Promise.all([
            fetchWithAuth(urls.latestConsultations),
            fetchWithAuth(urls.doctorsCount),
            fetchWithAuth(urls.internsCount)
        ]);
        
        const [latestConsultations, doctorsCount, internsCount] = await Promise.all([
            latestConsultationsResponse.json(),
            doctorsCountResponse.json(),
            internsCountResponse.json()
        ]);

        if(!doctorsCount || !internsCount || !latestConsultations) {
            return { 
                props: { 
                    latestConsultations: [] ,
                    doctorsCount: 0,
                    internsCount: 0
                    } 
            };
        }
        return {
            props: { 
                latestConsultations, 
                doctorsCount, 
                internsCount 
            }, 
        };
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return { 
            props: { 
                latestConsultations: [],
                doctorsCount: 0,
                internsCount: 0
            }
        };
    }
};

export default function Home({ latestConsultations, doctorsCount, internsCount}) {

    return (
        <Layout>
            <div>
                <h1>Home</h1>
                <p>Consultas Recentes:</p>
                <ul>
                    {latestConsultations.map((consultation, index) => (
                        <li key={index}>
                            <p>{consultation.type}</p>
                            <p>{consultation.date}</p>
                            <p>{consultation.doctor}</p>
                            <p>{consultation.patient}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h1>Quantidade de medicos: {doctorsCount.doctorCount}</h1>
                <h1>Quantidade de internos: {internsCount.internCount}</h1>
            </div>
            <DownerNav />
        </Layout>
    );
}
