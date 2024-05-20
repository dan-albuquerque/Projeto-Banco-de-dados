package com.hospital.hospital.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.hospital.hospital.models.DTOs.QuantidadeMedicosDTO;

@Repository
public class QuantidadeMedicosRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public QuantidadeMedicosDTO getDoctorCount() {
        String sql = "SELECT COUNT(*) AS doctorCount FROM medico";
        System.out.println(sql);

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) ->
                new QuantidadeMedicosDTO(
                        rs.getInt("doctorCount")
                )
        );
    }
    
}
