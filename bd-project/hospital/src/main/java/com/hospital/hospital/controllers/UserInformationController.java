package com.hospital.hospital.controllers;

import java.security.Principal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserInformationController {

    @GetMapping("/user")
    public String currentUser(Principal principal) {
        return principal != null ? principal.getName() : "Nenhum usuário autenticado";
    }

}
