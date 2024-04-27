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
        return "Paciente Internado created: " + pacienteInternado.getfk_paciente_cpf();
    }

    @DeleteMapping("/{cpf}")
    public String deletePacienteInternado(@PathVariable String cpf) {
        pacienteInternadoRepository.deletePacienteInternado(cpf);
        return "Paciente Internado deleted: " + cpf;
    }
    
    @GetMapping
    public List<PacienteInternado> getAllPacientesInternados() {
        return pacienteInternadoRepository.selectPacientesInternados();
    }

    @PutMapping("/{cpf}")
    public String updatePacienteInternado(@PathVariable String cpf, @RequestBody PacienteInternado pacienteInternado) {
        pacienteInternadoRepository.updatePacienteInternado(cpf, pacienteInternado);
        return "Paciente Internado updated: " + pacienteInternado.getfk_paciente_cpf();
    }
    @GetMapping("/{cpf}")
    public PacienteInternado getPacienteInternado(@PathVariable String cpf){
        return pacienteInternadoRepository.selectPacienteInternado(cpf);
    }
    
}
