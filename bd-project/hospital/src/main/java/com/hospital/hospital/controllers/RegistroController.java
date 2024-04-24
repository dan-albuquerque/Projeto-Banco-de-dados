package com.hospital.hospital.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hospital.hospital.repository.RegistroRepository;
import com.hospital.hospital.models.informacao.Registro;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/registro")
public class RegistroController {
    @Autowired
    private RegistroRepository registroRepository;

    @PostMapping
    public String createRegistro(@RequestBody Registro registro) {
        registroRepository.insertRegistro(registro);
        return "Registro criado: " + registro.getConduta();
    }

    @DeleteMapping("/{codigo}")
    public String deleteRegistro(@PathVariable int codigo){
        registroRepository.deleteRegistro(codigo);
        return "Registro deletado: " + codigo;
    }

    @GetMapping("/{codigo}")
    public Registro getRegistro(@PathVariable int codigo){
        return registroRepository.selectRegistro(codigo);
    }

    @GetMapping
    public List<Registro> getAllRegistros() {
        return registroRepository.selectRegistros();
    }

    @PutMapping("/{codigo}")
    public String updateRegistro(@PathVariable int codigo, @RequestBody Registro registro){
        registro.setCodigo(codigo);
        registroRepository.updateRegistro(registro);
        return "Registro atualizado: " + registro.getCodigo();
    }
}
