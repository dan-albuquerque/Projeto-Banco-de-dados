package com.hospital.hospital.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.pacientes.PacienteInternado;

import com.hospital.hospital.repository.PacienteInternadoRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/paciente_internado")
public class PacienteInternadoController {

    @Autowired
    private PacienteInternadoRepository pacienteInternadoRepository;

    @PostMapping
    public String createPacienteInternado(@RequestBody PacienteInternado pacienteInternado) {
        pacienteInternadoRepository.insertPacienteInternado(pacienteInternado);
        return "Paciente Internado created: " + pacienteInternado.getPacienteCpf();
    }

    @DeleteMapping
    public String deletePacienteInternado(@RequestBody PacienteInternado pacienteInternado){
        pacienteInternadoRepository.deletePacienteInternado(pacienteInternado);
        return "Paciente Internado deleted! ";
    }

    @GetMapping
    public List<PacienteInternado> getAllPacientesInternados() {
        return pacienteInternadoRepository.selectPacientesInternados();
    }

    @PutMapping
    public String updatePacienteInternado(@RequestBody PacienteInternado pacienteInternado){
        pacienteInternadoRepository.updatePacienteInternado(pacienteInternado);
        return "Paciente Internado updated: " + pacienteInternado.getPacienteCpf();
    }

    @GetMapping("/{cpf}")
    public PacienteInternado getPacienteInternado(@PathVariable String cpf){
        return pacienteInternadoRepository.selectPacienteInternado(cpf);
    }
    
}
