package com.hospital.hospital.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hospital.hospital.models.DTOs.QuantidadeInternadosDTO;
import com.hospital.hospital.repository.QuantidadeInternadosRepository;
@RestController
public class QuantidadeInternadosController {
    @Autowired
    private QuantidadeInternadosRepository internadosRepository;

    @GetMapping("dashboard/internados/count")
    public QuantidadeInternadosDTO getInternadoCount() {
        return internadosRepository.getInternadoCount();
    }
}
