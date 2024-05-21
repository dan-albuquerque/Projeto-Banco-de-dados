package com.hospital.hospital.models.DTOs;

public class MedicoDTO {
    private String cpf;
    private String nome;
    private int totalConsultas;

    // Construtores, getters e setters
    public MedicoDTO(String cpf, String nome, int totalConsultas) {
        this.cpf = cpf;
        this.nome = nome;
        this.totalConsultas = totalConsultas;
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

    public int getTotalConsultas() {
        return totalConsultas;
    }

    public void setTotalConsultas(int totalConsultas) {
        this.totalConsultas = totalConsultas;
    }
}
