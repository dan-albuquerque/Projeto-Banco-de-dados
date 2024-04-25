package com.hospital.hospital.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.hospital.hospital.models.relacoes.Examina;
import org.springframework.web.bind.annotation.PutMapping;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import com.hospital.hospital.repository.ExaminaRepository;

@RestController
@RequestMapping("/examina")
public class ExaminaController {
    @Autowired
    private ExaminaRepository examinaRepository;

    @PostMapping
    public String createExamina(@RequestBody Examina examina) {
        examinaRepository.insertExamina(examina);
        return "Examina created: " + examina.getMedicoCpf();
    }

    @DeleteMapping({"/{medicoCpf}/{pacienteInternadoCpf}"})
    public String deleteExamina(@PathVariable String medicoCpf, @PathVariable String pacienteInternadoCpf){
        examinaRepository.deleteExamina(medicoCpf, pacienteInternadoCpf);
        return "Examina deleted! ";
    }

    @GetMapping
    public List<Examina> getAllExaminas() {
        return examinaRepository.selectExaminas();
    }

    @GetMapping("/{medicoCpf}/{pacienteInternadoCpf}")
    public Examina getExaminaById(@PathVariable String medicoCpf, @PathVariable String pacienteInternadoCpf){
        return examinaRepository.selectExamina(medicoCpf, pacienteInternadoCpf);
    }

    @PutMapping("/{medicoCpf}/{pacienteInternadoCpf}")
    public String updateExamina(@PathVariable String medicoCpf, @PathVariable String pacienteInternadoCpf, @RequestBody Examina examina){
        examinaRepository.updateExamina(medicoCpf, pacienteInternadoCpf);
        return "Examina updated: " + examina.getMedicoCpf();
    }
    
}
