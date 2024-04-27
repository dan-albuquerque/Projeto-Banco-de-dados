package com.hospital.hospital.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ConsultaController {

    @GetMapping("/consulta")
    public String consultaPage(){
        return "consulta";
    }
    
}
