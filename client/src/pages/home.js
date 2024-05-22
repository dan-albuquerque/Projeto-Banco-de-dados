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
  <div className='flex justify-between w-[90%] items-center mt-10 '>
    <h1 className='text-3xl w-[90%] font-semibold'>Olá, bem vindo de volta!</h1>
    <div className="flex items-center justify-center">
        <img src="/img/logo.png" alt="Logo eHospital" className="h-8 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">
          eHospital
        </h2>
      </div>
  </div>
  <div className='px-6 w-[90%] h-42 rounded-lg bg-gradient-to-r from-blue-200 to-blue-500 flex justify-between mt-6 shadow-lg items-center'>
    <div className='flex flex-col gap-1 justify-center'>
      <h1 className='font-semibold  text-lg'>O eHospital lhe ajuda a ver todas as características de seu hospital!</h1>
      <p className='italic text-grey-100'>Basta acompanhar os dados abaixo!</p>
    </div>
    <div className='flex items-center gap-14'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='font-bold text-6xl'>{internedCount.internCount}</h1>
        <p className='font-semibold'>Internados</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='font-bold text-6xl'>{urgentCount.urgenciaCount}</h1>
        <p className='font-semibold'>Casos Urgentes</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='font-bold text-6xl'>{doctorsCount.doctorCount}</h1>
        <p className='font-semibold'>Médicos</p>
      </div>
    </div>
    <img src="img/fullHospital.svg" className='w-40 h-40'></img>
  </div>
  <div className='w-[90%] mt-10 flex gap-10 h-48'>
    <div className='w-1/2 px-6 h-full flex items-center justify-between bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-lg'>
      <div className='flex flex-col'>
        <h1 className='font-semibold text-lg text-white'>Médico em destaque no seu hospital</h1>
        <p className='italic text-grey-100 text-white'>Doutor que mais efetivou consultas</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
      <div className='h-32 w-32 rounded-full bg-blue-200 border-customBlue border-4'>
      <img className='h-full w-full object-cover rounded-full' src='img/femaledoc.svg' alt='Foto do médico' />
    </div>
        <h1 className='font-bold text-white'>{doctorWithMoreConsultations.nome}</h1>
      </div>
    </div>
    <div className='w-1/2 px-6 h-full flex items-center justify-between bg-gradient-to-r from-orange-300 to-orange-400 rounded-lg shadow-lg'>
      <div className='flex flex-col'>
        <h1 className='font-semibold text-lg text-white'>Interno em destaque no seu hospital</h1>
        <p className='italic text-grey-100 text-white'>Interno que mais monitora pacientes</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
      <div className='h-32 w-32 rounded-full bg-blue-200 border-customBlue border-4'>
      <img className='h-full w-full object-cover rounded-full' src='img/internado.svg' alt='Foto do médico' />
    </div>
        <h1 className='font-bold text-white'>{internStar.nome}</h1>
      </div>
    </div>
  </div>
  <div className='flex w-[90%] items-center gap-10 mt-10'>
    <div className='h-64 bg-gradient-to-r from-green-100 to-green-300 w-1/3 rounded-lg flex-col items-center shadow-lg overflow-auto'>
      <div className='w-full h-20 px-6 flex justify-between items-center shadow-lg bg-gradient-to-r from-green-200 to-green-400'>
        <h1 className='font-bold text-lg'>Pacientes mais graves</h1>
        <img src="img/importantPatient.svg" className='w-14 h-14'></img>
      </div>
      <ul className='w-full px-6 flex justify-between mt-6 items-center'>
        {patientsMoreUrgent && patientsMoreUrgent.map((patient, index) => (
          <li key={index}>
            <p>• {patient.nome}</p>

          </li>
        ))}
      </ul>
    </div>
    <div className='h-64 bg-gradient-to-r from-green-200 to-green-300 w-1/3 rounded-lg shadow-lg overflow-auto flex flex-col items-center'>
      <div className='w-full h-20 px-6 flex justify-between items-center shadow-lg bg-gradient-to-r from-green-200 to-green-400'>
        <h1 className='font-bold text-lg'>Consultas por Especialidade</h1>
        <img src="img/medicalteam.svg" className='w-14 h-14'></img>
      </div>
    </div>
    <div className='h-64 bg-gradient-to-r from-green-200 to-green-300 w-1/3 rounded-lg shadow-lg overflow-auto flex flex-col items-center'>
      <div className='w-full h-20 px-6 flex justify-between items-center shadow-lg bg-gradient-to-r from-green-200 to-green-400'>
        <h1 className='font-bold text-lg '>Consultas Recentes</h1>
        <img src="img/onlineconsultation.svg" className='w-14 h-14'></img>
      </div>
      <ul className='w-full px-6 flex justify-between mt-6 items-center'>
        {latestConsultations.map((consultation, index) => (
          <li key={index} className='rounded-lg px-4 py-2 shadow-lg border border-black'>
            <p className=''>{consultation.type}</p>
            <p className=''>{consultation.date}</p>
            <p className=''>{consultation.doctor}</p>
            <p className=''>{consultation.patient}</p>
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
