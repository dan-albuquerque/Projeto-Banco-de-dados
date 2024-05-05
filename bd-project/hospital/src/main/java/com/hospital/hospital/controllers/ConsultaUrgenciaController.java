package com.hospital.hospital.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/paciente/{cpfPaciente}")
    public List<ConsultaUrgencia> getConsultaInternadoByPaciente(@PathVariable String cpfPaciente) {
        return consultaUrgenciaRepository.selectConsultaUrgenciaByPaciente(cpfPaciente);
    }

    @GetMapping("/medico/{cpfMedico}")
    public List<ConsultaUrgencia> getConsultaInternadoByMedico(@PathVariable String cpfMedico) {
        return consultaUrgenciaRepository.selectConsultaUrgenciaByMedico(cpfMedico);
    }
}
