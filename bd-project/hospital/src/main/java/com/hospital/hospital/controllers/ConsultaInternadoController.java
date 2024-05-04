package com.hospital.hospital.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.consultas.ConsultaInternado;

import com.hospital.hospital.repository.ConsultaInternadoRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.sql.Date;

@RestController
@RequestMapping("/consultainternado")
public class ConsultaInternadoController {
    
    @Autowired
    private ConsultaInternadoRepository consultaInternadoRepository;

    @PostMapping
    public String createConsultaInternado(@RequestBody ConsultaInternado consultaInternado) {
        consultaInternadoRepository.insertConsultaInternado(consultaInternado);
        return "ConsultaInternado created: ";
    }

    @DeleteMapping
    public String deleteConsultaInternado(@RequestBody ConsultaInternado consultaInternado){
        consultaInternadoRepository.deleteConsultaInternado(consultaInternado);
        return "ConsultaInternado deleted! ";
    }

    @GetMapping()
    public List<ConsultaInternado> getAllConsultaInternados() {
        return consultaInternadoRepository.selectConsultaInternados();
    }

    @PutMapping
    public String updateConsultaInternado(@RequestBody ConsultaInternado consultaInternado){
        consultaInternadoRepository.updateConsultaInternado(consultaInternado);
        return "ConsultaInternado updated: ";
    }

    @GetMapping("/{fk_medico_cpf}/{fk_paciente_internado_cpf}/{data_realizacao}")
    public ConsultaInternado getConsultaInternado(@PathVariable String fk_medico_cpf, @PathVariable String fk_paciente_internado_cpf, @PathVariable Date data_realizacao){
        return consultaInternadoRepository.selectConsultaInternado(fk_medico_cpf, fk_paciente_internado_cpf, data_realizacao);
    }
}
