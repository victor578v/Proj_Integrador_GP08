DROP DATABASE IF EXISTS livraria;
CREATE DATABASE IF NOT EXISTS livraria;
USE livraria;

-- Criação da tabela Categoria
CREATE TABLE IF NOT EXISTS `Categoria` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategoria`)
);

-- Criação da tabela Livro
CREATE TABLE IF NOT EXISTS `Livro` (
  `idLivro` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `autor` VARCHAR(255) NOT NULL,
  `isbn` VARCHAR(13) NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `dataPublicacao` DATE NULL,
  `Categoria_idCategoria` INT NOT NULL,
  `imagemUrl` TEXT NULL,
  PRIMARY KEY (`idLivro`),
  CONSTRAINT `fk_Livro_Categoria1`
    FOREIGN KEY (`Categoria_idCategoria`)
    REFERENCES `Categoria` (`idCategoria`)
);

-- Criação da tabela Usuario
CREATE TABLE IF NOT EXISTS `Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(20) NULL,
  `cargo` INT NOT NULL,
  PRIMARY KEY (`idUsuario`)
);

-- Criação da tabela Pedido
CREATE TABLE IF NOT EXISTS `Pedido` (
  `idPedido` INT NOT NULL AUTO_INCREMENT,
  `dataPedido` DATETIME NOT NULL,
  `valorTotal` DECIMAL(10,2) NOT NULL,
  `Usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idPedido`),
  CONSTRAINT `fk_Pedido_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `Usuario` (`idUsuario`)
);

-- Criação da tabela ItemPedido
CREATE TABLE IF NOT EXISTS `ItemPedido` (
  `idItemPedido` INT NOT NULL AUTO_INCREMENT,
  `quantidade` INT NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `Livro_idLivro` INT NOT NULL,
  `Pedido_idPedido` INT NOT NULL,
  PRIMARY KEY (`idItemPedido`),
  CONSTRAINT `fk_ItemPedido_Livro1`
    FOREIGN KEY (`Livro_idLivro`)
    REFERENCES `Livro` (`idLivro`),
  CONSTRAINT `fk_ItemPedido_Pedido1`
    FOREIGN KEY (`Pedido_idPedido`)
    REFERENCES `Pedido` (`idPedido`)
);

-- INSERCOES

-- Inserir categorias
INSERT INTO Categoria (nome) VALUES
('Ficção'),         -- idCategoria = 1
('Política'),       -- idCategoria = 2
('Romance'),        -- idCategoria = 3
('Fantasia'),       -- idCategoria = 4
('Biografia'),      -- idCategoria = 5
('Infantil'),      -- idCategoria = 6
('Terror');       -- idCategoria = 7

-- Inserir livros
INSERT INTO `Livro` (`idLivro`, `titulo`, `autor`, `isbn`, `preco`, `dataPublicacao`, `Categoria_idCategoria`) VALUES
(13, 'A Turma da Mônica - Laços', 'Mauricio de Sousa', '9788510070894', 40.00, '2014-05-10', 6),
(10, 'O Senhor dos Anéis', 'J.R.R. Tolkien', '9788542803936', 89.90, '2003-12-01', 4),
(11, 'O Menino Maluquinho', 'Ziraldo', '9788532510892', 29.90, '1980-05-01', 6),
(14, 'A Bolsa Amarela', 'Lúcia Machado de Almeida', '9788531603019', 25.00, '1976-04-01', 6),
(15, 'As Aventuras de Peter Pan', 'J.M. Barrie', '9788532521195', 32.90, '1911-12-01', 6),
(7, '1984', 'George Orwell', '9780141036144', 29.90, '1949-06-08', 2),
(9, 'A Revolução dos Bichos', 'George Orwell', '9788520926822', 19.90, '1945-08-17', 2),
(12, 'O Pequeno Príncipe', 'Antoine de Saint-Exupéry', '9788580570352', 35.90, '1943-04-06', 6),
(8, 'Dom Casmurro', 'Machado de Assis', '9788520913570', 24.90, '1899-08-01', 3),
(6, 'O Guia do Mochileiro das Galáxias', 'Douglas Adams', '9788537300633', 39.90, '1979-10-12', 1);

--Inserir Usuarios
INSERT INTO Usuario (nome, email, senha, telefone, cargo) VALUES
('Admin', 'admin@admin.com', 'admin', 'admin', 1),
('Maria Oliveira', 'maria.oliveira@example.com', 'senha456', '0987654321', 2);

-- Inserir pedidos
INSERT INTO Pedido (dataPedido, valorTotal, Usuario_idUsuario) VALUES
('2024-07-22 09:15:00', 89.80, 1),  -- Pedido de João Silva
('2024-07-22 11:00:00', 129.70, 2), -- Pedido de Maria Oliveira
('2024-07-23 16:45:00', 49.90, 1),  -- Pedido de João Silva
('2024-07-23 18:30:00', 79.80, 2);  -- Pedido de Maria Oliveira

-- Inserir itens de pedidos
INSERT INTO ItemPedido (quantidade, preco, Livro_idLivro, Pedido_idPedido) VALUES
-- Pedido 1 (João Silva, 2024-07-22)
(1, 39.90, 6, 1),  -- 1x "O Guia do Mochileiro das Galáxias" (idLivro 6)
(2, 24.90, 8, 1),  -- 2x "Dom Casmurro" (idLivro 8)

-- Pedido 2 (Maria Oliveira, 2024-07-22)
(1, 29.90, 7, 2),  -- 1x "1984" (idLivro 7)
(1, 59.90, 10, 2), -- 1x "O Senhor dos Anéis" (idLivro 10)
(2, 19.90, 9, 2),  -- 2x "A Revolução dos Bichos" (idLivro 9)

-- Pedido 3 (João Silva, 2024-07-23)
(1, 19.90, 9, 3),  -- 1x "A Revolução dos Bichos" (idLivro 9)

-- Pedido 4 (Maria Oliveira, 2024-07-23)
(3, 29.90, 7, 4),  -- 3x "1984" (idLivro 7)
(2, 39.90, 6, 4);  -- 2x "O Guia do Mochileiro das Galáxias" (idLivro 6)