package com.hospital.hospital.controllers;

import com.hospital.hospital.models.DTOs.MonitoraBackupDTO;
import com.hospital.hospital.repository.MonitoraBackupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/backup-monitora")
public class MonitoraBackupController {

    @Autowired
    private MonitoraBackupRepository monitoraBackupRepository;

    @GetMapping
    public List<MonitoraBackupDTO> getAllBackupMonitora() {
        return monitoraBackupRepository.selectAll();
    }
}
