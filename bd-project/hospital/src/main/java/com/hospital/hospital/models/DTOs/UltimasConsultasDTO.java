package com.hospital.hospital.models.DTOs;
import java.util.Date;
public class UltimasConsultasDTO {
    private String type;
    private Date date;
    private String doctor;
    private String patient;

    // Constructor, Getters, and Setters
    public UltimasConsultasDTO(String type, Date date, String doctor, String patient) {
        this.type = type;
        this.date = date;
        this.doctor = doctor;
        this.patient = patient;
    }

    public String getType() {
        return type;
    }

    public Date getDate() {
        return date;
    }

    public String getDoctor() {
        return doctor;
    }

    public String getPatient() {
        return patient;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public void setPatient(String patient) {
        this.patient = patient;
    }
    
}
