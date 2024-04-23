package com.hospital.hospital.models.pacientes;

public class Paciente {
    private String nome, cpf, telefone_residencial, telefone_pessoal, cidade, bairro, rua;
    private int numero;

    public Paciente(String nome, String cpf, String telefone_residencial, String telefone_pessoal, String cidade, String bairro, String rua, int numero){
        this.nome = nome;
        this.cpf = cpf;
        this.telefone_residencial = telefone_residencial;
        this.telefone_pessoal = telefone_pessoal;
        this.cidade = cidade;
        this.bairro = bairro;
        this.rua = rua;
        this.numero = numero;
    }

    public Paciente(){
    }

    public String getNome(){
        return nome;
    }

    public void setNome(String nome){
        this.nome = nome;
    }

    public String getCpf(){
        return cpf;
    }

    public void setCpf(String cpf){
        this.cpf = cpf;
    }

    public String getTelefone_residencial(){
        return telefone_residencial;
    }

    public void setTelefoneResidencial(String telefone_residencial){
        this.telefone_residencial = telefone_residencial;
    }

    public String getTelefonePessoal(){
        return telefone_pessoal;
    }

    public void setTelefonePessoal(String telefone_pessoal){
        this.telefone_pessoal = telefone_pessoal;
    }

    public String getCidade(){
        return cidade;
    }

    public void setCidade(String cidade){
        this.cidade = cidade;
    }

    public String getBairro(){
        return bairro;
    }

    public void setBairro(String bairro){
        this.bairro = bairro;
    }

    public String getRua(){
        return rua;
    }

    public void setRua(String rua){
        this.rua = rua;
    }

    public int getNumero(){
        return numero;
    }

    public void setNumero(int numero){
        this.numero = numero;
    }



    
}
