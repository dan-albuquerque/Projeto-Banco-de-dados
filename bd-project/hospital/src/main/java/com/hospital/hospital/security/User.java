package com.hospital.hospital.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.hospital.hospital.models.elenco.Medico;
import java.util.Collection;
import java.util.Collections;

public class User implements UserDetails {
    private Medico medico;

    public User(Medico medico) {
        this.medico = medico;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return medico.getSenha();
    }

    @Override
    public String getUsername() {
        return medico.getCpf();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
