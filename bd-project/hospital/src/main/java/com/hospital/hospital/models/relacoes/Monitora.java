package com.hospital.hospital.models.relacoes;

public class Monitora {

    private String fk_interno_cpf;
    private String fk_paciente_cpf;

    public Monitora(String fk_interno_cpf, String fk_paciente_cpf){
        this.fk_paciente_cpf = fk_paciente_cpf;
        this.fk_interno_cpf = fk_interno_cpf;
    }

    public Monitora(){
    }

    public String getfk_intern_cpf(){
        return fk_interno_cpf;
    }

    public void setfk_intern_cpf(String fk_intern_cpfy){
        this.fk_interno_cpf = fk_intern_cpfy;
    }

    public String getfk_paciente_cpf(){
        return fk_paciente_cpf;
    }

    public void setfk_paciente_cpf(String fk_paciente_cpf){
        this.fk_paciente_cpf = fk_paciente_cpf;
    }

}
    