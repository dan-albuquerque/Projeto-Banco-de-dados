package com.hospital.hospital.repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.hospital.hospital.models.pacientes.PacienteInternado;

import org.springframework.jdbc.core.RowMapper;
@Repository
public class PacienteInternadoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void insertPacienteInternado(PacienteInternado pacienteInternado){
        jdbcTemplate.update("insert into paciente_internado(fk_paciente_cpf, sala) values(?, ?)", pacienteInternado.getfk_paciente_cpf(), pacienteInternado.getSala());
           
    }

    public List<PacienteInternado> selectPacientesInternados() {
        return jdbcTemplate.query("SELECT * FROM paciente_internado", pacienteInternadoMapper);
    }

    private RowMapper<PacienteInternado> pacienteInternadoMapper = (rs, rowNum) ->
    {
        PacienteInternado pacienteInternado = new PacienteInternado();
        pacienteInternado.setSala(rs.getInt("sala"));
        pacienteInternado.setfk_paciente_cpf(rs.getString("fk_paciente_cpf"));
        return pacienteInternado;
    };

    public void deletePacienteInternado(String cpf) {
        jdbcTemplate.update("delete from paciente_internado where fk_paciente_cpf = ?", cpf);
    }

    
    public void updatePacienteInternado(String cpf, PacienteInternado pacienteInternado) {
        jdbcTemplate.update(
            "update paciente_internado set sala = ? where fk_paciente_cpf = ?",
            pacienteInternado.getSala(),
            cpf
        );
    }
    public PacienteInternado selectPacienteInternado(String cpf){
        return jdbcTemplate.queryForObject("select * from paciente_internado where fk_paciente_cpf = ?", pacienteInternadoMapper, cpf);
    }
    
}
