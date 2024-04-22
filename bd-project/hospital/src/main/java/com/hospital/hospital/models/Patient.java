package com.hospital.hospital.models;

public class Patient {
    private String name, cpf, residential_phone, cellphone, city, neighbourhood, street;
    private int number;

    public Patient(String name, String cpf, String residential_phone, String cellphone, String city, String neighbourhood, String street, int number){
        this.name = name;
        this.cpf = cpf;
        this.residential_phone = residential_phone;
        this.cellphone = cellphone;
        this.city = city;
        this.neighbourhood = neighbourhood;
        this.street = street;
        this.number = number;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getCpf(){
        return cpf;
    }

    public void setCpf(String cpf){
        this.cpf = cpf;
    }

    public String getResidential_phone(){
        return residential_phone;
    }

    public void setResidential_phone(String residential_phone){
        this.residential_phone = residential_phone;
    }

    public String getCellphone(){
        return cellphone;
    }

    public void setCellphone(String cellphone){
        this.cellphone = cellphone;
    }

    public String getCity(){
        return city;
    }

    public void setCity(String city){
        this.city = city;
    }

    public String getNeighbourhood(){
        return neighbourhood;
    }

    public void setNeighbourhood(String neighbourhood){
        this.neighbourhood = neighbourhood;
    }

    public String getStreet(){
        return street;
    }

    public void setStreet(String street){
        this.street = street;
    }

    public int getNumber(){
        return number;
    }

    public void setNumber(int number){
        this.number = number;
    }



    
}
