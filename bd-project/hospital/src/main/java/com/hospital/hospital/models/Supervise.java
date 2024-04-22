package com.hospital.hospital.models;

public class Supervise {

    private String internCpf;
    private String pacientCpf;

    public Supervise(String internCpf, String pacientCpf) {
        this.internCpf = internCpf;
        this.pacientCpf = pacientCpf;
    }

    public String getInternCpf() {
        return internCpf;
    }

    public void setInternCpf(String internCpf) {
        this.internCpf = internCpf;
    }

    public String getPacientCpf() {
        return pacientCpf;
    }

    public void setPacientCpf(String pacientCpf) {
        this.pacientCpf = pacientCpf;
    }
}