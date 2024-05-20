package com.hospital.hospital.models.DTOs;

public class PacienteUrgenciaDTO {

    private String cpf;
    private String nome;
    private int nivelTriagem;

    public PacienteUrgenciaDTO(String cpf, String nome, int nivelTriagem) {
        this.cpf = cpf;
        this.nome = nome;
        this.nivelTriagem = nivelTriagem;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getNivelTriagem() {
        return nivelTriagem;
    }

    public void setNivelTriagem(int nivelTriagem) {
        this.nivelTriagem = nivelTriagem;
    }
}
