package com.hospital.hospital.repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.hospital.hospital.models.relacoes.Monitora;

import org.springframework.jdbc.core.RowMapper;
public class MonitoraRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void insertMonitora(Monitora monitora){
        jdbcTemplate.update("insert into monitora(fk_cpf_interno,fk_cpf_paciente) values(?, ?)", monitora.getCpfInterno(), monitora.getCpfPaciente());
    }

    public List<Monitora> selectMonitoras() {
        return jdbcTemplate.query("SELECT * FROM monitora", monitoraMapper);
    }

    private RowMapper<Monitora> monitoraMapper = (rs, rowNum) ->
    {
        Monitora monitora = new Monitora();
        monitora.setCpfInterno(rs.getString("fk_cpf_interno"));
        monitora.setCpfInterno(rs.getString("fk_cpf_paciente"));
        return monitora;
    };

    
    
}
