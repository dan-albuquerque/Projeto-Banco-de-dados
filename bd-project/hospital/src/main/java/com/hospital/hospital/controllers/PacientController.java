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
    public String deletePacient(@PathVariable String cpf) {
        pacientRepository.deletePacient(cpf);
        return "Pacient deleted: " + cpf;
    }

    @GetMapping
    public List<Paciente> getAllPacients(@RequestParam(required = false) String sort,
                                        @RequestParam(required = false) boolean reverse,
                                        @RequestParam(required = false) String searchName){
        boolean sortAlphabetically = "alphabetical".equals(sort);
        boolean sortNumerically = "numerical".equals(sort);
        boolean isSearch = "search".equals(sort);
        if (searchName != null && !searchName.isEmpty()) {
            System.out.println("searchName: " + searchName + " isSearch: " + isSearch);
            return pacientRepository.searchPacients(isSearch, searchName);
        }
        System.out.println("sortAlphabetically: " + sortAlphabetically + " reverseOrder: " + reverse +
                " sortNumerically: " + sortNumerically);
        return pacientRepository.selectPacients(sortAlphabetically, reverse, sortNumerically);
    }

    @PutMapping("/{cpf}")
    public String updatePacient(@PathVariable String cpf, @RequestBody Paciente paciente) {
        pacientRepository.updatePacient(cpf, paciente); // Note: Using path variable 'cpf' directly.
        return "Pacient updated: " + paciente.getNome();
    }

    @GetMapping("/{cpf}")
    public Paciente getPacient(@PathVariable String cpf) {
        return pacientRepository.selectPacient(cpf);
    }
}
