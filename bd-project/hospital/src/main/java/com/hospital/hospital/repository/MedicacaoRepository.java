package com.hospital.hospital.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import com.hospital.hospital.models.informacao.Medicacao;
import java.util.List;

@Repository
public class MedicacaoRepository {
    @Autowired

    private JdbcTemplate jdbcTemplate;

    public void insertMedicacao(Medicacao medicacao){
        jdbcTemplate.update("insert into medicacao(fk_registro_urgencia_codigo, id, nome) values(?, ?, ?)", medicacao.getRegistroUrgenciaCodigo(), medicacao.getId(), medicacao.getNome());
    }

    public List<Medicacao> selectMedicacoes() {
        return jdbcTemplate.query("SELECT * FROM medicacao", medicacaoMapper);
    }

    private RowMapper<Medicacao> medicacaoMapper = (rs, rowNum) ->
    {
        Medicacao medicacao = new Medicacao();
        medicacao.setId(rs.getInt("id"));
        medicacao.setRegistroUrgenciaCodigo(rs.getInt("fk_registro_urgencia_codigo"));
        medicacao.setNome(rs.getString("nome"));
        return medicacao;
    };
    
    public void updateMedicacao(Medicacao medicacao){
        jdbcTemplate.update("update medicacao set fk_registro_urgencia_codigo = ?, nome = ? where id = ?", medicacao.getRegistroUrgenciaCodigo(), medicacao.getNome(), medicacao.getId());
    }

    public void deleteMedicacao(int id){
        jdbcTemplate.update("delete from medicacao where id = ?", id);
    }

    public Medicacao selectMedicacao(int id){
        return jdbcTemplate.queryForObject("select * from medicacao where id = ?", medicacaoMapper, id);
    }

    public List<Medicacao> selectMedicacoesByRegistro(int fk_registro_urgencia_codigo){
        return jdbcTemplate.query("select * from medicacao where fk_registro_urgencia_codigo = ?", medicacaoMapper, fk_registro_urgencia_codigo);
    }
}
