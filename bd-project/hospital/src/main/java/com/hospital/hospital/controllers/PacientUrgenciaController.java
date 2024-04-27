package com.hospital.hospital.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.pacientes.PacienteUrgencia;

import com.hospital.hospital.repository.PacienteUrgenciaRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pacienturgencia")
public class PacientUrgenciaController {

    @Autowired
    private PacienteUrgenciaRepository pacientRepository;

    @PostMapping
    public String createPacient(@RequestBody PacienteUrgencia paciente) {
        pacientRepository.insertPacient(paciente);
        return "Pacient created: " + paciente.getPacienteCpf();
    }

    @DeleteMapping("/{cpf}")
    public String deletePacient(@PathVariable String cpf) {
        pacientRepository.deletePacient(cpf);
        return "Pacient deleted: " + cpf;
    }
    @GetMapping
    public List<PacienteUrgencia> getAllPacients() {
        return pacientRepository.selectPacients();
    }

    @PutMapping("/{cpf}")
    public String updatePacient(@PathVariable String cpf, @RequestBody PacienteUrgencia paciente) {
        pacientRepository.updatePacient(cpf, paciente);
        return "Pacient updated: " + cpf;
    }

    @GetMapping("/{cpf}")
    public PacienteUrgencia getPacient(@PathVariable String cpf){
        return pacientRepository.selectPacient(cpf);
    }
}
