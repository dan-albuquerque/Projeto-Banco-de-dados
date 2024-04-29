package com.hospital.hospital.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import com.hospital.hospital.models.informacao.ExameComplementar;
import org.springframework.jdbc.core.RowMapper;
import java.util.List;

@Repository
public class ExameComplementarRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<ExameComplementar> selectExamesComplementares() {
        return jdbcTemplate.query("select * from exame_complementar", exameComplementarMapper);
    }

    public void insertExameComplementar(ExameComplementar exameComplementar) {
        jdbcTemplate.update("INSERT INTO exame_complementar (codigo, data_realizacao, resultados, tipo) VALUES (?, ?, ?, ?)",
            exameComplementar.getCodigo(), exameComplementar.getData_realizacao(), exameComplementar.getResultados(), 
            exameComplementar.getTipo());
    }

    public ExameComplementar selectExameComplementarByCodigo(int codigo) {
        return jdbcTemplate.queryForObject("select * from exame_complementar where codigo = ?", exameComplementarMapper, codigo);
    }

    private RowMapper<ExameComplementar> exameComplementarMapper = (rs, rowNum) -> {
        ExameComplementar exameComplementar = new ExameComplementar(
            rs.getInt("codigo"),
            rs.getString("resultados"),
            rs.getDate("data_realizacao"),
            rs.getString("tipo")
        );
        return exameComplementar;
    };

    public void deleteExameComplementar(int codigo) {
        jdbcTemplate.update("DELETE FROM exame_complementar WHERE codigo = ?", codigo);
    }

    public void updateExameComplementar(ExameComplementar exameComplementar, int codigo) {
        jdbcTemplate.update("UPDATE exame_complementar SET data_realizacao = ?, resultados = ?, tipo = ? WHERE codigo = ?",
            exameComplementar.getData_realizacao(), exameComplementar.getResultados(),
            exameComplementar.getTipo(), codigo);
    }
}
