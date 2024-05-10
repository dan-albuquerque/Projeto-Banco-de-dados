package com.hospital.hospital.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

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

    public List<Monitora> selectMonitoraByIntern(String fk_cpf_interno) {
        String sql = "select m.*, p.nome from monitora m join paciente p on p.cpf = m.fk_cpf_paciente where m.fk_cpf_interno = ?";

        return jdbcTemplate.query(sql, new RowMapper<Monitora>() {
            @Override
            public Monitora mapRow(ResultSet rs, int rowNum) throws SQLException {
                Monitora monitora = new Monitora(null, null, null);
                monitora.setfk_paciente_cpf(rs.getString("fk_cpf_paciente"));
                monitora.setfk_interno_cpf(rs.getString("fk_cpf_interno"));
                monitora.setNomePaciente(rs.getString("nome"));
                return monitora;
            }
        }, fk_cpf_interno);
    }
}