package com.hospital.hospital.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.DTOs.MediaConsultasDTO;
import com.hospital.hospital.repository.MediaConsultasRepository;

@RestController
@RequestMapping("/dashboard/media-consultas")
public class MediaConsultasController {

    @Autowired
    private MediaConsultasRepository mediaConsultasRepository;

    @GetMapping()
    public List<MediaConsultasDTO> getAverageConsultations() {
        return mediaConsultasRepository.getAverageConsultations();
    }
    
}
