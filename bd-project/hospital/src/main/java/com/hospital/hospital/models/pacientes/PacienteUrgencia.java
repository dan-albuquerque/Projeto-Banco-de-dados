package com.hospital.hospital.models.pacientes;

public class PacienteUrgencia {

    public String fk_paciente_cpf;
    public int nivel_triagem;

    public PacienteUrgencia(String fk_paciente_cpf, int nivel_triagem) {
        this.fk_paciente_cpf = fk_paciente_cpf;
        this.nivel_triagem = nivel_triagem;
    }

    public PacienteUrgencia() {
    }

    // Getters and setters

    public String getPacienteCpf() {
        return fk_paciente_cpf;
    }

    public void setPacienteCpf(String fk_paciente_cpf) {
        this.fk_paciente_cpf = fk_paciente_cpf;
    }

    public int getNivelTriagem() {
        return nivel_triagem;
    }

    public void setNivelTriagem(int nivel_triagem) {
        this.nivel_triagem = nivel_triagem;
    }
}
