package com.hospital.hospital.models.pacientes;

public class PacienteInternado {
    private int sala;
    private String fk_paciente_cpf;
    public PacienteInternado(int sala, String fk_paciente_cpf){
        this.sala = sala;
        this.fk_paciente_cpf = fk_paciente_cpf;
    }

    public PacienteInternado(){
    }

    public String getfk_paciente_cpf(){
        return fk_paciente_cpf;
    }

    public void setfk_paciente_cpf(String fk_paciente_cpf){
        this.fk_paciente_cpf = fk_paciente_cpf;
    }

    public int getSala(){
        return sala;
    }

    public void setSala(int sala){
        this.sala = sala;
    }




}