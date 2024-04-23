package com.hospital.hospital.models.relacoes;

public class Monitora {

    private String fk_cpf_interno;
    private String fk_cpf_paciente;

    public Monitora(String fk_cpf_interno, String fk_cpf_paciente) {
        this.fk_cpf_interno = fk_cpf_interno;
        this.fk_cpf_paciente = fk_cpf_paciente;
    }

    public Monitora() {
    }

    public String getCpfInterno() {
        return fk_cpf_interno;
    }

    public void setCpfInterno(String fk_cpf_interno) {
        this.fk_cpf_interno = fk_cpf_interno;
    }

    public String getCpfPaciente() {
        return fk_cpf_paciente;
    }

    public void setCpfPaciente(String fk_cpf_paciente) {
        this.fk_cpf_paciente = fk_cpf_paciente;
    }
}