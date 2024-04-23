package com.hospital.hospital.repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.hospital.hospital.models.pacientes.PacienteInternado;

import org.springframework.jdbc.core.RowMapper;
public class PacienteInternadoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void insertPacienteInternado(PacienteInternado pacienteInternado){
        jdbcTemplate.update("insert into paciente_internado(sala, fk_paciente_cpf) values(?, ?)", pacienteInternado.getSala(), pacienteInternado.getPacienteCpf());
    }

    public List<PacienteInternado> selectPacientesInternados() {
        return jdbcTemplate.query("SELECT * FROM paciente_internado", pacienteInternadoMapper);
    }

    private RowMapper<PacienteInternado> pacienteInternadoMapper = (rs, rowNum) ->
    {
        PacienteInternado pacienteInternado = new PacienteInternado();
        pacienteInternado.setPacienteCpf(rs.getString("fk_paciente_cpf"));
        pacienteInternado.setSala(rs.getInt("sala"));
        return pacienteInternado;
    };
    
}