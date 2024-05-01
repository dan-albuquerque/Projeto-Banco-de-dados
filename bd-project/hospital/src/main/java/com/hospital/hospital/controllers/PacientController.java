package com.hospital.hospital.controllers;

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

    @DeleteMapping("/{cpf}")
    public String deletePacient(@PathVariable String cpf){
        pacientRepository.deletePacient(cpf);
        return "Pacient deleted: " + cpf;
        }

        @GetMapping
        public List<Paciente> getAllPacients(@RequestParam(required = false) String sort, 
                        @RequestParam(required = false) boolean reverse){
        boolean sortAlphabetically = "alphabetical".equals(sort);
        System.out.println("sortAlphabetically: " + sortAlphabetically + " reverseOrder: " + reverse);
        return pacientRepository.selectPacients(sortAlphabetically, reverse);
        }

        @PutMapping("/{cpf}")
        public String updatePacient(@PathVariable String cpf, @RequestBody Paciente paciente) {
        pacientRepository.updatePacient(cpf, paciente);  // Note: Using path variable 'cpf' directly.
        return "Pacient updated: " + paciente.getNome();
    }

    @GetMapping("/{cpf}")
    public Paciente getPacient(@PathVariable String cpf){
        return pacientRepository.selectPacient(cpf);
    }
    


}
