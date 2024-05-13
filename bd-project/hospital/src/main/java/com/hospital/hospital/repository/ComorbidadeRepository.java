package com.hospital.hospital.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.hospital.hospital.models.informacao.Comorbidade;

import org.springframework.jdbc.core.RowMapper;

@Repository
public class ComorbidadeRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertComorbidade(Comorbidade comorbidade){
        jdbcTemplate.update("insert into comorbidade(fk_registro_urgencia_codigo, id, nome) values(?, ?, ?)", 
            comorbidade.getRegistroUrgenciaCodigo(), comorbidade.getId(), comorbidade.getNome());
    }

    public void deleteComorbidade(int fk_registro_codigo, int id){
        jdbcTemplate.update("delete from comorbidade where id = ? and fk_registro_urgencia_codigo = ?", id, fk_registro_codigo);
    }

    public void updateComorbidade(int fk_registro_codigo, int id, Comorbidade comorbidade){
        jdbcTemplate.update("update comorbidade set nome = ? where id = ? and fk_registro_urgencia_codigo = ?", comorbidade.getNome(), id, fk_registro_codigo);
    }

    public List<Comorbidade> selectComorbidades() {
        return jdbcTemplate.query("SELECT * FROM comorbidade", comorbidadeMapper);
    }


    private RowMapper<Comorbidade> comorbidadeMapper = (rs, rowNum) ->
    {
        Comorbidade comorbidade = new Comorbidade();
        comorbidade.setId(rs.getInt("id"));
        comorbidade.setRegistroUrgenciaCodigo(rs.getInt("fk_registro_urgencia_codigo"));
        comorbidade.setNome(rs.getString("nome"));
        return comorbidade;
    };

    public Comorbidade selectComorbidade(int fk_registro_codigo, int id){
        return jdbcTemplate.queryForObject("select * from comorbidade where id = ? and fk_registro_urgencia_codigo = ?", comorbidadeMapper, id, fk_registro_codigo);
    }

    public List<Comorbidade> selectComorbidadesByRegistro(int fk_registro_codigo){
        return jdbcTemplate.query("SELECT * FROM comorbidade WHERE fk_registro_urgencia_codigo = ?", comorbidadeMapper, fk_registro_codigo);
    }
    
}
