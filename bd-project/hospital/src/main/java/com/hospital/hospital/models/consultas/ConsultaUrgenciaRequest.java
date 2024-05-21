package com.hospital.hospital.models.consultas;

public class ConsultaUrgenciaRequest {
    private String pacienteCpf;
    private String medicoCpf;
    private String conduta;
    private String historicoDoenca;
    private String exameFisico;
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

    public String getHistoricoDoenca() {
        return historicoDoenca;
    }

    public void setHistoricoDoenca(String historicoDoenca) {
        this.historicoDoenca = historicoDoenca;
    }

    public String getExameFisico() {
        return exameFisico;
    }

    public void setExameFisico(String exameFisico) {
        this.exameFisico = exameFisico;
    }

    public String getDataConsulta() {
        return dataConsulta;
    }

    public void setDataConsulta(String dataConsulta) {
        this.dataConsulta = dataConsulta;
    }
}
