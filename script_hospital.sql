create database hospital;

create table interno(
	cpf varchar(11) primary key,
	nome varchar(100) not null,
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
    foreign key (fk_cpf_interno) references interno(cpf) ON DELETE CASCADE,
    foreign key (fk_cpf_paciente) references paciente(cpf)
);

CREATE TABLE backup_monitora (
    fk_cpf_interno VARCHAR(11) NOT NULL,
    fk_cpf_paciente VARCHAR(11) NOT NULL,
    deleted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_backup_monitora
AFTER DELETE ON monitora
FOR EACH ROW
BEGIN
    INSERT INTO backup_monitora (fk_cpf_interno, fk_cpf_paciente, deleted_at)
    VALUES (OLD.fk_cpf_interno, OLD.fk_cpf_paciente, CURRENT_TIMESTAMP);
END;

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
	ativo BOOLEAN DEFAULT TRUE NOT NULL,
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

-- Procedure para criar consulta urgencia
DELIMITER $$

CREATE PROCEDURE AddUrgencyConsultation(
    IN paciente_cpf VARCHAR(11),
    IN medico_cpf VARCHAR(11),
    IN conduta VARCHAR(50),
    IN historico_doenca VARCHAR(500),
    IN exame_fisico VARCHAR(500),
    IN data_consulta DATE
)
BEGIN
    DECLARE registro_codigo INT;

    -- Inserir um novo registro
    INSERT INTO registro (conduta) VALUES (conduta);
    SET registro_codigo = LAST_INSERT_ID();

    -- Inserir registro de urgência associado
    INSERT INTO registro_urgencia (fk_registro_codigo, historico_doenca, exame_fisico) 
    VALUES (registro_codigo, historico_doenca, exame_fisico);

    -- Inserir consulta de urgência associada
    INSERT INTO consulta_urgencia (data_realizacao, fk_registro_urgencia_codigo, fk_medico_cpf, fk_paciente_cpf)
    VALUES (data_consulta, registro_codigo, medico_cpf, paciente_cpf);
   
   select registro_codigo;
END $$

DELIMITER ;

-- Procedure para criar consulta internado
DELIMITER $$

CREATE PROCEDURE AddInternedConsultation(
    IN paciente_cpf VARCHAR(11),
    IN medico_cpf VARCHAR(11),
    IN conduta VARCHAR(50),
    IN evolucao VARCHAR(500),
    IN historico_exames VARCHAR(500),
    IN data_consulta DATE
)
BEGIN
    DECLARE registro_codigo INT;

    -- Inserir um novo registro
    INSERT INTO registro (conduta) VALUES (conduta);
    SET registro_codigo = LAST_INSERT_ID();

    -- Inserir registro de internado associado
    INSERT INTO registro_internado  (fk_registro_codigo, evolucao , historico_exames) 
    VALUES (registro_codigo, evolucao , historico_exames);

    -- Inserir consulta de internado associada
    INSERT INTO consulta_internado (data_realizacao, fk_registro_internado_codigo, fk_medico_cpf, fk_paciente_cpf)
    VALUES (data_consulta, registro_codigo, medico_cpf, paciente_cpf);
   
   	select registro_codigo;
END $$

DELIMITER ;

-- Contando o interno que mais monitora pacientes
SELECT i.cpf, i.nome, COUNT(m.fk_cpf_paciente) AS total_pacientes
FROM interno i
JOIN monitora m ON i.cpf = m.fk_cpf_interno
GROUP BY i.cpf, i.nome
ORDER BY total_pacientes DESC
LIMIT 1;

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

select * from medico;

INSERT INTO interno (cpf, nome, matricula) VALUES ('12345678901', 'João Silva', 1001);
INSERT INTO interno (cpf, nome, matricula) VALUES ('98765432109', 'Maria Oliveira', 1002);
INSERT INTO interno (cpf, nome, matricula) VALUES ('55544433322', 'Carlos Pereira', 1003);

INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) 
VALUES ('11122233344', 'Ana Souza', '1122334455', '9988776655', 'São Paulo', 'Centro', 'Rua A', 10);

INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) 
VALUES ('22233344455', 'Pedro Santos', '2233445566', '9876543210', 'Rio de Janeiro', 'Copacabana', 'Rua B', 20);

INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) 
VALUES ('33344455566', 'Fernanda Lima', '3344556677', '9123456789', 'Belo Horizonte', 'Savassi', 'Rua C', 30);

INSERT INTO monitora (fk_cpf_interno, fk_cpf_paciente) VALUES ('12345678901', '11122233344');
INSERT INTO monitora (fk_cpf_interno, fk_cpf_paciente) VALUES ('98765432109', '22233344455');
INSERT INTO monitora (fk_cpf_interno, fk_cpf_paciente) VALUES ('55544433322', '33344455566');

-- Assumindo que o paciente 'Ana Souza' com CPF '11122233344' será um paciente internado
INSERT INTO paciente_internado (fk_paciente_cpf, sala) VALUES ('11122233344', 101);

-- Assumindo que o paciente 'Pedro Santos' com CPF '22233344455' será um paciente de urgência
INSERT INTO paciente_urgencia (fk_paciente_cpf, nivel_triagem) VALUES ('22233344455', 3);

INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) 
VALUES ('44455566677', 'Lucas Mendes', '4455667788', '9012345678', 'Curitiba', 'Centro', 'Rua D', 40);

INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) 
VALUES ('55566677788', 'Juliana Ferreira', '5566778899', '8765432109', 'Porto Alegre', 'Moinhos de Vento', 'Rua E', 50);

INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) 
VALUES ('66677788899', 'Rodrigo Alves', '6677889900', '7654321098', 'Salvador', 'Pituba', 'Rua F', 60);

INSERT INTO paciente (cpf, nome, telefone_residencial, telefone_pessoal, cidade, bairro, rua, numero) 
VALUES ('77788899900', 'Camila Costa', '7788990011', '6543210987', 'Fortaleza', 'Aldeota', 'Rua G', 70);

-- Assumindo que os pacientes 'Lucas Mendes' e 'Juliana Ferreira' serão pacientes internados
INSERT INTO paciente_internado (fk_paciente_cpf, sala) VALUES ('44455566677', 102);
INSERT INTO paciente_internado (fk_paciente_cpf, sala) VALUES ('55566677788', 103);

-- Assumindo que os pacientes 'Rodrigo Alves' e 'Camila Costa' serão pacientes de urgência
INSERT INTO paciente_urgencia (fk_paciente_cpf, nivel_triagem) VALUES ('66677788899', 2);
INSERT INTO paciente_urgencia (fk_paciente_cpf, nivel_triagem) VALUES ('77788899900', 4);

-- Médico utilizado na consulta de urgência do paciente 'Pedro Santos'
INSERT INTO medico (cpf, rqe, nome, especialidade, senha, crm, fk_medico_cpf_gerente) 
VALUES ('12345678901', 12345, 'Dr. João Silva', 'Cardiologia', '$2a$10$sJ8SwOaequ0W8Qwwgkj1b.UWwFR2ra6028J862e8QL.Iui.oKwHlC', 'CRM123456', NULL);

-- Médico utilizado na consulta de urgência do paciente 'Rodrigo Alves'
INSERT INTO medico (cpf, rqe, nome, especialidade, senha, crm, fk_medico_cpf_gerente) 
VALUES ('98765432109', 23456, 'Dra. Maria Oliveira', 'Endocrinologia', '$2a$10$sJ8SwOaequ0W8Qwwgkj1b.UWwFR2ra6028J862e8QL.Iui.oKwHlC', 'CRM234567', NULL);

-- Médico utilizado na consulta de urgência do paciente 'Camila Costa'
INSERT INTO medico (cpf, rqe, nome, especialidade, senha, crm, fk_medico_cpf_gerente) 
VALUES ('55544433322', 34567, 'Dr. Carlos Pereira', 'Pneumologia', '$2a$10$sJ8SwOaequ0W8Qwwgkj1b.UWwFR2ra6028J862e8QL.Iui.oKwHlC', 'CRM345678', NULL);

-- Médico 1 gerenciado pelo Dr. João Silva
INSERT INTO medico (cpf, rqe, nome, especialidade, senha, crm, fk_medico_cpf_gerente) 
VALUES ('11122233344', 45678, 'Dr. Felipe Almeida', 'Ortopedia', 'hashed_password_4', 'CRM456789', '12345678901');

-- Médico 2 gerenciado pelo Dr. João Silva
INSERT INTO medico (cpf, rqe, nome, especialidade, senha, crm, fk_medico_cpf_gerente) 
VALUES ('22233344455', 56789, 'Dra. Beatriz Souza', 'Dermatologia', 'hashed_password_5', 'CRM567890', '12345678901');


-- Criar consulta de urgência para o paciente 'Pedro Santos' com CPF '22233344455'
CALL AddUrgencyConsultation(
    '22233344455',
    '12345678901',  -- CPF de um médico fictício para este exemplo
    'Administração de medicamentos',
    'Histórico de hipertensão',
    'Pressão arterial elevada, pulso rápido',
    '2024-05-27'
);

-- Criar consulta de urgência para o paciente 'Rodrigo Alves' com CPF '66677788899'
CALL AddUrgencyConsultation(
    '66677788899',
    '98765432109',  -- CPF de um médico fictício para este exemplo
    'Monitoramento contínuo',
    'Histórico de diabetes tipo 2',
    'Nível de glicose elevado, sinais de cetoacidose',
    '2024-05-27'
);

-- Criar consulta de urgência para o paciente 'Camila Costa' com CPF '77788899900'
CALL AddUrgencyConsultation(
    '77788899900',
    '55544433322',  -- CPF de um médico fictício para este exemplo
    'Intervenção imediata',
    'Histórico de asma severa',
    'Dificuldade respiratória, sibilos audíveis',
    '2024-05-27'
);

-- Criar consulta de internado para o paciente 'Ana Souza' com CPF '11122233344'
CALL AddInternedConsultation(
    '11122233344',
    '12345678901',  -- CPF de um médico fictício para este exemplo
    'Administração de antibióticos',
    'Melhora gradual, sem febre nos últimos 2 dias',
    'Exames de sangue, Raio-X do tórax',
    '2024-05-27'
);

-- Criar consulta de internado para o paciente 'Lucas Mendes' com CPF '44455566677'
CALL AddInternedConsultation(
    '44455566677',
    '98765432109',  -- CPF de um médico fictício para este exemplo
    'Reabilitação física',
    'Aumento na mobilidade, resposta positiva ao tratamento',
    'Exames de imagem, Avaliação fisioterápica',
    '2024-05-27'
);

-- Criar consulta de internado para o paciente 'Juliana Ferreira' com CPF '55566677788'
CALL AddInternedConsultation(
    '55566677788',
    '55544433322',  -- CPF de um médico fictício para este exemplo
    'Controle de dor',
    'Redução significativa na dor, sem necessidade de morfina nas últimas 24 horas',
    'Exames laboratoriais, Consulta com especialista em dor',
    '2024-05-27'
);

-- Hipótese para o registro de urgência do paciente 'Pedro Santos'
INSERT INTO hipotese (fk_registro_codigo, id, descricao) VALUES (1, 1, 'Hipertensão arterial devido ao estresse');

-- Hipótese para o registro de urgência do paciente 'Rodrigo Alves'
INSERT INTO hipotese (fk_registro_codigo, id, descricao) VALUES (2, 1, 'Cetoacidose diabética');

-- Hipótese para o registro de urgência do paciente 'Camila Costa'
INSERT INTO hipotese (fk_registro_codigo, id, descricao) VALUES (3, 1, 'Exacerbação aguda de asma');

-- Medicações para o registro de urgência do paciente 'Pedro Santos'
INSERT INTO medicacao (fk_registro_urgencia_codigo, id, nome) VALUES (1, 1, 'Captopril');
INSERT INTO medicacao (fk_registro_urgencia_codigo, id, nome) VALUES (1, 2, 'Atenolol');

-- Medicações para o registro de urgência do paciente 'Rodrigo Alves'
INSERT INTO medicacao (fk_registro_urgencia_codigo, id, nome) VALUES (2, 1, 'Insulina');
INSERT INTO medicacao (fk_registro_urgencia_codigo, id, nome) VALUES (2, 2, 'Bicarbonato de sódio');

-- Medicações para o registro de urgência do paciente 'Camila Costa'
INSERT INTO medicacao (fk_registro_urgencia_codigo, id, nome) VALUES (3, 1, 'Salbutamol');
INSERT INTO medicacao (fk_registro_urgencia_codigo, id, nome) VALUES (3, 2, 'Prednisolona');

-- Comorbidades para o registro de urgência do paciente 'Pedro Santos'
INSERT INTO comorbidade (fk_registro_urgencia_codigo, id, nome) VALUES (1, 1, 'Diabetes Mellitus');
INSERT INTO comorbidade (fk_registro_urgencia_codigo, id, nome) VALUES (1, 2, 'Obesidade');

-- Comorbidades para o registro de urgência do paciente 'Rodrigo Alves'
INSERT INTO comorbidade (fk_registro_urgencia_codigo, id, nome) VALUES (2, 1, 'Hipertensão arterial');
INSERT INTO comorbidade (fk_registro_urgencia_codigo, id, nome) VALUES (2, 2, 'Dislipidemia');

-- Comorbidades para o registro de urgência do paciente 'Camila Costa'
INSERT INTO comorbidade (fk_registro_urgencia_codigo, id, nome) VALUES (3, 1, 'Rinite alérgica');
INSERT INTO comorbidade (fk_registro_urgencia_codigo, id, nome) VALUES (3, 2, 'Eczema atópico');

-- Hipóteses para o registro de internado do paciente 'Ana Souza'
-- Assumindo que o registro_codigo gerado para a consulta de internado de 'Ana Souza' foi 4
INSERT INTO hipotese (fk_registro_codigo, id, descricao) VALUES (4, 1, 'Pneumonia bacteriana');
INSERT INTO hipotese (fk_registro_codigo, id, descricao) VALUES (4, 2, 'Possível complicação pulmonar');

-- Hipóteses para o registro de internado do paciente 'Lucas Mendes'
-- Assumindo que o registro_codigo gerado para a consulta de internado de 'Lucas Mendes' foi 5
INSERT INTO hipotese (fk_registro_codigo, id, descricao) VALUES (5, 1, 'Lesão muscular');
INSERT INTO hipotese (fk_registro_codigo, id, descricao) VALUES (5, 2, 'Necessidade de fisioterapia intensiva');

-- Hipóteses para o registro de internado do paciente 'Juliana Ferreira'
-- Assumindo que o registro_codigo gerado para a consulta de internado de 'Juliana Ferreira' foi 6
INSERT INTO hipotese (fk_registro_codigo, id, descricao) VALUES (6, 1, 'Dor crônica não controlada');
INSERT INTO hipotese (fk_registro_codigo, id, descricao) VALUES (6, 2, 'Dependência de opioides');

DELETE FROM monitora WHERE fk_cpf_interno = '12345678901' AND fk_cpf_paciente = '11122233344';