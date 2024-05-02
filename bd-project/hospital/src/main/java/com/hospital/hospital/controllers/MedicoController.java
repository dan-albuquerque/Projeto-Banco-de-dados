package com.hospital.hospital.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.hospital.hospital.repository.MedicoRepository;
import com.hospital.hospital.models.elenco.Medico;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/medico")
public class MedicoController {
    @Autowired
    private MedicoRepository medicoRepository;

    @PostMapping
    public String createMedico(@RequestBody Medico medico) {
        medicoRepository.insertMedico(medico);
        return medico.toString();
    }

    @GetMapping
    public List<Medico> getMedicos(@RequestParam(required = false) String sort,
                                @RequestParam(required = false) boolean reverse) {
        boolean sortAlphabetically = "alphabetical".equals(sort);
        boolean sortNumerically = "numerical".equals(sort);
        System.out.println("sortAlphabetically: " + sortAlphabetically + " reverseOrder: " + reverse +
                " sortNumerically: " + sortNumerically);
        return medicoRepository.selectMedicos(sortAlphabetically, reverse, sortNumerically);
    }

    @GetMapping("/{cpf}")
    public Medico getMedico(@PathVariable String cpf) {
        return medicoRepository.selectMedico(cpf);
    }

    @DeleteMapping("/{cpf}")
    public String deleteMedico(@PathVariable String cpf) {
        medicoRepository.deleteMedico(cpf);
        return "Medico deletado!";
    }

    @PutMapping("/{cpf}")
    public String updateMedico(@PathVariable String cpf, @RequestBody Medico medico) {
        medico.setCpf(cpf);
        medicoRepository.updateMedico(medico);
        return medico.toString();
    }
}
