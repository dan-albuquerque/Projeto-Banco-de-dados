package com.hospital.hospital.models.informacao;

public class Comorbidade {
    public int fk_registro_urgencia_codigo;
    public int id;
    public String nome;
    
    public Comorbidade(int fk_registro_urgencia_codigo, int id, String nome){
        this.fk_registro_urgencia_codigo = fk_registro_urgencia_codigo;
        this.id = id;
        this.nome = nome;
    }

    public Comorbidade(){
    }

    public int getRegistroUrgenciaCodigo(){
        return fk_registro_urgencia_codigo;
    }

    public void setRegistroUrgenciaCodigo(int fk_registro_urgencia_codigo){
        this.fk_registro_urgencia_codigo = fk_registro_urgencia_codigo;
    }

    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getNome(){
        return nome;
    }

    public void setNome(String nome){
        this.nome = nome;
    }


}
