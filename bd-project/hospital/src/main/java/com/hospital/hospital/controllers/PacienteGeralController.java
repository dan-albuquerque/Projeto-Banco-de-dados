package com.hospital.hospital.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.DTOs.PacienteGeralDTO;
import com.hospital.hospital.repository.PacienteGeralRepository;

@RestController
@RequestMapping("/paciente_geral")
public class PacienteGeralController {
    
    @Autowired
    private PacienteGeralRepository pacienteGeralRepository;

    @GetMapping()
    public List<PacienteGeralDTO> getPacientesGerais(@RequestParam(required = false) String sort,
                                                     @RequestParam(required = false) boolean reverse,
                                                     @RequestParam(required = false) String searchName) {
        
        boolean sortAlphabetically = "alphabetical".equals(sort);
        boolean sortNumerically = "numerical".equals(sort);
        boolean isSearch = "search".equals(sort);
        if (searchName != null && !searchName.isEmpty()) {
            System.out.println("searchName: " + searchName + " isSearch: " + isSearch);
            return pacienteGeralRepository.searchPacientesGerais(isSearch, searchName);
        }
        System.out.println("sortAlphabetically: " + sortAlphabetically + " reverseOrder: " + reverse +
                " sortNumerically: " + sortNumerically);
        return pacienteGeralRepository.getPacientesGerais(sortAlphabetically, reverse, sortNumerically);
    }
}
