package com.hospital.hospital.repository;

import com.hospital.hospital.models.DTOs.MonitoraBackupDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
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
}
