package com.hospital.hospital.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;
import com.hospital.hospital.models.pacientes.Comorbidade;
import com.hospital.hospital.repository.ComorbidadeRepository;

@RestController
@RequestMapping("/comorbidade")
public class ComorbidadeController {

    @Autowired
    private ComorbidadeRepository comorbidadeRepository;

    @PostMapping
    public String createComorbidade(@RequestBody Comorbidade comorbidade) {
        comorbidadeRepository.insertComorbidade(comorbidade);
        return "Comorbidade created: " + comorbidade.getNome();
    }

    @DeleteMapping("/{id}")
    public String deleteComorbidade(@PathVariable int id){
        comorbidadeRepository.deleteComorbidade(id);
        return "Comorbidade deleted! " + id;
    }

    @GetMapping()
    public List<Comorbidade> getAllComorbidade(){
        return comorbidadeRepository.selectComorbidades();
    }

    @GetMapping("/{id}")
    public Comorbidade getComorbidadeById(@PathVariable int id){
        return comorbidadeRepository.selectComorbidadesById(id);
    }

    @PutMapping("/{id}")
    public String updateComorbidade(@RequestBody Comorbidade comorbidade) {
        comorbidadeRepository.updateComorbidade(comorbidade);
        return "Comorbidade updated: " + comorbidade.getId();
    }

}
