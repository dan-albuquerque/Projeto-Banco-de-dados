package com.hospital.hospital.models;

public class Examina {
    public String fk_medico_cpf;
    public String fk_paciente_internado_cpf;

    public Examina(String fk_medico_cpf, String fk_paciente_internado_cpf){
        this.fk_medico_cpf = fk_medico_cpf;
        this.fk_paciente_internado_cpf = fk_paciente_internado_cpf;
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
