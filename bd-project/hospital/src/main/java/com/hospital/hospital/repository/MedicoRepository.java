package com.hospital.hospital.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.hospital.hospital.models.DTOs.MedicoDTO;
import com.hospital.hospital.models.elenco.Medico;
import org.springframework.jdbc.core.RowMapper;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Repository
public class MedicoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertMedico(Medico medico) {
        String encodedPassword = new BCryptPasswordEncoder().encode(medico.getSenha());
        jdbcTemplate.update(
                "insert into medico(cpf, rqe, nome, especialidade, crm, fk_medico_cpf_gerente, senha) values(?, ?, ?, ?, ?, ?, ?)",
                medico.getCpf(), medico.getRqe(), medico.getNome(), medico.getEspecialidade(), medico.getCrm(),
                medico.getMedicoCpfGerente(), encodedPassword);
    }

    public List<Medico> selectMedicos(boolean sortAlphabetically, boolean reverseOrder, boolean sortNumerically) {
        String sql;
        if (sortAlphabetically) {
            String order = reverseOrder ? "DESC" : "ASC";
            sql = "SELECT * FROM Medico ORDER BY nome " + order;
        } else if (sortNumerically) {
            sql = "SELECT * FROM Medico ORDER BY cpf DESC";
        } else {
            sql = "SELECT * FROM Medico";
        }
        System.out.println("comando sql: " + sql);
        return jdbcTemplate.query(sql, medicoMapper);
    }

    public List<Medico> searchMedicos(boolean isSearch, String searchName) {
        String sql = "SELECT * FROM Medico WHERE nome LIKE ?";
        System.out.println("comando sql: " + sql);
        return jdbcTemplate.query(sql, medicoMapper, "%" + searchName + "%");
    }

    private RowMapper<Medico> medicoMapper = (rs, rowNum) -> {
        Medico medico = new Medico();
        medico.setCpf(rs.getString("cpf"));
        medico.setRqe(rs.getInt("rqe"));
        medico.setNome(rs.getString("nome"));
        medico.setSenha(rs.getString("senha"));
        medico.setEspecialidade(rs.getString("especialidade"));
        medico.setCrm(rs.getString("crm"));
        medico.setAtivo(rs.getBoolean("ativo"));
        if (rs.getString("fk_medico_cpf_gerente") != null) {
            medico.setMedicoCpfGerente(rs.getString("fk_medico_cpf_gerente"));
        } else {
            medico.setMedicoCpfGerente(null);
        }
        return medico;
    };

    public void updateMedico(Medico medico) {
        String encodedPassword = new BCryptPasswordEncoder().encode(medico.getSenha());
        jdbcTemplate.update(
                "update medico set rqe = ?, nome = ?, senha = ?, especialidade = ?, crm = ?, fk_medico_cpf_gerente = ? where cpf = ?",
                medico.getRqe(), medico.getNome(), encodedPassword, medico.getEspecialidade(), medico.getCrm(),
                medico.getMedicoCpfGerente(), medico.getCpf());
    }

    public void deleteMedico(String cpf) {
        jdbcTemplate.update("UPDATE medico SET fk_medico_cpf_gerente = NULL WHERE fk_medico_cpf_gerente = ?", cpf);
        jdbcTemplate.update("delete from medico where cpf = ?", cpf);
    }

    public Medico selectMedico(String cpf) {
        return jdbcTemplate.queryForObject("select * from medico where cpf = ?", medicoMapper, cpf);
    }

    public MedicoDTO findTopMedico() {
        String sql = "SELECT m.cpf, m.nome, " +
                "       (COALESCE(cu.total_consultas_urgencia, 0) + COALESCE(ci.total_consultas_internado, 0)) AS total_consultas "
                +
                "FROM medico m " +
                "LEFT JOIN (" +
                "    SELECT fk_medico_cpf, COUNT(*) AS total_consultas_urgencia " +
                "    FROM consulta_urgencia " +
                "    GROUP BY fk_medico_cpf" +
                ") cu ON m.cpf = cu.fk_medico_cpf " +
                "LEFT JOIN (" +
                "    SELECT fk_medico_cpf, COUNT(*) AS total_consultas_internado " +
                "    FROM consulta_internado " +
                "    GROUP BY fk_medico_cpf" +
                ") ci ON m.cpf = ci.fk_medico_cpf " +
                "ORDER BY total_consultas DESC " +
                "LIMIT 1";

        return jdbcTemplate.queryForObject(sql, new RowMapper<MedicoDTO>() {
            @Override
            public MedicoDTO mapRow(java.sql.ResultSet rs, int rowNum) throws java.sql.SQLException {
                return new MedicoDTO(
                        rs.getString("cpf"),
                        rs.getString("nome"),
                        rs.getInt("total_consultas"));
            }
        });
    }

    public void fireDoctor(String cpf) {
        jdbcTemplate.update("UPDATE medico SET ativo = false WHERE cpf = ?", cpf);
    }

    public void hireDoctor(String cpf) {
        jdbcTemplate.update("UPDATE medico SET ativo = true WHERE cpf = ?", cpf);
    }
}
