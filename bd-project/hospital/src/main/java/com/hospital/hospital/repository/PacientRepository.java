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
    }

    public List<Paciente> selectPacients(boolean sortAlphabetically, boolean reverseOrder, boolean sortNumerically) {
        String sql;
        if (sortAlphabetically) {
            String order = reverseOrder ? "DESC" : "ASC";
            sql = "SELECT * FROM Paciente ORDER BY nome " + order;
        } else if (sortNumerically) {
            sql = "SELECT * FROM paciente ORDER BY cpf DESC";
        } else {
            sql = "SELECT * FROM Paciente";
        }
        System.out.println("comando sql: " + sql);
        return jdbcTemplate.query(sql, pacienteMapper);
    }

    public List<Paciente> searchPacients(boolean isSearch, String searchName) {
        String sql = "SELECT * FROM Paciente WHERE nome LIKE ?";
        System.out.println("comando sql: " + sql);
        return jdbcTemplate.query(sql, pacienteMapper, "%" + searchName + "%");
    }

    private RowMapper<Paciente> pacienteMapper = (rs, rowNum) -> {
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

    public void deletePacient(String cpf) {
        jdbcTemplate.update("delete from paciente where cpf = ?", cpf);
    }

    public void updatePacient(String cpf, Paciente paciente) {
        jdbcTemplate.update(
                "update paciente set nome = ?, telefone_residencial = ?, cidade = ?, bairro = ?, rua = ?, numero = ?, telefone_pessoal = ? where cpf = ?",
                paciente.getNome(),
                paciente.gettelefone_residencial(),
                paciente.getCidade(),
                paciente.getBairro(),
                paciente.getRua(),
                paciente.getNumero(),
                paciente.gettelefone_pessoal(),
                cpf);
    }

    public Paciente selectPacient(String cpf) {
        return jdbcTemplate.queryForObject("select * from paciente where cpf = ?", pacienteMapper, cpf);
    }

}
