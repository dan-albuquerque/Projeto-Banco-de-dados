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

  try{
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
      const responsePaciente = await fetch(`http://localhost:8080/pacient/${consulta.fk_paciente_cpf}`);
      const paciente = await responsePaciente.json();

      const responseMedico = await fetch(`http://localhost:8080/medico/${consulta.fk_medico_cpf}`);
      const medico = await responseMedico.json();
      return { ...consulta, nomePaciente: paciente.nome, nomeMedico: medico.nome };
    }));

    const consultaInternadoNomes = await Promise.all(consultatioHospitalized.map(async (consulta) => {
      const responsePaciente = await fetch(`http://localhost:8080/pacient/${consulta.fk_paciente_cpf}`);
      const paciente = await responsePaciente.json();

      const responseMedico = await fetch(`http://localhost:8080/medico/${consulta.fk_medico_cpf}`);
      const medico = await responseMedico.json();
      return { ...consulta, nomePaciente: paciente.nome, nomeMedico: medico.nome };
    }));

    const consultasUrgenciaByMedicoWithNames = await Promise.all(consultasUrgenciaByMedico.map(async (consulta) => {
      const responsePaciente = await fetch(`http://localhost:8080/pacient/${consulta.fk_paciente_cpf}`);
      const paciente = await responsePaciente.json();

      const responseMedico = await fetch(`http://localhost:8080/medico/${consulta.fk_medico_cpf}`);
      const medico = await responseMedico.json();
      return { ...consulta, nomePaciente: paciente.nome, nomeMedico: medico.nome };
    }));

    const consultaInternadoByMedicoWithNames = await Promise.all(consultaInternadoByMedico.map(async (consulta) => {
      const responsePaciente = await fetch(`http://localhost:8080/pacient/${consulta.fk_paciente_cpf}`);
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

export default function ViewConsultas({ consultationUrgent, consultatioHospitalized, consultasUrgenciaByMedico, consultaInternadoByMedico}) {
  const [isUrgent, setIsUrgent] = useState(true);
  const [isMyConsultas, setIsMyConsultas] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [upperNavSearch, setUpperNavSearch] = useState(null);

  const handleUpperNavSearch = (data) => {
    setIsSearch(true);
    console.log("is Search");
    console.log('data: ', data);
    setUpperNavSearch(data);
  }

  const undoSearch = () => {
    console.log("3. terceira e final etapa. undo search foi acionado. Estou em viewconsultas.js"); 
    setIsSearch(false);
    setUpperNavSearch(null);
  };

  const handleChooseUrgent = () => {
    setIsUrgent(true);
    setIsSearch(false);  // Limpa o filtro de pesquisa ao alternar
  };

  const handleChooseHospitalized = () => {
    setIsUrgent(false);
    setIsSearch(false);  // Limpa o filtro de pesquisa ao alternar
  };

  const toggleMyConsultas = () => {
    setIsMyConsultas(!isMyConsultas);
    setIsSearch(false);  // Limpa o filtro de pesquisa ao alternar
  };

  const getConsultationsToDisplay = () => {
    if (isSearch && upperNavSearch) {
      return upperNavSearch;
    }

    if (isUrgent) {
      return isMyConsultas ? consultasUrgenciaByMedico : consultationUrgent;
    } else {
      return isMyConsultas ? consultaInternadoByMedico : consultatioHospitalized;
    }
  };

  const renderTable = () => {
    if (isUrgent) {
      return <ConsultaUrgenciaTableView ConsultasUrgencia={getConsultationsToDisplay()} />;
    } else {
      return <ConsultaInternadoTableView ConsultasInternado={getConsultationsToDisplay()} />;
    }
  };

  return (
    <>
      <UppernavConsultas
        swapUrgent={handleChooseUrgent}
        swapHospitalized={handleChooseHospitalized}
        toggleMyConsultas={toggleMyConsultas}
        isMyConsultas={isMyConsultas}
        onData={handleUpperNavSearch}
        cancelSearch={undoSearch}
      />
      <div className="border border-gray-300 mt-4 rounded-lg bg-customGrey mx-auto shadow-md hover:shadow-lg focus:shadow-xl w-11/12 overflow-auto" style={{ height: '70vh' }}>
        {renderTable()}
      </div>
      <DownerNav />
    </>
  );
}
