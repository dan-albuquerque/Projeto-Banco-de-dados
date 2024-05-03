package com.hospital.hospital.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import com.hospital.hospital.models.informacao.Registro;
import org.springframework.jdbc.core.RowMapper;
import java.util.List;

@Repository
public class RegistroRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertRegistro(Registro registro){
        jdbcTemplate.update("insert into registro(conduta) values(?)", registro.getConduta());
    }

    public void deleteRegistro(int codigo){
        jdbcTemplate.update("delete from registro where codigo = ?", codigo);
    }

    public void updateRegistro(Registro registro){
        jdbcTemplate.update("update registro set conduta = ? where codigo = ?", registro.getConduta(), registro.getCodigo());
    }

    public Registro selectRegistro(int codigo){
        return jdbcTemplate.queryForObject("select * from registro where codigo = ?", new Object[]{codigo}, registroMapper);
    }

    private RowMapper<Registro> registroMapper = (rs, rowNum) ->
    {
        Registro registro = new Registro();
        registro.setCodigo(rs.getInt("codigo"));
        registro.setConduta(rs.getString("conduta"));
        return registro;
    };

    public List<Registro> selectRegistros(){
        return jdbcTemplate.query("select * from registro", registroMapper);
    }
}
