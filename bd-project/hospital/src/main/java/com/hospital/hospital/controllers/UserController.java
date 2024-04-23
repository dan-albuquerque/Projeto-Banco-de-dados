package com.hospital.hospital.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import com.hospital.hospital.models.Interno;
import com.hospital.hospital.repository.InternRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private InternRepository internRepository;

    private List<String> users = new ArrayList<>();

    @GetMapping
    public List<String> getAllUsers() {
        return users;
    }

    @PostMapping
    public String createIntern(@RequestBody Interno interno) {
        internRepository.insertIntern(interno);
        return "Intern created: " + interno.getNome();
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
