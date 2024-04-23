package com.hospital.hospital.controllers;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.Interno;
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
    public String deleteIntern(@PathVariable String intern){
        return "Intern deleted: " + intern;
    }

    @GetMapping
    public List<Interno> getAllInterns() {
        return internRepository.selectInterns();
    }

}