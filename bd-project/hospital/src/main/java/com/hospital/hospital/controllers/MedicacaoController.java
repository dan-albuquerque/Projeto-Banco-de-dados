package com.hospital.hospital.controllers;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.hospital.hospital.models.informacao.Medicacao;
import org.springframework.web.bind.annotation.PutMapping;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import com.hospital.hospital.repository.MedicacaoRepository;

@RestController
@RequestMapping("/medicacao")
public class MedicacaoController {
    
    @Autowired
    private MedicacaoRepository medicacaoRepository;

    @PostMapping
    public String createMedicacao(@RequestBody Medicacao medicacao) {
        medicacaoRepository.insertMedicacao(medicacao);
        return "Medicacao created: " + medicacao.getId();
    }

    @DeleteMapping("/{id}")
    public String deleteMedicacao(@PathVariable int id){
        medicacaoRepository.deleteMedicacao(id);
        return "Medicacao deleted: " + id;
    }

    @GetMapping
    public List<Medicacao> getAllMedicacoes() {
        return medicacaoRepository.selectMedicacoes();
    }

    @GetMapping("/{id}")
    public Medicacao getMedicacaoById(@PathVariable int id){
        return medicacaoRepository.selectMedicacao(id);
    }

    @PutMapping("/{id}")
    public String updateMedicacao(@PathVariable int id, @RequestBody Medicacao medicacao){
        medicacaoRepository.updateMedicacao(medicacao);
        return "Medicacao updated: " + medicacao.getId();
    }
}
