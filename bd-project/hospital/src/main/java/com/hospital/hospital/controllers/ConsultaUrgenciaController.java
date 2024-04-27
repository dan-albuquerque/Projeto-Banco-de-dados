package com.hospital.hospital.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;

import com.hospital.hospital.models.consultas.ConsultaUrgencia;
import com.hospital.hospital.repository.ConsultaUrgenciaRepository;

@RestController
@RequestMapping("/consulta_urgencia")
public class ConsultaUrgenciaController {

    @Autowired
    private ConsultaUrgenciaRepository consultaUrgenciaRepository;

    @PostMapping
    public String createComorbidade(@RequestBody ConsultaUrgencia consultaUrgencia) {
        consultaUrgenciaRepository.insertConsultaUrgencia(consultaUrgencia);
        return "Comorbidade created: " + consultaUrgencia.getRegistroUrgenciaCodigo();
    }

    @DeleteMapping("/{id}/{cpfMedico}/{cpfPaciente}")
    public String deleteComorbidade(@PathVariable int id, @PathVariable String cpfMedico, @PathVariable String cpfPaciente){
        consultaUrgenciaRepository.deleteConsultaUrgencia(id, cpfMedico, cpfPaciente);
        return "Comorbidade deleted! " + id;
    }

    @GetMapping()
    public List<ConsultaUrgencia> getUrgencias(){
        return consultaUrgenciaRepository.selectAllConsultaUrgencias();
    }

    @GetMapping("/{cod_registro}/{cpfMedico}/{cpfPaciente}")
    public ConsultaUrgencia getConsultaUrgencia(@PathVariable int cod_registro, @PathVariable String cpfMedico, @PathVariable String cpfPaciente){
        return consultaUrgenciaRepository.selectConsultaUrgencia(cod_registro, cpfMedico, cpfPaciente);
    }

    @PutMapping("/{cod_registro}/{cpfMedico}/{cpfPaciente}")
    public String updateConsultaUrgencia(@PathVariable int cod_registro, @PathVariable String cpfMedico, @PathVariable String cpfPaciente, @RequestBody ConsultaUrgencia consultaUrgencia){
        consultaUrgenciaRepository.updateConsultaUrgencia(consultaUrgencia);
        return "ConsultaUrgencia updated! " + cod_registro;
    }
}
