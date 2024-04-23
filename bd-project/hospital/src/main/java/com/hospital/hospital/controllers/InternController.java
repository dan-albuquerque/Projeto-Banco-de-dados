package com.hospital.hospital.controllers;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.Intern;
import com.hospital.hospital.repository.InternRepository;

import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/intern")
public class InternController {
    @PostMapping
    public String createIntern(@RequestBody Intern intern) {
        InternRepository ir = new InternRepository();
        ir.insertIntern(intern);
        return "Intern created: " + intern.getName();
    }
    @DeleteMapping
    public String deleteIntern(@PathVariable String intern){
        return "Intern deleted: " + intern;
    }
    @GetMapping
    public String getIntern(){
        InternRepository intern = new InternRepository();
        intern.selectIntern();
        return "Intern selected";
    }

}
