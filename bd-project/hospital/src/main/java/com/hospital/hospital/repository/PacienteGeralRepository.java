package com.hospital.hospital.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.hospital.hospital.models.DTOs.PacienteGeralDTO;

@Repository
public class PacienteGeralRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    /*comando sql = SELECT 
        p.cpf,
        p.nome,
        p.telefone_residencial,
        p.telefone_pessoal,
        p.cidade,
        p.bairro,
        p.rua,
        p.numero,
        pi.sala,
        pu.nivel_triagem
    FROM 
        paciente p
    LEFT JOIN 
        paciente_internado pi ON p.cpf = pi.fk_paciente_cpf
    LEFT JOIN 
        paciente_urgencia pu ON p.cpf = pu.fk_paciente_cpf;
    */

    public List<PacienteGeralDTO> getPacientesGerais(boolean sortAlphabetically, boolean reverseOrder, boolean sortNumerically) {
        String sql;
        if(sortAlphabetically){
            String order = reverseOrder ? "DESC" : "ASC";
            sql = "SELECT p.cpf, p.nome, p.telefone_residencial, p.telefone_pessoal, p.cidade, p.bairro, p.rua, p.numero, pi.sala, pu.nivel_triagem FROM paciente p LEFT JOIN paciente_internado pi ON p.cpf = pi.fk_paciente_cpf LEFT JOIN paciente_urgencia pu ON p.cpf = pu.fk_paciente_cpf ORDER BY p.nome " + order;
        }else if(sortNumerically){
            sql = "SELECT p.cpf, p.nome, p.telefone_residencial, p.telefone_pessoal, p.cidade, p.bairro, p.rua, p.numero, pi.sala, pu.nivel_triagem FROM paciente p LEFT JOIN paciente_internado pi ON p.cpf = pi.fk_paciente_cpf LEFT JOIN paciente_urgencia pu ON p.cpf = pu.fk_paciente_cpf ORDER BY cpf DESC";
        }else{
            sql = "SELECT p.cpf, p.nome, p.telefone_residencial, p.telefone_pessoal, p.cidade, p.bairro, p.rua, p.numero, pi.sala, pu.nivel_triagem FROM paciente p LEFT JOIN paciente_internado pi ON p.cpf = pi.fk_paciente_cpf LEFT JOIN paciente_urgencia pu ON p.cpf = pu.fk_paciente_cpf";
        }
        System.out.println("comando sql: " + sql);
            return jdbcTemplate.query(sql, (rs, rowNum) ->
                new PacienteGeralDTO(
                    rs.getString("cpf"),
                    rs.getString("nome"),
                    rs.getString("telefone_residencial"),
                    rs.getString("telefone_pessoal"),
                    rs.getString("cidade"),
                    rs.getString("bairro"),
                    rs.getString("rua"),
                    rs.getInt("numero"),
                    Optional.ofNullable((Integer) rs.getObject("sala")).orElse(-1),
                    Optional.ofNullable((Integer) rs.getObject("nivel_triagem")).orElse(-1)
                )
        );
    }

    public List<PacienteGeralDTO> searchPacientesGerais(boolean isSearch, String searchName) {
        String sql = "SELECT p.cpf, p.nome, p.telefone_residencial, p.telefone_pessoal, p.cidade, p.bairro, p.rua, p.numero, pi.sala, pu.nivel_triagem FROM paciente p LEFT JOIN paciente_internado pi ON p.cpf = pi.fk_paciente_cpf LEFT JOIN paciente_urgencia pu ON p.cpf = pu.fk_paciente_cpf WHERE p.nome LIKE ?";
        System.out.println("comando sql: " + sql);
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new PacienteGeralDTO(
                rs.getString("cpf"),
                rs.getString("nome"),
                rs.getString("telefone_residencial"),
                rs.getString("telefone_pessoal"),
                rs.getString("cidade"),
                rs.getString("bairro"),
                rs.getString("rua"),
                rs.getInt("numero"),
                Optional.ofNullable((Integer) rs.getObject("sala")).orElse(-1),
                Optional.ofNullable((Integer) rs.getObject("nivel_triagem")).orElse(-1)
            ), "%" + searchName + "%"
        );
    }

}
