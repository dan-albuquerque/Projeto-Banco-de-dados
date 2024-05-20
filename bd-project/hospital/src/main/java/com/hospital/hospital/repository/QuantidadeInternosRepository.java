package com.hospital.hospital.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.hospital.hospital.models.DTOs.QuantidadeInternosDTO;

@Repository
public class QuantidadeInternosRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public QuantidadeInternosDTO getInternCount() {
        String sql = "SELECT COUNT(*) AS internCount FROM interno";
        System.out.println(sql);

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> new QuantidadeInternosDTO(
                rs.getInt("internCount")));
    }
}
