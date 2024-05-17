package com.hospital.hospital.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.hospital.hospital.models.DashBoardDTO;
import java.util.List;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class DashBoardRepository {
     @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<DashBoardDTO> getLatestConsultations() {
        String sql = "SELECT 'Urgency' AS type, cu.data_realizacao AS date, m.nome AS doctor, p.nome AS patient " +
                     "FROM consulta_urgencia cu " +
                     "JOIN medico m ON cu.fk_medico_cpf = m.cpf " +
                     "JOIN paciente_urgencia pu ON cu.fk_paciente_urgencia_cpf = pu.fk_paciente_cpf " +
                     "JOIN paciente p ON pu.fk_paciente_cpf = p.cpf " +
                     "UNION " +
                     "SELECT 'Interned' AS type, ci.data_realizacao AS date, m.nome AS doctor, p.nome AS patient " +
                     "FROM consulta_internado ci " +
                     "JOIN medico m ON ci.fk_medico_cpf = m.cpf " +
                     "JOIN paciente_internado pi ON ci.fk_paciente_internado_cpf = pi.fk_paciente_cpf " +
                     "JOIN paciente p ON pi.fk_paciente_cpf = p.cpf " +
                     "ORDER BY date DESC " +
                     "LIMIT 10";

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new DashBoardDTO(
                        rs.getString("type"),
                        rs.getDate("date"),
                        rs.getString("doctor"),
                        rs.getString("patient")
                )
        );
    }
    
}
