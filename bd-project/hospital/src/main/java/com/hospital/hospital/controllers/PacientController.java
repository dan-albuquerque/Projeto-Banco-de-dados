package com.hospital.hospital.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.pacientes.Paciente;

import com.hospital.hospital.repository.PacientRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pacient")
public class PacientController {

    @Autowired
    private PacientRepository pacientRepository;

    @PostMapping
    public String createPacient(@RequestBody Paciente paciente) {
        pacientRepository.insertPacient(paciente);
        return "Pacient created: " + paciente.getNome();
    }

    @DeleteMapping
    public String deletePacient(@RequestBody Paciente paciente){
        pacientRepository.deletePacient(paciente);
        return "Pacient deleted! ";
    }

    @GetMapping
    public List<Paciente> getAllPacients() {
        return pacientRepository.selectPacients();
    }


}
