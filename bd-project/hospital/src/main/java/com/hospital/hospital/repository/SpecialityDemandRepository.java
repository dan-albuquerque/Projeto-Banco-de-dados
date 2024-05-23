package com.hospital.hospital.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.hospital.hospital.models.DTOs.SpecialityDemandDTO;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class SpecialityDemandRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String SQL = "SELECT m.especialidade, COUNT(*) AS total_consultas " +
                                      "FROM ( " +
                                      "    SELECT fk_medico_cpf " +
                                      "    FROM consulta_urgencia " +
                                      "    UNION ALL " +
                                      "    SELECT fk_medico_cpf " +
                                      "    FROM consulta_internado " +
                                      ") AS consultas " +
                                      "JOIN medico m ON consultas.fk_medico_cpf = m.cpf " +
                                      "GROUP BY m.especialidade " +
                                      "ORDER BY total_consultas DESC";

    public List<SpecialityDemandDTO> findSpecialityDemand() {
        return jdbcTemplate.query(SQL, this::mapRowToSpecialityDemandDTO);
    }

    private SpecialityDemandDTO mapRowToSpecialityDemandDTO(ResultSet rs, int rowNum) throws SQLException {
        return new SpecialityDemandDTO(
                rs.getString("especialidade"),
                rs.getInt("total_consultas")
        );
    }
}