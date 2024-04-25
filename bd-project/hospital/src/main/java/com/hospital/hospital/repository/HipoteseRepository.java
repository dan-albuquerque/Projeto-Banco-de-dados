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
        jdbcTemplate.update("insert into hipotese(fk_registro_codigo, id) values(?, ?)", hipotese.getRegistroCodigo(), hipotese.getId());
    }

    public List<Hipotese> selectHipoteses() {
        return jdbcTemplate.query("SELECT * FROM hipotese", hipoteseMapper);
    }

    private RowMapper<Hipotese> hipoteseMapper = (rs, rowNum) ->
    {
        Hipotese hipotese = new Hipotese();
        hipotese.setId(rs.getInt("id"));
        hipotese.setRegistroCodigo(rs.getInt("fk_registro_codigo"));
        return hipotese;
    };

    public void updateHipotese(Hipotese hipotese){
        jdbcTemplate.update("update hipotese set fk_registro_codigo = ? where id = ?", hipotese.getRegistroCodigo(), hipotese.getId());
    }

    public void deleteHipotese(Hipotese hipotese){
        jdbcTemplate.update("delete from hipotese where id = ?", hipotese.getId());
    }

    public Hipotese selectHipotese(int id){
        return jdbcTemplate.queryForObject("select * from hipotese where id = ?", hipoteseMapper, id);
    }

    public List<Hipotese> selectHipotesesByRegistro(int fk_registro_codigo){
        return jdbcTemplate.query("select * from hipotese where fk_registro_codigo = ?", hipoteseMapper, fk_registro_codigo);
    }
}
