-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: sql.freedb.tech
-- Waktu pembuatan: 11 Jul 2025 pada 08.31
-- Versi server: 8.0.42-0ubuntu0.22.04.1
-- Versi PHP: 8.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freedb_uts_moprog`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `CHATGROUPS`
--

CREATE TABLE `CHATGROUPS` (
  `id` char(6) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `creator_email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `CHATGROUPS`
--

INSERT INTO `CHATGROUPS` (`id`, `name`, `description`, `creator_email`, `created_at`) VALUES
('eeiP40', 'Calon Hengker', '', 'verlyaulia26@gmail.com', '2025-07-02 07:37:28'),
('vbleJg', 'Group Moprog', 'kelas Moprog pak ihsan', 'ihsan@gmail.com', '2025-07-11 07:01:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `GROUPMEMBERS`
--

CREATE TABLE `GROUPMEMBERS` (
  `group_id` char(6) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `role` enum('admin','member') NOT NULL DEFAULT 'member',
  `joined_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `GROUPMEMBERS`
--

INSERT INTO `GROUPMEMBERS` (`group_id`, `user_email`, `role`, `joined_at`) VALUES
('eeiP40', 'dandyganteng@gmail.com', 'member', '2025-07-02 07:44:04'),
('eeiP40', 'rafiafzal1803@gmail.com', 'member', '2025-07-11 06:46:18'),
('eeiP40', 'uswakhasanah639@gmail.com', 'member', '2025-07-11 06:46:31'),
('eeiP40', 'verlyaulia26@gmail.com', 'admin', '2025-07-02 07:37:28'),
('vbleJg', 'dandyganteng@gmail.com', 'member', '2025-07-11 07:02:18'),
('vbleJg', 'ihsan@gmail.com', 'admin', '2025-07-11 07:01:39'),
('vbleJg', 'megddo@gmail.com', 'member', '2025-07-11 07:19:44'),
('vblejg', 'rafiafzal1803@gmail.com', 'member', '2025-07-11 07:02:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `MESSAGES`
--

CREATE TABLE `MESSAGES` (
  `id` char(36) NOT NULL,
  `group_id` char(6) NOT NULL,
  `sender_email` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `MESSAGES`
--

INSERT INTO `MESSAGES` (`id`, `group_id`, `sender_email`, `content`, `sent_at`) VALUES
('08168a08-5e25-11f0-abfc-02001721ba7b', 'vbleJg', 'rafiafzal1803@gmail.com', 'Haloo', '2025-07-11 07:02:39'),
('0ad8a6f7-5e25-11f0-abfc-02001721ba7b', 'vbleJg', 'dandyganteng@gmail.com', 'Halo Semua', '2025-07-11 07:02:43'),
('13cc0041-5e25-11f0-abfc-02001721ba7b', 'vbleJg', 'ihsan@gmail.com', 'Halo', '2025-07-11 07:02:58'),
('64ec8763-5e23-11f0-abfc-02001721ba7b', 'eeiP40', 'verlyaulia26@gmail.com', '2 3 kucing berlari', '2025-07-11 06:50:55'),
('8b5e2ae8-5be3-11f0-abfc-02001721ba7b', 'eeiP40', 'verlyaulia26@gmail.com', 'Test2', '2025-07-08 10:08:50'),
('8f0be46b-5e27-11f0-abfc-02001721ba7b', 'vbleJg', 'megddo@gmail.com', 'Sangat hamdall', '2025-07-11 07:20:44'),
('97789071-5e27-11f0-abfc-02001721ba7b', 'vbleJg', 'dandyganteng@gmail.com', 'Oit', '2025-07-11 07:20:58'),
('b844eb5c-5e27-11f0-abfc-02001721ba7b', 'vbleJg', 'megddo@gmail.com', 'Ahhhh', '2025-07-11 07:21:53'),
('bd112997-5e27-11f0-abfc-02001721ba7b', 'vbleJg', 'megddo@gmail.com', 'Uhhhh', '2025-07-11 07:22:01'),
('bfa4b435-5e27-11f0-abfc-02001721ba7b', 'vbleJg', 'megddo@gmail.com', 'Ihhhh', '2025-07-11 07:22:06'),
('c34db98f-5be3-11f0-abfc-02001721ba7b', 'eeiP40', 'dandyganteng@gmail.com', 'Hshehdhd', '2025-07-08 10:10:24'),
('c8032edc-5e22-11f0-abfc-02001721ba7b', 'eeiP40', 'rafiafzal1803@gmail.com', 'HALOO', '2025-07-11 06:46:32'),
('cb107478-5e22-11f0-abfc-02001721ba7b', 'eeiP40', 'rafiafzal1803@gmail.com', 'Awoooo', '2025-07-11 06:46:37'),
('cc7d6cd2-5be3-11f0-abfc-02001721ba7b', 'eeiP40', 'dandyganteng@gmail.com', 'Hsjehdh', '2025-07-08 10:10:39'),
('ce6d9778-5e22-11f0-abfc-02001721ba7b', 'eeiP40', 'verlyaulia26@gmail.com', 'Pspps', '2025-07-11 06:46:43'),
('cfa8cc60-5e22-11f0-abfc-02001721ba7b', 'eeiP40', 'uswakhasanah639@gmail.com', 'haii', '2025-07-11 06:46:45'),
('fc507754-5be2-11f0-abfc-02001721ba7b', 'eeiP40', 'verlyaulia26@gmail.com', 'test1', '2025-07-08 10:04:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `TASK`
--

CREATE TABLE `TASK` (
  `uuid` char(36) NOT NULL DEFAULT (uuid()),
  `deadline` datetime DEFAULT NULL,
  `task` varchar(255) DEFAULT NULL,
  `status` enum('F','T') DEFAULT 'F',
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `TASK`
--

INSERT INTO `TASK` (`uuid`, `deadline`, `task`, `status`, `email`) VALUES
('2a8176d2-5e25-11f0-abfc-02001721ba7b', '2025-07-12 14:03:00', 'ksavdjh', 'F', 'ihsan@gmail.com'),
('2e99a741-4d87-11f0-abfc-02001721ba7b', '2025-06-27 16:10:00', 'KP EIT', 'T', 'dandyganteng@gmail.com'),
('79a92322-5e22-11f0-abfc-02001721ba7b', '2025-07-11 15:30:00', 'UAS MOPROG', 'F', 'rafiafzal1803@gmail.com'),
('7b7fcfbe-4eb6-11f0-abfc-02001721ba7b', '2025-06-26 09:40:00', 'Joki Sertifikasi Algo', 'T', 'dandyganteng@gmail.com'),
('901a7ea3-5569-11f0-abfc-02001721ba7b', '2025-07-02 11:20:00', 'Joki', 'T', 'verlyaulia26@gmail.com');

-- --------------------------------------------------------

--
-- Struktur dari tabel `TOKENS`
--

CREATE TABLE `TOKENS` (
  `EMAIL` varchar(255) NOT NULL,
  `TOKEN` varchar(100) NOT NULL,
  `EXPIRED_DATE` timestamp NOT NULL,
  `DEVICE` enum('web','mobile') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `TOKENS`
--

INSERT INTO `TOKENS` (`EMAIL`, `TOKEN`, `EXPIRED_DATE`, `DEVICE`) VALUES
('dandyganteng@gmail.com', '2KKcSpooXT&BdNittLWPJZhvxnggS3pX8cOZIIKfiGHJPAzJUurl3bFwJMTVnKfopXoTu53oTUEvRQ9UUdEqw@oHWerfXLORh3eH', '2025-08-11 00:00:00', 'mobile'),
('uswakhasanah639@gmail.com', '8TI@kZdPG6dIVKjSmKdTkcmcVQ#RkrumM~1wj0eiIBYgWly1OOTSnChgTzUIF92R$o8VWYsNLiZfbZwhblSFaM7KemJf0difsQh&', '2025-08-11 00:00:00', 'mobile'),
('ihsan@gmail.com', 'eanPxHtwmTcrk0OF!N0XXiaHxbgbNc@zmZHNHn#fTj@fGtZf7$e4HXYOTaQXGdG-qju&B9hIMkr2rg4Khsq@dQQIlhFcSIgJ2PH#', '2025-08-11 00:00:00', 'mobile'),
('dandyganteng@gmail.com', 'GdG?Gw6Q7c947G1mZkUceR$Pm9Jb@2Hh?VkPlD!qf6w1QeQAKGvL!dT@gMJdG$kq-WZdjiVTsilsF%eFsnO9aRXGvI@4fJcUkG#v', '2025-07-11 15:10:41', 'web'),
('verlyaulia26@gmail.com', 'KrRg8oVm&Q1-&N&DmcL#wf@cRcwqdSGW%DtTqIQQkcpyktoTD$UjZzm3KJd~f1hMdQ5X2RSlWfS-ni$Tp$xiO#L%c$OlXpHvTRPd', '2025-08-11 00:00:00', 'mobile'),
('rafiafzal1803@gmail.com', 'N06%IKQSYLMP%AFcLmXRQhdzhKLYaJ$WoQ6rSqVqkQy?fReS0LMQhFPNa!q0UxhmXqX%bGpZblx6fhGwbQb9i90HRAXoKOF&6G4L', '2025-08-11 00:00:00', 'mobile'),
('megddo@gmail.com', 'PIGdiBFTcV~m8BS3W!agX&!eaEiglhL2fhra#RDm-UenOFyzDhic73knQWT$KKjow%cQlOihmahHKwBBjHWJ3MbP$RqJEAQMx5Df', '2025-08-11 00:00:00', 'mobile');

-- --------------------------------------------------------

--
-- Struktur dari tabel `USER`
--

CREATE TABLE `USER` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `USER`
--

INSERT INTO `USER` (`email`, `password`, `name`) VALUES
('dandyganteng@gmail.com', '202cb962ac59075b964b07152d234b70', 'Dandy Yahmin'),
('ihsan@gmail.com', '202cb962ac59075b964b07152d234b70', 'Ihsan Rahdiana'),
('megddo@gmail.com', '63a9f0ea7bb98050796b649e85481845', 'Megiddo uwaw'),
('rafiafzal1803@gmail.com', '7facc1e944c656cfb83e058dc552930a', 'rafi afzal'),
('uswakhasanah639@gmail.com', '127510d8fca1ef2ab0dabf94082ead92', 'Uswa Khasanah'),
('verlyaulia26@gmail.com', '53f7e4bb11eabd722126848aac623fad', 'Verly R. A');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `CHATGROUPS`
--
ALTER TABLE `CHATGROUPS`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creator_email` (`creator_email`);

--
-- Indeks untuk tabel `GROUPMEMBERS`
--
ALTER TABLE `GROUPMEMBERS`
  ADD PRIMARY KEY (`group_id`,`user_email`),
  ADD KEY `user_email` (`user_email`);

--
-- Indeks untuk tabel `MESSAGES`
--
ALTER TABLE `MESSAGES`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_email` (`sender_email`),
  ADD KEY `idx_group_sent_at` (`group_id`,`sent_at`);

--
-- Indeks untuk tabel `TASK`
--
ALTER TABLE `TASK`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `email` (`email`);

--
-- Indeks untuk tabel `TOKENS`
--
ALTER TABLE `TOKENS`
  ADD PRIMARY KEY (`TOKEN`),
  ADD KEY `EMAIL` (`EMAIL`);

--
-- Indeks untuk tabel `USER`
--
ALTER TABLE `USER`
  ADD PRIMARY KEY (`email`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `CHATGROUPS`
--
ALTER TABLE `CHATGROUPS`
  ADD CONSTRAINT `CHATGROUPS_ibfk_1` FOREIGN KEY (`creator_email`) REFERENCES `USER` (`email`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `GROUPMEMBERS`
--
ALTER TABLE `GROUPMEMBERS`
  ADD CONSTRAINT `GROUPMEMBERS_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `CHATGROUPS` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `GROUPMEMBERS_ibfk_2` FOREIGN KEY (`user_email`) REFERENCES `USER` (`email`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `MESSAGES`
--
ALTER TABLE `MESSAGES`
  ADD CONSTRAINT `MESSAGES_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `CHATGROUPS` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `MESSAGES_ibfk_2` FOREIGN KEY (`sender_email`) REFERENCES `USER` (`email`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `TASK`
--
ALTER TABLE `TASK`
  ADD CONSTRAINT `TASK_ibfk_1` FOREIGN KEY (`email`) REFERENCES `USER` (`email`);

--
-- Ketidakleluasaan untuk tabel `TOKENS`
--
ALTER TABLE `TOKENS`
  ADD CONSTRAINT `TOKENS_ibfk_1` FOREIGN KEY (`EMAIL`) REFERENCES `USER` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
