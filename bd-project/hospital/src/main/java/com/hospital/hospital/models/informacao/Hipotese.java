package com.hospital.hospital.models.informacao;

public class Hipotese {
    public int id;
    public int fk_registro_codigo;

    public Hipotese(int id, int fk_registro_codigo){
        this.id = id;
        this.fk_registro_codigo = fk_registro_codigo;
    }

    public Hipotese(){
    }

    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public int getRegistroCodigo(){
        return fk_registro_codigo;
    }

    public void setRegistroCodigo(int fk_registro_codigo){
        this.fk_registro_codigo = fk_registro_codigo;
    }
    
}
