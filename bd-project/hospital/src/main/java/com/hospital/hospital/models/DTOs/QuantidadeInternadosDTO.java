package com.hospital.hospital.models.DTOs;

public class QuantidadeInternadosDTO {
    private int internadoCount;

    public QuantidadeInternadosDTO(int internCount) {
        this.internadoCount = internCount;
    }

    public int getInternadoCount() {
        return internadoCount;
    }

    public void setInternadoCount(int internCount) {
        this.internadoCount = internCount;
    }
    
}
