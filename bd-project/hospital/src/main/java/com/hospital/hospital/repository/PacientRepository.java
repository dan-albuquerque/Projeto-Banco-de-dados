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
        System.out.println(paciente.getNome());
        System.out.println(paciente.getCpf());
        System.out.println(paciente.getTelefonePessoal());
        System.out.println(paciente.getCidade());
        System.out.println(paciente.getBairro());
        System.out.println(paciente.getRua());
        System.out.println(paciente.getNumero());
        System.out.println(paciente.gettelefone_residencial());
        
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

    public void updatePacient(Paciente paciente){
        jdbcTemplate.update("update paciente set nome = ?, telefone_residencial = ?, telefone_pessoal = ?, cidade = ?, bairro = ?, rua = ?, numero = ? where cpf = ?", paciente.getNome(), paciente.getTelefoneResidencial(), paciente.getTelefonePessoal(), paciente.getCidade(), paciente.getBairro(), paciente.getRua(), paciente.getNumero(), paciente.getCpf());
    }

    public void deletePacient(Paciente paciente){
        jdbcTemplate.update("delete from paciente where cpf = ?", paciente.getCpf());
    }
    
}
