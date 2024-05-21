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
	codigo integer auto_increment primary key,
	conduta varchar(50)
);

create table hipotese(
	fk_registro_codigo integer not null,
	id integer not null,
	descricao varchar(500) not null,
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

create table medico(
	cpf varchar(11) primary key,
	rqe integer not null,
	nome varchar(100) not null,
	especialidade varchar(100) not null,
	senha varchar (200) not null,
	crm varchar(10) not null,
	fk_medico_cpf_gerente varchar(11),
	foreign key (fk_medico_cpf_gerente) references medico(cpf)
);

create table consulta_urgencia(
	data_realizacao date not null,
	fk_registro_urgencia_codigo integer not null,
	fk_medico_cpf varchar(11) not null,
	fk_paciente_cpf varchar(11) not null,
	primary key (fk_registro_urgencia_codigo, fk_medico_cpf, fk_paciente_cpf),
	foreign key (fk_registro_urgencia_codigo) references registro_urgencia(fk_registro_codigo),
	foreign key (fk_medico_cpf) references medico(cpf),
	foreign key (fk_paciente_cpf) references paciente(cpf)
);

create table consulta_internado(
	data_realizacao date not null,
	fk_registro_internado_codigo integer not null,
	fk_medico_cpf varchar(11) not null,
	fk_paciente_cpf varchar(11) not null,
	primary key (fk_registro_internado_codigo, fk_medico_cpf, fk_paciente_cpf),
	foreign key (fk_registro_internado_codigo) references registro_internado(fk_registro_codigo),
	foreign key (fk_medico_cpf) references medico(cpf),
	foreign key (fk_paciente_cpf) references paciente(cpf)
);

INSERT INTO interno (cpf, nome, senha, matricula) VALUES
('12345678904', 'João Silva', 'senha123', 1001),
('23456789015', 'Maria Souza', 'senha456', 1002),
('34567890126', 'Carlos Pereira', 'senha789', 1003);

INSERT INTO registro (conduta) VALUES
('Prescrever medicação'),
('Encaminhar para especialista'),
('Realizar exames adicionais');

INSERT INTO registro_internado (fk_registro_codigo, evolucao, historico_exames) VALUES
(58, 'Histórico de diabetes', 'Exame físico normal'),
(59, 'Dor abdominal recorrente', 'Sinais vitais estáveis'),
(60, 'Cefaleia frequente', 'Pressão arterial elevada');

INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) VALUES
('12345678907', 'João Silva', '3132123456', '31987654321', 'Belo Horizonte', 'Centro', 'Rua Floresta', 100),
('23456789018', 'Maria Oliveira', '2123456789', '21987654321', 'Rio de Janeiro', 'Copacabana', 'Av Atlântica', 321),
('34567890129', 'Carlos Souza', '1134567890', '11987654321', 'São Paulo', 'Jardins', 'Alameda Santos', 213);

INSERT INTO paciente_internado (fk_paciente_cpf, sala) VALUES
('12345678907', 3),
('23456789018', 2),
('34567890129', 1);

INSERT INTO consulta_urgencia (fk_registro_urgencia_codigo, fk_medico_cpf, fk_paciente_urgencia_cpf, data_realizacao) VALUES
(1, '12345678910', '12345678901', '2024-04-27'),
(2, '12345678910', '12345678901', '2024-04-28'),
(3, '12345678910', '12345678901', '2024-04-29');

insert into consulta_internado (fk_registro_internado_codigo, fk_medico_cpf, fk_paciente_internado_cpf, data_realizacao) values
(58, '12345678910', '12345678907', '2024-04-27'),
(59, '12345678910', '12345678907', '2024-04-28'),
(60, '12345678910', '12345678907', '2024-04-29');

select m.nome as "Nome do Doutor", i.nome as "Nome do interno" from medico m, interno i;

-- Inserindo internos
INSERT INTO interno (cpf, nome, senha, matricula) VALUES ('12345678901', 'Interno A', 'senhaA', 1001);
INSERT INTO interno (cpf, nome, senha, matricula) VALUES ('23456789012', 'Interno B', 'senhaB', 1002);
INSERT INTO interno (cpf, nome, senha, matricula) VALUES ('34567890123', 'Interno C', 'senhaC', 1003);

-- Inserindo pacientes
INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) VALUES ('98765432101', 'Paciente 1', '123456789', '987654321', 'Cidade A', 'Bairro A', 'Rua A', 1);
INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) VALUES ('87654321012', 'Paciente 2', '123456789', '987654321', 'Cidade A', 'Bairro A', 'Rua A', 2);
INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) VALUES ('76543210123', 'Paciente 3', '123456789', '987654321', 'Cidade B', 'Bairro B', 'Rua B', 3);
INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) VALUES ('65432101234', 'Paciente 4', '123456789', '987654321', 'Cidade B', 'Bairro B', 'Rua B', 4);
INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) VALUES ('54321012345', 'Paciente 5', '123456789', '987654321', 'Cidade C', 'Bairro C', 'Rua C', 5);
INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) VALUES ('43210123456', 'Paciente 6', '123456789', '987654321', 'Cidade C', 'Bairro C', 'Rua C', 6);
INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) VALUES ('32101234567', 'Paciente 7', '123456789', '987654321', 'Cidade D', 'Bairro D', 'Rua D', 7);
INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) VALUES ('21012345678', 'Paciente 8', '123456789', '987654321', 'Cidade D', 'Bairro D', 'Rua D', 8);

-- Inserindo relações de monitoramento
INSERT INTO monitora (fk_cpf_interno, fk_cpf_paciente) VALUES ('12345678901', '98765432101');
INSERT INTO monitora (fk_cpf_interno, fk_cpf_paciente) VALUES ('12345678901', '87654321012');
INSERT INTO monitora (fk_cpf_interno, fk_cpf_paciente) VALUES ('12345678901', '76543210123');
INSERT INTO monitora (fk_cpf_interno, fk_cpf_paciente) VALUES ('23456789012', '65432101234');
INSERT INTO monitora (fk_cpf_interno, fk_cpf_paciente) VALUES ('23456789012', '54321012345');
INSERT INTO monitora (fk_cpf_interno, fk_cpf_paciente) VALUES ('23456789012', '43210123456');
INSERT INTO monitora (fk_cpf_interno, fk_cpf_paciente) VALUES ('34567890123', '32101234567');
INSERT INTO monitora (fk_cpf_interno, fk_cpf_paciente) VALUES ('34567890123', '21012345678');
INSERT INTO monitora (fk_cpf_interno, fk_cpf_paciente) VALUES ('34567890123', '98765432101');
INSERT INTO monitora (fk_cpf_interno, fk_cpf_paciente) VALUES ('34567890123', '87654321012');

-- Contando o interno que mais monitora pacientes
SELECT i.cpf, i.nome, COUNT(m.fk_cpf_paciente) AS total_pacientes
FROM interno i
JOIN monitora m ON i.cpf = m.fk_cpf_interno
GROUP BY i.cpf, i.nome
ORDER BY total_pacientes DESC
LIMIT 1;

-- Inserindo pacientes de urgência
INSERT INTO paciente_urgencia (fk_paciente_cpf, nivel_triagem) VALUES ('98765432101', 4);
INSERT INTO paciente_urgencia (fk_paciente_cpf, nivel_triagem) VALUES ('87654321012', 3);
INSERT INTO paciente_urgencia (fk_paciente_cpf, nivel_triagem) VALUES ('76543210123', 2);
INSERT INTO paciente_urgencia (fk_paciente_cpf, nivel_triagem) VALUES ('65432101234', 4);
INSERT INTO paciente_urgencia (fk_paciente_cpf, nivel_triagem) VALUES ('54321012345', 1);
INSERT INTO paciente_urgencia (fk_paciente_cpf, nivel_triagem) VALUES ('43210123456', 0);
INSERT INTO paciente_urgencia (fk_paciente_cpf, nivel_triagem) VALUES ('32101234567', 4);
INSERT INTO paciente_urgencia (fk_paciente_cpf, nivel_triagem) VALUES ('21012345678', 2);


-- Mostrar os pacientes em estado mais grave
SELECT p.cpf, p.nome, pu.nivel_triagem
FROM paciente p
JOIN paciente_urgencia pu ON p.cpf = pu.fk_paciente_cpf
ORDER BY pu.nivel_triagem DESC
LIMIT 10;

-- Médico que mais realizou consultas
SELECT m.cpf, m.nome, 
       (COALESCE(cu.total_consultas_urgencia, 0) + COALESCE(ci.total_consultas_internado, 0)) AS total_consultas
FROM medico m
LEFT JOIN (
    SELECT fk_medico_cpf, COUNT(*) AS total_consultas_urgencia
    FROM consulta_urgencia
    GROUP BY fk_medico_cpf
) cu ON m.cpf = cu.fk_medico_cpf
LEFT JOIN (
    SELECT fk_medico_cpf, COUNT(*) AS total_consultas_internado
    FROM consulta_internado
    GROUP BY fk_medico_cpf
) ci ON m.cpf = ci.fk_medico_cpf
ORDER BY total_consultas DESC
LIMIT 1;

select m.nome from consulta_internado ci, medico m
where m.cpf = ci.fk_medico_cpf;
