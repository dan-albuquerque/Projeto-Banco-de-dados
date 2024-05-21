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
    patientsMoreUrgent: `http://localhost:8080/pacienturgencia/mais-graves`,
    internedCount: `http://localhost:8080/dashboard/internados/count`,
    urgentCount: `http://localhost:8080/dashboard/urgencia/count`,
  };

  try {
    const [latestConsultationsResponse, doctorsCountResponse, internsCountResponse, doctorWithMoreConsultationsResponse, internStarResponse, patientsMoreUrgentResponse, internedCountResponse, urgentCountResponse] = await Promise.all([
      fetchWithAuth(urls.latestConsultations),
      fetchWithAuth(urls.doctorsCount),
      fetchWithAuth(urls.internsCount),
      fetchWithAuth(urls.doctorWithMoreConsultations),
      fetchWithAuth(urls.internStar),
      fetchWithAuth(urls.patientsMoreUrgent),
      fetchWithAuth(urls.internedCount),
      fetchWithAuth(urls.urgentCount)
    ]);

    const [latestConsultations, doctorsCount, internsCount, doctorWithMoreConsultations, internStar, patientsMoreUrgent, internedCount, urgentCount] = await Promise.all([
      latestConsultationsResponse.json(),
      doctorsCountResponse.json(),
      internsCountResponse.json(),
      doctorWithMoreConsultationsResponse.json(),
      internStarResponse.json(),
      patientsMoreUrgentResponse.json(),
      internedCountResponse.json(),
      urgentCountResponse.json()
    ]);

    if (!doctorsCount || !internsCount || !latestConsultations || !doctorWithMoreConsultations || !internStar || !patientsMoreUrgent || !internedCount || !urgentCount) {
      return {
        props: {
          latestConsultations: [],
          doctorsCount: 0,
          internsCount: 0,
          internedCount: 0,
          urgentCount: 0,
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
        patientsMoreUrgent,
        internedCount,
        urgentCount
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        latestConsultations: [],
        doctorsCount: 0,
        internsCount: 0,
        internedCount: 0,
        urgentCount: 0,
        doctorWithMoreConsultations: {},
        internStar: {},
        patientsMoreUrgent: []
      }
    };
  }
};

export default function Home({ latestConsultations, doctorsCount, internsCount, doctorWithMoreConsultations, internStar, patientsMoreUrgent, internedCount, urgentCount}) {

  return (
    <Layout>
      <div>
      <div className='px-8 py-3 flex w-full items-center justify-between'>
        <div className='flex items-center '>
          <img src  = "img/fullHospital.svg" className='w-40 h-40'></img>
            <h1 className='text-4xl'>Home</h1>
        </div>
            <div className='flex flex-col items-center text-xl'>
            <img src = "img/medicalteam.svg" className='w-20 h-20'></img>
            <h1>{doctorsCount.doctorCount}</h1>
              <h1>Médicos</h1>
            </div>
            <div className='flex items-center'>
              <h1>Em destaque:</h1>
              <div className='flex flex-col items-center text-xl'>
                <img src = "img/onlineConsultation.svg" className='w-20 h-20'></img>
                <h1>{internsCount.internCount}</h1>
                <h1>Internos</h1>
              </div>
              <div  className='flex flex-col items-center text-xl'>
                <img src = "img/femaledoc.svg" className='w-20 h-20'></img>
                <h1>Médico #1</h1>
                <h1>{doctorWithMoreConsultations.nome}</h1>
              </div>
            </div>

      </div>
        <div>
          <h1>Medico com mais consultas: {doctorWithMoreConsultations.nome}</h1>
          <h1>Interno destaque: {internStar.nome}</h1>
          <h1>Pacientes mais graves: </h1>
          <ul>
            {patientsMoreUrgent && patientsMoreUrgent.map((patient, index) => (
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
        <p>Paicentes Internados {internedCount.internCount}</p>
        <p>Pacientes Urgentes {urgentCount.urgenciaCount}</p>
      </div>
      <DownerNav />
    </Layout>
  );
}
