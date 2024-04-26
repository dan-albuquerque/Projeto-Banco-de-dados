package com.hospital.hospital.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hospital.hospital.repository.ConsultaUrgenciaRepository;
import com.hospital.hospital.models.consultas.ConsultaUrgencia;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/consulta_urgencia")
public class ConsultaUrgenciaController {
    
    @Autowired
    private ConsultaUrgenciaRepository consultaUrgenciaRepository;

    @PostMapping
    public String createConsultaUrgencia(@RequestBody ConsultaUrgencia consultaUrgencia) {
        consultaUrgenciaRepository.insertConsultaUrgencia(consultaUrgencia);
        return "Consulta Urgencia criada: " + 
               consultaUrgencia.getMedicoCpf() + " " + 
               consultaUrgencia.getPacienteUrgenciaCpf() + " " + 
               consultaUrgencia.getRegistroUrgenciaCodigo() + " " +
               consultaUrgencia.getDataRealizacao();
    }

    @GetMapping
    public List<ConsultaUrgencia> getConsultasUrgencia() {
        return consultaUrgenciaRepository.selectAllConsultaUrgencias();
    }

    @GetMapping("/{fk_medico_cpf}/{fk_paciente_urgencia_cpf}/{fk_registro_urgencia_codigo}")
    public ConsultaUrgencia getConsultaUrgencia(@PathVariable String fk_medico_cpf, 
                                                @PathVariable String fk_paciente_urgencia_cpf, 
                                                @PathVariable int fk_registro_urgencia_codigo) {
        return consultaUrgenciaRepository.selectConsultaUrgencia(fk_medico_cpf, fk_paciente_urgencia_cpf, 
                                                                fk_registro_urgencia_codigo);
    }

    @DeleteMapping
    public String deleteConsultaUrgencia(@RequestBody ConsultaUrgencia consultaUrgencia) {
        consultaUrgenciaRepository.deleteConsultaUrgencia(consultaUrgencia);
        return "Consulta Urgencia deletada: " + 
               consultaUrgencia.getMedicoCpf() + " " + 
               consultaUrgencia.getRegistroUrgenciaCodigo() + " " +
                consultaUrgencia.getPacienteUrgenciaCpf();
    }

    @PutMapping
    public String updateConsultaUrgencia(@RequestBody ConsultaUrgencia consultaUrgencia) {
        consultaUrgenciaRepository.updateConsultaUrgencia(consultaUrgencia);
        return "Consulta Urgencia atualizada: " + 
               consultaUrgencia.getMedicoCpf() + " " + 
               consultaUrgencia.getPacienteUrgenciaCpf() + " " + 
               consultaUrgencia.getRegistroUrgenciaCodigo();
    }
}
