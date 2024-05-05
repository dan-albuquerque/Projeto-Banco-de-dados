package com.hospital.hospital.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import com.hospital.hospital.models.consultas.ConsultaInternado;
import org.springframework.jdbc.core.RowMapper;

@Repository
public class ConsultaInternadoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertConsultaInternado(ConsultaInternado consultaInternado) {
        jdbcTemplate.update(
                "insert into  consulta_internado (fk_medico_cpf, fk_paciente_internado_cpf, data_realizacao, fk_registro_internado_codigo)  values  (?, ?, ?, ?);",
                consultaInternado.getMedicoCpf(),
                consultaInternado.getPacienteInternadoCpf(),
                consultaInternado.getDataRealizacao(),
                consultaInternado.getRegistroInternadoCodigo());
    }

    public List<ConsultaInternado> selectAllConsultaInternado() {
        return jdbcTemplate.query("SELECT * FROM consulta_internado", consultaInternadoMapper);
    }

    public ConsultaInternado selectConsultaInternado(int fk_registro_urgencia_codigo,
            String fk_medico_cpf,
            String fk_paciente_internado_cpf) {
        return jdbcTemplate.queryForObject(
                "SELECT * FROM consulta_internado WHERE fk_registro_internado_codigo = ? AND fk_medico_cpf = ? AND fk_paciente_internado_cpf = ?",
                consultaInternadoMapper,
                fk_registro_urgencia_codigo,
                fk_medico_cpf,
                fk_paciente_internado_cpf);
    }

    private RowMapper<ConsultaInternado> consultaInternadoMapper = (rs, rowNum) -> {
        ConsultaInternado consultaInternado = new ConsultaInternado(
                rs.getDate("data_realizacao"),
                rs.getInt("fk_registro_internado_codigo"),
                rs.getString("fk_medico_cpf"),
                rs.getString("fk_paciente_internado_cpf"));
        return consultaInternado;
    };

    public void deleteConsultaInternado(int fk_registro_internado_codigo,
            String fk_medico_cpf,
            String fk_paciente_internado_cpf) {
        jdbcTemplate.update(
                "DELETE FROM consulta_internado WHERE fk_registro_internado_codigo = ? AND fk_medico_cpf = ? AND fk_paciente_internado_cpf = ?",
                fk_registro_internado_codigo,
                fk_medico_cpf,
                fk_paciente_internado_cpf);
    }

    public List<ConsultaInternado> selectConsultaInternadoByPaciente(String cpf) {
        return jdbcTemplate.query("SELECT * FROM consulta_internado WHERE fk_paciente_internado_cpf = ?", consultaInternadoMapper, cpf);
    }

    public  List<ConsultaInternado> selectConsultaInternadoByMedico(String cpf) {
        return jdbcTemplate.query("SELECT * FROM consulta_internado WHERE fk_medico_cpf = ?", consultaInternadoMapper, cpf);
    }
}
