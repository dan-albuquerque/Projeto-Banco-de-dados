package com.hospital.hospital.controllers;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.Interno;
import com.hospital.hospital.repository.InternRepository;

import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/intern")
public class InternController {
    @PostMapping
    public String createIntern(@RequestBody Interno interno) {
        InternRepository ir = new InternRepository();
        ir.insertIntern(interno);
        return "Intern created: " + interno.getNome();
    }
    @DeleteMapping
    public String deleteIntern(@PathVariable String intern){
        return "Intern deleted: " + intern;
    }
    @GetMapping
    public String getIntern(){
        InternRepository intern = new InternRepository();
        intern.selectInterno();
        return "Intern selected";
    }

}
