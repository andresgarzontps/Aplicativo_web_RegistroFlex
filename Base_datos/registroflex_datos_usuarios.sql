-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: registroflex
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `datos_usuarios`
--

DROP TABLE IF EXISTS `datos_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datos_usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `Foto` blob,
  `Nombre` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Edad` int DEFAULT NULL,
  `id_pais` int DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `id_recidencia` int DEFAULT NULL,
  `cedula` varchar(20) DEFAULT NULL,
  `id_tipoDocumento` int DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `correo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `id_recidencia` (`id_recidencia`),
  KEY `id_tipoDocumento` (`id_tipoDocumento`),
  KEY `fk_id_pais` (`id_pais`),
  CONSTRAINT `datos_usuarios_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `datos_pais` (`id_pais`),
  CONSTRAINT `datos_usuarios_ibfk_2` FOREIGN KEY (`id_recidencia`) REFERENCES `datos_recidencia` (`id_recidencia`),
  CONSTRAINT `datos_usuarios_ibfk_3` FOREIGN KEY (`id_tipoDocumento`) REFERENCES `datos_tipodocumento` (`id_tipoDocumento`),
  CONSTRAINT `fk_id_pais` FOREIGN KEY (`id_pais`) REFERENCES `datos_pais` (`id_pais`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_usuarios`
--

LOCK TABLES `datos_usuarios` WRITE;
/*!40000 ALTER TABLE `datos_usuarios` DISABLE KEYS */;
INSERT INTO `datos_usuarios` VALUES (1,NULL,'Juan','Pérez',30,1,'1990-01-15',1,'123456789',1,'1234567890','juan.perez@example.com'),(4,NULL,'andres Camilo','Garzon Guzman',NULL,NULL,NULL,NULL,NULL,1,NULL,'correoPrueba2024@gmail.com'),(8,NULL,'juan felipe','Gomez',NULL,NULL,NULL,NULL,'11111110',1,NULL,'correoPrueba20254@gmail.com'),(11,_binary '{}','andres Camilo g','Garzon Guzman',28,1,'2000-06-10',1,'11111110',1,'3134835775','Andyguzman404@gmail.com');
/*!40000 ALTER TABLE `datos_usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-04 16:24:24
