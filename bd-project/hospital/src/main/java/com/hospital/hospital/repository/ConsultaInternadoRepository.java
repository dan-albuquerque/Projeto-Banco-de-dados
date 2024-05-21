package com.hospital.hospital.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;

import com.hospital.hospital.models.DTOs.ConsultaInternadoDTO;
import com.hospital.hospital.models.consultas.ConsultaInternado;

import org.springframework.jdbc.core.RowMapper;
@Repository
public class ConsultaInternadoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertConsultaInternado(ConsultaInternado consultaInternado) {
        jdbcTemplate.update(
                "insert into  consulta_internado (fk_medico_cpf, fk_paciente_cpf, data_realizacao, fk_registro_internado_codigo)  values  (?, ?, ?, ?);",
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
            String fk_paciente_cpf) {
        return jdbcTemplate.queryForObject(
                "SELECT * FROM consulta_internado WHERE fk_registro_internado_codigo = ? AND fk_medico_cpf = ? AND fk_paciente_cpf = ?",
                consultaInternadoMapper,
                fk_registro_urgencia_codigo,
                fk_medico_cpf,
                fk_paciente_cpf);
    }

    private RowMapper<ConsultaInternado> consultaInternadoMapper = (rs, rowNum) -> {
        ConsultaInternado consultaInternado = new ConsultaInternado(
                rs.getDate("data_realizacao"),
                rs.getInt("fk_registro_internado_codigo"),
                rs.getString("fk_medico_cpf"),
                rs.getString("fk_paciente_cpf"));
        return consultaInternado;
    };

    private RowMapper<ConsultaInternadoDTO> consultaInternadoDTOMapper = (rs, rowNum) -> {
        return new ConsultaInternadoDTO(
            rs.getDate("data_realizacao"),
            rs.getString("paciente_nome"),
            rs.getString("medico_nome")
        );
    };

    public void deleteConsultaInternado(int fk_registro_internado_codigo,
            String fk_medico_cpf,
            String fk_paciente_cpf) {
        jdbcTemplate.update(
                "DELETE FROM consulta_internado WHERE fk_registro_internado_codigo = ? AND fk_medico_cpf = ? AND fk_paciente_cpf = ?",
                fk_registro_internado_codigo,
                fk_medico_cpf,
                fk_paciente_cpf);
    }

    public List<ConsultaInternado> selectConsultaInternadoByPaciente(String cpf) {
        return jdbcTemplate.query("SELECT * FROM consulta_internado WHERE fk_paciente_cpf = ?", consultaInternadoMapper, cpf);
    }

    public  List<ConsultaInternado> selectConsultaInternadoByMedico(String cpf) {
        return jdbcTemplate.query("SELECT * FROM consulta_internado WHERE fk_medico_cpf = ?", consultaInternadoMapper, cpf);
    }

    @SuppressWarnings("deprecation")
    public List<ConsultaInternadoDTO> searchByPatientName(String name) {
        return jdbcTemplate.query(
            "SELECT c.data_realizacao, p.nome as paciente_nome, m.nome as medico_nome FROM consulta_internado c " +
            "INNER JOIN paciente pi ON c.fk_paciente_cpf = pi.fk_paciente_cpf " +
            "INNER JOIN paciente p ON p.cpf = pi.fk_paciente_cpf " +
            "INNER JOIN medico m ON m.cpf = c.fk_medico_cpf " +
            "WHERE p.nome LIKE ?", 
            new Object[] { "%" + name + "%" }, 
            consultaInternadoDTOMapper
        );
    }

    public ConsultaInternadoDTO selectConsultaInternadoDTOById(int fk_registro_internado_codigo, String fk_medico_cpf, String fk_paciente_cpf) {
        return jdbcTemplate.queryForObject(
                "SELECT c.data_realizacao, p.nome as paciente_nome, m.nome as medico_nome FROM consulta_internado c " +
                        "INNER JOIN paciente p ON c.fk_paciente_cpf = p.cpf " +
                        "INNER JOIN medico m ON c.fk_medico_cpf = m.cpf " +
                        "WHERE c.fk_registro_internado_codigo = ? AND c.fk_medico_cpf = ? AND c.fk_paciente_cpf = ?",
                consultaInternadoDTOMapper,
                fk_registro_internado_codigo, fk_medico_cpf, fk_paciente_cpf
        );
    }
}
