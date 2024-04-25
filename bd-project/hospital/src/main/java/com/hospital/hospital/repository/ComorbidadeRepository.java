package com.hospital.hospital.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.hospital.hospital.models.pacientes.Comorbidade;
import org.springframework.jdbc.core.RowMapper;

@Repository
public class ComorbidadeRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertComorbidade(Comorbidade comorbidade){
        jdbcTemplate.update("insert into comorbidade(fk_registro_urgencia_codigo, id, nome) values(?, ?, ?)", 
            comorbidade.getRegistroUrgenciaCodigo(), comorbidade.getId(), comorbidade.getNome());
    }

    public void deleteComorbidade(int id){
        jdbcTemplate.update("delete from comorbidade where id = ?", id);
    }

    public void updateComorbidade(Comorbidade comorbidade){
        jdbcTemplate.update("update comorbidade set fk_registro_urgencia_codigo = ?, nome = ? where id = ?", 
            comorbidade.getRegistroUrgenciaCodigo(), comorbidade.getNome(), comorbidade.getId());
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

    public Comorbidade updateComorbidade(int id){
        return jdbcTemplate.queryForObject("select * from comorbidade where id = ?", comorbidadeMapper, id);
    }

    public List<Comorbidade> selectComorbidadesByRegistro(int fk_registro_urgencia_codigo){
        return jdbcTemplate.query("select * from comorbidade where fk_registro_urgencia_codigo = ?", comorbidadeMapper, fk_registro_urgencia_codigo);
    }
    
}
