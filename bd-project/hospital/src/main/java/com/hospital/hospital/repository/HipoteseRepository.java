package com.hospital.hospital.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import com.hospital.hospital.models.informacao.Hipotese;
import java.util.List;

@Repository
public class HipoteseRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertHipotese(Hipotese hipotese){
        jdbcTemplate.update("insert into hipotese(fk_registro_codigo, id, descricao) values(?, ?, ?)", hipotese.getRegistroCodigo(), hipotese.getId(), hipotese.getDescricao());
    }

    public List<Hipotese> selectHipoteses() {
        return jdbcTemplate.query("SELECT * FROM hipotese", hipoteseMapper);
    }

    private RowMapper<Hipotese> hipoteseMapper = (rs, rowNum) ->
    {
        Hipotese hipotese = new Hipotese();
        hipotese.setId(rs.getInt("id"));
        hipotese.setRegistroCodigo(rs.getInt("fk_registro_codigo"));
        hipotese.setDescricao(rs.getString("descricao"));
        return hipotese;
    };

    public void updateHipotese(int id, int fk_registro_codigo, Hipotese hipotese){
        jdbcTemplate.update("update hipotese set descricao = ? where id = ? and fk_registro_codigo = ?", hipotese.getDescricao(), id, fk_registro_codigo);
    }

    public void deleteHipotese(int id, int fk_registro_codigo){
        jdbcTemplate.update("delete from hipotese where id = ? and fk_registro_codigo = ?", id, fk_registro_codigo);
    }

    public Hipotese selectHipotese(int id, int fk_registro_codigo){
        return jdbcTemplate.queryForObject("select * from hipotese where id = ? and fk_registro_codigo = ?", hipoteseMapper, id, fk_registro_codigo);
    }

    public List<Hipotese> selectHipotesesByRegistro(int fk_registro_codigo){
        return jdbcTemplate.query("select * from hipotese where fk_registro_codigo = ?", hipoteseMapper, fk_registro_codigo);
    }
}
