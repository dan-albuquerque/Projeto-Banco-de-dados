import cookie from 'cookie';
import { Layout } from '../app/layout';
import DownerNav from '@/components/DownerNav';
export const getServerSideProps = async (context) => {
    const { req } = context;
    const cookies = cookie.parse(req.headers.cookie || '');
    const jwtToken = cookies.jwtToken; 
    const url = `http://localhost:8080/dashboard/ultimas-consultas`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`
            }
        });
        const latestConsultations = await response.json();
        return { props: { latestConsultations } };
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return { props: { latestConsultations: [] } };
    }
};

export default function Home({ latestConsultations }) {
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
            <DownerNav />
        </Layout>
    );
}
