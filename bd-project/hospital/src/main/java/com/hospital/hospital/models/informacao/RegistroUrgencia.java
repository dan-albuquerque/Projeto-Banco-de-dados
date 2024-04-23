package com.hospital.hospital.models.informacao;

public class RegistroUrgencia {
    public int fk_registro_codigo;
    public String historico_doenca;
    public String exame_fisico;

    public RegistroUrgencia(int fk_registro_codigo, String historico_doenca, String exame_fisico){
        this.fk_registro_codigo = fk_registro_codigo;
        this.historico_doenca = historico_doenca;
        this.exame_fisico = exame_fisico;
    }

    public RegistroUrgencia(){
    }

    public int getRegistroCodigo(){
        return fk_registro_codigo;
    }

    public void setRegistroCodigo(int fk_registro_codigo){
        this.fk_registro_codigo = fk_registro_codigo;
    }

    public String getHistoricoDoenca(){
        return historico_doenca;
    }

    public void setHistoricoDoenca(String historico_doenca){
        this.historico_doenca = historico_doenca;
    }

    public String getExameFisico(){
        return exame_fisico;
    }

    public void setExameFisico(String exame_fisico){
        this.exame_fisico = exame_fisico;
    }


}
