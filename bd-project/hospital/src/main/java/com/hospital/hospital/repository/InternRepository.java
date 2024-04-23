package com.hospital.hospital.repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import com.hospital.hospital.models.Interno;
@Repository
public class InternRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public void insertIntern(Interno interno){
        jdbcTemplate.update("insert into interno(cpf,nome,senha,matricula) values(?, ?, ?, ?)", interno.getCpf(), interno.getNome(), interno.getSenha(), interno.getMatricula());
    }

    public void selectInterno(){
        jdbcTemplate.queryForList("select * from intern");
    }
    
}
