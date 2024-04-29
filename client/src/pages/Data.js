import React, {useState} from 'react';
import "../app/globals.css";
import Layout from "../app/layout";
import UpperNav from '@/components/UpperNav';
import InternTableView from '@/components/InternTableView';
import DoctorsTableView from '@/components/DoctorsTableView';
import PatientTableView from '@/components/PatientTableView';

export async function getServerSideProps(context) {
  const urls = {
      interns: `http://localhost:8080/intern`,
      doctors: `http://localhost:8080/medico`,
      patients: `http://localhost:8080/pacient`
  };

  try {
      const [internsRes, doctorsRes, patientsRes] = await Promise.all([
          fetch(urls.interns),
          fetch(urls.doctors),
          fetch(urls.patients)
      ]);

      const [interns, doctors, patients] = await Promise.all([
          internsRes.json(),
          doctorsRes.json(),
          patientsRes.json()
      ]);

      if (!interns || !doctors || !patients) {
          return { notFound: true };
      }

      return {
          props: {
              interns,
              doctors,
              patients
          },
      };
  } catch (error) {
      console.error("Failed to fetch data:", error);
      return { notFound: true };
  }
}

export default function Data({ interns, doctors, patients}) {
  const [isIntern, setIsIntern] = useState(true);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isPatient, setIsPatient] = useState(false);

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

  const renderTable = () => {
    if (isIntern) {
        return <InternTableView interns={interns} />;
    } else if (isDoctor) {
        return <DoctorsTableView data={doctors} />;  // Assuming similar component can be used or create separate ones
    } else if (isPatient) {
        return <PatientTableView patients={patients} />;
    }
};

  return (
    <Layout className="max-w-4xl mx-auto">
      <UpperNav swapPatient={handleSwapPatient} swapIntern={handleSwapIntern} swapDoctor={handleSwapDoctor} />
      <div className="border border-gray-300 mt-8 rounded-lg bg-customGrey mx-auto shadow-md hover:shadow-lg focus:shadow-xl w-11/12 overflow-auto" style={{ height: '70vh' }}>
        <div className="flex flex-col gap-4">
          {renderTable()}
        </div>
      </div>
    </Layout>
  );
}
