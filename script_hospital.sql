create database hospital;

create table interno(
	cpf varchar(11) primary key,
	nome varchar(100) not null,
	senha varchar(20) not null,
	matricula integer not null unique
);

create table paciente(
	cpf varchar(11) primary key,
	nome varchar(100) not null,
	telefone_residencial varchar(25),
	telefone_pessoal varchar(25) not null,
	cidade varchar(50) not null,
	bairro varchar(50) not null,
	rua varchar(50) not null,
	numero integer not null
);

create table monitora(
	fk_cpf_interno VARCHAR(11) NOT NULL,
    fk_cpf_paciente VARCHAR(11) NOT NULL,
    primary key (fk_cpf_interno, fk_cpf_paciente),
    foreign key (fk_cpf_interno) references interno(cpf),
    foreign key (fk_cpf_paciente) references paciente(cpf)
);

create table paciente_internado(
	fk_paciente_cpf varchar(11) not null,
	sala integer not null,
	primary key (fk_paciente_cpf),
	foreign key (fk_paciente_cpf) references paciente(cpf)
);

create table paciente_urgencia(
	fk_paciente_cpf varchar(11) not null,
	nivel_triagem integer not null check (nivel_triagem between 0 and 4),
	primary key (fk_paciente_cpf),
	foreign key (fk_paciente_cpf) references paciente(cpf)
);

create table registro(
	codigo integer primary key,
	conduta varchar(50)
);

create table hipotese(
	fk_registro_codigo integer not null,
	id integer not null,
	primary key (fk_registro_codigo, id),
	foreign key (fk_registro_codigo) references registro(codigo)
);

create table registro_internado(
	fk_registro_codigo integer not null,
	evolucao varchar(500) not null,
	historico_exames varchar(500) not null,
	primary key(fk_registro_codigo),
	foreign key (fk_registro_codigo) references registro(codigo)
);

create table registro_urgencia(
	fk_registro_codigo integer not null,
	historico_doenca varchar(500) not null,
	exame_fisico varchar(500) not null,
	primary key (fk_registro_codigo),
	foreign key (fk_registro_codigo) references registro(codigo)
);

create table medicacao(
	fk_registro_urgencia_codigo integer not null,
	id integer,
	nome varchar(100),
	primary key (fk_registro_urgencia_codigo, id),
	foreign key (fk_registro_urgencia_codigo) references registro_urgencia(fk_registro_codigo)
);

create table comorbidade(
	fk_registro_urgencia_codigo integer not null,
	id integer,
	nome varchar(100),
	primary key (fk_registro_urgencia_codigo, id),
	foreign key (fk_registro_urgencia_codigo) references registro_urgencia(fk_registro_codigo)
);

# adicionada senha
create table medico(
	cpf varchar(11) primary key,
	rqe integer not null,
	nome varchar(100) not null,
	especialidade varchar(100) not null,
	
	senha varchar (200) not null
	crm varchar(10) not null,
	fk_medico_cpf_gerente varchar(11),
	foreign key (fk_medico_cpf_gerente) references medico(cpf)
);

create table examina(
	fk_medico_cpf varchar(11),
	fk_paciente_internado_cpf varchar(11),
	primary key(fk_medico_cpf, fk_paciente_internado_cpf),
	foreign key (fk_medico_cpf) references medico(cpf),
	foreign key (fk_paciente_internado_cpf) references paciente_internado(fk_paciente_cpf)
);

create table exame_complementar(
	codigo integer primary key,
	resultados varchar(500) not null,
	data_realizacao date not null,
	tipo varchar(100) not null
);

create table solicita(
	fk_examina_medico_cpf varchar(11),
	fk_examina_paciente_internado_cpf varchar(11),
	fk_exame_complementar_codigo integer,
	primary key (fk_examina_medico_cpf, fk_examina_paciente_internado_cpf, fk_exame_complementar_codigo),
	foreign key (fk_examina_medico_cpf) references examina(fk_medico_cpf),
	foreign key (fk_examina_paciente_internado_cpf) references examina(fk_paciente_internado_cpf),
	foreign key (fk_exame_complementar_codigo) references exame_complementar(codigo)
);

create table consulta_urgencia(
	data_realizacao date not null,
	fk_registro_urgencia_codigo integer not null,
	fk_medico_cpf varchar(11) not null,
	fk_paciente_urgencia_cpf varchar(11) not null,
	primary key (fk_registro_urgencia_codigo, fk_medico_cpf, fk_paciente_urgencia_cpf),
	foreign key (fk_registro_urgencia_codigo) references registro_urgencia(fk_registro_codigo),
	foreign key (fk_medico_cpf) references medico(cpf),
	foreign key (fk_paciente_urgencia_cpf) references paciente_urgencia(fk_paciente_cpf)
);

create table consulta_internado(
	data_realizacao date not null,
	fk_registro_internado_codigo integer not null,
	fk_medico_cpf varchar(11) not null,
	fk_paciente_internado_cpf varchar(11) not null,
	primary key (fk_registro_internado_codigo, fk_medico_cpf, fk_paciente_internado_cpf),
	foreign key (fk_registro_internado_codigo) references registro_internado(fk_registro_codigo),
	foreign key (fk_medico_cpf) references medico(cpf),
	foreign key (fk_paciente_internado_cpf) references paciente_internado(fk_paciente_cpf)
);

INSERT INTO interno (cpf, nome, senha, matricula) VALUES
('12345678901', 'João Silva', 'senha123', 1001),
('23456789012', 'Maria Souza', 'senha456', 1002),
('34567890123', 'Carlos Pereira', 'senha789', 1003);

alter table medico 
add column senha varchar(200) not null;

INSERT INTO registro (codigo, conduta) VALUES
(1, 'Prescrever medicação'),
(2, 'Encaminhar para especialista'),
(3, 'Realizar exames adicionais');

INSERT INTO registro_urgencia (fk_registro_codigo, historico_doenca, exame_fisico) VALUES
(1, 'Histórico de diabetes', 'Exame físico normal'),
(2, 'Dor abdominal recorrente', 'Sinais vitais estáveis'),
(3, 'Cefaleia frequente', 'Pressão arterial elevada');

INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) VALUES
('12345678901', 'João Silva', '3132123456', '31987654321', 'Belo Horizonte', 'Centro', 'Rua Floresta', 100),
('23456789012', 'Maria Oliveira', '2123456789', '21987654321', 'Rio de Janeiro', 'Copacabana', 'Av Atlântica', 321),
('34567890123', 'Carlos Souza', '1134567890', '11987654321', 'São Paulo', 'Jardins', 'Alameda Santos', 213);

INSERT INTO paciente_urgencia (fk_paciente_cpf, nivel_triagem) VALUES
('12345678901', 3),
('23456789012', 2),
('34567890123', 1);

INSERT INTO consulta_urgencia (fk_registro_urgencia_codigo, fk_medico_cpf, fk_paciente_urgencia_cpf, data_realizacao) VALUES
(1, '98765432101', '12345678901', '2024-04-27'),
(2, '87654321012', '12345678901', '2024-04-28'),
(3, '76543210923', '12345678901', '2024-04-29');
