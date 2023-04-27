-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 15, 2023 at 07:05 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-commerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ProductId` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ProductName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ProductPrice` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ProductPhoto` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ProductQuantity` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CustomerId` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ordertable`
--

DROP TABLE IF EXISTS `ordertable`;
CREATE TABLE IF NOT EXISTS `ordertable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ProductPhoto` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ProductPrice` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Total` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CustomerId` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `OrderStatus` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Success',
  `payment_gateway` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'COD',
  `razorpay_payment_id` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `uniqueId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ordertable`
--

INSERT INTO `ordertable` (`id`, `ProductName`, `ProductPhoto`, `ProductPrice`, `Total`, `CustomerId`, `date`, `status`, `OrderStatus`, `payment_gateway`, `razorpay_payment_id`, `uniqueId`, `created_at`) VALUES
(10, 'Rajasd', 'user_profiles/asd.jpg', '13', '23', '5', '2023-04-14 23:30:39', '1', 'Success', 'Razorpay', 'pay_LdlM7Sf8mmk4AX', 'wEbRr', '2023-04-14 23:30:39'),
(11, 'Raj', 'user_profiles/thumbnail.jpg', '12', '35', '5', '2023-04-14 23:31:18', '1', 'Success', 'Razorpay', 'pay_LdlMkI38JWWHCZ', 'WoRlq', '2023-04-14 23:31:18'),
(12, 'Rajasd', 'user_profiles/asd.jpg', '13', '35', '5', '2023-04-14 23:31:18', '1', 'Success', 'Razorpay', 'pay_LdlMkI38JWWHCZ', 'WoRlq', '2023-04-14 23:31:18'),
(13, 'Rajasd', 'user_profiles/asd.jpg', '13', '23', '5', '2023-04-15 12:07:15', '1', 'Success', 'COD', NULL, 'mGv7Q', '2023-04-15 12:07:15');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ProductDescription` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ProductPrice` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ProductImage` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ProductCategory` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Id`, `ProductName`, `ProductDescription`, `ProductPrice`, `ProductImage`, `ProductCategory`, `created`) VALUES
(1, 'Raj', 'hjkhj', '12', 'user_profiles/thumbnail.jpg', 'abc', '2023-03-19 21:12:24'),
(2, 'Rajasd', 'sadasd', '13', 'user_profiles/asd.jpg', 'xyz', '2023-03-20 00:57:41');

-- --------------------------------------------------------

--
-- Table structure for table `userregistration`
--

DROP TABLE IF EXISTS `userregistration`;
CREATE TABLE IF NOT EXISTS `userregistration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `LastName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DateOfBirth` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Gender` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Address` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `admin` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userregistration`
--

INSERT INTO `userregistration` (`id`, `FirstName`, `LastName`, `Email`, `Password`, `Image`, `DateOfBirth`, `Gender`, `Address`, `Number`, `admin`, `created_at`) VALUES
(1, 'Raj', 'Mehta', 'admin@admin.com', '123456', 'user_profiles/thumbnail.jpg', '2022-02-13', 'male', 'sadasd', '9727896254', '1', '2023-03-19 23:25:54'),
(2, 'Raj', 'Mehta', 'admin12@admin.com', '123456', 'user_profiles/thumbnail1.jpg', '2023-03-20', 'female', 'near sai baba temple', '9727896254', '0', '2023-03-20 00:01:54'),
(3, 'nirmal', 'jadeja', 'nirmal@gmail.com', '123456', 'user_profiles/verna.jpg', '2023-04-15', '', 'abc', '8238483354', '0', '2023-04-01 13:09:10'),
(4, 'nirmal', 'jadeja', 'nirmaljadeja16@gmail', '123456', 'user_profiles/verna.jpg', '2023-04-05', '', 'Narsontekre', '9874563209', '0', '2023-04-04 12:31:32'),
(5, 'demo', 'demo', 'demo@gmail.com', '123456', 'user_profiles/verna.jpg', '2023-04-13', 'Male', 'abc', '9874563210', '0', '2023-04-13 16:44:48');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
