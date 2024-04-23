package com.hospital.hospital.repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import com.hospital.hospital.models.Intern;
@Repository
public class InternRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public void insertIntern(Intern intern){
        jdbcTemplate.update("insert into interno(cpf,nome,senha,matricula) values(?, ?, ?, ?)", intern.getCpf(), intern.getName(), intern.getPassword(), intern.getRegistration());
    }

    public void selectIntern(){
        jdbcTemplate.queryForList("select * from intern");
    }
    
}
