package com.hospital.hospital.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;

import com.hospital.hospital.models.informacao.Comorbidade;
import com.hospital.hospital.repository.ComorbidadeRepository;

@RestController
@RequestMapping("/comorbidade")
public class ComorbidadeController {

    @Autowired
    private ComorbidadeRepository comorbidadeRepository;

    @PostMapping
    public String createComorbidade(@RequestBody Comorbidade comorbidade) {
        comorbidadeRepository.insertComorbidade(comorbidade);
        return "Comorbidade created: " + comorbidade.getNome();
    }

    @DeleteMapping("/{fk_registro_urgencia_codigo}/{id}")
    public String deleteComorbidade(@PathVariable int fk_registro_urgencia_codigo,@PathVariable int id){
        comorbidadeRepository.deleteComorbidade(fk_registro_urgencia_codigo, id);
        return "Comorbidade deleted! " + id;
    }

    @GetMapping()
    public List<Comorbidade> getAllComorbidade(){
        return comorbidadeRepository.selectComorbidades();
    }

    @GetMapping("/{fk_registro_urgencia_codigo}")
    public List<Comorbidade> getComorbidadeByRegistro(@PathVariable int fk_registro_urgencia_codigo){
        return comorbidadeRepository.selectComorbidadesByRegistro(fk_registro_urgencia_codigo);
    }

    @PutMapping("/{fk_registro_urgencia_codigo}/{id}")
    public String updateComorbidade(@PathVariable int fk_registro_urgencia_codigo, @PathVariable int id,@RequestBody Comorbidade comorbidade) {
        comorbidadeRepository.updateComorbidade(fk_registro_urgencia_codigo, id, comorbidade);
        return "Comorbidade updated: " + comorbidade.getId();
    }
}
