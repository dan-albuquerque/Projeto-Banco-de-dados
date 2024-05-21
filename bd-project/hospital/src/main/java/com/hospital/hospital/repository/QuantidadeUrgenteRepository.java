package com.hospital.hospital.repository;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hospital.hospital.models.DTOs.QuantidadeCasosUrgenciaDTO;
import org.springframework.jdbc.core.JdbcTemplate;
@Repository
public class QuantidadeUrgenteRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public QuantidadeCasosUrgenciaDTO getUrgenciaCount() {
        String sql = "SELECT COUNT(*) AS urgenciaCount FROM paciente_urgencia";
        System.out.println(sql);

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> new QuantidadeCasosUrgenciaDTO(
                rs.getInt("urgenciaCount")));
    }
    
}
