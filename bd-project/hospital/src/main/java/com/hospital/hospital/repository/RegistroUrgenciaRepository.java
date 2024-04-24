package com.hospital.hospital.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import com.hospital.hospital.models.informacao.RegistroUrgencia;
import org.springframework.jdbc.core.RowMapper;
import java.util.List;

@Repository
public class RegistroUrgenciaRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertRegistroUrgencia(RegistroUrgencia registroUrgencia){
        jdbcTemplate.update("insert into registro_urgencia(fk_registro_codigo, historico_doenca, exame_fisico) values(?, ?, ?)", registroUrgencia.getRegistroCodigo(), registroUrgencia.getHistoricoDoenca(), registroUrgencia.getExameFisico());
    }

    public List<RegistroUrgencia> selectRegistrosUrgencia() {
        return jdbcTemplate.query("SELECT * FROM registro_urgencia", registroUrgenciaMapper);
    }

    private RowMapper<RegistroUrgencia> registroUrgenciaMapper = (rs, rowNum) ->
    {
        RegistroUrgencia registroUrgencia = new RegistroUrgencia();
        registroUrgencia.setRegistroCodigo(rs.getInt("fk_registro_codigo"));
        registroUrgencia.setHistoricoDoenca(rs.getString("historico_doenca"));
        registroUrgencia.setExameFisico(rs.getString("exame_fisico"));
        return registroUrgencia;
    };

    public void updateRegistroUrgencia(RegistroUrgencia registroUrgencia){
        jdbcTemplate.update("update registro_urgencia set historico_doenca = ?, exame_fisico = ? where fk_registro_codigo = ?", registroUrgencia.getHistoricoDoenca(), registroUrgencia.getExameFisico(), registroUrgencia.getRegistroCodigo());
    }

    public void deleteRegistroUrgencia(RegistroUrgencia registroUrgencia){
        jdbcTemplate.update("delete from registro_urgencia where fk_registro_codigo = ?", registroUrgencia.getRegistroCodigo());
    }

    public RegistroUrgencia selectRegistroUrgencia(int fk_registro_codigo){
        return jdbcTemplate.queryForObject("select * from registro_urgencia where fk_registro_codigo = ?", registroUrgenciaMapper, fk_registro_codigo);
    }
    
}
