package com.hospital.hospital.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;

import com.hospital.hospital.models.consultas.ConsultaUrgencia;
import org.springframework.jdbc.core.RowMapper;

import com.hospital.hospital.models.DTOs.ConsultaUrgenciaDTO;

@Repository
public class ConsultaUrgenciaRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertConsultaUrgencia(ConsultaUrgencia consultaUrgencia) {
        jdbcTemplate.update(
                "insert into  consulta_urgencia (fk_medico_cpf, fk_paciente_cpf, data_realizacao, fk_registro_urgencia_codigo)  values  (?, ?, ?, ?);",
                consultaUrgencia.getMedicoCpf(),
                consultaUrgencia.getPacienteUrgenciaCpf(),
                consultaUrgencia.getDataRealizacao(),
                consultaUrgencia.getRegistroUrgenciaCodigo());
    }

    public List<ConsultaUrgencia> selectAllConsultaUrgencias() {
        return jdbcTemplate.query("SELECT * FROM consulta_urgencia", consultaUrgenciaMapper);
    }

    public ConsultaUrgencia selectConsultaUrgencia(int fk_registro_urgencia_codigo,
            String fk_medico_cpf,
            String fk_paciente_cpf) {
        return jdbcTemplate.queryForObject(
                "SELECT * FROM consulta_urgencia WHERE fk_registro_urgencia_codigo = ? AND fk_medico_cpf = ? AND fk_paciente_cpf = ?",
                consultaUrgenciaMapper,
                fk_registro_urgencia_codigo,
                fk_medico_cpf,
                fk_paciente_cpf);
    }

    private RowMapper<ConsultaUrgencia> consultaUrgenciaMapper = (rs, rowNum) -> {
        ConsultaUrgencia consultaUrgencia = new ConsultaUrgencia(
                rs.getDate("data_realizacao"),
                rs.getInt("fk_registro_urgencia_codigo"),
                rs.getString("fk_medico_cpf"),
                rs.getString("fk_paciente_cpf"));
        return consultaUrgencia;
    };

    public void deleteConsultaUrgencia(int fk_registro_urgencia_codigo,
            String fk_medico_cpf,
            String fk_paciente_cpf) {
        jdbcTemplate.update(
                "DELETE FROM consulta_urgencia WHERE fk_registro_urgencia_codigo = ? AND fk_medico_cpf = ? AND fk_paciente_cpf = ?",
                fk_registro_urgencia_codigo,
                fk_medico_cpf,
                fk_paciente_cpf);
    }

    public List<ConsultaUrgencia> selectConsultaUrgenciaByPaciente(String cpf) {
        return jdbcTemplate.query("SELECT * FROM consulta_urgencia WHERE fk_paciente_cpf = ?",
                consultaUrgenciaMapper, cpf);
    }

    public List<ConsultaUrgencia> selectConsultaUrgenciaByMedico(String cpf) {
        return jdbcTemplate.query("SELECT * FROM consulta_urgencia WHERE fk_medico_cpf = ?", consultaUrgenciaMapper,
                cpf);
    }

    private RowMapper<ConsultaUrgenciaDTO> consultaUrgenciaDTOMapper = (rs, rowNum) -> {
        return new ConsultaUrgenciaDTO(
                rs.getDate("data_realizacao"),
                rs.getString("paciente_nome"),
                rs.getString("medico_nome"));
    };

    @SuppressWarnings("deprecation")
    public List<ConsultaUrgenciaDTO> selectConsultaUrgenciaDTOByPaciente(String nomePaciente) {
        return jdbcTemplate.query(
                "SELECT c.data_realizacao, p.nome as paciente_nome, m.nome as medico_nome FROM consulta_urgencia c " +
                        "INNER JOIN paciente_urgencia pi ON c.fk_paciente_cpf = pi.fk_paciente_cpf " +
                        "INNER JOIN paciente p ON p.cpf = pi.fk_paciente_cpf " +
                        "INNER JOIN medico m ON m.cpf = c.fk_medico_cpf " +
                        "WHERE p.nome LIKE ?",
                new Object[] { "%" + nomePaciente + "%" },
                consultaUrgenciaDTOMapper);
    }

    public List<ConsultaUrgenciaDTO> selectConsultaUrgenciaDTO() {
        return jdbcTemplate.query(
                "SELECT c.data_realizacao, p.nome as paciente_nome, m.nome as medico_nome FROM consulta_urgencia c " +
                        "INNER JOIN paciente p ON c.fk_paciente_cpf = p.cpf " +
                        "INNER JOIN medico m ON c.fk_medico_cpf = m.cpf",
                consultaUrgenciaDTOMapper
        );
    }

    public ConsultaUrgenciaDTO selectConsultaUrgenciaDTOById(int fk_registro_urgencia_codigo, String fk_medico_cpf, String fk_paciente_cpf) {
        return jdbcTemplate.queryForObject(
                "SELECT c.data_realizacao, p.nome as paciente_nome, m.nome as medico_nome FROM consulta_urgencia c " +
                        "INNER JOIN paciente p ON c.fk_paciente_cpf = p.cpf " +
                        "INNER JOIN medico m ON c.fk_medico_cpf = m.cpf " +
                        "WHERE c.fk_registro_urgencia_codigo = ? AND c.fk_medico_cpf = ? AND c.fk_paciente_cpf = ?",
                consultaUrgenciaDTOMapper,
                fk_registro_urgencia_codigo, fk_medico_cpf, fk_paciente_cpf
        );
    }

    public void addUrgencyConsultation(String pacienteCpf, String medicoCpf, String conduta, String historicoDoenca, String exameFisico, String dataConsulta) {
        String sql = "CALL AddUrgencyConsultation(?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, pacienteCpf, medicoCpf, conduta, historicoDoenca, exameFisico, dataConsulta);
    }    
}
