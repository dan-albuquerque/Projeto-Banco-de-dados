package com.hospital.hospital.controllers;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import com.hospital.hospital.models.Intern;
import com.hospital.hospital.repository.InternRepository;
@RestController
@RequestMapping("/api/users")
public class UserController {
    private List<String> users = new ArrayList<>();  
    @GetMapping
    public List<String> getAllUsers(){
        return users;
    }
    @PostMapping
    public String createIntern(@RequestBody Intern intern) {
        InternRepository ir = new InternRepository();
        ir.insertIntern(intern);
        return "Intern created: " + intern.getName();
    }
    @DeleteMapping("/{user}")
    public String deleteUser(@PathVariable String user) {
        if (users.contains(user)) {
            users.remove(user);
            return "User deleted: " + user;
        }
        return "User not found";
    }
}
