package com.hospital.hospital.repository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.hospital.hospital.models.DTOs.PacienteUrgenciaDTO;
import com.hospital.hospital.models.pacientes.PacienteUrgencia;

import org.springframework.jdbc.core.RowMapper;

import org.springframework.stereotype.Repository;

@Repository
public class PacienteUrgenciaRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void insertPacient(PacienteUrgencia paciente){
        jdbcTemplate.update("insert into paciente_urgencia(fk_paciente_cpf,nivel_triagem) values(?, ?)", paciente.getPacienteCpf(), paciente.getNivelTriagem());
    }

    public List<PacienteUrgencia> selectPacients() {
        return jdbcTemplate.query("SELECT * FROM paciente_urgencia", pacienteMapper);
    }

    private RowMapper<PacienteUrgencia> pacienteMapper = (rs, rowNum) ->
    {
        PacienteUrgencia paciente = new PacienteUrgencia();
        paciente.setPacienteCpf(rs.getString("fk_paciente_cpf"));
        paciente.setNivelTriagem(rs.getInt("nivel_triagem"));

        return paciente;
    };

    public void deletePacient(String cpf){
        jdbcTemplate.update("delete from paciente_urgencia where fk_paciente_cpf = ?", cpf);
    }

    public void updatePacient(String cpf, PacienteUrgencia paciente){
        jdbcTemplate.update("update paciente_urgencia set nivel_triagem = ? where fk_paciente_cpf = ?", paciente.getNivelTriagem(), cpf);
    }
    
    public PacienteUrgencia selectPacient(String cpf){
        return jdbcTemplate.queryForObject("select * from paciente_urgencia where fk_paciente_cpf = ?", pacienteMapper, cpf);
    }

    public List<PacienteUrgenciaDTO> findTop10GravePatients() {
        String sql = 
            "SELECT p.cpf, p.nome, pu.nivel_triagem " +
            "FROM paciente p " +
            "JOIN paciente_urgencia pu ON p.cpf = pu.fk_paciente_cpf " +
            "ORDER BY pu.nivel_triagem DESC " +
            "LIMIT 10";
        
        return jdbcTemplate.query(sql, (rs, rowNum) -> 
            new PacienteUrgenciaDTO(
                rs.getString("cpf"),
                rs.getString("nome"),
                rs.getInt("nivel_triagem")
            )
        );
    }
    
}
