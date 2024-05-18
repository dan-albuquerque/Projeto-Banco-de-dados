package com.hospital.hospital.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.DTOs.QuantidadeMedicosDTO;
import com.hospital.hospital.repository.QuantidadeMedicosRepository;

@RestController
@RequestMapping("/dashboard/quantidade-medicos")
public class QuantidadeMedicosController {

    @Autowired
    private QuantidadeMedicosRepository quantidadeMedicosRepository;

    @GetMapping()
    public QuantidadeMedicosDTO getDoctorCount() {
        System.out.println("to aqui no controller");
        return quantidadeMedicosRepository.getDoctorCount();
    }
    
}
