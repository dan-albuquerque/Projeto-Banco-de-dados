package com.hospital.hospital.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.hospital.hospital.models.DTOs.InternoDTO;
import com.hospital.hospital.models.relacoes.Monitora;

import org.springframework.jdbc.core.RowMapper;

@Repository
public class MonitoraRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertMonitora(Monitora monitora) {
        // System.out.println("\n\nfk_cpf_interno: " + monitora.getfk_interno_cpf() + "
        // fk_cpf_paciente: " + monitora.getfk_paciente_cpf() + "\n\n");
        jdbcTemplate.update("insert into monitora(fk_cpf_interno, fk_cpf_paciente) values(?, ?)",
                monitora.getfk_interno_cpf(), monitora.getfk_paciente_cpf());
    }

    public List<Monitora> selectMonitoras() {
        return jdbcTemplate.query("SELECT * FROM monitora", monitoraMapper);
    }

    private RowMapper<Monitora> monitoraMapper = (rs, rowNum) -> {
        Monitora monitora = new Monitora();
        monitora.setfk_paciente_cpf(rs.getString("fk_cpf_paciente"));
        monitora.setfk_interno_cpf(rs.getString("fk_cpf_interno"));
        return monitora;
    };

    public void deleteMonitora(String fk_cpf_interno, String fk_cpf_paciente) {
        jdbcTemplate.update("delete from monitora where fk_cpf_interno = ? and fk_cpf_paciente = ?", fk_cpf_interno,
                fk_cpf_paciente);
    }

    public void updateMonitora(String fk_cpf_interno, Monitora monitora) {
        jdbcTemplate.update(
                "update monitora set fk_cpf_paciente = ? where fk_cpf_interno = ?",
                monitora.getfk_paciente_cpf(),
                fk_cpf_interno);
    }

    public Monitora selectMonitora(String fk_cpf_interno, String fk_cpf_paciente) {
        return jdbcTemplate.queryForObject("select * from monitora where fk_cpf_interno = ? and fk_cpf_paciente = ?",
                monitoraMapper, fk_cpf_interno, fk_cpf_paciente);
    }

    public List<Monitora> selectMonitorasByInternoCPF(String fk_cpf_interno) {
        return jdbcTemplate.query("SELECT * FROM monitora WHERE fk_cpf_interno = ?", monitoraMapper, fk_cpf_interno);
    }

    public InternoDTO findTopInterno() {
        String sql = 
            "SELECT i.cpf, i.nome, COUNT(m.fk_cpf_paciente) AS total_pacientes " +
            "FROM interno i " +
            "JOIN monitora m ON i.cpf = m.fk_cpf_interno " +
            "GROUP BY i.cpf, i.nome " +
            "ORDER BY total_pacientes DESC " +
            "LIMIT 1";

        return jdbcTemplate.queryForObject(sql, new RowMapper<InternoDTO>() {
            @Override
            public InternoDTO mapRow(java.sql.ResultSet rs, int rowNum) throws java.sql.SQLException {
                return new InternoDTO(
                    rs.getString("cpf"),
                    rs.getString("nome"),
                    rs.getInt("total_pacientes")
                );
            }
        });
    }
}
