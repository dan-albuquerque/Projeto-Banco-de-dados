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
        jdbcTemplate.update("INSERT INTO consulta_internado (fk_medico_cpf, fk_paciente_internado_cpf, data_realizacao) VALUES (?, ?, ?)", 
            consultaInternado.getMedicoCpf(), 
            consultaInternado.getPacienteInternadoCpf(), 
            consultaInternado.getDataRealizacao());
    }

    public List<ConsultaInternado> selectConsultaInternados() {
        return jdbcTemplate.query("SELECT * FROM consulta_internado", consultaInternadoMapper);

        }

        private RowMapper<ConsultaInternado> consultaInternadoMapper = (rs, rowNum) -> {
            ConsultaInternado consultaInternado = new ConsultaInternado(
                rs.getDate("data_realizacao"),
                rs.getInt("fk_registro_internado_codigo"),
                rs.getString("fk_medico_cpf"),
                rs.getString("fk_paciente_internado_cpf")
            );
            return consultaInternado;
        };
        
        public void deleteConsultaInternado(ConsultaInternado consultaInternado) {
            jdbcTemplate.update("DELETE FROM consulta_internado WHERE fk_medico_cpf = ? AND fk_paciente_internado_cpf = ? AND data_realizacao = ?",
                consultaInternado.getMedicoCpf(), consultaInternado.getPacienteInternadoCpf(), consultaInternado.getDataRealizacao());
        }
        
        public void updateConsultaInternado(ConsultaInternado consultaInternado) {
            jdbcTemplate.update("UPDATE consulta_internado SET data_realizacao = ? WHERE fk_medico_cpf = ? AND fk_paciente_internado_cpf = ?",
                consultaInternado.getDataRealizacao(), consultaInternado.getMedicoCpf(), consultaInternado.getPacienteInternadoCpf());
        }

        public ConsultaInternado selectConsultaInternado(String fk_medico_cpf, String fk_paciente_internado_cpf, java.sql.Date data_realizacao) {
            return jdbcTemplate.queryForObject("SELECT * FROM consulta_internado WHERE fk_medico_cpf = ? AND fk_paciente_internado_cpf = ? AND data_realizacao = ?", consultaInternadoMapper, fk_medico_cpf, fk_paciente_internado_cpf, data_realizacao);
        }
    }
        