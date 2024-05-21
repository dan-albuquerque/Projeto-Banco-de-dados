package com.hospital.hospital.models.DTOs;

public class QuantidadeInternadosDTO {
    private int internCount;

    public QuantidadeInternadosDTO(int internCount) {
        this.internCount = internCount;
    }

    public int getInternCount() {
        return internCount;
    }

    public void setInternCount(int internCount) {
        this.internCount = internCount;
    }
    
}
