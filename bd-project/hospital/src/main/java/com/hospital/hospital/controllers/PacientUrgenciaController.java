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

    @DeleteMapping
    public String deletePacient(@RequestBody PacienteUrgencia paciente){
        pacientRepository.deletePacient(paciente);
        return "Pacient deleted! ";
    }

    @GetMapping
    public List<PacienteUrgencia> getAllPacients() {
        return pacientRepository.selectPacients();
    }

    @PutMapping
    public String updatePacient(@RequestBody PacienteUrgencia paciente){
        pacientRepository.updatePacient(paciente);
        return "Pacient updated: " + paciente.getPacienteCpf();
    }
}
