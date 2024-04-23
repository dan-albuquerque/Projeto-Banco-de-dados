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

    public int getSala(){
        return sala;
    }

    public void setSala(int sala){
        this.sala = sala;
    }

    public String getPacienteCpf(){
        return fk_paciente_cpf;
    }

    public void setPacienteCpf(String fk_paciente_cpf){
        this.fk_paciente_cpf = fk_paciente_cpf;
    }


}