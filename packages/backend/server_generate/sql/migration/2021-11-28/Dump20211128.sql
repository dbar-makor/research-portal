-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: research
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attachment`
--

DROP TABLE IF EXISTS `attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `publication_id` int unsigned NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `file_name` text NOT NULL,
  `file_name_system` text NOT NULL,
  `type` enum('video','audio','pdf') NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  KEY `fk_attachment_publication1_idx` (`publication_id`),
  CONSTRAINT `fk_attachment_publication1` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachment`
--

LOCK TABLES `attachment` WRITE;
/*!40000 ALTER TABLE `attachment` DISABLE KEYS */;
/*!40000 ALTER TABLE `attachment` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `attachment_BEFORE_INSERT` BEFORE INSERT ON `attachment` FOR EACH ROW BEGIN
	SET NEW.`uuid` = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `publication_id` int unsigned NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  KEY `fk_bookmark_user1_idx` (`user_id`),
  KEY `fk_bookmark_publication1_idx` (`publication_id`),
  CONSTRAINT `fk_bookmark_publication1` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`id`),
  CONSTRAINT `fk_bookmark_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `bookmark_BEFORE_INSERT` BEFORE INSERT ON `bookmark` FOR EACH ROW BEGIN
	SET NEW.`uuid` = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'4c9b048d-4c27-11ec-8f4c-10e7c6179426','Investment strategy',1,'2021-11-25 10:08:01','2021-11-25 10:08:11'),(2,'92dc90ce-4dd7-11ec-8f4c-10e7c6179426','Long/short event driven',1,'2021-11-25 10:08:01','2021-11-25 10:08:01'),(3,'92dcb04d-4dd7-11ec-8f4c-10e7c6179426','Midday Geneva',1,'2021-11-25 10:08:01','2021-11-25 10:08:01'),(4,'92dcbe11-4dd7-11ec-8f4c-10e7c6179426','Morning news & top trading ideas',1,'2021-11-25 10:08:01','2021-11-25 10:08:01'),(5,'92dcc5a9-4dd7-11ec-8f4c-10e7c6179426','Risk arbitrage',1,'2021-11-25 10:08:01','2021-11-25 10:08:01'),(6,'92dccd03-4dd7-11ec-8f4c-10e7c6179426','Special situation',1,'2021-11-25 10:08:01','2021-11-25 10:08:01'),(7,'92dce4b6-4dd7-11ec-8f4c-10e7c6179426','Technical analysis',1,'2021-11-25 10:08:01','2021-11-25 10:08:01'),(8,'92dcebad-4dd7-11ec-8f4c-10e7c6179426','Weekly macroscopy',1,'2021-11-25 10:08:01','2021-11-25 10:08:01');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `category_BEFORE_INSERT` BEFORE INSERT ON `category` FOR EACH ROW BEGIN
	SET NEW.`uuid` = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `category_has_publication`
--

DROP TABLE IF EXISTS `category_has_publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_has_publication` (
  `category_id` int unsigned NOT NULL,
  `publication_id` int unsigned NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`,`publication_id`),
  KEY `fk_category_has_publication_publication1_idx` (`publication_id`),
  KEY `fk_category_has_publication_category1_idx` (`category_id`),
  CONSTRAINT `fk_category_has_publication_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_category_has_publication_publication1` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_has_publication`
--

LOCK TABLES `category_has_publication` WRITE;
/*!40000 ALTER TABLE `category_has_publication` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_has_publication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `publication_id` int unsigned NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `content` text NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `likes` int NOT NULL DEFAULT '0',
  `dislikes` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  KEY `fk_comment_user1_idx` (`user_id`),
  KEY `fk_comment_publication1_idx` (`publication_id`),
  CONSTRAINT `fk_comment_publication1` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`id`),
  CONSTRAINT `fk_comment_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `comment_BEFORE_INSERT` BEFORE INSERT ON `comment` FOR EACH ROW BEGIN
	SET NEW.`uuid` = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `legal_name` text NOT NULL,
  `status` enum('client','prospect') NOT NULL DEFAULT 'prospect',
  `country` char(2) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `start_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `company_BEFORE_INSERT` BEFORE INSERT ON `company` FOR EACH ROW BEGIN
	SET NEW.`uuid` = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `connection`
--

DROP TABLE IF EXISTS `connection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `connection` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `device_type` enum('ios','android','web') NOT NULL,
  `location` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_connection_user1_idx` (`user_id`),
  CONSTRAINT `fk_connection_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connection`
--

LOCK TABLES `connection` WRITE;
/*!40000 ALTER TABLE `connection` DISABLE KEYS */;
INSERT INTO `connection` VALUES (1,1,'web','{\"as\": \"AS8551 Bezeq International-Ltd\", \"isp\": \"BEZEQINT\", \"lat\": 32.0668, \"lon\": 34.7649, \"org\": \"\", \"zip\": \"\", \"city\": \"Tel Aviv\", \"query\": \"82.81.27.189\", \"region\": \"TA\", \"status\": \"success\", \"country\": \"Israel\", \"timezone\": \"Asia/Jerusalem\", \"regionName\": \"Tel Aviv\", \"countryCode\": \"IL\"}','2021-11-25 06:24:49'),(2,15,'web','{\"as\": \"AS8551 Bezeq International-Ltd\", \"isp\": \"BEZEQINT\", \"lat\": 32.0668, \"lon\": 34.7649, \"org\": \"\", \"zip\": \"\", \"city\": \"Tel Aviv\", \"query\": \"82.81.27.189\", \"region\": \"TA\", \"status\": \"success\", \"country\": \"Israel\", \"timezone\": \"Asia/Jerusalem\", \"regionName\": \"Tel Aviv\", \"countryCode\": \"IL\"}','2021-11-25 12:12:46'),(3,20,'web','{\"as\": \"AS8551 Bezeq International-Ltd\", \"isp\": \"BEZEQINT\", \"lat\": 32.0668, \"lon\": 34.7649, \"org\": \"\", \"zip\": \"\", \"city\": \"Tel Aviv\", \"query\": \"82.81.27.189\", \"region\": \"TA\", \"status\": \"success\", \"country\": \"Israel\", \"timezone\": \"Asia/Jerusalem\", \"regionName\": \"Tel Aviv\", \"countryCode\": \"IL\"}','2021-11-25 12:44:44'),(4,1,'web','{\"as\": \"AS8551 Bezeq International-Ltd\", \"isp\": \"BEZEQINT\", \"lat\": 32.0668, \"lon\": 34.7649, \"org\": \"\", \"zip\": \"\", \"city\": \"Tel Aviv\", \"query\": \"82.81.27.189\", \"region\": \"TA\", \"status\": \"success\", \"country\": \"Israel\", \"timezone\": \"Asia/Jerusalem\", \"regionName\": \"Tel Aviv\", \"countryCode\": \"IL\"}','2021-11-25 13:16:49'),(5,15,'web','{\"as\": \"AS8551 Bezeq International-Ltd\", \"isp\": \"BEZEQINT\", \"lat\": 32.0668, \"lon\": 34.7649, \"org\": \"\", \"zip\": \"\", \"city\": \"Tel Aviv\", \"query\": \"82.81.27.189\", \"region\": \"TA\", \"status\": \"success\", \"country\": \"Israel\", \"timezone\": \"Asia/Jerusalem\", \"regionName\": \"Tel Aviv\", \"countryCode\": \"IL\"}','2021-11-25 14:29:40'),(6,15,'web','{\"as\": \"AS8551 Bezeq International-Ltd\", \"isp\": \"BEZEQINT\", \"lat\": 32.0668, \"lon\": 34.7649, \"org\": \"\", \"zip\": \"\", \"city\": \"Tel Aviv\", \"query\": \"82.81.27.189\", \"region\": \"TA\", \"status\": \"success\", \"country\": \"Israel\", \"timezone\": \"Asia/Jerusalem\", \"regionName\": \"Tel Aviv\", \"countryCode\": \"IL\"}','2021-11-25 14:48:26'),(7,15,'web','{\"as\": \"AS8551 Bezeq International-Ltd\", \"isp\": \"BEZEQINT\", \"lat\": 32.0668, \"lon\": 34.7649, \"org\": \"\", \"zip\": \"\", \"city\": \"Tel Aviv\", \"query\": \"82.81.27.189\", \"region\": \"TA\", \"status\": \"success\", \"country\": \"Israel\", \"timezone\": \"Asia/Jerusalem\", \"regionName\": \"Tel Aviv\", \"countryCode\": \"IL\"}','2021-11-25 15:06:19'),(8,15,'web','{\"as\": \"AS8551 Bezeq International-Ltd\", \"isp\": \"BEZEQINT\", \"lat\": 32.0668, \"lon\": 34.7649, \"org\": \"\", \"zip\": \"\", \"city\": \"Tel Aviv\", \"query\": \"82.81.27.189\", \"region\": \"TA\", \"status\": \"success\", \"country\": \"Israel\", \"timezone\": \"Asia/Jerusalem\", \"regionName\": \"Tel Aviv\", \"countryCode\": \"IL\"}','2021-11-25 15:06:32'),(9,15,'web','{\"as\": \"AS8551 Bezeq International-Ltd\", \"isp\": \"BEZEQINT\", \"lat\": 32.0668, \"lon\": 34.7649, \"org\": \"\", \"zip\": \"\", \"city\": \"Tel Aviv\", \"query\": \"82.81.27.189\", \"region\": \"TA\", \"status\": \"success\", \"country\": \"Israel\", \"timezone\": \"Asia/Jerusalem\", \"regionName\": \"Tel Aviv\", \"countryCode\": \"IL\"}','2021-11-25 15:21:47'),(10,15,'web','{\"as\": \"AS8551 Bezeq International-Ltd\", \"isp\": \"BEZEQINT\", \"lat\": 32.0668, \"lon\": 34.7649, \"org\": \"\", \"zip\": \"\", \"city\": \"Tel Aviv\", \"query\": \"82.81.27.189\", \"region\": \"TA\", \"status\": \"success\", \"country\": \"Israel\", \"timezone\": \"Asia/Jerusalem\", \"regionName\": \"Tel Aviv\", \"countryCode\": \"IL\"}','2021-11-25 15:22:08');
/*!40000 ALTER TABLE `connection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract`
--

DROP TABLE IF EXISTS `contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `sales_id` int unsigned NOT NULL,
  `company_id` int unsigned NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `amount` int NOT NULL,
  `periodicity` enum('monthly','quarterly','half','fully') NOT NULL,
  `members` int NOT NULL,
  `currency` char(4) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `start_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  KEY `fk_contract_company1_idx` (`company_id`),
  KEY `fk_contract_user1_idx` (`sales_id`),
  CONSTRAINT `fk_contract_company1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_contract_user1` FOREIGN KEY (`sales_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `contract_BEFORE_INSERT` BEFORE INSERT ON `contract` FOR EACH ROW BEGIN
	SET NEW.`uuid` = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `name` varchar(255) NOT NULL,
  `iso_code_2` char(2) NOT NULL,
  `iso_code_3` char(3) NOT NULL,
  `dialing_code` char(3) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`iso_code_2`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES ('United Arab Emirates','AE','ARE','971','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Switzerland','CH','CHE','41','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Germany','DE','DEU','49','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Ecuador','EC','ECU','593','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Estonia','EE','EST','372','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Egypt','EG','EGY','20','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Eritrea','ER','ERI','291','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Spain','ES','ESP','34','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Ethiopia','ET','ETH','251','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Finland','FI','FIN','358','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Fiji','FJ','FJI','679','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Falkland Islands (Malvinas)','FK','FLK','500','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Micronesia (Federated States of)','FM','FSM','691','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Faroe Islands','FO','FRO','298','2021-11-24 12:54:00','2021-11-24 12:54:00'),('France','FR','FRA','33','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Gabon','GA','GAB','241','2021-11-24 12:54:00','2021-11-24 12:54:00'),('United Kingdom of Great Britain and Northern Ireland','GB','GBR','44','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Grenada','GD','GRD','1','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Georgia','GE','GEO','995','2021-11-24 12:54:00','2021-11-24 12:54:00'),('French Guiana','GF','GUF','594','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Ghana','GH','GHA','233','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Gibraltar','GI','GIB','350','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Greenland','GL','GRL','299','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Gambia','GM','GMB','220','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Guinea','GN','GIN','224','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Guadeloupe','GP','GLP','590','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Equatorial Guinea','GQ','GNQ','240','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Greece','GR','GRC','30','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Guatemala','GT','GTM','502','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Guam','GU','GUM','1','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Guinea-Bissau','GW','GNB','245','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Guyana','GY','GUY','592','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Hong Kong','HK','HKG','852','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Honduras','HN','HND','504','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Haiti','HT','HTI','509','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Hungary','HU','HUN','36','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Indonesia','ID','IDN','62','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Ireland','IE','IRL','353','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Israel','IL','ISR','972','2021-11-24 12:54:00','2021-11-24 12:54:00'),('India','IN','IND','91','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Iraq','IQ','IRQ','964','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Iran (Islamic Republic of)','IR','IRN','98','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Iceland','IS','ISL','354','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Italy','IT','ITA','39','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Jamaica','JM','JAM','1','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Jordan','JO','JOR','962','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Japan','JP','JPN','81','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Kenya','KE','KEN','254','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Kyrgyzstan','KG','KGZ','996','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Kiribati','KI','KIR','686','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Saint Kitts and Nevis','KN','KNA','1','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Korea (Democratic People\'s Republic of)','KP','PRK','850','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Korea, Republic of','KR','KOR','82','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Kuwait','KW','KWT','965','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Kazakhstan','KZ','KAZ','7','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Lao People\'s Democratic Republic','LA','LAO','856','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Lebanon','LB','LBN','961','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Saint Lucia','LC','LCA','1','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Liechtenstein','LI','LIE','423','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Sri Lanka','LK','LKA','94','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Liberia','LR','LBR','231','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Lesotho','LS','LSO','266','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Lithuania','LT','LTU','370','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Luxembourg','LU','LUX','352','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Latvia','LV','LVA','371','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Libya','LY','LBY','218','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Morocco','MA','MAR','212','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Monaco','MC','MCO','377','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Moldova, Republic of','MD','MDA','373','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Montenegro','ME','MNE','382','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Madagascar','MG','MDG','261','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Marshall Islands','MH','MHL','692','2021-11-24 12:54:00','2021-11-24 12:54:00'),('North Macedonia','MK','MKD','389','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Mali','ML','MLI','223','2021-11-24 12:54:00','2021-11-24 12:54:00'),('Myanmar','MM','MMR','95','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Mongolia','MN','MNG','976','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Macao','MO','MAC','853','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Northern Mariana Islands','MP','MNP','1','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Martinique','MQ','MTQ','596','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Mauritania','MR','MRT','222','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Montserrat','MS','MSR','1','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Malta','MT','MLT','356','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Mauritius','MU','MUS','230','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Maldives','MV','MDV','960','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Malawi','MW','MWI','265','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Mexico','MX','MEX','52','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Malaysia','MY','MYS','60','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Mozambique','MZ','MOZ','258','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Namibia','NA','NAM','264','2021-11-24 12:54:01','2021-11-24 12:54:01'),('New Caledonia','NC','NCL','687','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Niger','NE','NER','227','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Norfolk Island','NF','NFK','672','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Nigeria','NG','NGA','234','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Nicaragua','NI','NIC','505','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Netherlands','NL','NLD','31','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Norway','NO','NOR','47','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Nepal','NP','NPL','977','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Nauru','NR','NRU','674','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Niue','NU','NIU','683','2021-11-24 12:54:01','2021-11-24 12:54:01'),('New Zealand','NZ','NZL','64','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Oman','OM','OMN','968','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Panama','PA','PAN','507','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Peru','PE','PER','51','2021-11-24 12:54:01','2021-11-24 12:54:01'),('French Polynesia','PF','PYF','689','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Papua New Guinea','PG','PNG','675','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Philippines','PH','PHL','63','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Pakistan','PK','PAK','92','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Poland','PL','POL','48','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Saint Pierre and Miquelon','PM','SPM','508','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Pitcairn','PN','PCN','870','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Puerto Rico','PR','PRI','1','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Palestine, State of','PS','PSE','970','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Portugal','PT','PRT','351','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Palau','PW','PLW','680','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Paraguay','PY','PRY','595','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Qatar','QA','QAT','974','2021-11-24 12:54:01','2021-11-24 12:54:01'),('RÃ©union','RE','REU','262','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Serbia','RS','SRB','381','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Russian Federation','RU','RUS','7','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Rwanda','RW','RWA','250','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Saudi Arabia','SA','SAU','966','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Solomon Islands','SB','SLB','677','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Seychelles','SC','SYC','248','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Sudan','SD','SDN','249','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Sweden','SE','SWE','46','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Singapore','SG','SGP','65','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Saint Helena, Ascension and Tristan da Cunha[b]','SH','SHN','290','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Slovenia','SI','SVN','386','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Svalbard and Jan Mayen[c]','SJ','SJM','47','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Slovakia','SK','SVK','421','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Sierra Leone','SL','SLE','232','2021-11-24 12:54:01','2021-11-24 12:54:01'),('San Marino','SM','SMR','378','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Senegal','SN','SEN','221','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Somalia','SO','SOM','252','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Suriname','SR','SUR','597','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Sao Tome and Principe','ST','STP','239','2021-11-24 12:54:01','2021-11-24 12:54:01'),('El Salvador','SV','SLV','503','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Syrian Arab Republic','SY','SYR','963','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Eswatini','SZ','SWZ','268','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Turks and Caicos Islands','TC','TCA','1','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Togo','TG','TGO','228','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Thailand','TH','THA','66','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Tajikistan','TJ','TJK','992','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Tokelau','TK','TKL','690','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Timor-Leste','TL','TLS','670','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Turkmenistan','TM','TKM','993','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Tunisia','TN','TUN','216','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Tonga','TO','TON','676','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Turkey','TR','TUR','90','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Trinidad and Tobago','TT','TTO','1','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Tuvalu','TV','TUV','688','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Taiwan, Province of China','TW','TWN','886','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Tanzania, United Republic of','TZ','TZA','255','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Ukraine','UA','UKR','380','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Uganda','UG','UGA','256','2021-11-24 12:54:01','2021-11-24 12:54:01'),('United States of America','US','USA','1','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Uruguay','UY','URY','598','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Uzbekistan','UZ','UZB','998','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Holy See','VA','VAT','379','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Saint Vincent and the Grenadines','VC','VCT','1','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Venezuela (Bolivarian Republic of)','VE','VEN','58','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Virgin Islands (British)','VG','VGB','1','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Virgin Islands (U.S.)','VI','VIR','1','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Viet Nam','VN','VNM','84','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Vanuatu','VU','VUT','678','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Wallis and Futuna','WF','WLF','681','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Samoa','WS','WSM','685','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Yemen','YE','YEM','967','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Mayotte','YT','MYT','262','2021-11-24 12:54:01','2021-11-24 12:54:01'),('South Africa','ZA','ZAF','27','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Zambia','ZM','ZMB','260','2021-11-24 12:54:01','2021-11-24 12:54:01'),('Zimbabwe','ZW','ZWE','263','2021-11-24 12:54:01','2021-11-24 12:54:01');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `currency` (
  `code` char(4) NOT NULL,
  `name` varchar(255) NOT NULL,
  `symbol` varchar(45) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`code`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` VALUES ('AED','UAE Dirham','د.إ',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('AFN','Afghani','Af',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('ALL','Lek','L',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('AMD','Armenian Dram','Դ',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('AOA','Kwanza','Kz',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('ARS','Argentine Peso','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('AUD','Australian Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('AWG','Aruban Guilder/Florin','ƒ',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('AZN','Azerbaijanian Manat','ман',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BAM','Konvertibilna Marka','КМ',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BBD','Barbados Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BDT','Taka','৳',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BGN','Bulgarian Lev','лв',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BHD','Bahraini Dinar','ب.د',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BIF','Burundi Franc','₣',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BMD','Bermudian Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BND','Brunei Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BOB','Boliviano','Bs.',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BRL','Brazilian Real','R$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BSD','Bahamian Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BTN','Ngultrum','',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BWP','Pula','P',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BYN','Belarusian Ruble','Br',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('BZD','Belize Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('CAD','Canadian Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('CDF','Congolese Franc','₣',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('CHF','Swiss Franc','₣',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('CLP','Chilean Peso','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('CNY','Yuan','¥',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('COP','Colombian Peso','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('CRC','Costa Rican Colon','₡',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('CUP','Cuban Peso','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('CVE','Cape Verde Escudo','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('CZK','Czech Koruna','Kč',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('DJF','Djibouti Franc','₣',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('DKK','Danish Krone','kr',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('DOP','Dominican Peso','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('DZD','Algerian Dinar','د.ج',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('EGP','Egyptian Pound','£',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('ERN','Nakfa','Nfk',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('ETB','Ethiopian Birr','',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('EUR','Euro','€',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('FJD','Fiji Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('FKP','Falkland Islands Pound','£',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('GBP','Pound Sterling','£',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('GEL','Lari','ლ',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('GHS','Cedi','₵',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('GIP','Gibraltar Pound','£',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('GMD','Dalasi','D',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('GNF','Guinea Franc','₣',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('GTQ','Quetzal','Q',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('GYD','Guyana Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('HKD','Hong Kong Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('HNL','Lempira','L',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('HRK','Croatian Kuna','Kn',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('HTG','Gourde','G',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('HUF','Forint','Ft',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('IDR','Rupiah','Rp',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('ILS','New Israeli Shekel','₪',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('INR','Indian Rupee','₹',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('IQD','Iraqi Dinar','ع.د',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('IRR','Iranian Rial','﷼',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('ISK','Iceland Krona','Kr',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('JMD','Jamaican Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('JOD','Jordanian Dinar','د.ا',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('JPY','Yen','¥',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('KES','Kenyan Shilling','Sh',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('KGS','Som','',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('KHR','Riel','៛',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('KPW','North Korean Won','₩',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('KRW','South Korean Won','₩',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('KWD','Kuwaiti Dinar','د.ك',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('KYD','Cayman Islands Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('KZT','Tenge','〒',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('LAK','Kip','₭',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('LBP','Lebanese Pound','ل.ل',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('LKR','Sri Lanka Rupee','Rs',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('LRD','Liberian Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('LSL','Loti','L',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('LYD','Libyan Dinar','ل.د',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MAD','Moroccan Dirham','د.م.',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MDL','Moldovan Leu','L',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MGA','Malagasy Ariary','',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MKD','Denar','ден',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MMK','Kyat','K',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MNT','Tugrik','₮',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MOP','Pataca','P',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MRU','Ouguiya','UM',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MUR','Mauritius Rupee','₨',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MVR','Rufiyaa','ރ.',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MWK','Kwacha','MK',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MXN','Mexican Peso','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MYR','Malaysian Ringgit','RM',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('MZN','Metical','MTn',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('NAD','Namibia Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('NGN','Naira','₦',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('NIO','Cordoba Oro','C$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('NOK','Norwegian Krone','kr',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('NPR','Nepalese Rupee','₨',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('NZD','New Zealand Dollar','$',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('OMR','Rial Omani','ر.ع.',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('PAB','Balboa','B/.',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('PEN','Nuevo Sol','S/.',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('PGK','Kina','K',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('PHP','Philippine Peso','₱',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('PKR','Pakistan Rupee','₨',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('PLN','PZloty','zł',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('PYG','Guarani','₲',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('QAR','Qatari Rial','ر.ق',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('RON','Leu','L',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('RSD','Serbian Dinar','din',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('RUB','Russian Ruble','р.',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('RWF','Rwanda Franc','₣',1,'2021-11-25 13:08:57','2021-11-25 13:08:57'),('SAR','Saudi Riyal','ر.س',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('SBD','Solomon Islands Dollar','$',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('SCR','Seychelles Rupee','₨',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('SDG','Sudanese Pound','£',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('SEK','Swedish Krona','kr',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('SGD','Singapore Dollar','$',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('SHP','Saint Helena Pound','£',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('SLL','Leone','Le',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('SOS','Somali Shilling','Sh',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('SRD','Suriname Dollar','$',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('STN','Dobra','Db',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('SYP','Syrian Pound','ل.س',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('SZL','Lilangeni','L',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('THB','Baht','฿',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('TJS','Somoni','ЅМ',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('TMT','Manat','m',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('TND','Tunisian Dinar','د.ت',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('TOP','Pa’anga','T$',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('TRY','Turkish Lira','₤',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('TTD','Trinidad and Tobago Dollar','$',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('TWD','Taiwan Dollar','$',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('TZS','Tanzanian Shilling','Sh',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('UAH','Hryvnia','₴',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('UGX','Uganda Shilling','Sh',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('USD','US Dollar','$',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('UYU','Peso Uruguayo','$',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('UZS','Uzbekistan Sum','',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('VEF','Bolivar Fuerte','Bs F',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('VND','Dong','₫',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('VUV','Vatu','Vt',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('WST','Tala','T',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('XAF','CFA Franc BCEAO','₣',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('XCD','East Caribbean Dollar','$',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('XPF','CFP Franc','₣',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('YER','Yemeni Rial','﷼',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('ZAR','Rand','R',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('ZMW','Zambian Kwacha','ZK',1,'2021-11-25 13:08:58','2021-11-25 13:08:58'),('ZWL','Zimbabwe Dollar','$',1,'2021-11-25 13:08:58','2021-11-25 13:08:58');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `publication_id` int unsigned NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `title` text NOT NULL,
  `date` timestamp NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  KEY `fk_event_publication1_idx` (`publication_id`),
  CONSTRAINT `fk_event_publication1` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `event_BEFORE_INSERT` BEFORE INSERT ON `event` FOR EACH ROW BEGIN
	SET NEW.`uuid` = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `level`
--

DROP TABLE IF EXISTS `level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `level` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level`
--

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;
INSERT INTO `level` VALUES (1,'d2581387-4d2b-11ec-8f4c-10e7c6179426','admin','2021-11-24 13:38:34'),(2,'d2582c32-4d2b-11ec-8f4c-10e7c6179426','author','2021-11-24 13:38:34'),(3,'d2583470-4d2b-11ec-8f4c-10e7c6179426','member','2021-11-24 13:38:34'),(4,'1bb12ccc-4d30-11ec-8f4c-10e7c6179426','sales','2021-11-24 14:09:16'),(5,'1bb149e0-4d30-11ec-8f4c-10e7c6179426','compliance','2021-11-24 14:09:16');
/*!40000 ALTER TABLE `level` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `level_BEFORE_INSERT` BEFORE INSERT ON `level` FOR EACH ROW BEGIN
	SET NEW.`uuid` = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `publication`
--

DROP TABLE IF EXISTS `publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publication` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `views` int NOT NULL DEFAULT '0',
  `likes` int NOT NULL DEFAULT '0',
  `dislikes` int NOT NULL DEFAULT '0',
  `comments` int NOT NULL DEFAULT '0',
  `shares` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  KEY `fk_publication_user1_idx` (`user_id`),
  CONSTRAINT `fk_publication_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publication`
--

LOCK TABLES `publication` WRITE;
/*!40000 ALTER TABLE `publication` DISABLE KEYS */;
/*!40000 ALTER TABLE `publication` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `publication_BEFORE_INSERT` BEFORE INSERT ON `publication` FOR EACH ROW BEGIN
	SET NEW.`uuid` = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `publication_has_tag`
--

DROP TABLE IF EXISTS `publication_has_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publication_has_tag` (
  `publication_id` int unsigned NOT NULL,
  `tag_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`publication_id`,`tag_id`),
  KEY `fk_publication_has_tag_tag1_idx` (`tag_id`),
  KEY `fk_publication_has_tag_publication1_idx` (`publication_id`),
  CONSTRAINT `fk_publication_has_tag_publication1` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`id`),
  CONSTRAINT `fk_publication_has_tag_tag1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publication_has_tag`
--

LOCK TABLES `publication_has_tag` WRITE;
/*!40000 ALTER TABLE `publication_has_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `publication_has_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social`
--

DROP TABLE IF EXISTS `social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `publication_id` int unsigned DEFAULT NULL,
  `comment_id` int unsigned DEFAULT NULL,
  `user_id` int unsigned NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `type` enum('like','dislike','share') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  KEY `fk_social_comment1_idx` (`comment_id`),
  KEY `fk_social_user1_idx` (`user_id`),
  KEY `fk_social_publication1_idx` (`publication_id`),
  CONSTRAINT `fk_social_comment1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`),
  CONSTRAINT `fk_social_publication1` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`id`),
  CONSTRAINT `fk_social_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social`
--

LOCK TABLES `social` WRITE;
/*!40000 ALTER TABLE `social` DISABLE KEYS */;
/*!40000 ALTER TABLE `social` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `social_BEFORE_INSERT` BEFORE INSERT ON `social` FOR EACH ROW BEGIN
	SET NEW.`uuid` = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `social_AFTER_INSERT` AFTER INSERT ON `social` FOR EACH ROW BEGIN

	SET @comment_id = NEW.comment_id;
	SET @publication_id = NEW.publication_id;
	SET @new_type = NEW.type;

	-- Insert social
	IF @comment_id IS NOT NULL THEN
	 IF @new_type = 'like' THEN
		UPDATE comment SET likes = 1 WHERE id = @comment_id; 
	 ELSEIF @new_type = 'dislike' THEN
		UPDATE comment SET dislikes = 1 WHERE id = @comment_id; 
	 END IF;
	END IF;
     
	IF @publication_id IS NOT NULL THEN
	 IF @new_type = 'like' THEN
		UPDATE publication SET likes = 1 WHERE id = @publication_id;
	 ELSEIF @new_type = 'dislike' THEN
	  UPDATE publication SET dislikes = 1 WHERE id = @publication_id;
	 ELSEIF @new_type = 'share' THEN
	  UPDATE publication SET shares = 1 WHERE id = @publication_id;
	 END IF;
	END IF;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `social_AFTER_UPDATE` AFTER UPDATE ON `social` FOR EACH ROW BEGIN
	SET @comment_id = OLD.comment_id;
	SET @publication_id = OLD.publication_id;
	SET @new_type = NEW.type;
	SET @old_type = OLD.type;


	-- Comment
	IF @comment_id IS NOT NULL THEN
		IF @new_type = 'like' THEN 
			UPDATE comment SET likes = (SELECT likes FROM comment WHERE id = @comment_id) + 1, dislikes = (SELECT dislikes FROM comment WHERE id = @comment_id) - 1 WHERE id = @comment_id;
		ELSEIF @new_type = 'dislike' THEN
			UPDATE comment SET dislikes = (SELECT dislikes FROM comment WHERE id = @comment_id) + 1, likes = (SELECT likes FROM comment WHERE id = @comment_id) - 1 WHERE id = @comment_id;
		END IF;	
	END IF;		
        
	-- Publication
	 IF @publication_id IS NOT NULL THEN
		IF @new_type = 'like' THEN 
			UPDATE publication SET likes = (SELECT likes FROM publication WHERE id = @publication_id) + 1, dislikes = (SELECT dislikes FROM publication WHERE id = @publication_id) - 1 WHERE id = @publication_id;
		ELSEIF @new_type = 'dislike' THEN
			UPDATE publication SET dislikes = (SELECT dislikes FROM publication WHERE id = @publication_id) + 1, likes = (SELECT likes FROM publication WHERE id = @publication_id) - 1 WHERE id = @publication_id;
		ELSEIF @new_type = 'share' THEN
			UPDATE publication SET shares = (SELECT shares FROM publication WHERE id = @publication_id) + 1 WHERE id = @publication_id;
		END IF;	
	END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `social_AFTER_DELETE` AFTER DELETE ON `social` FOR EACH ROW BEGIN
SET @comment_id = OLD.comment_id;
SET @publication_id = OLD.publication_id;
SET @old_type = OLD.type;

-- Delete social
IF @comment_id IS NOT NULL THEN
-- Comment
	IF @old_type = 'like' THEN
		UPDATE comment SET likes = (SELECT likes FROM comment WHERE id = @comment_id) - 1 WHERE id = @comment_id;
	ELSEIF @old_type = 'dislike' THEN
		UPDATE comment SET dislikes = (SELECT dislikes FROM comment WHERE id = @comment_id) - 1 WHERE id = @comment_id;
	END IF;
ELSEIF @publication_id IS NOT NULL THEN
-- Publication
	IF @old_type = 'like' THEN 
	 UPDATE publication SET likes = (SELECT likes FROM publication WHERE id = @publication_id) - 1 WHERE id = @publication_id;
	ELSEIF @old_type = 'dislike' THEN
	 UPDATE publication SET dislikes = (SELECT dislikes FROM publication WHERE id = @publication_id) - 1 WHERE id = @publication_id;
	END IF;
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `tag_BEFORE_INSERT` BEFORE INSERT ON `tag` FOR EACH ROW BEGIN
	SET NEW.`uuid` = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `connection_id` int unsigned NOT NULL,
  `type` enum('login','platform','reset-password') NOT NULL,
  `content` text NOT NULL,
  `code` char(6) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_token_connection1_idx` (`connection_id`),
  CONSTRAINT `fk_token_connection1` FOREIGN KEY (`connection_id`) REFERENCES `connection` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (1,1,'platform','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiY295NWR5d0gyM0dQdHpjaFB2ZGs2Y0JIVTNEMVZNcy9UdUg0c3RNNEdZZXgxdXhkekgzVlJlRkY1cm1LZTNtbyIsImFsZ29yaXRobSI6IkhTMjU2IiwiZXhwaXJlc0luIjoiMWQiLCJpYXQiOjE2Mzc4MjE0ODl9.VjEg6EiqCn3DulD-Pmk-qL20yjcrav7v1BGxKsTDGSw',NULL,'2021-11-25 06:24:49'),(2,2,'platform','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRDNBMUdnN1FPU0JxYnRRdWo4R0xTSDB0S05CclZDUyswU3RMM2NYOXZPOEFuUnRrVkZCaDY5RUhRYytjdGhXLyIsImFsZ29yaXRobSI6IkhTMjU2IiwiZXhwaXJlc0luIjoiMWQiLCJpYXQiOjE2Mzc4NDIzNjZ9.fR2h5A6gIqo07r8iUZb3WytqT5RrNCbDuhzYBKqTjIg',NULL,'2021-11-25 12:12:46'),(3,3,'platform','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiTkcrOWJhWGI0T3lEclZ6b2J5RWxFb1h6emdXV1JWQWU4SFBacjR3ZlhCd1VRQ0NxOEVEV3RRUTFwSG5yc0g4ZCIsImFsZ29yaXRobSI6IkhTMjU2IiwiZXhwaXJlc0luIjoiMWQiLCJpYXQiOjE2Mzc4NDQyODR9.OW9Zjn9R51qaY38w0g3rUkbwYmKb_O0jbI2f3HaDD1E',NULL,'2021-11-25 12:44:44'),(4,4,'platform','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiY295NWR5d0gyM0dQdHpjaFB2ZGs2Y0JIVTNEMVZNcy9UdUg0c3RNNEdZZXgxdXhkekgzVlJlRkY1cm1LZTNtbyIsImFsZ29yaXRobSI6IkhTMjU2IiwiZXhwaXJlc0luIjoiMWQiLCJpYXQiOjE2Mzc4NDYyMDl9.Bi9trEiJffgMJTvLP78uuB3hz-lrVnifByyZukJ3Yqw',NULL,'2021-11-25 13:16:49'),(5,5,'platform','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRDNBMUdnN1FPU0JxYnRRdWo4R0xTSDB0S05CclZDUyswU3RMM2NYOXZPOEFuUnRrVkZCaDY5RUhRYytjdGhXLyIsImFsZ29yaXRobSI6IkhTMjU2IiwiZXhwaXJlc0luIjoiMWQiLCJpYXQiOjE2Mzc4NTA1ODB9.CkLwxn_mM0NPEYsqXt9BBNpCpop3VSoPtWcgtDL30Y0',NULL,'2021-11-25 14:29:40'),(6,6,'platform','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRDNBMUdnN1FPU0JxYnRRdWo4R0xTSDB0S05CclZDUyswU3RMM2NYOXZPOEFuUnRrVkZCaDY5RUhRYytjdGhXLyIsImFsZ29yaXRobSI6IkhTMjU2IiwiZXhwaXJlc0luIjoiMWQiLCJpYXQiOjE2Mzc4NTE3MDZ9.-0FImqJwQ5CWeV-pTMMIkxqHh7hiuEe1Ov5AfyEqsdQ',NULL,'2021-11-25 14:48:26'),(7,7,'platform','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRDNBMUdnN1FPU0JxYnRRdWo4R0xTSDB0S05CclZDUyswU3RMM2NYOXZPOEFuUnRrVkZCaDY5RUhRYytjdGhXLyIsImFsZ29yaXRobSI6IkhTMjU2IiwiZXhwaXJlc0luIjoiMWQiLCJpYXQiOjE2Mzc4NTI3Nzl9.zviBYcttgRw11WXCUgQCsZ4v5MY3VokhxilO6gVO6Ic',NULL,'2021-11-25 15:06:19'),(8,8,'platform','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRDNBMUdnN1FPU0JxYnRRdWo4R0xTSDB0S05CclZDUyswU3RMM2NYOXZPOEFuUnRrVkZCaDY5RUhRYytjdGhXLyIsImFsZ29yaXRobSI6IkhTMjU2IiwiZXhwaXJlc0luIjoiMWQiLCJpYXQiOjE2Mzc4NTI3OTJ9.VN8o91bEMebmbaimzGSee-IxYXupJs8bQckJ--4h4M4',NULL,'2021-11-25 15:06:32'),(9,9,'platform','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRDNBMUdnN1FPU0JxYnRRdWo4R0xTSDB0S05CclZDUyswU3RMM2NYOXZPK0FxYjk4bDlrdzd6SG1IVkh6alpMeDdCWU1MbFg1SlB2SC9lMGVVaUhxSU1HYXpHcjFnL0hIZzE0VldpVmlDc2c9IiwiYWxnb3JpdGhtIjoiSFMyNTYiLCJleHBpcmVzSW4iOiIxZCIsImlhdCI6MTYzNzg1MzcwN30.zYyH_i7TWb2i4C4Re-2DVJe_zmnNgQQs8s3vTaATvjo',NULL,'2021-11-25 15:21:47'),(10,10,'platform','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRDNBMUdnN1FPU0JxYnRRdWo4R0xTSDB0S05CclZDUyswU3RMM2NYOXZPK0FxYjk4bDlrdzd6SG1IVkh6alpMeDdCWU1MbFg1SlB2SC9lMGVVaUhxSU1HYXpHcjFnL0hIZzE0VldpVmlDc2c9IiwiYWxnb3JpdGhtIjoiSFMyNTYiLCJleHBpcmVzSW4iOiIxZCIsImlhdCI6MTYzNzg1MzcyOH0.8jSrnZwZFzu4i2CoLq5ViNyv_BF6Dv8DHLmtjy3Hwlo',NULL,'2021-11-25 15:22:08');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `level_id` int unsigned NOT NULL,
  `company_id` int unsigned DEFAULT NULL,
  `uuid` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` text,
  `phone` json DEFAULT NULL,
  `full_phone` varchar(45) DEFAULT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  `device_os` varchar(255) DEFAULT NULL,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `connection_count` int NOT NULL DEFAULT '0',
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  KEY `fk_user_level_idx` (`level_id`),
  KEY `fk_user_company1_idx` (`company_id`),
  CONSTRAINT `fk_user_company1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_user_level` FOREIGN KEY (`level_id`) REFERENCES `level` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,NULL,'ca1bb400-4d2c-11ec-8f4c-10e7c6179426','ehilel','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Eliyahu Hillel',NULL,'ehilel@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"0523446441\", \"dialing_code\": \"972\"}',NULL,NULL,NULL,'2021-11-25 13:16:49',2,1,'2021-11-24 13:45:30','2021-11-25 13:16:49'),(2,1,NULL,'ca1cf711-4d2c-11ec-8f4c-10e7c6179426','yhaouzi','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Yedidia Haouzi',NULL,'yhaouzi@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(3,1,NULL,'ca1dc03f-4d2c-11ec-8f4c-10e7c6179426','brefaeli','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Bar Refaeli',NULL,'barrefaeli32@gmail.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(4,1,NULL,'ca1e7769-4d2c-11ec-8f4c-10e7c6179426','orusaev','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Ofek Rusaev',NULL,'orusaev@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"0548792596\", \"dialing_code\": \"972\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(5,1,NULL,'ca1f1584-4d2c-11ec-8f4c-10e7c6179426','nvolf','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Natalia Volf',NULL,'nvolf@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(6,1,NULL,'ca1faf9e-4d2c-11ec-8f4c-10e7c6179426','rjojishvili','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Rusudan Jojishvili',NULL,'rjojishvili@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(7,1,NULL,'ca205130-4d2c-11ec-8f4c-10e7c6179426','okatz','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Ori Kovacsi Katz',NULL,'okatz@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(8,1,NULL,'ca20f429-4d2c-11ec-8f4c-10e7c6179426','kgoncharov','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Konstantin Goncharov',NULL,'kgoncharov@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(9,1,NULL,'ca2199da-4d2c-11ec-8f4c-10e7c6179426','statarinova','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64fv','Sofiia Tatarinova',NULL,'statarinova@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(10,1,NULL,'ca223ae7-4d2c-11ec-8f4c-10e7c6179426','hgossels','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Hadar Gossels',NULL,'hgossels@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(11,1,NULL,'ca22e05b-4d2c-11ec-8f4c-10e7c6179426','ldotan','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Lily Dotan',NULL,'ldotan@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(12,1,NULL,'ca2381eb-4d2c-11ec-8f4c-10e7c6179426','lasis','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Lizy Asis',NULL,'lasis@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(13,1,NULL,'ca242228-4d2c-11ec-8f4c-10e7c6179426','ybar','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Yisrael Bar',NULL,'ybar@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"0523558539\", \"dialing_code\": \"972\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(14,1,NULL,'ca24c4c2-4d2c-11ec-8f4c-10e7c6179426','ofek_be','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Ofek Be',NULL,'orusaev@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"0548792596\", \"dialing_code\": \"972\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(15,1,NULL,'ca25690d-4d2c-11ec-8f4c-10e7c6179426','statarinova','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Sofiia Tatarinova',NULL,'statarinova@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,'2021-11-25 15:22:08',7,1,'2021-11-24 13:45:30','2021-11-25 15:22:08'),(16,1,NULL,'ca2603c7-4d2c-11ec-8f4c-10e7c6179426','nlister','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Neria Lister',NULL,'nlister@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(17,1,NULL,'ca269fd0-4d2c-11ec-8f4c-10e7c6179426','smayzel','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Shahar Mayzel',NULL,'smayzel@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(18,1,NULL,'ca274533-4d2c-11ec-8f4c-10e7c6179426','amoshaev','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Arzu Moshaev',NULL,'amoshaev@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(19,1,NULL,'ca27f544-4d2c-11ec-8f4c-10e7c6179426','ryakovy','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Rony Yakovy',NULL,'ryakovy@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(20,1,NULL,'95ad9c89-4d2e-11ec-8f4c-10e7c6179426','mtal-socher','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Michal Tal-Socher',NULL,'mtal-socher@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,'2021-11-25 12:44:44',1,1,'2021-11-24 13:58:21','2021-11-25 12:44:44');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `user_BEFORE_INSERT` BEFORE INSERT ON `user` FOR EACH ROW BEGIN
	SET NEW.`uuid` = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_has_category`
--

DROP TABLE IF EXISTS `user_has_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_category` (
  `user_id` int unsigned NOT NULL,
  `category_id` int unsigned NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`category_id`),
  KEY `fk_user_has_category_category1_idx` (`category_id`),
  KEY `fk_user_has_category_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_has_category_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_user_has_category_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_category`
--

LOCK TABLES `user_has_category` WRITE;
/*!40000 ALTER TABLE `user_has_category` DISABLE KEYS */;
INSERT INTO `user_has_category` VALUES (1,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(1,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(1,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(1,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(1,5,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(1,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(1,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(1,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(2,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(2,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(2,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(2,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(2,5,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(2,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(2,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(2,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(3,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(3,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(3,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(3,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(3,5,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(3,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(3,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(3,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(4,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(4,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(4,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(4,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(4,5,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(4,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(4,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(4,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(5,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(5,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(5,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(5,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(5,5,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(5,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(5,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(5,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(6,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(6,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(6,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(6,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(6,5,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(6,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(6,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(6,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(7,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(7,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(7,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(7,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(7,5,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(7,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(7,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(7,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(8,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(8,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(8,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(8,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(8,5,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(8,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(8,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(8,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(9,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(9,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(9,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(9,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(9,5,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(9,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(9,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(9,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(10,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(10,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(10,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(10,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(10,5,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(10,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(10,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(10,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(11,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(11,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(11,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(11,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(11,5,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(11,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(11,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(11,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(12,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(12,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(12,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(12,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(12,5,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(12,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(12,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(12,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(13,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(13,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(13,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(13,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(13,5,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(13,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(13,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(13,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(14,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(14,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(14,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(14,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(14,5,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(14,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(14,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(14,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(15,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(15,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(15,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(15,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(15,5,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(15,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(15,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(15,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(16,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(16,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(16,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(16,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(16,5,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(16,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(16,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(16,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(17,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(17,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(17,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(17,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(17,5,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(17,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(17,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(17,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(18,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(18,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(18,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(18,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(18,5,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(18,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(18,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(18,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(19,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(19,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(19,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(19,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(19,5,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(19,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(19,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(19,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(20,1,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(20,2,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(20,3,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(20,4,1,'2021-11-25 13:16:02','2021-11-25 13:16:02'),(20,5,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(20,6,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(20,7,1,'2021-11-25 13:16:03','2021-11-25 13:16:03'),(20,8,1,'2021-11-25 13:16:03','2021-11-25 13:16:03');
/*!40000 ALTER TABLE `user_has_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `view`
--

DROP TABLE IF EXISTS `view`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `view` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `publication_id` int unsigned NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(45) NOT NULL,
  `count` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  KEY `fk_view_user1_idx` (`user_id`),
  KEY `fk_view_publication1_idx` (`publication_id`),
  CONSTRAINT `fk_view_publication1` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`id`),
  CONSTRAINT `fk_view_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `view`
--

LOCK TABLES `view` WRITE;
/*!40000 ALTER TABLE `view` DISABLE KEYS */;
/*!40000 ALTER TABLE `view` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE TRIGGER `view_BEFORE_INSERT` BEFORE INSERT ON `view` FOR EACH ROW BEGIN
	SET NEW.`uuid` = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-28  8:29:55
