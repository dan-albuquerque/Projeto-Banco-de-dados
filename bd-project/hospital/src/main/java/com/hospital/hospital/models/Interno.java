package com.hospital.hospital.models;

public class Interno {
    
    private String nome;
    private String cpf;
    private String senha;
    private int matricula;

    public Interno(String nome, String cpf, String senha, int matricula){
        this.nome = nome;
        this.cpf = cpf;
        this.senha = senha;
        this.matricula = matricula;
    }

    public Interno(){
    }

    public String getNome(){
        return nome;
    }

    public void setName(String nome){
        this.nome = nome;
    }

    public String getCpf(){
        return cpf;
    }

    public void setCpf(String cpf){
        this.cpf = cpf;
    }

    public String getSenha(){
        return senha;
    }

    public void setSenha(String senha){
        this.senha = senha;
    }

    public int getMatricula(){
        return matricula;
    }

    public void setmatricula(int matricula){
        this.matricula = matricula;
    }

    // @Override
    // public String toString(){
    //     return "Intern{" +
    //             "name='" + nome + '\'' +
    //             ", cpf='" + cpf + '\'' +
    //             ", senha='" + senha + '\'' +
    //             ", matricula=" + matricula +
    //             '}';
    // }


}
