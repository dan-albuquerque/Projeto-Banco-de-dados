package com.hospital.hospital.models.DTOs;

import com.hospital.hospital.models.pacientes.Paciente;

public class PacienteGeralDTO extends Paciente{
    private Integer sala;
    private Integer nivel_triagem;

    public PacienteGeralDTO(String cpf, String nome, String telefone_residencial, String telefone_pessoal, 
                            String cidade, String bairro, String rua, int numero, int sala, int nivel_triagem){
        super(nome, cpf, cidade, bairro, rua, numero, telefone_residencial, telefone_pessoal);
        this.sala = sala;
        this.nivel_triagem = nivel_triagem;
    }

    public PacienteGeralDTO(){
    }

    public Integer getSala(){
        return sala;
    }

    public void setSala(int sala){
        this.sala = sala;
    }

    public Integer getNivel_triagem(){
        return nivel_triagem;
    }

    public void setNivel_triagem(int nivel_triagem){
        this.nivel_triagem = nivel_triagem;
    }
}
