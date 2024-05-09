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

    @GetMapping()
    public List<Interno> getAllInterns(@RequestParam(required = false) String sort,
                                    @RequestParam(required = false) boolean reverse,
                                    @RequestParam(required = false) String searchName){
        boolean sortAlphabetically = "alphabetical".equals(sort);
        boolean sortNumerically = "numerical".equals(sort);
        boolean isSearch = "search".equals(sort);
        if (searchName != null && !searchName.isEmpty()) {
            System.out.println("searchName: " + searchName + " isSearch: " + isSearch);
            return internRepository.searchInterns(isSearch, searchName);
        }
        System.out.println("sortAlphabetically: " + sortAlphabetically + " reverseOrder: " + reverse +
                " sortNumerically: " + sortNumerically + " isSearch: " + isSearch + " searchName: " + searchName);
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