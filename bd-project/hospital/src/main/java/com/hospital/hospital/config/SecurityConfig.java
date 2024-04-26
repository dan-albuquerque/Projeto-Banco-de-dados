package com.hospital.hospital.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.hospital.hospital.repository.MedicoRepository;
import com.hospital.hospital.models.elenco.Medico;
import org.springframework.security.core.authority.AuthorityUtils;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final MedicoRepository medicoRepository;

    public SecurityConfig(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/medico/**").permitAll()
                .requestMatchers("/hello").authenticated()
                .anyRequest().permitAll())
            .formLogin(form -> form
                .loginPage("/login1") // Caminho para a página de login
                .loginProcessingUrl("/login1") // URL que vai processar o login
                .defaultSuccessUrl("/hello", true) // Página para redirecionar após login com sucesso
                .permitAll())
            .logout(logout -> logout.permitAll());
        return http.build();
    }


    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            Medico medico = medicoRepository.selectMedico(username);
            if (medico != null) {
                return new org.springframework.security.core.userdetails.User(
                    medico.getCpf(),
                    medico.getSenha(),
                    true, true, true, true,
                    AuthorityUtils.createAuthorityList("USER"));
            } else {
                throw new UsernameNotFoundException("Usuário não encontrado");
            }
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
}
