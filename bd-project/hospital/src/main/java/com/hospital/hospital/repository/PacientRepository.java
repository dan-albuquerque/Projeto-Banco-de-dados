package com.hospital.hospital.repository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.hospital.hospital.models.pacientes.Paciente;

import org.springframework.jdbc.core.RowMapper;

import org.springframework.stereotype.Repository;

@Repository
public class PacientRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void insertPacient(Paciente paciente){
        jdbcTemplate.update("insert into paciente(cpf,nome,telefone_residencial,cidade,bairro,rua,numero,telefone_pessoal) values(?, ?, ?, ?, ?, ?, ?,?)", paciente.getCpf(), paciente.getNome(), paciente.gettelefone_residencial(), paciente.getCidade(), paciente.getBairro(), paciente.getRua(), paciente.getNumero(), paciente.gettelefone_pessoal());
        System.out.println(paciente);
    }

    public List<Paciente> selectPacients() {
        return jdbcTemplate.query("SELECT * FROM paciente", pacienteMapper);
    }

    private RowMapper<Paciente> pacienteMapper = (rs, rowNum) ->
    {
        Paciente paciente = new Paciente();
        paciente.setNome(rs.getString("nome"));
        paciente.setCpf(rs.getString("cpf"));
        paciente.settelefone_residencial(rs.getString("telefone_residencial"));
        paciente.setCidade(rs.getString("cidade"));
        paciente.setBairro(rs.getString("bairro"));
        paciente.setRua(rs.getString("rua"));
        paciente.setNumero(rs.getInt("numero"));
        paciente.settelefone_pessoal(rs.getString("telefone_pessoal"));


        return paciente;
    };

    public void deletePacient(Paciente paciente){
        jdbcTemplate.update("delete from paciente where cpf = ?", paciente.getCpf());
    }

    public void updatePacient(Paciente paciente){
        jdbcTemplate.update("update paciente set nome = ?, telefone_residencial = ?, cidade = ?, bairro = ?, rua = ?, numero = ?, telefone_pessoal = ? where cpf = ?", paciente.getNome(), paciente.gettelefone_residencial(), paciente.getCidade(), paciente.getBairro(), paciente.getRua(), paciente.getNumero(), paciente.gettelefone_pessoal(), paciente.getCpf());
    }
    
}
