package com.hospital.hospital.models;

public class InternedPatient {
    private int sala;
    private String patientCpf;

    public InternedPatient(int sala, String patientCpf){
        this.sala = sala;
        this.patientCpf = patientCpf;
    }

    public int getSala(){
        return sala;
    }

    public void setSala(int sala){
        this.sala = sala;
    }

    public String getPatientCpf(){
        return patientCpf;
    }

    public void setPatientCpf(String patientCpf){
        this.patientCpf = patientCpf;
    }


}