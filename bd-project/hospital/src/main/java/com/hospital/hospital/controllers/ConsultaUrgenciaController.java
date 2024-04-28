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
    public String createConsultaUrgencia(@RequestBody ConsultaUrgencia consultaUrgencia){
        consultaUrgenciaRepository.insertConsultaUrgencia(consultaUrgencia);
        return "ConsultaUrgencia added!" + consultaUrgencia.getDataRealizacao() + " " + 
                consultaUrgencia.getRegistroUrgenciaCodigo() + " " + 
                consultaUrgencia.getMedicoCpf() + " " + 
                consultaUrgencia.getPacienteUrgenciaCpf();
    }

    @DeleteMapping("/{codigo}/{cpfMedico}/{cpfPaciente}")
    public String deleteConsultaUrgencia(@PathVariable int codigo, @PathVariable String cpfMedico, @PathVariable String cpfPaciente){
        consultaUrgenciaRepository.deleteConsultaUrgencia(codigo, cpfMedico, cpfPaciente);
        return "ConsultaUrgencia deleted: " + codigo + " " + cpfMedico + " " + cpfPaciente;
    }

    @GetMapping()
    public List<ConsultaUrgencia> getAllConsultaUrgencias(){
        return consultaUrgenciaRepository.selectAllConsultaUrgencias();
    }

    @GetMapping("/{cod_registro}/{cpfMedico}/{cpfPaciente}")
    public ConsultaUrgencia getConsultaUrgencia(@PathVariable int cod_registro, @PathVariable String cpfMedico, 
                                                @PathVariable String cpfPaciente){
        return consultaUrgenciaRepository.selectConsultaUrgencia(cod_registro, cpfMedico, cpfPaciente);
    }

    @PutMapping("/{cod_registro}/{cpfMedico}/{cpfPaciente}")
    public String updateConsultaUrgencia(@PathVariable int cod_registro, @PathVariable String cpfMedico, 
                                         @PathVariable String cpfPaciente, @RequestBody ConsultaUrgencia consultaUrgencia){
        consultaUrgenciaRepository.updateConsultaUrgencia(cod_registro, cpfMedico, cpfPaciente, consultaUrgencia);
        return "ConsultaUrgencia updated: " + cod_registro + " " + cpfMedico + " " + cpfPaciente;
    }
}
