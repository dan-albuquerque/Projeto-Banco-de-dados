package com.hospital.hospital.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital.models.relacoes.Monitora;

import com.hospital.hospital.repository.MonitoraRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/monitora")
public class MonitoraController {

    @Autowired
    private MonitoraRepository monitoraRepository;

    @PostMapping
    public String createMonitora(@RequestBody Monitora monitora) {
        monitoraRepository.insertMonitora(monitora);
        return "Monitora created: " ;
    }

    @DeleteMapping
    public String deleteMonitora(@RequestBody Monitora monitora){
        monitoraRepository.deleteMonitora(monitora);
        return "Monitora deleted! ";
    }

    @GetMapping
    public List<Monitora> getAllMonitoras() {
        return monitoraRepository.selectMonitoras();
    }

    @PutMapping
    public String updateMonitora(@RequestBody Monitora monitora){
        monitoraRepository.updateMonitora(monitora);
        return "Monitora updated!";
    }

    @GetMapping("/{fk_cpf_interno}/{fk_cpf_paciente}")
    public Monitora getMonitora(@PathVariable String fk_cpf_interno, @PathVariable String fk_cpf_paciente){
        return monitoraRepository.selectMonitora(fk_cpf_interno, fk_cpf_paciente);
    }

}
