package com.hospital.hospital.models;
import java.sql.Date;
public class ConsultaInternado {
    public Date data_realizacao;
    public int fk_registro_urgencia_codigo;
    public String fk_medico_cpf;
    public String fk_paciente_internado_cpf;

    public ConsultaInternado(Date data_realizacao, int fk_registro_urgencia_codigo, String fk_medico_cpf, String fk_paciente_internado_cpf){
        this.data_realizacao = data_realizacao;
        this.fk_registro_urgencia_codigo = fk_registro_urgencia_codigo;
        this.fk_medico_cpf = fk_medico_cpf;
        this.fk_paciente_internado_cpf = fk_paciente_internado_cpf;
    }

    public Date getDataRealizacao(){
        return data_realizacao;
    }

    public void setDataRealizacao(Date data_realizacao){
        this.data_realizacao = data_realizacao;
    }

    public int getRegistroUrgenciaCodigo(){
        return fk_registro_urgencia_codigo;
    }

    public void setRegistroUrgenciaCodigo(int fk_registro_urgencia_codigo){
        this.fk_registro_urgencia_codigo = fk_registro_urgencia_codigo;
    }

    public String getMedicoCpf(){
        return fk_medico_cpf;
    }

    public void setMedicoCpf(String fk_medico_cpf){
        this.fk_medico_cpf = fk_medico_cpf;
    }

    public String getPacienteInternadoCpf(){
        return fk_paciente_internado_cpf;
    }

    public void setPacienteInternadoCpf(String fk_paciente_internado_cpf){
        this.fk_paciente_internado_cpf = fk_paciente_internado_cpf;
    }

    
}
