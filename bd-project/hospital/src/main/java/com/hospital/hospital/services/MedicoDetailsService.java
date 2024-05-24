package com.hospital.hospital.services;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Override
    public UserDetails loadUserByUsername(String cpf) throws UsernameNotFoundException {
        Medico medico = medicoRepository.selectMedico(cpf);
        
        if (medico == null) {
            throw new UsernameNotFoundException("Não foi possível encontrar usuário com CPF: " + cpf);
        }

        if (!medico.isAtivo()) {
            throw new UsernameNotFoundException("Usuário inativo");
        }

        return new User(medico);
    }
}
