package com.hospital.hospital.models.DTOs;
import java.util.Date;

public class ConsultaInternadoDTO {
    private Date data_realizacao;
    private String nomePaciente;
    private String nomeMedico;

    public ConsultaInternadoDTO(Date data_realizacao, String nomePaciente, String nomeMedico) {
        this.data_realizacao = data_realizacao;
        this.nomePaciente = nomePaciente;
        this.nomeMedico = nomeMedico;
    }

    public Date getdata_realizacao() {
        return data_realizacao;
    }

    public void setdata_realizacao(Date data_realizacao) {
        this.data_realizacao = data_realizacao;
    }

    public String getnomePaciente() {
        return nomePaciente;
    }

    public void setnomePaciente(String nomePaciente) {
        this.nomePaciente = nomePaciente;
    }

    public String getnomeMedico() {
        return nomeMedico;
    }

    public void setnomeMedico(String nomeMedico) {
        this.nomeMedico = nomeMedico;
    }
}

