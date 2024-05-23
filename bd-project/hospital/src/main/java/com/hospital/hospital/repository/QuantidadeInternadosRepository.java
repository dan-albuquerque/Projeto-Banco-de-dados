package com.hospital.hospital.repository;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import com.hospital.hospital.models.DTOs.QuantidadeInternadosDTO;
import org.springframework.jdbc.core.JdbcTemplate;

@Repository
public class QuantidadeInternadosRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public QuantidadeInternadosDTO getInternCount() {
        String sql = "SELECT COUNT(*) AS internCount FROM interno";
        System.out.println(sql);
        
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> new QuantidadeInternadosDTO(
                rs.getInt("internCount")));
    }

    
    
    
}
