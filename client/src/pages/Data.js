import React, { useState } from 'react';
import "../app/globals.css";
import Layout from "../app/layout";
import UpperNav from '@/components/UpperNav';
import InternTableView from '@/components/InternTableView';
import DoctorsTableView from '@/components/DoctorsTableView';
import PatientTableView from '@/components/PatientTableView';
import DownerNav from '@/components/DownerNav';
import InsertNewPacient from '@/components/InsertNewPacient';
import InsertNewIntern from '@/components/InsertNewIntern';

export async function getServerSideProps(context) {

  const urls = {
    interns: 'http://localhost:8080/intern',
    doctors: 'http://localhost:8080/medico',
    patients: 'http://localhost:8080/pacient',
    sortedPatients: 'http://localhost:8080/pacient?sort=alphabetical',
    sortedPatientsReverse: 'http://localhost:8080/pacient?sort=alphabetical&reverse=true',
    sortedPatientsCpf: 'http://localhost:8080/pacient?sort=numerical',
    sortedInterns: 'http://localhost:8080/intern?sort=alphabetical',
    sortedInternsReverse: 'http://localhost:8080/intern?sort=alphabetical&reverse=true',
    sortedInternsCpf: 'http://localhost:8080/intern?sort=numerical',
    sortedDoctors: 'http://localhost:8080/medico?sort=alphabetical',
    sortedDoctorsReverse: 'http://localhost:8080/medico?sort=alphabetical&reverse=true',
    sortedDoctorsCpf: 'http://localhost:8080/medico?sort=numerical'
  };

  try {
    const [internsRes, doctorsRes, patientsRes, sortedPatientsRes, sortedPatientsReverseRes,
      sortedPatientsCpfRes, sortedInternsRes, sortedInternsReverseRes, sortedInternsCPfRes,
      sortedDoctorsRes, sortedDoctorsReverseRes, sortedDoctorsCpfRes] = await Promise.all([
        fetch(urls.interns),
        fetch(urls.doctors),
        fetch(urls.patients),
        fetch(urls.sortedPatients),
        fetch(urls.sortedPatientsReverse),
        fetch(urls.sortedPatientsCpf),
        fetch(urls.sortedInterns),
        fetch(urls.sortedInternsReverse),
        fetch(urls.sortedInternsCpf),
        fetch(urls.sortedDoctors),
        fetch(urls.sortedDoctorsReverse),
        fetch(urls.sortedDoctorsCpf)
      ]);

    const [interns, doctors, patients, sortedPatients, sortedPatientsReverse, sortedPatientsCpf,
      sortedInterns, sortedInternsReverse, sortedInternsCpf, sortedDoctors, sortedDoctorsReverse,
      sortedDoctorsCpf] = await Promise.all([
        internsRes.json(),
        doctorsRes.json(),
        patientsRes.json(),
        sortedPatientsRes.json(),
        sortedPatientsReverseRes.json(),
        sortedPatientsCpfRes.json(),
        sortedInternsRes.json(),
        sortedInternsReverseRes.json(),
        sortedInternsCPfRes.json(),
        sortedDoctorsRes.json(),
        sortedDoctorsReverseRes.json(),
        sortedDoctorsCpfRes.json()
      ]);

    if (!interns || !doctors || !patients || !sortedPatients || !sortedPatientsReverse || !sortedPatientsCpf
      || !sortedInterns || !sortedInternsReverse || !sortedInternsCpf || !sortedDoctors || !sortedDoctorsReverse || !sortedDoctorsCpf) {
      return { notFound: true };
    }

    return {
      props: {
        interns,
        doctors,
        patients,
        sortedPatients,
        sortedPatientsReverse,
        sortedPatientsCpf,
        sortedInterns,
        sortedInternsReverse,
        sortedInternsCpf,
        sortedDoctors,
        sortedDoctorsReverse,
        sortedDoctorsCpf
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { notFound: true };
  }
}

export default function Data({ interns, doctors, patients, sortedPatients, sortedPatientsReverse,
  sortedPatientsCpf, sortedInterns, sortedInternsReverse, sortedInternsCpf,
  sortedDoctors, sortedDoctorsReverse, sortedDoctorsCpf }) {
  const [isIntern, setIsIntern] = useState(true);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [isSortedPatients, setIsSortedPatients] = useState(false);
  const [isSortedPatientsReverse, setIsSortedPatientsReverse] = useState(false);
  const [isSortedPatientsCpf, setIsSortedPatientsCpf] = useState(false);
  const [isSortedInterns, setIsSortedInterns] = useState(false);
  const [isSortedDoctors, setIsSortedDoctors] = useState(false);
  const [isSortedInternsReverse, setIsSortedInternsReverse] = useState(false);
  const [isSortedDoctorsReverse, setIsSortedDoctorsReverse] = useState(false);
  const [isSortedInternsCpf, setIsSortedInternsCpf] = useState(false);
  const [isSortedDoctorsCpf, setIsSortedDoctorsCpf] = useState(false);
  const [isView, setIsView] = useState(true);
  const [isInsert, setIsInsert] = useState(false);

  const handleSortAsc = () => {
    if (isIntern) {
      console.log("Intern Asc");
      setIsSortedInterns(!isSortedInterns);
      setIsSortedInternsReverse(false);
      setIsSortedInternsCpf(false);
      setIsSortedDoctors(false);
      setIsSortedPatients(false);
    } else if (isDoctor) {
      console.log("Doctor Asc");
      setIsSortedDoctors(!isSortedDoctors);
      setIsSortedDoctorsReverse(false);
      setIsSortedDoctorsCpf(false);
      setIsSortedPatients(false);
      setIsSortedInterns(false);
    } else if (isPatient) {
      console.log("Patient Asc");
      setIsSortedInterns(false);
      setIsSortedDoctors(false);
      setIsSortedPatients(!isSortedPatients);
      setIsSortedPatientsCpf(false);
      setIsSortedPatientsReverse(false);
    }
  };

  const handleSortDesc = () => {
    if (isIntern) {
      console.log("Intern Desc");
      setIsSortedInternsReverse(!isSortedInternsReverse);
      setIsSortedInterns(false);
      setIsSortedInternsCpf(false);
      setIsSortedDoctors(false);
      setIsSortedDoctorsReverse(false);
      setIsSortedPatientsReverse(false);
    } else if (isDoctor) {
      console.log("Doctor Desc");
      setIsSortedInternsReverse(false);
      setIsSortedDoctorsReverse(!isSortedDoctorsReverse);
      setIsSortedDoctors(false);
      setIsSortedDoctorsCpf(false);
      setIsSortedPatientsReverse(false);
    } else if (isPatient) {
      console.log("Patient Desc");
      setIsSortedInternsReverse(false);
      setIsSortedDoctorsReverse(false);
      setIsSortedPatientsReverse(!isSortedPatientsReverse);
      setIsSortedPatients(false);
      setIsSortedPatientsCpf(false);
    }
  };

  const handleSortCpf = () => {
    if (isIntern) {
      console.log("Intern Cpf");
      setIsSortedInternsCpf(!isSortedInternsCpf);
      setIsSortedInterns(false);
      setIsSortedInternsReverse(false);
      setIsSortedDoctorsCpf(false);
      setIsSortedPatientsCpf(false);
    } else if (isDoctor) {
      console.log("Doctor Cpf");
      setIsSortedInternsCpf(false);
      setIsSortedDoctorsCpf(!isSortedDoctorsCpf);
      setIsSortedDoctors(false);
      setIsSortedDoctorsReverse(false);
      setIsSortedPatientsCpf(false);
    } else if (isPatient) {
      console.log("Patient Cpf");
      setIsSortedInternsCpf(false);
      setIsSortedDoctorsCpf(false);
      setIsSortedPatientsCpf(!isSortedPatientsCpf);
      setIsSortedPatients(false);
      setIsSortedPatientsReverse(false);
    }
  };

  const handleSwapDoctor = () => {
    console.log("Doctor");
    setIsIntern(false);
    setIsDoctor(true);
    setIsPatient(false);
  };

  const handleSwapPatient = () => {
    console.log("Patient");
    setIsIntern(false);
    setIsDoctor(false);
    setIsPatient(true);
  };

  const handleSwapIntern = () => {
    console.log("Intern");
    setIsIntern(true);
    setIsDoctor(false);
    setIsPatient(false);
  };

  const handleView = () => {
    console.log("View");
    setIsView(true);
    setIsInsert(false);
  };

  const handleInsert = () => {
    console.log("Insert");
    setIsView(false);
    setIsInsert(true);
  };

  const renderTable = () => {
    if (!isView) return <InsertNewIntern />;
    else if (isInsert) return <InsertNewPacient />;

    if (isIntern) {
      if (isSortedInternsReverse) {
        console.log(isSortedInternsReverse);
        return <InternTableView interns={sortedInternsReverse} />;
      } else if (isSortedInterns) {
        console.log(isSortedInterns);
        return <InternTableView interns={sortedInterns} />;
      } else if (isSortedInternsCpf) {
        console.log(isSortedInternsCpf);
        return <InternTableView interns={sortedInternsCpf} />;
      }
      return <InternTableView interns={interns} />;
    } else if (isDoctor) {
      if (isSortedDoctorsReverse) {
        console.log(isSortedDoctorsReverse);
        return <DoctorsTableView doctors={sortedDoctorsReverse} />;
      } else if (isSortedDoctors) {
        console.log(isSortedDoctors);
        return <DoctorsTableView doctors={sortedDoctors} />;
      } else if (isSortedDoctorsCpf) {
        console.log(isSortedDoctorsCpf);
        return <DoctorsTableView doctors={sortedDoctorsCpf} />;
      }
      return <DoctorsTableView doctors={doctors} />;
    } else if (isPatient) {
      if (isSortedPatientsReverse) {
        console.log(isSortedPatientsReverse);
        return <PatientTableView patients={sortedPatientsReverse} />;
      } else if (isSortedPatients) {
        console.log(isSortedPatients);
        return <PatientTableView patients={sortedPatients} />;
      } else if (isSortedPatientsCpf) {
        console.log(isSortedPatientsCpf);
        return <PatientTableView patients={sortedPatientsCpf} />;
      }
      return <PatientTableView patients={patients} />;
    }
  };

  return (
    <Layout className="max-w-4xl mx-auto">

      <UpperNav
        swapPatient={handleSwapPatient}
        swapIntern={handleSwapIntern}
        swapDoctor={handleSwapDoctor}
        searchByCpf={handleSortCpf}
        searchByAZ={handleSortAsc}
        searchByZA={handleSortDesc}
        view={handleView}
        insert={handleInsert}
      />

      <div className="border border-gray-300 mt-4 rounded-lg bg-customGrey mx-auto shadow-md hover:shadow-lg focus:shadow-xl w-11/12 overflow-auto" style={{ height: '75vh' }}>
        {renderTable()}
      </div>
      <DownerNav />
    </Layout>
  );
}