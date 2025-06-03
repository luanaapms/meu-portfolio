CREATE DATABASE meuportfolio;
USE meuportfolio;

CREATE TABLE projetos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(200),
	descricao TEXT,
    url VARCHAR(500),
    tecnologias VARCHAR(200)
);

CREATE TABLE certificados (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(200),
	data VARCHAR(50),
    link VARCHAR(500)
);