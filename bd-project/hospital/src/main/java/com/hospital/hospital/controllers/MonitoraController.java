package com.hospital.hospital.controllers;
import com.hospital.hospital.models.DTOs.InternoDTO;
import com.hospital.hospital.models.relacoes.Monitora;
import com.hospital.hospital.repository.MonitoraRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/monitora")
public class MonitoraController {

    @Autowired
    private MonitoraRepository monitoraRepository;

    @PostMapping
    public String createMonitora(@RequestBody Monitora monitora) {
        monitoraRepository.insertMonitora(monitora);
        return "Monitora created: " ;
    }

    @DeleteMapping("/{fk_cpf_interno}/{fk_cpf_paciente}")
    public String deleteMonitora(@PathVariable String fk_cpf_interno, @PathVariable String fk_cpf_paciente){
        monitoraRepository.deleteMonitora(fk_cpf_interno, fk_cpf_paciente);
        return "Monitora deleted: ";
    }

    @GetMapping
    public List<Monitora> getAllMonitoras() {
        return monitoraRepository.selectMonitoras();
    }

    @PutMapping("/{fk_cpf_interno}")
    public String updateMonitora(@PathVariable String fk_cpf_interno, @RequestBody Monitora monitora) {
        monitoraRepository.updateMonitora(fk_cpf_interno, monitora);
        return "Monitora updated: ";
    }

    @GetMapping("/{fk_cpf_interno}/{fk_cpf_paciente}")
    public Monitora getMonitora(@PathVariable String fk_cpf_interno, @PathVariable String fk_cpf_paciente){
        return monitoraRepository.selectMonitora(fk_cpf_interno, fk_cpf_paciente);
    }

    @GetMapping("/{fk_cpf_interno}")
    public List<Monitora> getMonitorasByInternoCPF(@PathVariable String fk_cpf_interno){
        return monitoraRepository.selectMonitorasByInternoCPF(fk_cpf_interno);
    }

    @GetMapping("/mais-monitora")
    public InternoDTO getTopInterno() {
        return monitoraRepository.findTopInterno();
    }
}
