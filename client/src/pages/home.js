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
    internsCount: `http://localhost:8080/dashboard/quantidade-internos`,
    doctorWithMoreConsultations: `http://localhost:8080/medico/mais-consultas`,
    internStar: `http://localhost:8080/monitora/mais-monitora`,
    patientsMoreUrgent: `http://localhost:8080/pacienturgencia/mais-graves`
  };

  try {
    const [latestConsultationsResponse, doctorsCountResponse, internsCountResponse, doctorWithMoreConsultationsResponse, internStarResponse, patientsMoreUrgentResponse] = await Promise.all([
      fetchWithAuth(urls.latestConsultations),
      fetchWithAuth(urls.doctorsCount),
      fetchWithAuth(urls.internsCount),
      fetchWithAuth(urls.doctorWithMoreConsultations),
      fetchWithAuth(urls.internStar),
      fetchWithAuth(urls.patientsMoreUrgent)
    ]);

    const [latestConsultations, doctorsCount, internsCount, doctorWithMoreConsultations, internStar, patientsMoreUrgent] = await Promise.all([
      latestConsultationsResponse.json(),
      doctorsCountResponse.json(),
      internsCountResponse.json(),
      doctorWithMoreConsultationsResponse.json(),
      internStarResponse.json(),
      patientsMoreUrgentResponse.json()
    ]);

    if (!doctorsCount || !internsCount || !latestConsultations || !doctorWithMoreConsultations || !internStar || !patientsMoreUrgent) {
      return {
        props: {
          latestConsultations: [],
          doctorsCount: 0,
          internsCount: 0,
          doctorWithMoreConsultations: {},
          internStar: {},
          patientsMoreUrgent: []
        }
      };
    }
    return {
      props: {
        latestConsultations,
        doctorsCount,
        internsCount,
        doctorWithMoreConsultations,
        internStar,
        patientsMoreUrgent
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        latestConsultations: [],
        doctorsCount: 0,
        internsCount: 0,
        doctorWithMoreConsultations: {},
        internStar: {},
        patientsMoreUrgent: []
      }
    };
  }
};

export default function Home({ latestConsultations, doctorsCount, internsCount, doctorWithMoreConsultations, internStar, patientsMoreUrgent }) {

  return (
    <Layout>
      <div>
        <h1>Home</h1>
        <div>
          <h1>Quantidade de medicos: {doctorsCount.doctorCount}</h1>
          <h1>Quantidade de internos: {internsCount.internCount}</h1>
          <h1>Medico com mais consultas: {doctorWithMoreConsultations.nome}</h1>
          <h1>Interno destaque: {internStar.nome}</h1>
          <h1>Pacientes mais graves: </h1>
          <ul>
            {patientsMoreUrgent.map((patient, index) => (
              <li key={index}>
                <p>{patient.nome}</p>
                <p>{patient.nivel_triagem}</p>
              </li>
            ))}
          </ul>
        </div>
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
