package com.hospital.hospital.models.elenco;

public class Medico {
    public String cpf;
    public int rqe;
    public String nome;
    public String senha;
    public String especialidade;
    public String crm;
    public boolean ativo;
    public String fk_medico_cpf_gerente;

    public Medico(String cpf, int rqe, String nome, String senha, String especialidade, String crm,
            String fk_medico_cpf_gerente) {
        this.cpf = cpf;
        this.rqe = rqe;
        this.nome = nome;
        this.senha = senha;
        this.especialidade = especialidade;
        this.crm = crm;
        this.ativo = true;
        this.fk_medico_cpf_gerente = fk_medico_cpf_gerente;
    }

    public Medico() {
        this.fk_medico_cpf_gerente = null;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public int getRqe() {
        return rqe;
    }

    public void setRqe(int rqe) {
        this.rqe = rqe;
    }

    public String getNome() {
        return nome;

    }

    public void setNome(String nome) {
        this.nome = nome;

    }

    public String getSenha() {
        return senha;

    }

    public void setSenha(String senha) {
        this.senha = senha;

    }

    public String getEspecialidade() {
        return especialidade;

    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;

    }

    public String getCrm() {
        return crm;

    }

    public void setCrm(String crm) {
        this.crm = crm;

    }

    public String getMedicoCpfGerente() {
        return fk_medico_cpf_gerente;

    }

    public void setMedicoCpfGerente(String fk_medico_cpf_gerente) {
        this.fk_medico_cpf_gerente = fk_medico_cpf_gerente;

    }

    public boolean isAtivo() {
        return ativo;

    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;

    }
}
