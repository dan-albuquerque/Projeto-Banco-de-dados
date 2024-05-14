import React, { useState } from 'react';
import UppernavConsultas from '@/components/UpperNavConsultas';
import DownerNav from '@/components/DownerNav';
import ConsultaUrgenciaTableView from '@/components/ConsultaUrgenciaTableView';
import ConsultaInternadoTableView from '@/components/ConsultaInternadoTableView';
import cookie from 'cookie';

export async function getServerSideProps(context) {
  const { req, res } = context;

  const parsedCookies = cookie.parse(req ? req.headers.cookie || "" : "");
  const docCpf = parsedCookies.cpf

  const urls = {
    consultationUrgent: 'http://localhost:8080/consulta_urgencia',
    consultatioHospitalized: 'http://localhost:8080/consulta_internado',
    consultasUrgenciaByMedico: `http://localhost:8080/consulta_urgencia/medico/${docCpf}`,
    consultasInternadoByMedico: `http://localhost:8080/consulta_internado/medico/${docCpf}`,
  };

  try {
    const [consultationUrgentRes, consultatioHospitalizedRes, consultasUrgenciaByMedicoRes, consultaInternadoByMedicoRes] = await Promise.all([
      fetch(urls.consultationUrgent),
      fetch(urls.consultatioHospitalized),
      fetch(urls.consultasUrgenciaByMedico),
      fetch(urls.consultasInternadoByMedico),
    ]);

    const [consultationUrgent, consultatioHospitalized, consultasUrgenciaByMedico, consultaInternadoByMedico] = await Promise.all([
      consultationUrgentRes.json(),
      consultatioHospitalizedRes.json(),
      consultasUrgenciaByMedicoRes.json(),
      consultaInternadoByMedicoRes.json(),
    ]);

    const consultationUrgentWithNames = await Promise.all(consultationUrgent.map(async (consulta) => {
      const responsePaciente = await fetch(`http://localhost:8080/pacient/${consulta.fk_paciente_urgencia_cpf}`);
      const paciente = await responsePaciente.json();

      const responseMedico = await fetch(`http://localhost:8080/medico/${consulta.fk_medico_cpf}`);
      const medico = await responseMedico.json();
      return { ...consulta, nomePaciente: paciente.nome, nomeMedico: medico.nome };
    }));

    const consultaInternadoNomes = await Promise.all(consultatioHospitalized.map(async (consulta) => {
      const responsePaciente = await fetch(`http://localhost:8080/pacient/${consulta.fk_paciente_internado_cpf}`);
      const paciente = await responsePaciente.json();

      const responseMedico = await fetch(`http://localhost:8080/medico/${consulta.fk_medico_cpf}`);
      const medico = await responseMedico.json();
      return { ...consulta, nomePaciente: paciente.nome, nomeMedico: medico.nome };
    }));

    const consultasUrgenciaByMedicoWithNames = await Promise.all(consultasUrgenciaByMedico.map(async (consulta) => {
      const responsePaciente = await fetch(`http://localhost:8080/pacient/${consulta.fk_paciente_urgencia_cpf}`);
      const paciente = await responsePaciente.json();

      const responseMedico = await fetch(`http://localhost:8080/medico/${consulta.fk_medico_cpf}`);
      const medico = await responseMedico.json();
      return { ...consulta, nomePaciente: paciente.nome, nomeMedico: medico.nome };
    }));

    const consultaInternadoByMedicoWithNames = await Promise.all(consultaInternadoByMedico.map(async (consulta) => {
      const responsePaciente = await fetch(`http://localhost:8080/pacient/${consulta.fk_paciente_internado_cpf}`);
      const paciente = await responsePaciente.json();

      const responseMedico = await fetch(`http://localhost:8080/medico/${consulta.fk_medico_cpf}`);
      const medico = await responseMedico.json();
      return { ...consulta, nomePaciente: paciente.nome, nomeMedico: medico.nome };
    }));

    return {
      props: {
        consultationUrgent: consultationUrgentWithNames,
        consultatioHospitalized: consultaInternadoNomes,
        consultasUrgenciaByMedico: consultasUrgenciaByMedicoWithNames,
        consultaInternadoByMedico: consultaInternadoByMedicoWithNames,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { notFound: true };
  }
}

export default function ViewConsultas({ consultationUrgent, consultatioHospitalized, consultasUrgenciaByMedico, consultaInternadoByMedico }) {
  const [isUrgent, setIsUrget] = useState(true);
  const [isMyConsultas, setIsMyConsultas] = useState(false);

  const handleChooseUrgent = () => {
    setIsUrget(true);
  };

  const handleChooseHospitalized = () => {
    setIsUrget(false);
  };

  const toggleMyConsultas = () => {
    setIsMyConsultas(!isMyConsultas);
  };

  const getConsultationsToDisplay = () => {
    if (isUrgent) {
      return isMyConsultas ? consultasUrgenciaByMedico : consultationUrgent;
    } else {
      return isMyConsultas ? consultaInternadoByMedico : consultatioHospitalized;
    }
  };

  return (
    <>
      <UppernavConsultas
        swapUrgent={handleChooseUrgent}
        swapHospitalized={handleChooseHospitalized} />
      <button onClick={toggleMyConsultas} className="mx-4 my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {isMyConsultas ? 'Ver Todas Consultas' : 'Ver Minhas Consultas'}
      </button>
      <div className="border border-gray-300 mt-4 rounded-lg bg-customGrey mx-auto shadow-md hover:shadow-lg focus:shadow-xl w-11/12 overflow-auto" style={{ height: '70vh' }}>

        {isUrgent ? (
          <ConsultaUrgenciaTableView ConsultasUrgencia={getConsultationsToDisplay()} />
        ) : (
          <ConsultaInternadoTableView ConsultasInternado={getConsultationsToDisplay()} />
        )}

      </div>
      <DownerNav />
    </>
  );
}
