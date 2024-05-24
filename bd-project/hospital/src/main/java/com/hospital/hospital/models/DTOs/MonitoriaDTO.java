package com.hospital.hospital.models.DTOs;

public class MonitoriaDTO {
    private String nomePaciente;
    private String nomeInterno;
    private String cpf_paciente;
    private String cpf_interno;

    public MonitoriaDTO(String nomePaciente, String nomeInterno, String cpf_paciente, String cpf_interno) {
        this.nomePaciente = nomePaciente;
        this.nomeInterno = nomeInterno;
        this.cpf_paciente = cpf_paciente;
        this.cpf_interno = cpf_interno;
    }

    public String getnomePaciente() {
        return nomePaciente;
    }

    public void setnomePaciente(String nomePaciente) {
        this.nomePaciente = nomePaciente;
    }

    public String getnomeInterno() {
        return nomeInterno;
    }

    public void setnomeInterno(String nomeInterno) {
        this.nomeInterno = nomeInterno;
    }

    public String getcpf_paciente() {
        return cpf_paciente;
    }

    public void setcpf_paciente(String cpf_paciente) {
        this.cpf_paciente = cpf_paciente;
    }

    public String getcpf_interno() {
        return cpf_interno;
    }

    public void setcpf_interno(String cpf_interno) {
        this.cpf_interno = cpf_interno;
    }
    
}
