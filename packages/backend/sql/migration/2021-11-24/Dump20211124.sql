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
  `name` varchar(45) NOT NULL,
  `type` enum('video','audio','pdf') NOT NULL,
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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'4c9b048d-4c27-11ec-8f4c-10e7c6179426','crypto','2021-11-23 06:33:41','2021-11-23 06:33:41');
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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connection`
--

LOCK TABLES `connection` WRITE;
/*!40000 ALTER TABLE `connection` DISABLE KEYS */;
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
  `legal_name` text NOT NULL,
  `status` enum('client','prospect') NOT NULL DEFAULT 'prospect',
  `country` char(2) NOT NULL,
  `amount` int NOT NULL,
  `periodicity` enum('monthly','quarterly','half','fully') NOT NULL,
  `members` int NOT NULL,
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
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
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
  `psition` varchar(255) DEFAULT NULL,
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
INSERT INTO `user` VALUES (1,1,NULL,'ca1bb400-4d2c-11ec-8f4c-10e7c6179426','ehilel','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Enigma',NULL,'ehilel@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"0523446441\", \"dialing_code\": \"972\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(2,1,NULL,'ca1cf711-4d2c-11ec-8f4c-10e7c6179426','yhaouzi','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Yedidia Haouzi',NULL,'yhaouzi@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(3,1,NULL,'ca1dc03f-4d2c-11ec-8f4c-10e7c6179426','brefaeli','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Bar Refaeli',NULL,'barrefaeli32@gmail.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(4,1,NULL,'ca1e7769-4d2c-11ec-8f4c-10e7c6179426','orusaev','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Ofek Rusaev',NULL,'orusaev@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"0548792596\", \"dialing_code\": \"972\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(5,1,NULL,'ca1f1584-4d2c-11ec-8f4c-10e7c6179426','nvolf','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Natalia Volf',NULL,'nvolf@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(6,1,NULL,'ca1faf9e-4d2c-11ec-8f4c-10e7c6179426','rjojishvili','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Rusudan Jojishvili',NULL,'rjojishvili@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(7,1,NULL,'ca205130-4d2c-11ec-8f4c-10e7c6179426','okatz','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Ori Kovacsi Katz',NULL,'okatz@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(8,1,NULL,'ca20f429-4d2c-11ec-8f4c-10e7c6179426','kgoncharov','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Konstantin Goncharov',NULL,'kgoncharov@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(9,1,NULL,'ca2199da-4d2c-11ec-8f4c-10e7c6179426','statarinova','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64fv','Sofiia Tatarinova',NULL,'statarinova@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(10,1,NULL,'ca223ae7-4d2c-11ec-8f4c-10e7c6179426','hgossels','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Hadar Gossels',NULL,'hgossels@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(11,1,NULL,'ca22e05b-4d2c-11ec-8f4c-10e7c6179426','ldotan','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Lily Dotan',NULL,'ldotan@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(12,1,NULL,'ca2381eb-4d2c-11ec-8f4c-10e7c6179426','lasis','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Lizy Asis',NULL,'lasis@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(13,1,NULL,'ca242228-4d2c-11ec-8f4c-10e7c6179426','ybar','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Yisrael Bar',NULL,'ybar@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"0523558539\", \"dialing_code\": \"972\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(14,1,NULL,'ca24c4c2-4d2c-11ec-8f4c-10e7c6179426','ofek_be','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Ofek Be',NULL,'orusaev@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"0548792596\", \"dialing_code\": \"972\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(15,1,NULL,'ca25690d-4d2c-11ec-8f4c-10e7c6179426','statarinova','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Sofiia Tatarinova',NULL,'statarinova@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(16,1,NULL,'ca2603c7-4d2c-11ec-8f4c-10e7c6179426','nlister','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Neria Lister',NULL,'nlister@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(17,1,NULL,'ca269fd0-4d2c-11ec-8f4c-10e7c6179426','smayzel','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Shahar Mayzel',NULL,'smayzel@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(18,1,NULL,'ca274533-4d2c-11ec-8f4c-10e7c6179426','amoshaev','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Arzu Moshaev',NULL,'amoshaev@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(19,1,NULL,'ca27f544-4d2c-11ec-8f4c-10e7c6179426','ryakovy','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Rony Yakovy',NULL,'ryakovy@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:45:30','2021-11-24 13:45:30'),(20,1,NULL,'95ad9c89-4d2e-11ec-8f4c-10e7c6179426','mtal-socher','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Michal Tal-Socher',NULL,'mtal-socher@makor-capital.com','https://image.pngaaa.com/419/263419-middle.png','{\"number\": \"\", \"dialing_code\": \"\"}',NULL,NULL,NULL,NULL,0,1,'2021-11-24 13:58:21','2021-11-24 13:58:21');
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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `count` int NOT NULL,
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

-- Dump completed on 2021-11-24 16:16:21
