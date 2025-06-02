CREATE DATABASE IF NOT EXISTS agenda;

use agenda;

CREATE TABLE tarefa_unica(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao text,
    data date NOT NULL,
    peso decimal NOT NULL,
    horario time,
    concluida boolean
)ENGINE=INNODB;