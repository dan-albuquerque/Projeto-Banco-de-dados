package com.hospital.hospital.models;

public class Intern {
    
    private String name;
    private String cpf;
    private String password;
    private int registration;


    public Intern(String name, String cpf, String password, int registration){
        this.name = name;
        this.cpf = cpf;
        this.password = password;
        this.registration = registration;
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

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public int getRegistration(){
        return registration;
    }

    public void setRegistration(int registration){
        this.registration = registration;
    }

    // @Override
    // public String toString(){
    //     return "Intern{" +
    //             "name='" + name + '\'' +
    //             ", cpf='" + cpf + '\'' +
    //             ", password='" + password + '\'' +
    //             ", registration=" + registration +
    //             '}';
    // }


}
