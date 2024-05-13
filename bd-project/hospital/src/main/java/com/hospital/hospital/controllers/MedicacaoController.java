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

    @DeleteMapping("/{fk_registro_urgencia_codigo}/{id}")
    public String deleteMedicacao(@PathVariable int fk_registro_urgencia_codigo,@PathVariable int id){
        medicacaoRepository.deleteMedicacao(fk_registro_urgencia_codigo, id);
        return "Medicacao deleted: " + id;
    }

    @GetMapping
    public List<Medicacao> getAllMedicacoes() {
        return medicacaoRepository.selectMedicacoes();
    }

    @GetMapping("/{fk_registro_urgencia_codigo}/{id}")
    public Medicacao getMedicacaoById(@PathVariable int fk_registro_urgencia_codigo, @PathVariable int id){
        return medicacaoRepository.selectMedicacao(fk_registro_urgencia_codigo, id);
    }

    @PutMapping("/{fk_registro_urgencia_codigo}/{id}")
    public String updateMedicacao(@PathVariable int fk_registro_urgencia_codigo,@PathVariable int id, @RequestBody Medicacao medicacao){
        medicacaoRepository.updateMedicacao(fk_registro_urgencia_codigo, id, medicacao);
        return "Medicacao updated: " + medicacao.getId();
    }
}
