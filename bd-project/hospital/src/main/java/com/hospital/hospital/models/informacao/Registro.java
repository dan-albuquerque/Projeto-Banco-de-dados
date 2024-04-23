package com.hospital.hospital.models.informacao;

public class Registro {
    public int codigo;
    public String conduta;

    public Registro(int codigo, String conduta){
        this.codigo = codigo;
        this.conduta = conduta;
    }

    public Registro(){
    }

    public int getCodigo(){
        return codigo;
    }

    public void setCodigo(int codigo){
        this.codigo = codigo;
    }

    public String getConduta(){
        return conduta;
    }

    public void setConduta(String conduta){
        this.conduta = conduta;
    }
}
