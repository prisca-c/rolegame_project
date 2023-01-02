-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 02 jan. 2023 à 01:41
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rolegame_project`
--

-- --------------------------------------------------------

--
-- Structure de la table `characters`
--

CREATE TABLE `characters` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `class` int(11) NOT NULL,
  `hp` int(11) DEFAULT NULL,
  `ability` int(11) DEFAULT NULL,
  `strength` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `characters`
--

INSERT INTO `characters` (`id`, `name`, `class`, `hp`, `ability`, `strength`) VALUES
(2, 'Bij', 2, 70, 95, 70),
(3, 'Tama', 1, 90, 60, 75),
(5, 'Prisca', 3, 50, 80, 85),
(6, 'Orc', 5, 123, 32, 24),
(7, 'Dwarf', 6, 123, 32, 43);

-- --------------------------------------------------------

--
-- Structure de la table `class_character`
--

CREATE TABLE `class_character` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `hp` int(11) NOT NULL,
  `ability` int(11) NOT NULL,
  `strength` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `class_character`
--

INSERT INTO `class_character` (`id`, `name`, `hp`, `ability`, `strength`) VALUES
(1, 'character_warrior', 90, 60, 75),
(2, 'character_archer', 70, 95, 70),
(3, 'character_mage', 50, 80, 85),
(5, 'enemy_orc', 123, 32, 24),
(6, 'enemy_dwarf', 123, 32, 43);

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`description`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `type`, `description`) VALUES
(1, 'find', '{\"card_text\":\"It\'s better when it\'s free.\",\"text\":[\"You found a chest.\",\"Something is glowing in the dark...\",\"You meet someon on the road, this person decide to help you and give you something.\"]}'),
(2, 'fight_simple', '{\"card_text\":\"Show them who\'s the strongest.\",\"text\":[\"Someone is pushing you, you\'re now going to start a fight\",\"You walk into a tavern, you order a beer, but when you decide to drink it someone drunk decide to start a fight with you.\"]}'),
(5, 'fight_boss', '{\"card_text\":\"That\'s how heroes die.. or that\'s how they become rich\",\"text\":[\"You saw a shadow, you decide to follow it.. Unfortunately it\'s a Giant enemy, Good Luck.\"]}');

-- --------------------------------------------------------

--
-- Structure de la table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `parameters` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `id_character` int(11) NOT NULL,
  `id_object` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `inventory`
--

INSERT INTO `inventory` (`id`, `id_character`, `id_object`, `quantity`) VALUES
(4, 2, 4, 7),
(8, 3, 1, 4),
(9, 2, 1, 10),
(12, 2, 5, 23);

-- --------------------------------------------------------

--
-- Structure de la table `objects`
--

CREATE TABLE `objects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `property` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `objects`
--

INSERT INTO `objects` (`id`, `name`, `type`, `description`, `property`) VALUES
(1, 'strength potion', 'consumable', 'potion that gives strength to the character', '[\"strength\", \"*\", 1.4]'),
(4, 'D.O.P.E potion', 'consumable', 'potion that boost your health and your strength', '[\"strength\",\"+\",10]'),
(5, 'chicken', 'food', 'piece of chicken that heal the character', '[\"hp\",\"+\",5]');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class` (`class`);

--
-- Index pour la table `class_character`
--
ALTER TABLE `class_character`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Index pour la table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_character` (`id_character`),
  ADD KEY `id_object` (`id_object`);

--
-- Index pour la table `objects`
--
ALTER TABLE `objects`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `class_character`
--
ALTER TABLE `class_character`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `objects`
--
ALTER TABLE `objects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `characters`
--
ALTER TABLE `characters`
  ADD CONSTRAINT `characters_ibfk_1` FOREIGN KEY (`class`) REFERENCES `class_character` (`id`);

--
-- Contraintes pour la table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Contraintes pour la table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`id_character`) REFERENCES `characters` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`id_object`) REFERENCES `objects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
