package com.hospital.hospital.models.relacoes;

public class Solicita {
    public String fk_examina_medico_cpf;
    public String fk_examina_paciente_internado_cpf;
    public int fk_exame_complementar_codigo;

    public Solicita(String fk_examina_medico_cpf, String fk_examina_paciente_internado_cpf, int fk_exame_complementar_codigo){
        this.fk_examina_medico_cpf = fk_examina_medico_cpf;
        this.fk_examina_paciente_internado_cpf = fk_examina_paciente_internado_cpf;
        this.fk_exame_complementar_codigo = fk_exame_complementar_codigo;
    }

    public Solicita(){

    }
    
    public String getMedicoCpf(){
        return fk_examina_medico_cpf;
    }

    public void setMedicoCpf(String fk_examina_medico_cpf){
        this.fk_examina_medico_cpf = fk_examina_medico_cpf;
    }

    public String getPacienteInternadoCpf(){
        return fk_examina_paciente_internado_cpf;
    }

    public void setPacienteInternadoCpf(String fk_examina_paciente_internado_cpf){
        this.fk_examina_paciente_internado_cpf = fk_examina_paciente_internado_cpf;
    }

    public int getExameComplementarCodigo(){
        return fk_exame_complementar_codigo;
    }

    public void setExameComplementarCodigo(int fk_exame_complementar_codigo){
        this.fk_exame_complementar_codigo = fk_exame_complementar_codigo;
    }


    
}
