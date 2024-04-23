package com.hospital.hospital.repository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.hospital.hospital.models.pacientes.Paciente;

import org.springframework.jdbc.core.RowMapper;

import org.springframework.stereotype.Repository;

@Repository
public class PacientRepository {

    // this.nome = nome;
    //     this.cpf = cpf;
    //     this.telefone_residencial = telefone_residencial;
    //     this.telefone_pessoal = telefone_pessoal;
    //     this.cidade = cidade;
    //     this.bairro = bairro;
    //     this.rua = rua;
    //     this.numero = numero;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void insertPacient(Paciente paciente){
        jdbcTemplate.update("insert into paciente(cpf,telefone_residencial,telefone_pessoal,cidade,bairro,rua) values(?, ?, ?, ?, ?, ?)", paciente.getCpf(), paciente.getTelefoneResidencial(), paciente.getTelefonePessoal(), paciente.getCidade(), paciente.getBairro(), paciente.getRua());
    }

    public List<Paciente> selectPacients() {
        return jdbcTemplate.query("SELECT * FROM paciente", pacienteMapper);
    }

    private RowMapper<Paciente> pacienteMapper = (rs, rowNum) ->
    {
        Paciente paciente = new Paciente();
        paciente.setNome(rs.getString("nome"));
        paciente.setCpf(rs.getString("cpf"));
        paciente.setTelefoneResidencial(rs.getString("telefone_residencial"));
        paciente.setTelefonePessoal(rs.getString("telefone_pessoal"));
        paciente.setCidade(rs.getString("cidade"));
        paciente.setBairro(rs.getString("bairro"));
        paciente.setRua(rs.getString("rua"));
        paciente.setNumero(rs.getInt("numero"));

        return paciente;
    };
    
}
