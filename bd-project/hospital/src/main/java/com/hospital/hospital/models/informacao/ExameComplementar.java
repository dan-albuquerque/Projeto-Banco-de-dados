package com.hospital.hospital.models.informacao;
import java.sql.Date;

public class ExameComplementar {
    public int codigo;
    public String resultados;
    public Date data_realizacao;
    public String tipo;

    public ExameComplementar(int codigo, String resultados, Date data_realizacao, String tipo){
        this.codigo = codigo;
        this.resultados = resultados;
        this.data_realizacao = data_realizacao;
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

    public Date getData_realizacao(){
        return data_realizacao;
    }

    public void setData_realizacao(Date data_realizacao){
        this.data_realizacao = data_realizacao;
    }

    public String getTipo(){
        return tipo;
    }

    public void setTipo(String tipo){
        this.tipo = tipo;
    }   
}
