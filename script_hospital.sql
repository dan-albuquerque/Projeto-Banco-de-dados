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

create table medico(
	cpf varchar(11) primary key,
	rqe integer not null,
	nome varchar(100) not null,
	especialidade varchar(100) not null,
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

commit;




