package com.hospital.hospital.controllers;

import com.hospital.hospital.models.DTOs.UltimasConsultasDTO;
import com.hospital.hospital.repository.UltimasConsultasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping("/dashboard")
public class UltimasConsultasController {

    @Autowired
    private UltimasConsultasRepository dashboardRepository;

    @GetMapping("/latest-consultations")
    public List<UltimasConsultasDTO> getLatestConsultations() {
        return dashboardRepository.getLatestConsultations();
    }
}