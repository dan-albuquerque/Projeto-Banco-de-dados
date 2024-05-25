package com.hospital.hospital.models.DTOs;

import java.time.LocalDateTime;

public class MonitoraBackupDTO {
    private String nomePaciente;
    private String nomeInterno;
    private LocalDateTime deletedAt;

    public MonitoraBackupDTO(String nomePaciente, String nomeInterno, LocalDateTime deletedAt) {
        this.nomePaciente = nomePaciente;
        this.nomeInterno = nomeInterno;
        this.deletedAt = deletedAt;
    }

    public String getNomePaciente() {
        return nomePaciente;
    }

    public void setNomePaciente(String nomePaciente) {
        this.nomePaciente = nomePaciente;
    }

    public String getNomeInterno() {
        return nomeInterno;
    }

    public void setNomeInterno(String nomeInterno) {
        this.nomeInterno = nomeInterno;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }
}
