package com.hospital.hospital.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.consultas.ConsultaInternado;

import com.hospital.hospital.repository.ConsultaInternadoRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public List<ConsultaInternado> getAllConsultaInternados() {
        return consultaInternadoRepository.selectConsultaInternados();
    }

    @PutMapping
    public String updateConsultaInternado(@RequestBody ConsultaInternado consultaInternado){
        consultaInternadoRepository.updateConsultaInternado(consultaInternado);
        return "ConsultaInternado updated: ";
    }
}
