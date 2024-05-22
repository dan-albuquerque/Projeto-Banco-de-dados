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
      <div className='items-center flex flex-col'>
        <div className='flex justify-between w-[95%] items-center mt-10 '>
          <h1 className='text-3xl w-[95%] font-semibold'>Olá, bem vindo de volta!</h1>
          <div className="flex items-center justify-center">
              <img src="/img/logo.png" alt="Logo eHospital" className="h-8 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                eHospital
              </h2>
            </div>
        </div>
        <div className='px-6 w-[95%] h-42 rounded-lg bg-blue-100 flex justify-between mt-6 shadow-md items-center'>
          <div className='flex flex-col gap-1 justify-center'>
            <h1>O eHospital lhe ajuda a ver todas as características de seu hospital!</h1>
            <p className='italic text-grey-400'>Basta acompanhar os dados abaixo!</p>
          </div>
          <div className='flex items-center gap-14'>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='font-bold text-6xl'>{internedCount.internCount}</h1>
              <p>Internados</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='font-bold text-6xl'>{urgentCount.urgenciaCount}</h1>
              <p>Casos Urgentes</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='font-bold text-6xl'>{doctorsCount.doctorCount}</h1>
              <p>Médicos</p>
            </div>
          </div>
          <img src  = "img/fullHospital.svg" className='w-40 h-40'></img>
        </div>
        <div className='w-[95%] mt-10 flex gap-10 h-48'>
          <div className='w-1/2 px-6 h-full flex items-center justify-between bg-blue-300 rounded-lg shadow-md'>
            <div className='flex flex-col'>
              <h1>Médico em destaque no seu hospital</h1>
              <p className='italic text-grey-600'>Doutor que mais efetivou consultas</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
            <div className='h-32 w-32 rounded-full bg-blue-200 border-customBlue border-4'>
            <img className='h-full w-full  object-cover rounded-full' src='img/femaledoc.svg' alt='Foto do médico' />
          </div>
              <h1 className='font-bold'>{doctorWithMoreConsultations.nome}</h1>
            </div>
          </div>
          <div className='w-1/2 px-6 h-full flex items-center justify-between bg-red-300 rounded-lg shadow-md'>
            <div className='flex flex-col'>
              <h1>Interno em destaque no seu hospital</h1>
              <p className='italic text-grey-600'>Interno que mais monitora pacientes</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
            <div className='h-32 w-32 rounded-full bg-blue-200 border-customBlue border-4'>
            <img className='h-full w-full  object-cover rounded-full' src='img/internado.svg' alt='Foto do médico' />
          </div>
              <h1 className='font-bold'>{internStar.nome}</h1>
            </div>

          </div>
        </div>
        <div className='flex w-[95%] items-center gap-10 mt-10'>

              <div className='h-64 bg-blue-100 w-1/3 rounded-lg flex-col items-center shadow-md overflow-auto'>
                <div className='w-full h-20 px-6 flex justify-between  items-center shadow-md bg-blue-200'>
                  <h1 className='font-bold text-lg'>Pacientes mais graves</h1>
                  <img src = "img/importantPatient.svg" className='w-14 h-14'></img>
                </div>
                <ul className='w-full px-6 flex justify-between mt-6 items-center'>
                  {patientsMoreUrgent && patientsMoreUrgent.map((patient, index) => (
                    <li key={index}>
                      <p> • {patient.nome}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='h-64 bg-blue-100 w-1/3 rounded-lg shadow-md overflow-auto  flex flex-col items-center'>
              <div className='w-full h-20 px-6 flex justify-between  items-center shadow-md bg-blue-200'>
                  <h1 className='font-bold text-lg'>Consultas Recentes</h1>
                  <img src = "img/importantPatient.svg" className='w-14 h-14'></img>
                </div>  
              </div>
              <div className='h-64 bg-blue-100 w-1/3 rounded-lg shadow-md overflow-auto flex flex-col items-center'>
              <div className='w-full h-20 px-6 flex justify-between  items-center shadow-md bg-blue-200'>
                  <h1 className='font-bold text-lg'>Consultas Recentes</h1>
                  <img src = "img/onlineconsultation.svg" className='w-14 h-14'></img>
                </div>  
                <ul className='w-full px-6 flex justify-between mt-6 items-center'>
                  {latestConsultations.map((consultation, index) => (
                    <li key={index} className='rounded-lg px-4 py-2 shadow-md border border-blue-400'>
                      <p>{consultation.type}</p>
                      <p>{consultation.date}</p>
                      <p>{consultation.doctor}</p>
                      <p>{consultation.patient}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

        
    
      </div>
      <DownerNav />
    </Layout>
  );
}
