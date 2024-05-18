package com.hospital.hospital.controllers;

import com.hospital.hospital.models.DTOs.ConsultaInternadoDTO;
import com.hospital.hospital.models.consultas.ConsultaInternado;
import com.hospital.hospital.repository.ConsultaInternadoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/consulta_internado")
public class ConsultaInternadoController {

    @Autowired
    private ConsultaInternadoRepository consultaInternadoRepository;

    @PostMapping
    public String createConsultaInternado(@RequestBody ConsultaInternado consultaInternado) {
        consultaInternadoRepository.insertConsultaInternado(consultaInternado);
        return "ConsultaInternado created: ";
    }

    @DeleteMapping("/{codigo}/{cpfMedico}/{cpfPaciente}")
    public String deleteConsultaInternado(@PathVariable int codigo, @PathVariable String cpfMedico,
            @PathVariable String cpfPaciente) {
        consultaInternadoRepository.deleteConsultaInternado(codigo, cpfMedico, cpfPaciente);
        return "ConsultaInternado deleted! ";
    }

    @GetMapping
    public List<ConsultaInternado> getAllConsultaInternados() {
        return consultaInternadoRepository.selectAllConsultaInternado();
    }

    @GetMapping("/{cod_registro}/{cpfMedico}/{cpfPaciente}")
    public ConsultaInternado getConsultaInternado(@PathVariable int cod_registro, @PathVariable String cpfMedico,
            @PathVariable String cpfPaciente) {
        return consultaInternadoRepository.selectConsultaInternado(cod_registro, cpfMedico, cpfPaciente);
    }

    @GetMapping("/medico/{cpfMedico}")
    public List<ConsultaInternado> getConsultaInternadoByMedico(@PathVariable String cpfMedico) {
        return consultaInternadoRepository.selectConsultaInternadoByMedico(cpfMedico);
    }

    @GetMapping("/paciente/{nomePaciente}")
    public List<ConsultaInternadoDTO> searchConsultaInternadosByPaciente(@PathVariable String nomePaciente) {
        return consultaInternadoRepository.searchByPatientName(nomePaciente);
    }
    
}
