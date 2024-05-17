package com.hospital.hospital.controllers;

import com.hospital.hospital.models.DashBoardDTO;
import com.hospital.hospital.repository.DashBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping("/dashboard")
public class DashBoardController {

    @Autowired
    private DashBoardRepository dashboardRepository;

    @GetMapping("/latest-consultations")
    public List<DashBoardDTO> getLatestConsultations() {
        return dashboardRepository.getLatestConsultations();
    }
}