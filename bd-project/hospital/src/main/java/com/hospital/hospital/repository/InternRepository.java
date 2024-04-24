package com.hospital.hospital.repository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.hospital.hospital.models.elenco.Interno;

import org.springframework.jdbc.core.RowMapper;

@Repository
public class InternRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void insertIntern(Interno interno){
        jdbcTemplate.update("insert into interno(cpf,nome,senha,matricula) values(?, ?, ?, ?)", interno.getCpf(), interno.getNome(), interno.getSenha(), interno.getMatricula());
    }

    public List<Interno> selectInterns() {
        return jdbcTemplate.query("SELECT * FROM interno", internoMapper);
    }

    private RowMapper<Interno> internoMapper = (rs, rowNum) ->
    {
        Interno interno = new Interno();
        interno.setName(rs.getString("nome"));
        interno.setCpf(rs.getString("cpf"));
        interno.setSenha(rs.getString("senha"));
        interno.setmatricula(rs.getInt("matricula"));
        return interno;
    };

    public void updateIntern(Interno interno){
        jdbcTemplate.update("update interno set nome = ?, senha = ?, matricula = ? where cpf = ?", interno.getNome(), interno.getSenha(), interno.getMatricula(), interno.getCpf());
    }

    public void deleteIntern(Interno interno){
        jdbcTemplate.update("delete from interno where cpf = ?", interno.getCpf());
    }

}