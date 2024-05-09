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
        return "Hipotese  (id, registro_codigo, descricao): " + hipotese.getId() + " " + hipotese.getRegistroCodigo() + " " + hipotese.getDescricao();
    }

    @DeleteMapping("/{fk_registro_codigo}/{id}")
    public String deleteHipotese(@PathVariable int fk_registro_codigo, @PathVariable int id) {
        hipoteseRepository.deleteHipotese(fk_registro_codigo, id);
        return "Hipotese deleted (d, registro_codigo): " + id + " " + fk_registro_codigo;
    }

    @GetMapping
    public List<Hipotese> getAllHipoteses() {
        return hipoteseRepository.selectHipoteses();
    }

    @GetMapping("/{fk_registro_codigo}/{id}")
    public Hipotese getHipoteseById(@PathVariable int id, @PathVariable int fk_registro_codigo) {
        return hipoteseRepository.selectHipotese(id, fk_registro_codigo);
    }
    
    @PutMapping("/{fk_registro_codigo}/{id}")
    public String updateHipotese(@PathVariable int id, @PathVariable int fk_registro_codigo, @RequestBody Hipotese hipotese){
        hipoteseRepository.updateHipotese(id, fk_registro_codigo, hipotese);
        return "Hipotese updated: " + hipotese.getId();
    }

    @GetMapping("/{fk_registro_codigo}")
    public List<Hipotese> getHipotesesByRegistro(@PathVariable int fk_registro_codigo){
        return hipoteseRepository.selectHipotesesByRegistro(fk_registro_codigo);
    }
}
