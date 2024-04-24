package com.hospital.hospital.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hospital.hospital.repository.RegistroUrgenciaRepository;
import com.hospital.hospital.models.informacao.RegistroUrgencia;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/registro_urgencia")
public class RegistroUrgenciaController {
    @Autowired
    private RegistroUrgenciaRepository registroUrgenciaRepository;

    @PostMapping
    public String createRegistroUrgencia(@RequestBody RegistroUrgencia registro) {
        registroUrgenciaRepository.insertRegistroUrgencia(registro);
        return "Registro Urgencia criado: " + registro.getRegistroCodigo();
    }

    @GetMapping
    public List<RegistroUrgencia> getRegistrosUrgencia() {
        return registroUrgenciaRepository.selectRegistrosUrgencia();
    }

    @GetMapping("/{fk_registro_codigo}")
    public RegistroUrgencia getRegistroUrgencia(@PathVariable int fk_registro_codigo) {
        return registroUrgenciaRepository.selectRegistroUrgencia(fk_registro_codigo);
    }

    @DeleteMapping("/{fk_registro_codigo}")
    public String deleteRegistroUrgencia(@PathVariable int fk_registro_codigo) {
        RegistroUrgencia registro = registroUrgenciaRepository.selectRegistroUrgencia(fk_registro_codigo);
        registroUrgenciaRepository.deleteRegistroUrgencia(registro);
        return "Registro Urgencia deletado: " + registro.getRegistroCodigo();
    }

    @PutMapping("/{fk_registro_codigo}")
    public String updateRegistroUrgencia(@PathVariable int fk_registro_codigo, @RequestBody RegistroUrgencia registro) {
        registro.setRegistroCodigo(fk_registro_codigo);
        registroUrgenciaRepository.updateRegistroUrgencia(registro);
        return "Registro Urgencia atualizado: " + registro.getRegistroCodigo();
    }

}
