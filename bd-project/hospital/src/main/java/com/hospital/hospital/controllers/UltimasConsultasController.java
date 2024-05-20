package com.hospital.hospital.controllers;

import com.hospital.hospital.models.DTOs.UltimasConsultasDTO;
import com.hospital.hospital.repository.UltimasConsultasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping("/dashboard/ultimas-consultas")
public class UltimasConsultasController {

    @Autowired
    private UltimasConsultasRepository ultimasConsultasRepository;

    @GetMapping()
    public List<UltimasConsultasDTO> getLatestConsultations() {
        return ultimasConsultasRepository.getLatestConsultations();
    }
}
