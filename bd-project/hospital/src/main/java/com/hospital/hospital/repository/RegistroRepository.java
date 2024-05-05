package com.hospital.hospital.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import com.hospital.hospital.models.informacao.Registro;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class RegistroRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int insertRegistro(Registro registro) {
        final String sql = "INSERT INTO registro(conduta) VALUES(?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[] { "codigo" }); // "codigo" é o nome da
                                                                                                // coluna ID na tabela
            ps.setString(1, registro.getConduta());
            return ps;
        }, keyHolder);

        return keyHolder.getKey().intValue(); // Retorna o ID gerado
    }

    public void deleteRegistro(int codigo) {
        jdbcTemplate.update("delete from registro where codigo = ?", codigo);
    }

    public void updateRegistro(Registro registro) {
        jdbcTemplate.update("update registro set conduta = ? where codigo = ?", registro.getConduta(),
                registro.getCodigo());
    }

    public Registro selectRegistro(int codigo) {
        return jdbcTemplate.queryForObject("select * from registro where codigo = ?", registroMapper, codigo);
    }

    private RowMapper<Registro> registroMapper = (rs, rowNum) -> {
        Registro registro = new Registro();
        registro.setCodigo(rs.getInt("codigo"));
        registro.setConduta(rs.getString("conduta"));
        return registro;
    };

    public List<Registro> selectRegistros() {
        return jdbcTemplate.query("select * from registro", registroMapper);
    }
}
