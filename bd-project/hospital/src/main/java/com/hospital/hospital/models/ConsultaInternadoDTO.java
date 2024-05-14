package com.hospital.hospital.models;
import java.util.Date;

public class ConsultaInternadoDTO {
    private Date dataRealizacao;
    private String pacienteNome;
    private String medicoNome;

    public ConsultaInternadoDTO(Date dataRealizacao, String pacienteNome, String medicoNome) {
        this.dataRealizacao = dataRealizacao;
        this.pacienteNome = pacienteNome;
        this.medicoNome = medicoNome;
    }

    public Date getDataRealizacao() {
        return dataRealizacao;
    }

    public void setDataRealizacao(Date dataRealizacao) {
        this.dataRealizacao = dataRealizacao;
    }

    public String getPacienteNome() {
        return pacienteNome;
    }

    public void setPacienteNome(String pacienteNome) {
        this.pacienteNome = pacienteNome;
    }

    public String getMedicoNome() {
        return medicoNome;
    }

    public void setMedicoNome(String medicoNome) {
        this.medicoNome = medicoNome;
    }
}

