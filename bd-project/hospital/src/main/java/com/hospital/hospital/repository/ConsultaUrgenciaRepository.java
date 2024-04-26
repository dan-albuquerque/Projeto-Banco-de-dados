package com.hospital.hospital.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import com.hospital.hospital.models.consultas.ConsultaUrgencia;
import org.springframework.jdbc.core.RowMapper;

@Repository
public class ConsultaUrgenciaRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertConsultaUrgencia(ConsultaUrgencia consultaUrgencia) {
        jdbcTemplate.update("insert into  consulta_urgencia (fk_medico_cpf, fk_paciente_urgencia_cpf, data_realizacao, fk_registro_urgencia_codigo)  values  (?, ?, ?, ?);", 
                            consultaUrgencia.getMedicoCpf(),
                            consultaUrgencia.getPacienteUrgenciaCpf(),
                            consultaUrgencia.getDataRealizacao(),
                            consultaUrgencia.getRegistroUrgenciaCodigo());
    }

    public List<ConsultaUrgencia> selectAllConsultaUrgencias() {
        return jdbcTemplate.query("SELECT * FROM consulta_urgencia", consultaUrgenciaMapper);
    }

    public ConsultaUrgencia selectConsultaUrgencia(String medicoCpf, String pacienteUrgenciaCpf, 
                                                    int registroUrgenciaCodigo) {
        return jdbcTemplate.queryForObject("SELECT * FROM consulta_urgencia WHERE fk_medico_cpf = ? AND fk_paciente_urgencia_cpf = ? AND fk_registro_urgencia_codigo = ?",new Object[]{medicoCpf, pacienteUrgenciaCpf, registroUrgenciaCodigo},consultaUrgenciaMapper);
    }

    private RowMapper<ConsultaUrgencia> consultaUrgenciaMapper = (rs, rowNum) -> {
        ConsultaUrgencia consultaUrgencia = new ConsultaUrgencia(
            rs.getDate("data_realizacao"),
            rs.getInt("fk_registro_urgencia_codigo"),
            rs.getString("fk_medico_cpf"),
            rs.getString("fk_paciente_urgencia_cpf")
        );
        return consultaUrgencia;
    };

    public void deleteConsultaUrgencia(ConsultaUrgencia consultaUrgencia) {
        jdbcTemplate.update("DELETE FROM consulta_urgencia WHERE fk_medico_cpf = ? AND fk_paciente_urgencia_cpf = ? AND fk_registro_urgencia_codigo = ?",
                            consultaUrgencia.getMedicoCpf(),
                            consultaUrgencia.getPacienteUrgenciaCpf(),
                            consultaUrgencia.getRegistroUrgenciaCodigo());
    }

    //so da pra alterar a data?
    public void updateConsultaUrgencia(ConsultaUrgencia consultaUrgencia) {
        jdbcTemplate.update("UPDATE consulta_urgencia SET data_realizacao = ? WHERE fk_medico_cpf = ? AND fk_paciente_urgencia_cpf = ? AND fk_registro_urgencia_codigo = ?",
                            consultaUrgencia.getDataRealizacao(),
                            consultaUrgencia.getMedicoCpf(),
                            consultaUrgencia.getPacienteUrgenciaCpf(),
                            consultaUrgencia.getRegistroUrgenciaCodigo());
    }

}
