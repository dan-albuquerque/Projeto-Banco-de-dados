package com.hospital.hospital.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import com.hospital.hospital.models.informacao.RegistroInternado;
import org.springframework.jdbc.core.RowMapper;
import java.util.List;

@Repository
public class RegistroInternadoRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertRegistroInternado(RegistroInternado registroInternado){
        jdbcTemplate.update("insert into registro_internado(fk_registro_codigo, evolucao, historico_exames) values(?, ?, ?)", registroInternado.getRegistroCodigo(), registroInternado.getEvolucao(), registroInternado.getHistoricoExames());
    }

    public List<RegistroInternado> selectRegistrosInternados() {
        return jdbcTemplate.query("SELECT * FROM registro_internado", registroInternadoMapper);
    }

    private RowMapper<RegistroInternado> registroInternadoMapper = (rs, rowNum) ->
    {
        RegistroInternado registroInternado = new RegistroInternado();
        registroInternado.setRegistroCodigo(rs.getInt("fk_registro_codigo"));
        registroInternado.setEvolucao(rs.getString("evolucao"));
        registroInternado.setHistoricoExames(rs.getString("historico_exames"));
        return registroInternado;
    };

    public void updateRegistroInternado(RegistroInternado registroInternado){
        jdbcTemplate.update("update registro_internado set evolucao = ?, historico_exames = ? where fk_registro_codigo = ?", registroInternado.getEvolucao(), registroInternado.getHistoricoExames(), registroInternado.getRegistroCodigo());
    }

    public void deleteRegistroInternado(RegistroInternado registroInternado){
        jdbcTemplate.update("delete from registro_internado where fk_registro_codigo = ?", registroInternado.getRegistroCodigo());
    }

    public RegistroInternado selectRegistroInternado(int fk_registro_codigo){
        return jdbcTemplate.queryForObject("select * from registro_internado where fk_registro_codigo = ?", registroInternadoMapper, fk_registro_codigo);
    }
}
