CREATE DATABASE agenda;

use agenda;

CREATE TABLE tarefa_unica(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    descricao text,
    data date NOT NULL,
    peso decimal NOT NULL,
    horario time
)ENGINE=INNODB;

CREATE TABLE tarefa_semanal(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    data_inicial date NOT NULL,
    data_final date,
    horario time,
    peso decimal(4,2) NOT NULL,
    qtdConclusoes int NOT NULL DEFAULT 0    
)ENGINE=INNODB;

CREATE TABLE cancelamentos_semanal(    
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,    
    data date NOT NULL,    
    tarefa_semanal_id int,    
    FOREIGN KEY (tarefa_semanal_id) REFERENCES tarefa_semanal(id) on delete CASCADE
)ENGINE=INNODB;

CREATE TABLE dias_da_semana(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dia VARCHAR(7) NOT NULL,
    tarefa_semanal_id int,    
    FOREIGN KEY (tarefa_semanal_id) REFERENCES tarefa_semanal(id) on delete CASCADE
)ENGINE=INNODB;