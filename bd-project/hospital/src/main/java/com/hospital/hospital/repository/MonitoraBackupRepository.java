package com.hospital.hospital.repository;

import com.hospital.hospital.models.DTOs.MonitoraBackupDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MonitoraBackupRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<MonitoraBackupDTO> selectAll() {
        String sql = 
            "SELECT p.nome AS nomePaciente, i.nome AS nomeInterno, b.deleted_at " +
            "FROM backup_monitora b " +
            "JOIN paciente p ON b.fk_cpf_paciente = p.cpf " +
            "JOIN interno i ON b.fk_cpf_interno = i.cpf";

        return jdbcTemplate.query(sql, (rs, rowNum) -> 
            new MonitoraBackupDTO(
                rs.getString("nomePaciente"),
                rs.getString("nomeInterno"),
                rs.getTimestamp("deleted_at").toLocalDateTime()
            )
        );
    }

    public List<MonitoraBackupDTO> selectByIternName(String nomeInterno) {
        String sql =  
            "SELECT p.nome AS nomePaciente, i.nome AS nomeInterno, b.deleted_at " +
            "FROM backup_monitora b " +
            "JOIN paciente p ON b.fk_cpf_paciente = p.cpf " +
            "JOIN interno i ON b.fk_cpf_interno = i.cpf " +
            "WHERE i.nome LIKE ?";

        System.out.println(sql + " " + nomeInterno);

        return jdbcTemplate.query(sql, new RowMapper<MonitoraBackupDTO>() {
            @Override
            public MonitoraBackupDTO mapRow(java.sql.ResultSet rs, int rowNum) throws java.sql.SQLException{
                return new MonitoraBackupDTO(
                    rs.getString("nomePaciente"),
                    rs.getString("nomeInterno"),
                    rs.getTimestamp("deleted_at").toLocalDateTime()
                );
            }
        }, "%" + nomeInterno + "%"); 
    }
}
