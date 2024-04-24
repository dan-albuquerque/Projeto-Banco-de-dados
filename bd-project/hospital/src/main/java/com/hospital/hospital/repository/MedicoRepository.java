package com.hospital.hospital.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import com.hospital.hospital.models.elenco.Medico;
import org.springframework.jdbc.core.RowMapper;
import java.util.List;

@Repository
public class MedicoRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertMedico(Medico medico){
        jdbcTemplate.update("insert into medico(cpf, rqe, nome, especialidade, crm, fk_medico_cpf_gerente) values(?, ?, ?, ?, ?, ?, ?)", medico.getCpf(), medico.getRqe(), medico.getNome(), medico.getEspecialidade(), medico.getCrm(), medico.getMedicoCpfGerente());
    }

    public List<Medico> selectMedicos() {
        return jdbcTemplate.query("SELECT * FROM medico", medicoMapper);
    }

    private RowMapper<Medico> medicoMapper = (rs, rowNum) ->
    {
        Medico medico = new Medico();
        medico.setCpf(rs.getString("cpf"));
        medico.setRqe(rs.getInt("rqe"));
        medico.setNome(rs.getString("nome"));
        medico.setSenha(rs.getString("senha"));
        medico.setEspecialidade(rs.getString("especialidade"));
        medico.setCrm(rs.getString("crm"));
        medico.setMedicoCpfGerente(rs.getString("fk_medico_cpf_gerente"));
        return medico;
    };

    public void updateMedico(Medico medico){
        jdbcTemplate.update("update medico set rqe = ?, nome = ?, senha = ?, especialidade = ?, crm = ?, fk_medico_cpf_gerente = ? where cpf = ?", medico.getRqe(), medico.getNome(), medico.getSenha(), medico.getEspecialidade(), medico.getCrm(), medico.getMedicoCpfGerente(), medico.getCpf());
    }

    public void deleteMedico(Medico medico){
        jdbcTemplate.update("delete from medico where cpf = ?", medico.getCpf());
    }

    public Medico selectMedico(String cpf){
        return jdbcTemplate.queryForObject("select * from medico where cpf = ?", medicoMapper, cpf);
    }
    
}
