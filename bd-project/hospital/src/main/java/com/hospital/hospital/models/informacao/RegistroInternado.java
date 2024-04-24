package com.hospital.hospital.models.informacao;

public class RegistroInternado {
    public int fk_registro_codigo;
    public String evolucao;
    public String historico_exames;

    public RegistroInternado(int fk_registro_codigo, String evolucao, String exame_fisico){
        this.fk_registro_codigo = fk_registro_codigo;
        this.evolucao = evolucao;
        this.historico_exames = exame_fisico;
    }

    public RegistroInternado(){
    }

    public int getRegistroCodigo(){
        return fk_registro_codigo;
    }

    public void setRegistroCodigo(int fk_registro_codigo){
        this.fk_registro_codigo = fk_registro_codigo;
    }

    public String getEvolucao(){
        return evolucao;
    }

    public void setEvolucao(String evolucao){
        this.evolucao = evolucao;
    }

    public String getHistoricoExames(){
        return historico_exames;
    }

    public void setHistoricoExames(String historico_exames){
        this.historico_exames = historico_exames;
    }

    
}
