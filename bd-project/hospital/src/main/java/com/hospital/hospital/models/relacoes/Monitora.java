package com.hospital.hospital.models.relacoes;

import com.hospital.hospital.models.pacientes.Paciente;

public class Monitora {

    private String fk_paciente_cpf;
    private String fk_interno_cpf;
    private Paciente paciente;

    public Monitora(String fk_paciente_cpf, String fk_interno_cpf){
        this.fk_paciente_cpf = fk_paciente_cpf;
        this.fk_interno_cpf = fk_interno_cpf;
    }

    public Monitora(String fk_paciente_cpf, String fk_interno_cpf, String nome_paciente){
        this.fk_paciente_cpf = fk_paciente_cpf;
        this.fk_interno_cpf = fk_interno_cpf;
        paciente = new Paciente();
        paciente.setNome(nome_paciente);
    }

    public Monitora(){
    }

    public String getfk_interno_cpf(){
        return fk_interno_cpf;
    }

    public void setfk_interno_cpf(String fk){
        this.fk_interno_cpf = fk;
    }

    public String getfk_paciente_cpf(){
        return fk_paciente_cpf;
    }

    public void setfk_paciente_cpf(String fk_paciente_cpf){
        this.fk_paciente_cpf = fk_paciente_cpf;
    }

    public String getNomePaciente(){
        return paciente.getNome();
    }

    public void setNomePaciente(String nome){
        paciente.setNome(nome);
    }
}
    