package com.hospital.hospital.models.DTOs;

public class QuantidadeMedicosDTO {
    private int doctorCount;

    public QuantidadeMedicosDTO(int doctorCount) {
        this.doctorCount = doctorCount;
    }

    public int getDoctorCount() {
        return doctorCount;
    }

    public void setDoctorCount(int doctorCount) {
        this.doctorCount = doctorCount;
    }

}