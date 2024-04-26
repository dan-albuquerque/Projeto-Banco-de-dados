package com.hospital.hospital.controllers;

import com.hospital.hospital.models.relacoes.Solicita;
import com.hospital.hospital.repository.SolicitaRepository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/solicita")
public class SolicitaController {

    @Autowired
    private SolicitaRepository solicitaRepository;

    @PostMapping
    public String createSolicita(@RequestBody Solicita solicita) {
        solicitaRepository.insertSolicita(solicita); 
        return "Solicita created! ";
    }

    @DeleteMapping
    public String deleteSolicita(@RequestBody Solicita solicita) {
        solicitaRepository.deleteSolicita(solicita.getMedicoCpf(), solicita.getPacienteInternadoCpf(), solicita.getExameComplementarCodigo());
        return "Solicita deleted: " + solicita.getMedicoCpf() + " " + solicita.getPacienteInternadoCpf() + " " + solicita.getExameComplementarCodigo();
    }

    @GetMapping
    public List<Solicita> getAllSolicitas() {
        return solicitaRepository.selectSolicitas();
    }

    @PutMapping
    public String updateSolicita(@PathVariable String examinaMedicoCpf, 
                                @PathVariable String examinaPacienteInternadoCpf, 
                                @PathVariable int exameComplementarCodigo,
                                @RequestBody Solicita solicita) {

        solicitaRepository.updateSolicita(examinaMedicoCpf, examinaPacienteInternadoCpf, exameComplementarCodigo);
        return "Solicita updated: " + solicita.getMedicoCpf() + " " + solicita.getPacienteInternadoCpf() + " " + solicita.getExameComplementarCodigo();
    }
}
