package com.hospital.hospital.models.consultas;

public class ConsultaInternadoRequest {
    private String pacienteCpf;
    private String medicoCpf;
    private String conduta;
    private String evolucao;
    private String historicoExames;
    private String dataConsulta;

    // Getters and setters

    public String getPacienteCpf() {
        return pacienteCpf;
    }

    public void setPacienteCpf(String pacienteCpf) {
        this.pacienteCpf = pacienteCpf;
    }

    public String getMedicoCpf() {
        return medicoCpf;
    }

    public void setMedicoCpf(String medicoCpf) {
        this.medicoCpf = medicoCpf;
    }

    public String getConduta() {
        return conduta;
    }

    public void setConduta(String conduta) {
        this.conduta = conduta;
    }

    public String getEvolucao() {
        return evolucao;
    }

    public void setEvolucao(String evolucao) {
        this.evolucao = evolucao;
    }

    public String gethistoricoExames() {
        return historicoExames;
    }

    public void sethistoricoExames(String historicoExames) {
        this.historicoExames = historicoExames;
    }

    public String getDataConsulta() {
        return dataConsulta;
    }

    public void setDataConsulta(String dataConsulta) {
        this.dataConsulta = dataConsulta;
    }
}
