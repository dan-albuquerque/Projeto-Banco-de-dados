package com.hospital.hospital.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hospital.hospital.models.DTOs.ConsultaUrgenciaDTO;
import com.hospital.hospital.models.consultas.ConsultaUrgencia;
import com.hospital.hospital.models.consultas.ConsultaUrgenciaRequest;
import com.hospital.hospital.repository.ConsultaUrgenciaRepository;

@RestController
@RequestMapping("/consulta_urgencia")
public class ConsultaUrgenciaController {

    @Autowired
    private ConsultaUrgenciaRepository consultaUrgenciaRepository;

    @PostMapping
    public String createConsultaUrgencia(@RequestBody ConsultaUrgencia consultaUrgencia) {
        consultaUrgenciaRepository.insertConsultaUrgencia(consultaUrgencia);
        return "ConsultaUrgencia added!" + consultaUrgencia.getDataRealizacao() + " " +
                consultaUrgencia.getRegistroUrgenciaCodigo() + " " +
                consultaUrgencia.getMedicoCpf() + " " +
                consultaUrgencia.getPacienteUrgenciaCpf();
    }

    @PostMapping("/procedure")
    public ResponseEntity<String> addUrgencyConsultation(@RequestBody ConsultaUrgenciaRequest request) {
        try {
            int regitroCodigo = consultaUrgenciaRepository.addUrgencyConsultation(
                    request.getPacienteCpf(),
                    request.getMedicoCpf(),
                    request.getConduta(),
                    request.getHistoricoDoenca(),
                    request.getExameFisico(),
                    request.getDataConsulta());
            return new ResponseEntity<>("Consulta de urgência adicionada com sucesso. Registro Código: " + regitroCodigo, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao adicionar consulta de urgência: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{codigo}/{cpfMedico}/{cpfPaciente}")
    public String deleteConsultaUrgencia(@PathVariable int codigo, @PathVariable String cpfMedico,
            @PathVariable String cpfPaciente) {
        consultaUrgenciaRepository.deleteConsultaUrgencia(codigo, cpfMedico, cpfPaciente);
        return "ConsultaUrgencia deleted: " + codigo + " " + cpfMedico + " " + cpfPaciente;
    }

    @GetMapping()
    public List<ConsultaUrgencia> getAllConsultaUrgencias() {
        return consultaUrgenciaRepository.selectAllConsultaUrgencias();
    }

    @GetMapping("/{cod_registro}/{cpfMedico}/{cpfPaciente}")
    public ConsultaUrgencia getConsultaUrgencia(@PathVariable int cod_registro, @PathVariable String cpfMedico,
            @PathVariable String cpfPaciente) {
        return consultaUrgenciaRepository.selectConsultaUrgencia(cod_registro, cpfMedico, cpfPaciente);
    }

    @GetMapping("/paciente/{nomePaciente}")
    public List<ConsultaUrgenciaDTO> searchConsultaUrgenciasByPaciente(@PathVariable String nomePaciente) {
        System.out.println(nomePaciente + " - nomePaciente");
        return consultaUrgenciaRepository.selectConsultaUrgenciaDTOByPaciente(nomePaciente);
    }

    @GetMapping("/medico/{cpfMedico}")
    public List<ConsultaUrgencia> getConsultaInternadoByMedico(@PathVariable String cpfMedico) {
        return consultaUrgenciaRepository.selectConsultaUrgenciaByMedico(cpfMedico);
    }

    @GetMapping("/details")
    public List<ConsultaUrgenciaDTO> getConsultaUrgenciaDetails() {
        return consultaUrgenciaRepository.selectConsultaUrgenciaDTO();
    }

    @GetMapping("/details/{cod_registro}/{cpfMedico}/{cpfPaciente}")
    public ConsultaUrgenciaDTO getConsultaUrgenciaDetailsById(@PathVariable int cod_registro,
            @PathVariable String cpfMedico,
            @PathVariable String cpfPaciente) {
        return consultaUrgenciaRepository.selectConsultaUrgenciaDTOById(cod_registro, cpfMedico, cpfPaciente);
    }

}
