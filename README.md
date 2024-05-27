# Application

e-Hospital is a robust hospital management system designed to streamline hospital operations through a modern web interface. Built with Spring Boot and React, this system supports complex database operations and secure user authentication, delivering an efficient and user-friendly environment for managing patient care and hospital resources.

## Features

- **User Authentication**: Secure login system made from scratch to ensure data protection and user-specific access management.
- **Patient Management**: Add, update, delete, and view patient records using intuitive forms and detailed views.
- **Medication Tracking**: Comprehensive system to track pacient evolution and prescriptions.
- **Dynamic Reporting**: Generate and view reports related to patient care, internship programs, medical mentorship and more.
- **Responsive Design**: A sleek, responsive user interface using Tailwind CSS and React.js, ensuring compatibility with various devices.

## Technologies

- **Backend**: Spring Boot
- **Database**: SQL Commands using MySQL
- **Frontend**: React with Tailwind CSS and Next.js for routes
- **Authentication**: Integrated user authentication system utilizing SQL commands and JWT tokens created in the back-end

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- JDK 11+
- Node.js
- SQL Server
- Git
- Apache Maven

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

1. **Clone the repository**
   ```bash
    git clone https://github.com/dan-albuquerque/Projeto-Banco-de-dados.git
    cd Trabalho-banco-de-dados

2. **Setup the backend**
   ```bash
    cd bd-project/hospital
    mvn clean install
    mvn spring-boot:run 

3. **Setup the front-end**
   ```bash
   cd client
   npm install
   npm run dev

4. **Start your database**
   Provided on the sql file within 'Trabalho-banco-de-dados', then set to port 3306.

