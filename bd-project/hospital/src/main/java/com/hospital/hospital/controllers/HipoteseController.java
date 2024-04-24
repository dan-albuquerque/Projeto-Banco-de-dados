package com.hospital.hospital.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.hospital.hospital.models.informacao.Hipotese;
import org.springframework.web.bind.annotation.PutMapping;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import com.hospital.hospital.repository.HipoteseRepository;

@RestController
@RequestMapping("/hipotese")
public class HipoteseController {
    @Autowired
    private HipoteseRepository hipoteseRepository;

    @PostMapping
    public String createHipotese(@RequestBody Hipotese hipotese) {
        hipoteseRepository.insertHipotese(hipotese);
        return "Hipotese created: " + hipotese.getId();
    }

    @DeleteMapping
    public String deleteHipotese(@RequestBody Hipotese hipotese){
        hipoteseRepository.deleteHipotese(hipotese);
        return "Hipotese deleted! ";
    }

    @GetMapping
    public List<Hipotese> getAllHipoteses() {
        return hipoteseRepository.selectHipoteses();
    }

    @GetMapping("/{id}")
    public Hipotese getHipoteseById(@PathVariable int id){
        return hipoteseRepository.selectHipotese(id);
    }
    
    @PutMapping("/{id}")
    public String updateHipotese(@PathVariable int id, @RequestBody Hipotese hipotese){
        hipoteseRepository.updateHipotese(hipotese);
        return "Hipotese updated: " + hipotese.getId();
    }
}
