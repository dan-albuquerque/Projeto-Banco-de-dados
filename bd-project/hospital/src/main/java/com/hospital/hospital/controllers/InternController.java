package com.hospital.hospital.controllers;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.elenco.Interno;
import com.hospital.hospital.repository.InternRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/intern")
public class InternController {
    @Autowired
    private InternRepository internRepository;

    @PostMapping
    public String createIntern(@RequestBody Interno interno) {
        internRepository.insertIntern(interno);
        return "Intern created: " + interno.getNome();
    }

    @DeleteMapping
    public String deleteIntern(@RequestBody Interno interno){
        internRepository.deleteIntern(interno);
        return "Intern deleted! ";
    }

    @GetMapping
    public List<Interno> getAllInterns() {
        return internRepository.selectInterns();
    }

    @PutMapping
    public String updateIntern(@RequestBody Interno interno){
        internRepository.updateIntern(interno);
        return "Intern updated: " + interno.getNome();
    }

    @GetMapping("/{cpf}")
    public Interno getIntern(@PathVariable String cpf){
        return internRepository.selectIntern(cpf);
    }

   

}