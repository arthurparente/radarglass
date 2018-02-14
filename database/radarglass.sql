CREATE DATABASE IF NOT EXISTS `radarglass`;

USE `radarglass`;

/* criação da tabela endereco */
CREATE TABLE IF NOT EXISTS `endereco` (
	`id_endereco` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`rua` varchar(150) NOT NULL,
	`bairro` varchar(150) NOT NULL,
	`cidade` varchar(150) NOT NULL,
	`estado` varchar(150) NOT NULL,
	`cep` varchar(50) NOT NULL
);

/* criação da tabela contato */
CREATE TABLE IF NOT EXISTS `contato` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`nome` varchar(150) NOT NULL,
	`email` varchar(50) NOT NULL,
	`nascimento` date NOT NULL,
	`profissao` varchar(150) NOT NULL,
	`empresa` varchar(150) NOT NULL,
	`comentario` text NOT NULL,
	`id_endereco` int(11) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id_endereco) REFERENCES endereco (id_endereco)
);


