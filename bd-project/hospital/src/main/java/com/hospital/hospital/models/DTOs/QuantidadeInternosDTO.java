package com.hospital.hospital.models.DTOs;

public class QuantidadeInternosDTO {
    private int internCount;

    public QuantidadeInternosDTO(int internCount) {
        this.internCount = internCount;
    }

    public int getInternCount() {
        return internCount;
    }

    public void setInternCount(int internCount) {
        this.internCount = internCount;
    }
}
