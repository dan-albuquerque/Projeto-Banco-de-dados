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
        jdbcTemplate.update("insert into monitora(fk_cpf_interno,fk_cpf_paciente) values(?, ?)", monitora.getfk_intern_cpf(), monitora.getfk_paciente_cpf());
    }

    public List<Monitora> selectMonitoras() {
        return jdbcTemplate.query("SELECT * FROM monitora", monitoraMapper);
    }

    private RowMapper<Monitora> monitoraMapper = (rs, rowNum) ->
    {
        Monitora monitora = new Monitora();
        monitora.setfk_intern_cpf(rs.getString("fk_cpf_interno"));
        monitora.setfk_paciente_cpf(rs.getString("fk_cpf_paciente"));
        return monitora;
    };

    public void deleteMonitora(Monitora monitora){
        jdbcTemplate.update("delete from monitora where fk_cpf_interno = ? and fk_cpf_paciente = ?", monitora.getfk_intern_cpf(), monitora.getfk_paciente_cpf());
    }

    public void updateMonitora(Monitora monitora){
        jdbcTemplate.update("update monitora set fk_cpf_interno = ? where fk_cpf_paciente = ?", monitora.getfk_intern_cpf(), monitora.getfk_paciente_cpf());
    }

   
    
    
}
