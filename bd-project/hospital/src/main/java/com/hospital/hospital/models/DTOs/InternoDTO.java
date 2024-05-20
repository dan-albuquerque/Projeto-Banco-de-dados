package com.hospital.hospital.models.DTOs;

public class InternoDTO {
    private String cpf;
    private String nome;
    private int totalPacientes;

    // Construtores, getters e setters
    public InternoDTO(String cpf, String nome, int totalPacientes) {
        this.cpf = cpf;
        this.nome = nome;
        this.totalPacientes = totalPacientes;
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

    public int getTotalPacientes() {
        return totalPacientes;
    }

    public void setTotalPacientes(int totalPacientes) {
        this.totalPacientes = totalPacientes;
    }
}
