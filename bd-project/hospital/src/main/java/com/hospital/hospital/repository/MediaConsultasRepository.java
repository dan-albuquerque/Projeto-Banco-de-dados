package com.hospital.hospital.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.hospital.hospital.models.DTOs.MediaConsultasDTO;

@Repository
public class MediaConsultasRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String SQL = "SELECT \n" +
            "ano,\n" +
            "AVG(total_consultas) AS media_consultas\n" +
            "FROM (\n" +
            "SELECT \n" +
            "YEAR(data_realizacao) AS ano,\n" +
            "COUNT(*) AS total_consultas\n" +
            "FROM (\n" +
            "SELECT \n" +
            "data_realizacao\n" +
            "FROM consulta_urgencia\n" +
            "UNION ALL\n" +
            "SELECT \n" +
            "data_realizacao\n" +
            "FROM consulta_internado\n" +
            ") AS combined_consultas\n" +
            "GROUP BY YEAR(data_realizacao)\n" +
            ") AS subquery\n" +
            "GROUP BY ano;";

    public List<MediaConsultasDTO> getAverageConsultations() {
        return jdbcTemplate.query(SQL, (rs, rowNum) -> new MediaConsultasDTO(
                rs.getInt("ano"),
                rs.getInt("media_consultas")));
    }
}
