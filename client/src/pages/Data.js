import React, { useState } from 'react';
import "../app/globals.css";
import Layout from "../app/layout";
import UpperNav from '@/components/UpperNav';
import InternTableView from '@/components/InternTableView';
import DoctorsTableView from '@/components/DoctorsTableView';
import PatientTableView from '@/components/PatientTableView';
import DownerNav from '@/components/DownerNav';
import InsertNewPacient from '@/components/InsertNewPacient';

export async function getServerSideProps(context) {

  const urls = {
    interns: 'http://localhost:8080/intern',
    doctors: 'http://localhost:8080/medico',
    patients: 'http://localhost:8080/pacient',
    sortedPatients: 'http://localhost:8080/pacient?sort=alphabetical',
    sortedPatientsReverse: 'http://localhost:8080/pacient?sort=alphabetical&reverse=true'
  };

  try {
    const [internsRes, doctorsRes, patientsRes, sortedPatientsRes, sortedPatientsReverseRes] = await Promise.all([
      fetch(urls.interns),
      fetch(urls.doctors),
      fetch(urls.patients),
      fetch(urls.sortedPatients),
      fetch(urls.sortedPatientsReverse)
    ]);

    const [interns, doctors, patients, sortedPatients, sortedPatientsReverse] = await Promise.all([
      internsRes.json(),
      doctorsRes.json(),
      patientsRes.json(),
      sortedPatientsRes.json(),
      sortedPatientsReverseRes.json()
    ]);

    if (!interns || !doctors || !patients || !sortedPatients || !sortedPatientsReverse) {
      return { notFound: true };
    }

    return {
      props: {
        interns,
        doctors,
        patients,
        sortedPatients,
        sortedPatientsReverse
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { notFound: true };
  }
}

export const postNewPacient = async (pacient) => {
  try {
    const response = await fetch('http://localhost:8080/pacient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pacient)
    });

    if (!response.ok) {
      console.error("Failed to insert new pacient:", response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to insert new pacient:", error);
    return false;
  }

};



export default function Data({ interns, doctors, patients, sortedPatients, sortedPatientsReverse }) {
  const [isIntern, setIsIntern] = useState(true);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [isSortedPatients, setIsSortedPatients] = useState(false);
  const [isSortedPatientsReverse, setIsSortedPatientsReverse] = useState(false);
  const [isView, setIsView] = useState(true);
  const [isInsert, setIsInsert] = useState(false);

  const handleSortAsc = () => {
    console.log("Sorted Patients");
    if (isSortedPatients) {
      setIsSortedPatients(false);
    } else {
      setIsSortedPatients(true);
      setIsSortedPatientsReverse(false);
    }
    console.log(isSortedPatients);
  };

  const handleSortDesc = () => {
    console.log("Sorted Patients Reverse");
    if (isSortedPatientsReverse) {
      setIsSortedPatientsReverse(false);
    } else {
      setIsSortedPatientsReverse(true);
      setIsSortedPatients(false);
    }
    console.log(isSortedPatientsReverse);
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
  }

  const handleInsert = () => {
    console.log("Insert");
    setIsView(false);
    setIsInsert(true);
  }

  const renderTable = () => {
    if (isView) {
        if (isIntern) {
          return <InternTableView interns={interns} />;
        } else if (isDoctor) {
          return <DoctorsTableView doctors={doctors} />;
        } else if (isPatient) {
          if (isSortedPatientsReverse) {
            console.log(isSortedPatientsReverse);
            return <PatientTableView patients={sortedPatientsReverse} />;
          } else if (isSortedPatients) {
            console.log(isSortedPatients);
            return <PatientTableView patients={sortedPatients} />;
          }
          return <PatientTableView patients={patients} />;
        }
  }else if (isInsert) {
    return <InsertNewPacient />; 
  }
  };

  return (
  <Layout className="max-w-4xl mx-auto">
    
    <UpperNav 
        swapPatient={handleSwapPatient}
        swapIntern={handleSwapIntern} 
        swapDoctor={handleSwapDoctor} 
        searchByLatest={handleSortDesc} 
        searchByAZ={handleSortAsc} 
        searchByZA={handleSortDesc} 
        view = {handleView} 
        insert = {handleInsert}
    />

    <div className="border border-gray-300 mt-4 rounded-lg bg-customGrey mx-auto shadow-md hover:shadow-lg focus:shadow-xl w-11/12 overflow-auto" style={{ height: '75vh' }}>
      {renderTable()}
    </div>
    <DownerNav />
  </Layout>
  );
}