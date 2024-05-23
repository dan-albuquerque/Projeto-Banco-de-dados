package com.hospital.hospital.models.DTOs;

public class SpecialityDemandDTO {
    private String speciality;
    private int totalConsultations;

    public SpecialityDemandDTO(String speciality, int totalConsultations) {
        this.speciality = speciality;
        this.totalConsultations = totalConsultations;
    }

    // Getters and Setters
    public String getSpeciality() {
        return speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    public int getTotalConsultations() {
        return totalConsultations;
    }

    public void setTotalConsultations(int totalConsultations) {
        this.totalConsultations = totalConsultations;
    }
}
