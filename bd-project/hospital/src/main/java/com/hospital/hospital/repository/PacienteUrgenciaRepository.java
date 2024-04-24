package com.hospital.hospital.repository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

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

    public void deletePacient(PacienteUrgencia paciente){
        jdbcTemplate.update("delete from paciente_urgencia where fk_paciente_cpf = ?", paciente.getPacienteCpf());
    }

    public void updatePacient(PacienteUrgencia paciente){
        jdbcTemplate.update("update paciente_urgencia set nivel_triagem = ? where fk_paciente_cpf = ?", paciente.getNivelTriagem(), paciente.getPacienteCpf());
    }

    
}
