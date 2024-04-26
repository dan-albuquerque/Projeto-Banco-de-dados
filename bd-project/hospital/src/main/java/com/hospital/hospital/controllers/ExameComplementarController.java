package com.hospital.hospital.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.hospital.hospital.models.informacao.ExameComplementar;
import com.hospital.hospital.repository.ExameComplementarRepository;

@RestController
@RequestMapping("/examecomplementar")
public class ExameComplementarController {

    @Autowired
    private ExameComplementarRepository exameComplementarRepository;

    @PostMapping
    public String createExameComplementar(@RequestBody ExameComplementar exameComplementar) {
        exameComplementarRepository.insertExameComplementar(exameComplementar);
        return "ExameComplementar created: " + exameComplementar.getCodigo();
    }

    @DeleteMapping("/{codigo}")
    public String deleteExameComplementar(@PathVariable int codigo){
        exameComplementarRepository.deleteExameComplementar(codigo);
        return "ExameComplementar deleted: "+ codigo;
    }

    @GetMapping()
    public List<ExameComplementar> getAllExamesComplementares() {
        return exameComplementarRepository.selectExamesComplementares();
    }

    @GetMapping("/{codigo}")
    public ExameComplementar getExameComplementarByCodigo(@PathVariable int codigo){
        return exameComplementarRepository.selectExameComplementarByCodigo(codigo);
    }

    @PutMapping
    public String updateExameComplementar(@RequestBody ExameComplementar exameComplementar){
        exameComplementarRepository.updateExameComplementar(exameComplementar);
        return "ExameComplementar updated: " + exameComplementar.getCodigo();
    }
}