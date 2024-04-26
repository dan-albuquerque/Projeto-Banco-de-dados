package com.hospital.hospital.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class LoginController {
    
    // Método GET para servir a página de login
    @GetMapping("/login1")
    public String loginPage(){
        return "login1";
    }
    
    // Método POST para processar o formulário de login
    @PostMapping("/login1")
    public String loginProcess(RedirectAttributes attributes){
        // Lógica para autenticar o usuário e redirecioná-lo
        // Se as credenciais forem válidas, redirecione para a página Hello
        attributes.addFlashAttribute("successMessage", "Login bem-sucedido!");
        return "redirect:/hello";
    }
}
