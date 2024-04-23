package com.hospital.hospital.models.informacao;
import java.sql.Date;

public class ExameComplementar {
    public int codigo;
    public String resultados;
    public Date data;
    public String tipo;

    public ExameComplementar(int codigo, String resultados, Date data, String tipo){
        this.codigo = codigo;
        this.resultados = resultados;
        this.data = data;
        this.tipo = tipo;
    }

    public ExameComplementar(){
    }

    public int getCodigo(){
        return codigo;
    }

    public void setCodigo(int codigo){
        this.codigo = codigo;
    }

    public String getResultados(){
        return resultados;
    }

    public void setResultados(String resultados){
        this.resultados = resultados;
    }

    public Date getData(){
        return data;
    }

    public void setData(Date data){
        this.data = data;
    }

    public String getTipo(){
        return tipo;
    }

    public void setTipo(String tipo){
        this.tipo = tipo;
    }


    
}
