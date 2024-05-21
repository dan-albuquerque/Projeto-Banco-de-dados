package com.hospital.hospital.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hospital.hospital.models.DTOs.QuantidadeCasosUrgenciaDTO;
import com.hospital.hospital.repository.QuantidadeUrgenteRepository;
@RestController
public class QuantidadeCasosUrgenciaController {
    @Autowired
    private QuantidadeUrgenteRepository urgenteRepository;

    @GetMapping("dashboard/urgencia/count")
    public QuantidadeCasosUrgenciaDTO getUrgenciaCount() {
        return urgenteRepository.getUrgenciaCount();
    }
}