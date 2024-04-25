package com.hospital.hospital.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import com.hospital.hospital.models.relacoes.Examina;
import java.util.List;

@Repository
public class ExaminaRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertExamina(Examina examina){
        jdbcTemplate.update("insert into examina(fk_medico_cpf, fk_paciente_internado_cpf) values(?, ?)", examina.getMedicoCpf(), examina.getPacienteInternadoCpf());
    }
    
    public List<Examina> selectExaminas() {
        return jdbcTemplate.query("SELECT * FROM examina", examinaMapper);
    }

    private RowMapper<Examina> examinaMapper = (rs, rowNum) ->
    {
        Examina examina = new Examina();
        examina.setMedicoCpf(rs.getString("fk_medico_cpf"));
        examina.setPacienteInternadoCpf(rs.getString("fk_paciente_internado_cpf"));
        return examina;
    };

    public void updateExamina(String cpfMedico, String cpfPaciente){
        jdbcTemplate.update("update examina set fk_medico_cpf = ?, fk_paciente_internado_cpf = ? where fk_medico_cpf = ? and fk_paciente_internado_cpf = ?", cpfMedico, cpfPaciente);
    }

    public void deleteExamina(String cpfMedico, String cpfPaciente){
        jdbcTemplate.update("delete from examina where fk_medico_cpf = ? and fk_paciente_internado_cpf = ?", cpfMedico, cpfPaciente);
    }

    public Examina selectExamina(String cpfMedico, String cpfPaciente){
        return jdbcTemplate.queryForObject("select * from examina where fk_medico_cpf = ? and fk_paciente_internado_cpf = ?", examinaMapper, cpfMedico, cpfPaciente);
    }
    
}
