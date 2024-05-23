package com.hospital.hospital.controllers;
import com.hospital.hospital.models.DTOs.SpecialityDemandDTO;
import com.hospital.hospital.repository.SpecialityDemandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard/speciality-demand")
public class SpecialityDemandController {

    @Autowired
    private SpecialityDemandRepository repository;

    @GetMapping("/demand")
    public List<SpecialityDemandDTO> getSpecialityDemand() {
        return repository.findSpecialityDemand();
    }
}
