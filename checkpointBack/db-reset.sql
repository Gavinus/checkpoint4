DROP DATABASE IF EXISTS `CheckGame`;

CREATE DATABASE `CheckGame`;

USE `CheckGame`;


CREATE TABLE `games` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(50) NOT NULL,
  `idGenre` INT NOT NULL,
  `adultOnly` TINYINT(1) NULL,
  `rating` INT NULL
);

CREATE TABLE `genres` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL
);

ALTER TABLE
    `games`
ADD
    CONSTRAINT `games_idgenre_foreign` FOREIGN KEY(`idGenre`) REFERENCES `genres`(`id`);


INSERT INTO genres (`name`)
VALUES('Horror'),
('Aventure'),
("FPS"),
('Point and Clic'),
('Survie'),
('Stratégie'),
('TPS'),
('PostApo'),
('Construction');


INSERT INTO games (`title`,`idGenre`,`adultOnly`,`rating`)
VALUES("Agony", 1, 1, 8),
('ARK', 2, 0, 10),
("Bioshock", 3, 1, 10),
('Counter-Strike', 3, 1, 10),
('The Curse Of Monkey Island', 4, 0, 8),
('DayZ', 5, 1, 10),
('DOOM', 3, 1, 10),
('Dungeon Kipper', 6, 0, 10),
('Dying Light', 3, 1, 10),
('The Evil Within', 7, 1, 7),
('Fallout', 8, 1, 10),
('Green Hell', 5, 0, 7),
('Half Life', 3, 1, 10),
('OddWorld', 2, 0, 10),
('OutLast', 1, 1, 10),
('Quake', 3, 1, 10),
('Rust', 9, 0, 10),
('Subnautica', 2, 0, 10),
('Warhammer 40K', 6, 1, 10);