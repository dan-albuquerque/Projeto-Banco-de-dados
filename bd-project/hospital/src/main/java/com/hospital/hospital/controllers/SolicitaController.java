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

    @DeleteMapping("/{examinaMedicoCpf}/{examinaPacienteInternadoCpf}/{exameComplementarCodigo}")
    public String deleteSolicita(@PathVariable String examinaMedicoCpf, 
                                @PathVariable String examinaPacienteInternadoCpf, 
                                @PathVariable int exameComplementarCodigo) {

        solicitaRepository.deleteSolicita(examinaMedicoCpf, examinaPacienteInternadoCpf, exameComplementarCodigo);

        return "Solicita deleted: " + 
                examinaMedicoCpf + " " + 
                examinaPacienteInternadoCpf + " " + 
                exameComplementarCodigo;
    }

    @GetMapping
    public List<Solicita> getAllSolicitas() {
        return solicitaRepository.selectSolicitas();
    }

    @GetMapping("/{examinaMedicoCpf}/{examinaPacienteInternadoCpf}/{exameComplementarCodigo}")
    public Solicita getSolicitaById(@PathVariable String examinaMedicoCpf, 
                                    @PathVariable String examinaPacienteInternadoCpf, 
                                    @PathVariable int exameComplementarCodigo) {
        return solicitaRepository.selectSolicita(examinaMedicoCpf, examinaPacienteInternadoCpf, exameComplementarCodigo);
    }

    // falar com gabi pra saber se faz sentido alterar essa entidade
    @PutMapping
    public String updateSolicita(@PathVariable String examinaMedicoCpf, 
                                @PathVariable String examinaPacienteInternadoCpf, 
                                @PathVariable int exameComplementarCodigo,
                                @RequestBody Solicita solicita) {

        solicitaRepository.updateSolicita(examinaMedicoCpf, examinaPacienteInternadoCpf, exameComplementarCodigo);
        return "Solicita updated: " + solicita.getMedicoCpf() + " " + solicita.getPacienteInternadoCpf() + " " + solicita.getExameComplementarCodigo();
    }
}
