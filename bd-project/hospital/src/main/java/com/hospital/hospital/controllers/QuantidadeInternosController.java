package com.hospital.hospital.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.DTOs.QuantidadeInternosDTO;
import com.hospital.hospital.repository.QuantidadeInternosRepository;

@RestController
@RequestMapping("/dashboard/quantidade-internos")
public class QuantidadeInternosController {

    @Autowired
    private QuantidadeInternosRepository quantidadeInternosRepository;

    @GetMapping()
    public QuantidadeInternosDTO getInternCount() {
        return quantidadeInternosRepository.getInternCount();
    }

}
