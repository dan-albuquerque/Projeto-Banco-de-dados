import React, { useState } from 'react';
import UppernavConsultas from '@/components/UpperNavConsultas';
import DownerNav from '@/components/DownerNav';
import ConsultaUrgenciaTableView from '@/components/ConsultaUrgenciaTableView';
import ConsultaInternadoTableView from '@/components/ConsultaInternadoTableView';

export async function getServerSideProps() {

    const urls = {
        consultationUrgent: 'http://localhost:8080/consulta_urgencia',
        consultatioHospitalized: 'http://localhost:8080/consultainternado',
        doctors: 'http://localhost:8080/medico'
    };

    try {
        const [doctorsRes, consultationUrgentRes, consultatioHospitalizedRes] = await Promise.all([
            fetch(urls.doctors),
            fetch(urls.consultationUrgent),
            fetch(urls.consultatioHospitalized)
        ]);

        const [doctors, consultationUrgent, consultatioHospitalized] = await Promise.all([
            doctorsRes.json(),
            consultationUrgentRes.json(),
            consultatioHospitalizedRes.json()
        ]);

        if (!doctors || !doctorsRes.ok) {
            console.log('Doctors not found or response not ok:', doctors, doctorsRes);
            return { notFound: true };
        }
        return {
            props: {
                doctors,
                consultationUrgent,
                consultatioHospitalized
            },
        };
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return { notFound: true };
    }
}

export default function ViewConsultas({ doctors, consultationUrgent, consultatioHospitalized }) {
    const [isUrgent, setIsUrget] = useState(true);
    const [isHospitalized, setIsHospitalized] = useState(false);

    const handleChooseUrgent = () => {
        setIsUrget(true);
        setIsHospitalized(false);
    };

    const handleChooseHospitalized = () => {
        setIsUrget(false);
        setIsHospitalized(true);
    };

    return (
        <>
            <UppernavConsultas
                swapUrgent={handleChooseUrgent}
                swapHospitalized={handleChooseHospitalized} />
            <div className="container mx-auto mt-8 flex items-center justify-center">
                {isUrgent ? (
                    <ConsultaUrgenciaTableView ConsultasUrgencia={consultationUrgent} />
                ) : (
                    <ConsultaInternadoTableView ConsultasInternado={consultatioHospitalized} />
                )}
            </div>
            <DownerNav />
        </>
    );
}