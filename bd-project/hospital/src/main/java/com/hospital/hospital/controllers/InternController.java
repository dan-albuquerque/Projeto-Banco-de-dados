package com.hospital.hospital.controllers;
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

    @GetMapping
    public List<Interno> getAllInterns(@RequestParam(required = false) String sort,
                                    @RequestParam(required = false) boolean reverse) {
        boolean sortAlphabetically = "alphabetical".equals(sort);
        boolean sortNumerically = "numerical".equals(sort);
        System.out.println("sortAlphabetically: " + sortAlphabetically + " reverseOrder: " + reverse +
                " sortNumerically: " + sortNumerically);
        return internRepository.selectInterns(sortAlphabetically, reverse, sortNumerically);
    }

    @PutMapping("/{cpf}")
    public String updateIntern(@PathVariable String cpf, @RequestBody Interno interno) {
        internRepository.updateIntern(cpf, interno);  // Note: Using path variable 'cpf' directly.
        return "Intern updated: " + interno.getNome();
    }

    @GetMapping("/{cpf}")
    public Interno getIntern(@PathVariable String cpf){
        return internRepository.selectIntern(cpf);
    }

    @DeleteMapping("/{cpf}")
    public String deleteIntern(@PathVariable String cpf){
        internRepository.deleteIntern(cpf);
        return "Intern deleted: " + cpf;
    }

   

}