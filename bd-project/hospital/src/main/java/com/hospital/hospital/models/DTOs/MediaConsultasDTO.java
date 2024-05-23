package com.hospital.hospital.models.DTOs;

public class MediaConsultasDTO {
    private int ano;
    private int media_consultas;

    // Construtores, getters e setters
    public MediaConsultasDTO(int ano, int media_consultas) {
        this.ano = ano;
        this.media_consultas = media_consultas;
    }

    public MediaConsultasDTO() {
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public int getMedia_consultas() {
        return media_consultas;
    }

    public void setMedia_consultas(int media_consultas) {
        this.media_consultas = media_consultas;
    }
    
}
