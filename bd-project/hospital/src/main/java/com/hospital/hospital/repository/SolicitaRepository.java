package com.hospital.hospital.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.hospital.hospital.models.relacoes.Solicita;

import org.springframework.jdbc.core.RowMapper;

@Repository
public class SolicitaRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertSolicita(Solicita solicita) {
        jdbcTemplate.update(
                "insert into solicita(fk_examina_medico_cpf, fk_examina_paciente_internado_cpf, fk_exame_complementar_codigo) values(?, ?, ?)",
                solicita.getMedicoCpf(), solicita.getPacienteInternadoCpf(), solicita.getExameComplementarCodigo());
    }

    public List<Solicita> selectSolicitas() {
        return jdbcTemplate.query("SELECT * FROM solicita", solicitaMapper);
    }

    public Solicita selectSolicita(String medicoCpf, String pacienteInternadoCpf, int exameComplementarCodigo) {
        return jdbcTemplate.queryForObject(
                "SELECT * FROM solicita WHERE fk_examina_medico_cpf = ? AND fk_examina_paciente_internado_cpf = ? AND fk_exame_complementar_codigo = ?",
                solicitaMapper, medicoCpf, pacienteInternadoCpf, exameComplementarCodigo);
    }

    private RowMapper<Solicita> solicitaMapper = (rs, rowNum) -> {
        Solicita solicita = new Solicita();
        solicita.setMedicoCpf(rs.getString("fk_examina_medico_cpf"));
        solicita.setPacienteInternadoCpf(rs.getString("fk_examina_paciente_internado_cpf"));
        solicita.setExameComplementarCodigo(rs.getInt("fk_exame_complementar_codigo"));
        return solicita;
    };

    public void deleteSolicita(String medicoCpf, String pacienteInternadoCpf, int exameComplementarCodigo) {
        jdbcTemplate.update(
                "delete from solicita where fk_examina_medico_cpf = ? and fk_examina_paciente_internado_cpf = ? and fk_exame_complementar_codigo = ?",
                medicoCpf, pacienteInternadoCpf, exameComplementarCodigo);
    }

    public void updateSolicita(String medicoCpf, String examinaPacienteInternadoCpf, int exameComplementarCodigo) {
        jdbcTemplate.update(
                "update solicita set fk_examina_medico_cpf = ? where fk_examina_paciente_internado_cpf = ? and fk_exame_complementar_codigo = ?",
                medicoCpf, examinaPacienteInternadoCpf, exameComplementarCodigo);
    }
}
