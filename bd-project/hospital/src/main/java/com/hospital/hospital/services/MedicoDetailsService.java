package com.hospital.hospital.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hospital.hospital.models.elenco.Medico;
import com.hospital.hospital.repository.MedicoRepository;
import com.hospital.hospital.security.User;

@Service
public class MedicoDetailsService implements UserDetailsService {

    @Autowired
    private MedicoRepository medicoRepository;

    private final RowMapper<Medico> medicoMapper = (rs, rowNum) -> {
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

    @Override
    public UserDetails loadUserByUsername(String cpf) throws UsernameNotFoundException {
        Medico medico = medicoRepository.selectMedico(cpf);
        
        if (medico == null) {
            throw new UsernameNotFoundException("Não foi possível encontrar usuário com CPF: " + cpf);
        }

        return new User(medico);
    }
}
