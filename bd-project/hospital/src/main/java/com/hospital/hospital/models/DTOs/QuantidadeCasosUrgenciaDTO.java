package com.hospital.hospital.models.DTOs;

public class QuantidadeCasosUrgenciaDTO {

    private int urgenciaCount;

    public QuantidadeCasosUrgenciaDTO(int urgenciaCount) {
        this.urgenciaCount = urgenciaCount;
    }

    public int getUrgenciaCount() {
        return urgenciaCount;
    }

    public void setUrgenciaCount(int urgenciaCount) {
        this.urgenciaCount = urgenciaCount;
    }
    
}
