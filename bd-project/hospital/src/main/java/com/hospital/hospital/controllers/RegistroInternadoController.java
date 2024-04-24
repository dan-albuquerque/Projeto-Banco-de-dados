package com.hospital.hospital.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hospital.hospital.repository.RegistroInternadoRepository;
import com.hospital.hospital.models.informacao.RegistroInternado;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/registro_internado")
public class RegistroInternadoController {
    @Autowired
    private RegistroInternadoRepository registroInternadoRepository;

    @PostMapping
    public String createRegistroInternado(@RequestBody RegistroInternado registro) {
        registroInternadoRepository.insertRegistroInternado(registro);
        return "Registro Internado criado: " + registro.getRegistroCodigo();
    }

    @GetMapping
    public List<RegistroInternado> getRegistrosInternados() {
        return registroInternadoRepository.selectRegistrosInternados();
    }

    @GetMapping("/{fk_registro_codigo}")
    public RegistroInternado getRegistroInternado(@PathVariable int fk_registro_codigo) {
        return registroInternadoRepository.selectRegistroInternado(fk_registro_codigo);
    }

    @DeleteMapping("/{fk_registro_codigo}")
    public String deleteRegistroInternado(@PathVariable int fk_registro_codigo) {
        RegistroInternado registro = registroInternadoRepository.selectRegistroInternado(fk_registro_codigo);
        registroInternadoRepository.deleteRegistroInternado(registro);
        return "Registro Internado deletado: " + registro.getRegistroCodigo();
    }

    @PutMapping("/{fk_registro_codigo}")
    public String updateRegistroInternado(@PathVariable int fk_registro_codigo, @RequestBody RegistroInternado registro) {
        registro.setRegistroCodigo(fk_registro_codigo);
        registroInternadoRepository.updateRegistroInternado(registro);
        return "Registro Internado atualizado: " + registro.getRegistroCodigo();
    }
    
}
