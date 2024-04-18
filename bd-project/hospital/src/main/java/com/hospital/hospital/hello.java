package com.hospital.hospital;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class hello {
    @RequestMapping("/hello")
    public String hello() {
        return "Greetings from Spring Boot!";
    }
    
}
