package com.hospital.hospital.repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.hospital.hospital.models.relacoes.Monitora;

import org.springframework.jdbc.core.RowMapper;

@Repository
public class MonitoraRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void insertMonitora(Monitora monitora){
       System.out.println(monitora.getCpfInterno());
       System.out.println(monitora.getCpfPaciente());
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

    public void deleteMonitora(Monitora monitora){
        jdbcTemplate.update("delete from monitora where fk_cpf_interno = ? and fk_cpf_paciente = ?", monitora.getCpfInterno(), monitora.getCpfPaciente());
    }

    public void updateMonitora(Monitora monitora){
        jdbcTemplate.update("update monitora set fk_cpf_paciente = ? where fk_cpf_interno = ?", monitora.getCpfPaciente(), monitora.getCpfInterno());
    }

    
    
}
