-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2024 at 02:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uzhavan`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts_collect_entry`
--

CREATE TABLE `accounts_collect_entry` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `line` varchar(50) NOT NULL,
  `branch` varchar(50) NOT NULL,
  `coll_mode` int(11) NOT NULL,
  `bank_id` varchar(50) DEFAULT NULL,
  `no_of_bills` int(11) NOT NULL,
  `collection_amnt` varchar(150) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts_collect_entry`
--

INSERT INTO `accounts_collect_entry` (`id`, `user_id`, `line`, `branch`, `coll_mode`, `bank_id`, `no_of_bills`, `collection_amnt`, `insert_login_id`, `created_on`) VALUES
(1, 1, 'B', 'Vandavasi', 1, '', 4, '20000', 1, '2024-07-18 17:54:59'),
(2, 1, 'C1', 'chetpet', 2, '2', 1, '200', 1, '2024-07-18 17:55:15'),
(3, 1, 'A', 'Vandavasi', 2, '3', 1, '600', 1, '2024-07-18 17:55:26'),
(4, 1, 'C1', 'chetpet', 1, '', 3, '47615', 1, '2024-07-19 11:58:20'),
(5, 1, 'B', 'Vandavasi', 2, '3', 1, '600', 1, '2024-07-19 12:54:49'),
(6, 1, 'C1', 'chetpet', 1, '', 1, '4000', 1, '2024-07-20 09:59:26'),
(7, 1, 'A', 'Vandavasi', 2, '1', 1, '200', 1, '2024-07-20 09:59:37'),
(8, 1, 'A', 'Vandavasi', 2, '3', 1, '3650', 1, '2024-07-20 09:59:49'),
(9, 1, 'C1', 'chetpet', 1, '', 1, '3000', 1, '2024-07-20 17:44:37'),
(10, 5, 'B', 'Vandavasi', 1, '', 2, '4600', 1, '2024-07-20 17:45:09'),
(11, 1, 'A', 'Vandavasi', 1, '', 1, '8145', 1, '2024-08-01 13:38:37'),
(12, 1, 'A', 'Vandavasi', 1, '', 6, '23195', 1, '2024-08-30 14:13:57'),
(13, 1, 'A', 'Vandavasi', 2, '1', 2, '4000', 1, '2024-08-30 14:25:21'),
(14, 1, 'A', 'Vandavasi', 2, '2', 1, '2000', 1, '2024-08-30 14:25:33'),
(15, 1, 'A', 'Vandavasi', 1, '', 1, '2200', 1, '2024-08-30 14:52:19'),
(16, 1, 'B', 'Vandavasi', 1, '', 1, '4000', 1, '2024-08-30 15:16:09'),
(17, 1, 'B', 'Vandavasi', 1, '', 1, '4000', 1, '2024-08-30 15:23:09'),
(18, 1, 'A', 'Vandavasi', 1, '', 2, '2000', 1, '2024-08-30 17:05:03'),
(19, 1, 'A', 'Vandavasi', 1, '', 3, '5300', 1, '2024-08-30 17:59:37'),
(20, 1, 'A', 'Vandavasi', 1, '', 23, '73150', 1, '2024-09-02 10:30:10'),
(21, 1, 'A', 'Vandavasi', 2, '1', 1, '1000', 1, '2024-09-02 10:30:35'),
(22, 1, 'C', 'Uthiramerur', 2, '3', 1, '3000', 1, '2024-09-02 10:30:50'),
(23, 1, 'B', 'Vandavasi', 2, '5', 1, '8000', 1, '2024-09-02 10:31:01'),
(24, 1, 'C1', 'chetpet', 2, '', 1, '800', 1, '2024-09-02 11:23:25'),
(25, 1, 'A', 'Vandavasi', 1, '', 21, '67996', 1, '2024-09-05 17:29:54'),
(26, 1, 'A', 'Vandavasi', 2, '1', 3, '39145', 1, '2024-09-05 17:30:08'),
(27, 1, 'C', 'Uthiramerur', 2, '2', 1, '600', 1, '2024-09-05 17:30:18'),
(28, 1, 'C1', 'chetpet', 2, '5', 1, '800', 0, '2024-09-05 17:30:33'),
(29, 1, 'B', 'Vandavasi', 2, '3', 1, '654', 1, '2024-09-06 10:45:17'),
(30, 1, 'A', 'Kilkodungalur', 1, '', 1, '2605', 1, '2024-09-06 10:49:04'),
(31, 1, 'C1', 'chetpet', 1, '', 1, '6915', 1, '2024-09-06 14:26:10'),
(32, 1, 'B', 'Vandavasi', 1, '', 1, '10000', 1, '2024-09-06 14:50:02'),
(33, 1, 'A', 'Vandavasi', 1, '', 2, '37725', 1, '2024-09-06 18:24:46'),
(34, 1, 'B', 'Vandavasi', 2, '2', 1, '500', 1, '2024-09-09 12:22:56'),
(35, 1, 'A', 'Kilkodungalur', 1, '', 5, '7369', 1, '2024-09-09 14:55:57'),
(36, 1, 'A', 'Kilkodungalur', 1, '', 1, '0', 1, '2024-09-10 11:03:02');

-- --------------------------------------------------------

--
-- Table structure for table `agent_creation`
--

CREATE TABLE `agent_creation` (
  `id` int(11) NOT NULL,
  `agent_code` varchar(100) NOT NULL,
  `agent_name` varchar(100) NOT NULL,
  `mobile1` varchar(100) NOT NULL,
  `mobile2` varchar(100) NOT NULL,
  `area` varchar(100) NOT NULL,
  `occupation` varchar(100) NOT NULL,
  `insert_login_id` varchar(100) NOT NULL,
  `update_login_id` varchar(100) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agent_creation`
--

INSERT INTO `agent_creation` (`id`, `agent_code`, `agent_name`, `mobile1`, `mobile2`, `area`, `occupation`, `insert_login_id`, `update_login_id`, `created_date`, `updated_date`) VALUES
(1, 'AG-101', 'Ram', '9988998899', '9879879879', 'Vandavasi', 'Fancy Store', '1', '', '2024-07-16 13:00:00', NULL),
(2, 'AG-102', 'babu', '6547891320', '9874561230', 'Chetpet', 'Driver', '', '1', '2024-07-17 17:30:33', '2024-07-19'),
(3, 'AG-103', 'Sameer', '8765980234', '', 'Cheyyar', 'self employed', '1', '', '2024-08-29 15:22:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `area_creation`
--

CREATE TABLE `area_creation` (
  `id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `line_id` int(11) NOT NULL,
  `area_id` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `update_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `area_creation`
--

INSERT INTO `area_creation` (`id`, `branch_id`, `line_id`, `area_id`, `status`, `insert_login_id`, `update_login_id`, `created_on`, `update_on`) VALUES
(1, 1, 1, '6,4,5,1,2,3', 1, 1, NULL, '2024-07-16 12:52:22', NULL),
(2, 1, 2, '1,7,8,9', 1, 1, 1, '2024-07-16 12:53:11', '2024-09-10'),
(3, 2, 6, '10', 1, 1, NULL, '2024-07-16 12:53:55', NULL),
(4, 5, 8, '15,16', 1, 1, 1, '2024-07-17 17:12:58', '2024-07-19'),
(5, 4, 10, '12,11', 1, 1, NULL, '2024-07-20 14:41:17', NULL),
(6, 6, 12, '18,20', 1, 1, 1, '2024-08-29 10:15:20', '2024-09-12');

-- --------------------------------------------------------

--
-- Table structure for table `area_name_creation`
--

CREATE TABLE `area_name_creation` (
  `id` int(11) NOT NULL,
  `areaname` varchar(200) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `area_name_creation`
--

INSERT INTO `area_name_creation` (`id`, `areaname`, `branch_id`, `status`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'Vandavasi', 1, 1, 1, NULL, '2024-07-16 12:50:58', NULL),
(2, 'Vsi - Gandhi road', 1, 1, 1, NULL, '2024-07-16 12:51:18', NULL),
(3, 'Vsi - KVT nagar', 1, 1, 1, NULL, '2024-07-16 12:51:31', NULL),
(4, 'Kottai colony', 1, 1, 1, NULL, '2024-07-16 12:51:45', NULL),
(5, 'Mummuni', 1, 1, 1, NULL, '2024-07-16 12:51:58', NULL),
(6, 'Ammapalayam', 1, 1, 1, NULL, '2024-07-16 12:52:10', NULL),
(7, 'Echur', 1, 1, 1, NULL, '2024-07-16 12:52:45', NULL),
(8, 'Akkur', 1, 1, 1, NULL, '2024-07-16 12:52:53', NULL),
(9, 'Anakkavoor', 1, 1, 1, NULL, '2024-07-16 12:53:02', NULL),
(10, 'Kilkodungalur', 2, 1, 1, NULL, '2024-07-16 12:53:50', NULL),
(11, 'Uthiramerur', 4, 1, 1, NULL, '2024-07-16 12:54:22', NULL),
(12, 'Manapathy', 4, 1, 1, NULL, '2024-07-16 12:54:28', NULL),
(15, 'chetpet', 5, 1, 1, NULL, '2024-07-17 17:11:47', NULL),
(16, 'nedungunam', 5, 1, 1, NULL, '2024-07-17 17:12:17', NULL),
(17, '122', 5, 1, 1, NULL, '2024-07-17 17:49:16', NULL),
(18, 'Bazar Street', 6, 1, 1, NULL, '2024-08-29 10:14:43', NULL),
(19, 'Purisai', 1, 1, 1, 1, '2024-09-10 11:52:32', '2024-09-10'),
(20, 'Arani x road', 6, 1, 1, NULL, '2024-09-12 12:09:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bank_clearance`
--

CREATE TABLE `bank_clearance` (
  `id` int(11) NOT NULL COMMENT 'Primary Key',
  `bank_id` varchar(255) DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `narration` varchar(255) NOT NULL,
  `trans_id` varchar(255) DEFAULT NULL,
  `credit` varchar(255) DEFAULT NULL,
  `debit` varchar(255) DEFAULT NULL,
  `balance` varchar(255) DEFAULT NULL,
  `clr_status` varchar(10) NOT NULL DEFAULT '0' COMMENT '0 - unclear,1-cleared',
  `insert_login_id` varchar(255) DEFAULT NULL,
  `update_login_id` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `bank_clearance`
--

INSERT INTO `bank_clearance` (`id`, `bank_id`, `trans_date`, `narration`, `trans_id`, `credit`, `debit`, `balance`, `clr_status`, `insert_login_id`, `update_login_id`, `created_date`, `updated_date`) VALUES
(1, '1', '2024-08-30', 'settle', 'q1876187r', '3000', '', '5000', '0', '1', NULL, '2024-08-30 17:45:51', '2024-08-30 17:45:51'),
(2, '3', '2024-09-02', 'deposite', '994248', '2000', '', '1000', '0', '1', NULL, '2024-09-02 12:08:31', '2024-09-02 12:08:31'),
(3, '2', '2024-09-02', 'expenses', '234523', '', '5000', '2000', '0', '1', NULL, '2024-09-02 12:18:04', '2024-09-02 12:18:04'),
(4, '3', '2024-09-02', 'debit', '994248', '', '1000', '0', '0', '1', NULL, '2024-09-02 14:08:21', '2024-09-02 14:08:21');

-- --------------------------------------------------------

--
-- Table structure for table `bank_creation`
--

CREATE TABLE `bank_creation` (
  `id` int(11) NOT NULL,
  `bank_name` varchar(100) NOT NULL,
  `bank_short_name` varchar(100) NOT NULL,
  `account_number` varchar(100) NOT NULL,
  `ifsc_code` varchar(100) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `qr_code` varchar(100) NOT NULL,
  `gpay` varchar(100) NOT NULL,
  `under_branch` varchar(255) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT '1',
  `insert_login_id` varchar(100) NOT NULL,
  `update_login_id` varchar(100) NOT NULL,
  `delete_login_id` varchar(100) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bank_creation`
--

INSERT INTO `bank_creation` (`id`, `bank_name`, `bank_short_name`, `account_number`, `ifsc_code`, `branch_name`, `qr_code`, `gpay`, `under_branch`, `status`, `insert_login_id`, `update_login_id`, `delete_login_id`, `created_date`, `updated_date`) VALUES
(1, 'Karur Vysya Bank', 'KVB - 6263', '1183135000006263', 'KVBL0001183', 'Vandavasi', '6696208ccce78.jpg', '9842138111', '1', '1', '1', '1', '', '2024-07-16 12:56:04', '2024-07-16'),
(2, 'City union bank ', 'CUB ', '5001010199268', 'CIUB0000458', 'Vandavasi', '669621167368d.jpg', '9842158111', '2,4', '1', '1', '', '', '2024-07-16 12:58:22', NULL),
(3, 'state bank of india', 'SBI', '3789456123', 'sbin000101', 'chetpet', '669b3971b9fa8.png', '6547891230', '5', '1', '1', '1', '', '2024-07-17 17:18:50', '2024-07-20'),
(4, 'ICICI', 'ICICI', '123864900', 'ICIC000v23', 'Vandavasi', '', '9834261788', '1', '1', '1', '', '', '2024-08-29 15:20:13', NULL),
(5, 'ICICI', 'ICICI', '123864900', 'ICIC000v23', 'Vandavasi', '', '9834261788', '1', '0', '1', '', '', '2024-08-29 15:20:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bank_info`
--

CREATE TABLE `bank_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_profile_id` varchar(255) NOT NULL,
  `bank_name` varchar(100) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `acc_holder_name` varchar(100) NOT NULL,
  `acc_number` varchar(100) NOT NULL,
  `ifsc_code` varchar(100) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) NOT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bank_info`
--

INSERT INTO `bank_info` (`id`, `cus_id`, `cus_profile_id`, `bank_name`, `branch_name`, `acc_holder_name`, `acc_number`, `ifsc_code`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '111111110000', '1', 'State Bank of India', 'Vandavasi ', 'Rahul', '3425472490', 'SBIN0000808', 3, 0, '2024-07-16', NULL),
(2, '123456789012', '6', 'SBI', 'chetpet', 'Anitha', '3241567890918', 'sbi0001017', 1, 0, '2024-07-18', NULL),
(3, '045566789999', '9', 'karur vysya bank', 'cheyyar', 'meena', '2345980718899', 'KVB091223', 1, 0, '2024-07-19', NULL),
(4, '123456789012', '12', 'state Bank of india', 'vandavasi', 'Ramesh', '3451249800', 'SBINO0001018', 1, 0, '2024-07-19', NULL),
(5, '012346758906', '13', 'HDFC bank', 'vandavasi', 'Arun', '457632452187', 'HDFC001234', 1, 0, '2024-07-19', NULL),
(6, '213574689023', '14', 'axis bank', 'Chetpet', 'Krishna', '56789012345', 'AXIS980067', 1, 0, '2024-07-19', NULL),
(7, '123415671890', '20', 'Indian Bank', 'vandavasi', 'Arun', '32457001', 'IDIB000W011', 1, 0, '2024-08-29', NULL),
(8, '123456789122', '29', 'karur vysya bank', 'cheyyar', 'Rohini', '4152639775663', 'kvb00991', 1, 0, '2024-08-31', NULL),
(9, '879456456123', '30', 'SBI', 'VSI', 'surya', '365897125698', 'sbi0018', 1, 1, '2024-08-31', '2024-08-31'),
(10, '224489088111', '31', 'ICICI', 'Cheyyar', 'Ranjith', '478569321012', 'icici1243', 1, 0, '2024-08-31', NULL),
(11, '415236699752', '32', 'KVB', 'UTR', 'Sivakumar', '7514893200', 'kvb021886', 1, 0, '2024-08-31', NULL),
(12, '841256397000', '33', 'HDFC', 'cpt', 'Robert', '741028963210', 'hdfc0985477', 1, 0, '2024-08-31', NULL),
(13, '234156437665', '37', 'punjab national bank', 'vandavasi', 'Alisha', '1227652001', 'PUN001643163', 1, 0, '2024-09-02', NULL),
(14, '111122223333', '51', 'Sbi', 'Vsi', 'Varun', '123456789', 'SBIN0001234', 1, 0, '2024-09-10', NULL),
(16, '67567567567567', '67', 'State Bank Of India', 'chetpet', 'Radha', '6456546546', 'fgh', 1, 0, '2024-09-17', NULL),
(17, '54654654656', '76', 'State Bank Of India', 'chetpet', '46456', '6456456', 'asdf', 1, 0, '2024-09-17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `branch_creation`
--

CREATE TABLE `branch_creation` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `branch_code` varchar(50) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `state` int(11) NOT NULL,
  `district` int(11) NOT NULL,
  `taluk` int(11) NOT NULL,
  `place` varchar(100) NOT NULL,
  `pincode` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `mobile_number` varchar(100) NOT NULL,
  `whatsapp` varchar(100) NOT NULL,
  `landline_code` varchar(50) DEFAULT NULL,
  `landline` varchar(100) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch_creation`
--

INSERT INTO `branch_creation` (`id`, `company_name`, `branch_code`, `branch_name`, `address`, `state`, `district`, `taluk`, `place`, `pincode`, `email_id`, `mobile_number`, `whatsapp`, `landline_code`, `landline`, `insert_login_id`, `update_login_id`, `created_date`, `updated_date`) VALUES
(1, 'Uzhavan FInance', 'U-101', 'Vandavasi', 'no 25', 1, 34, 278, 'Gandhi road', '604408', '', '9842138111', '9842138111', '', '', 1, 0, '2024-07-16 12:39:16', NULL),
(2, 'Uzhavan FInance', 'U-102', 'Kilkodungalur', 'no23', 1, 34, 278, 'Kilkodungalur', '604408', '', '9842183111', '9842183111', '', '', 1, 1, '2024-07-16 12:40:18', '2024-07-16'),
(4, 'Uzhavan FInance', 'U-103', 'Uthiramerur', 'No 18', 1, 10, 86, 'Uthiramerur', '608306', 'uzhavanutr@gmail.com', '9842158111', '', '', '', 1, 1, '2024-07-16 12:43:57', '2024-09-12'),
(5, 'Uzhavan FInance', 'U-106', 'chetpet', '', 1, 34, 271, 'chetpet', '8', 'uzavan@gmail.com', '9876541230', '9876541230', '04822', '21354697', 1, 1, '2024-07-17 16:58:49', '2024-08-29'),
(6, 'Uzhavan FInance', 'U-105', 'Cheyyar', 'Main street', 1, 34, 272, 'Cheyyar', '604407', 'cheyyaruzhavan@gmail.com', '9123456780', '9123456780', '', '', 1, 1, '2024-08-29 09:45:51', '2024-08-29');

-- --------------------------------------------------------

--
-- Table structure for table `cash_tally_modes`
--

CREATE TABLE `cash_tally_modes` (
  `id` int(11) NOT NULL COMMENT 'Primary Key',
  `modes` varchar(255) DEFAULT NULL,
  `bankcredit` varchar(10) NOT NULL DEFAULT '1',
  `bankdebit` varchar(10) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cash_tally_modes`
--

INSERT INTO `cash_tally_modes` (`id`, `modes`, `bankcredit`, `bankdebit`) VALUES
(1, 'Collection', '0', '1'),
(2, 'Bank Withdrawal', '1', '1'),
(3, 'Other Income', '0', '1'),
(4, 'Exchange', '0', '0'),
(5, 'Bank Deposit', '1', '1'),
(6, 'Investment', '0', '0'),
(7, 'Deposit', '0', '0'),
(8, 'EL', '0', '0'),
(9, 'Expenses', '1', '0');

-- --------------------------------------------------------

--
-- Table structure for table `cheque_info`
--

CREATE TABLE `cheque_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_profile_id` int(11) NOT NULL,
  `holder_type` int(11) NOT NULL,
  `holder_name` varchar(150) NOT NULL,
  `holder_id` int(11) DEFAULT NULL,
  `relationship` varchar(50) NOT NULL,
  `bank_name` varchar(150) NOT NULL,
  `cheque_cnt` int(11) NOT NULL,
  `upload` varchar(255) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cheque_info`
--

INSERT INTO `cheque_info` (`id`, `cus_id`, `cus_profile_id`, `holder_type`, `holder_name`, `holder_id`, `relationship`, `bank_name`, `cheque_cnt`, `upload`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '111111110000', 1, 1, 'Rahul', 0, 'Customer', 'SBI', 2, '', 2, NULL, '2024-07-16', NULL),
(2, '123456789012', 6, 2, 'anitha', 6, 'Mother', 'sbi', 2, '', 5, NULL, '2024-07-18', NULL),
(3, '045566789999', 9, 2, 'prasath', 8, 'Spouse', 'sbi', 2, '', 1, NULL, '2024-07-19', NULL),
(4, '456789092384', 10, 1, 'Gopal', 0, 'Customer', 'sbi', 2, '', 1, NULL, '2024-07-19', NULL),
(5, '345609871234', 11, 1, 'Gowtham', 0, 'Customer', 'KVB', 2, '', 1, NULL, '2024-07-19', NULL),
(6, '123456789012', 12, 1, 'Ramesh', 0, 'Customer', 'state bank of india', 2, '', 1, NULL, '2024-07-19', NULL),
(7, '446677889097', 15, 1, 'Ashok', 0, 'Customer', 'SBI', 2, '', 1, NULL, '2024-07-19', NULL),
(8, '879456456123', 2, 1, 'surya', 0, 'Customer', 'KVB', 2, '', 1, NULL, '2024-07-19', NULL),
(9, '879456456123', 3, 1, 'surya', 0, 'Customer', 'SBI', 2, '', 1, NULL, '2024-07-20', NULL),
(10, '434351516776', 21, 1, 'Priya', 0, 'Customer', 'state bank of india', 3, '', 1, NULL, '2024-08-29', NULL),
(11, '123456789122', 29, 1, 'Rohini', 0, 'Customer', 'KVB', 2, '', 1, NULL, '2024-08-31', NULL),
(12, '879456456123', 30, 3, 'arun', 4, 'Brother', 'KVB', 2, '', 1, NULL, '2024-08-31', NULL),
(13, '224489088111', 31, 1, 'Ranjith', 0, 'Customer', 'ICICI', 2, '', 1, NULL, '2024-08-31', NULL),
(14, '415236699752', 32, 1, 'Siva kumar', 0, 'Customer', 'sbi', 2, '', 1, NULL, '2024-08-31', NULL),
(15, '841256397000', 33, 2, 'Xaviour', 26, 'Brother', 'hdfc', 2, '', 1, NULL, '2024-08-31', NULL),
(16, '753214896025', 34, 2, 'Bhoopal', 27, 'Father', 'kvb', 2, '', 1, NULL, '2024-08-31', NULL),
(17, '878712126789', 35, 2, 'selvi', 22, 'Spouse', 'kvb', 2, '', 1, NULL, '2024-08-31', NULL),
(18, '045566789999', 36, 2, 'prasath', 8, 'Spouse', 'sbi', 2, '', 1, NULL, '2024-08-31', NULL),
(19, '446677889097', 19, 1, 'Ashok', 0, 'Customer', 'sbi', 2, '', 1, NULL, '2024-08-31', NULL),
(20, '475896547989', 38, 2, 'Rajendar', 29, 'Father', 'CUB', 2, '', 1, NULL, '2024-09-02', NULL),
(21, '142365987899', 40, 1, 'priyanka', 0, 'Customer', 'SBI', 2, '', 1, NULL, '2024-09-02', NULL),
(22, '951203587633', 57, 3, 'Renuga', 40, 'Mother', 'HDFC', 2, '', 1, NULL, '2024-09-12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cheque_no_list`
--

CREATE TABLE `cheque_no_list` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(250) DEFAULT NULL,
  `cus_profile_id` int(11) DEFAULT NULL,
  `cheque_info_id` int(11) DEFAULT NULL,
  `cheque_no` varchar(200) DEFAULT NULL,
  `used_status` int(11) NOT NULL DEFAULT 0,
  `noc_status` int(11) NOT NULL DEFAULT 0,
  `date_of_noc` date DEFAULT NULL,
  `noc_member` varchar(150) DEFAULT NULL,
  `noc_relationship` varchar(150) DEFAULT NULL,
  `insert_login_id` int(11) DEFAULT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cheque_no_list`
--

INSERT INTO `cheque_no_list` (`id`, `cus_id`, `cus_profile_id`, `cheque_info_id`, `cheque_no`, `used_status`, `noc_status`, `date_of_noc`, `noc_member`, `noc_relationship`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '111111110000', 1, 1, '101101', 0, 1, '2024-07-19', 'Rahul', 'Customer', 2, 1, '2024-07-16', '2024-07-19'),
(2, '111111110000', 1, 1, '101102', 0, 1, '2024-07-19', 'Rahul', 'Customer', 2, 1, '2024-07-16', '2024-07-19'),
(3, '123456789012', 6, 2, '', 0, 1, '2024-07-19', 'Ramesh', 'Customer', 5, 1, '2024-07-18', '2024-07-19'),
(4, '123456789012', 6, 2, '', 0, 1, '2024-07-19', 'Ramesh', 'Customer', 5, 1, '2024-07-18', '2024-07-19'),
(5, '045566789999', 9, 3, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-07-19', NULL),
(6, '045566789999', 9, 3, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-07-19', NULL),
(7, '456789092384', 10, 4, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-07-19', NULL),
(8, '456789092384', 10, 4, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-07-19', NULL),
(9, '345609871234', 11, 5, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-07-19', NULL),
(10, '345609871234', 11, 5, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-07-19', NULL),
(11, '123456789012', 12, 6, '2345671', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-07-19', NULL),
(12, '123456789012', 12, 6, '2345672', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-07-19', NULL),
(13, '446677889097', 15, 7, '5467901', 1, 1, '2024-08-29', 'Ashok', 'Customer', 1, 1, '2024-07-19', '2024-08-29'),
(14, '446677889097', 15, 7, '547902', 0, 1, '2024-08-29', 'Ashok', 'Customer', 1, 1, '2024-07-19', '2024-08-29'),
(15, '879456456123', 2, 8, '45678903', 0, 1, '2024-07-20', 'surya', 'Customer', 1, 1, '2024-07-19', '2024-07-20'),
(16, '879456456123', 2, 8, '45678904', 0, 1, '2024-07-20', 'surya', 'Customer', 1, 1, '2024-07-19', '2024-07-20'),
(17, '879456456123', 3, 9, '234567', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-07-20', NULL),
(18, '879456456123', 3, 9, '234568', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-07-20', NULL),
(19, '434351516776', 21, 10, '', 1, 1, '2024-08-29', 'Priya', 'Customer', 1, 1, '2024-08-29', '2024-08-29'),
(20, '434351516776', 21, 10, '', 0, 1, '2024-08-29', 'Priya', 'Customer', 1, 1, '2024-08-29', '2024-08-29'),
(21, '434351516776', 21, 10, '', 0, 1, '2024-08-29', 'Priya', 'Customer', 1, 1, '2024-08-29', '2024-08-29'),
(22, '123456789122', 29, 11, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(23, '123456789122', 29, 11, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(24, '879456456123', 30, 12, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(25, '879456456123', 30, 12, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(26, '224489088111', 31, 13, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(27, '224489088111', 31, 13, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(28, '415236699752', 32, 14, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(29, '415236699752', 32, 14, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(30, '841256397000', 33, 15, '874596698', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(31, '841256397000', 33, 15, '874596699', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(32, '753214896025', 34, 16, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(33, '753214896025', 34, 16, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(34, '878712126789', 35, 17, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(35, '878712126789', 35, 17, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(36, '045566789999', 36, 18, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(37, '045566789999', 36, 18, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(38, '446677889097', 19, 19, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(39, '446677889097', 19, 19, '', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(40, '475896547989', 38, 20, '9854756', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-09-02', NULL),
(41, '475896547989', 38, 20, '9845628', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-09-02', NULL),
(42, '142365987899', 40, 21, '96325874', 0, 1, '2024-09-09', 'priyanka', 'Customer', 1, 1, '2024-09-02', '2024-09-09'),
(43, '142365987899', 40, 21, '96325875', 0, 1, '2024-09-09', 'priyanka', 'Customer', 1, 1, '2024-09-02', '2024-09-09'),
(44, '951203587633', 57, 22, '654321', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-09-12', NULL),
(45, '951203587633', 57, 22, '654322', 0, 0, NULL, NULL, NULL, 1, NULL, '2024-09-12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cheque_upd`
--

CREATE TABLE `cheque_upd` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(250) DEFAULT NULL,
  `cus_profile_id` int(11) DEFAULT NULL,
  `cheque_info_id` int(11) DEFAULT NULL,
  `uploads` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cheque_upd`
--

INSERT INTO `cheque_upd` (`id`, `cus_id`, `cus_profile_id`, `cheque_info_id`, `uploads`) VALUES
(1, '123456789012', 6, 2, '6698fd4c4f4b8.jpg'),
(2, '045566789999', 9, 3, '6699eb8b94d6a.jpg'),
(3, '123456789012', 12, 6, '669a3f7edb12e.jpg'),
(4, '446677889097', 15, 7, '669a54983f8e9.jpg'),
(5, '879456456123', 2, 8, '669a5a0b67957.jpg'),
(6, '879456456123', 3, 9, '669b40d5e2733.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `id` int(11) NOT NULL COMMENT 'Primary Key',
  `coll_code` varchar(255) DEFAULT NULL,
  `cus_profile_id` int(11) DEFAULT NULL,
  `cus_id` varchar(255) DEFAULT NULL,
  `cus_name` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `line` varchar(255) DEFAULT NULL,
  `loan_category` varchar(255) DEFAULT NULL,
  `coll_status` varchar(255) DEFAULT NULL,
  `coll_sub_status` varchar(255) DEFAULT NULL,
  `tot_amt` varchar(255) DEFAULT NULL,
  `paid_amt` varchar(255) DEFAULT NULL,
  `bal_amt` varchar(255) DEFAULT NULL,
  `due_amt` varchar(255) DEFAULT NULL,
  `pending_amt` varchar(255) DEFAULT NULL,
  `payable_amt` varchar(255) DEFAULT NULL,
  `penalty` varchar(255) DEFAULT NULL,
  `coll_charge` varchar(255) DEFAULT NULL,
  `coll_mode` varchar(255) DEFAULT NULL,
  `bank_id` varchar(10) NOT NULL,
  `cheque_no` varchar(255) DEFAULT NULL,
  `trans_id` varchar(255) DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `coll_date` datetime DEFAULT current_timestamp(),
  `due_amt_track` varchar(255) NOT NULL DEFAULT '0',
  `princ_amt_track` varchar(255) DEFAULT '0',
  `int_amt_track` varchar(255) DEFAULT '0',
  `penalty_track` varchar(255) NOT NULL DEFAULT '0',
  `coll_charge_track` varchar(255) NOT NULL DEFAULT '0',
  `total_paid_track` varchar(255) NOT NULL DEFAULT '0',
  `pre_close_waiver` varchar(255) NOT NULL DEFAULT '0',
  `penalty_waiver` varchar(255) NOT NULL DEFAULT '0',
  `coll_charge_waiver` varchar(255) NOT NULL DEFAULT '0',
  `total_waiver` varchar(255) NOT NULL DEFAULT '0',
  `collect_sts` int(11) NOT NULL DEFAULT 0,
  `insert_login_id` varchar(255) DEFAULT NULL,
  `update_login_id` varchar(255) DEFAULT NULL,
  `delete_login_id` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL COMMENT 'Create Time',
  `updated_date` datetime DEFAULT current_timestamp() COMMENT 'Update Time'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `collection`
--

INSERT INTO `collection` (`id`, `coll_code`, `cus_profile_id`, `cus_id`, `cus_name`, `branch`, `area`, `line`, `loan_category`, `coll_status`, `coll_sub_status`, `tot_amt`, `paid_amt`, `bal_amt`, `due_amt`, `pending_amt`, `payable_amt`, `penalty`, `coll_charge`, `coll_mode`, `bank_id`, `cheque_no`, `trans_id`, `trans_date`, `coll_date`, `due_amt_track`, `princ_amt_track`, `int_amt_track`, `penalty_track`, `coll_charge_track`, `total_paid_track`, `pre_close_waiver`, `penalty_waiver`, `coll_charge_waiver`, `total_waiver`, `collect_sts`, `insert_login_id`, `update_login_id`, `delete_login_id`, `created_date`, `updated_date`) VALUES
(1, 'COL-101', 2, '879456456123', 'surya', '1', '9', '2', '1', 'Present', 'Current', '50000', '0', '50000', '5000', '0', '5000', '0', '0', '1', '', '', '', '0000-00-00', '2024-07-18 10:35:21', '4000', '', '', '0', '0', '4000', '', '', '', '0', 1, '1', NULL, NULL, '2024-07-18 10:35:21', '2024-07-19 11:58:20'),
(2, 'COL-102', 2, '879456456123', 'surya', '1', '9', '2', '1', 'Present', 'Current', '50000', '4000', '46000', '5000', '0', '1000', '0', '0', '1', '', '', '', '0000-00-00', '2024-07-18 11:15:35', '10000', '', '', '0', '0', '10000', '36000', '', '', '36000', 1, '1', NULL, NULL, '2024-07-18 11:15:35', '2024-07-19 11:58:20'),
(3, 'COL-103', 1, '111111110000', 'Rahul', '1', '2', '1', '1', 'Present', 'Current', '50000', '0', '50000', '10000', '0', '10000', '0', '600', '1', '', '', '', '0000-00-00', '2024-07-18 12:45:54', '5000', '', '', '0', '0', '5000', '', '', '', '0', 1, '1', NULL, NULL, '2024-07-18 12:45:54', '2024-07-19 11:58:20'),
(4, 'COL-104', 1, '111111110000', 'Rahul', '1', '2', '1', '1', 'Present', 'Current', '50000', '5000', '45000', '10000', '0', '5000', '0', '600', '1', '', '', '', '0000-00-00', '2024-07-18 13:14:39', '1000', '', '', '0', '0', '1000', '', '', '', '0', 1, '1', NULL, NULL, '2024-07-18 13:14:39', '2024-07-19 11:58:20'),
(5, 'COL-105', 1, '111111110000', 'Rahul', '1', '2', '1', '1', 'Present', 'Current', '50000', '6000', '44000', '10000', '0', '4000', '0', '600', '5', '3', '', '21345', '2024-07-18', '2024-07-18 13:17:00', '0', '', '', '0', '600', '600', '', '', '', '0', 0, '1', NULL, NULL, '2024-07-18 13:17:00', '2024-07-18 13:17:00'),
(6, 'COL-106', 6, '123456789012', 'Ramesh', '5', '16', '8', '2', 'Present', 'Current', '38115', '0', '38115', '4235', '0', '4235', '0', '200', '5', '2', '', '45678', '2024-07-18', '2024-07-18 17:47:46', '0', '', '', '0', '200', '200', '', '', '', '0', 0, '1', NULL, NULL, '2024-07-18 17:47:46', '2024-07-18 17:47:46'),
(7, 'COL-107', 6, '123456789012', 'Ramesh', '5', '16', '8', '2', 'Present', 'Current', '38115', '0', '38115', '4235', '0', '4235', '0', '0', '1', '', '', '', '0000-00-00', '2024-07-18 18:55:03', '4115', '', '', '0', '0', '4115', '', '', '', '0', 1, '1', NULL, NULL, '2024-07-18 18:55:03', '2024-07-19 11:58:20'),
(8, 'COL-108', 9, '045566789999', 'Meena', '1', '8', '2', '2', 'Present', 'Current', '50000', '0', '50000', '500', '0', '500', '0', '0', '1', '', '', '', '0000-00-00', '2024-07-19 10:14:43', '500', '', '', '0', '0', '500', '', '', '', '0', 1, '1', NULL, NULL, '2024-07-19 10:14:43', '2024-07-20 09:59:26'),
(9, 'COL-109', 1, '111111110000', 'Rahul', '1', '2', '1', '1', 'Present', 'Current', '50000', '6000', '44000', '10000', '0', '4000', '0', '0', '1', '', '', '', '0000-00-00', '2024-07-19 11:29:49', '43000', '', '', '0', '0', '43000', '1000', '', '', '1000', 1, '1', NULL, NULL, '2024-07-19 11:29:49', '2024-07-20 09:59:26'),
(10, 'COL-110', 9, '045566789999', 'Meena', '1', '8', '2', '2', 'Present', 'Current', '50000', '500', '49500', '500', '0', '0', '0', '100', '3', '3', '', '12344', '2024-07-19', '2024-07-19 12:35:29', '600', '', '', '0', '0', '600', '', '', '', '0', 0, '1', NULL, NULL, '2024-07-19 12:35:29', '2024-07-19 12:35:29'),
(11, 'COL-111', 10, '456789092384', 'Gopal', '1', '4', '1', '1', 'Present', 'Current', '20000', '0', '20000', '2000', '0', '2000', '0', '200', '5', '1', '', '234', '2024-07-19', '2024-07-19 12:59:42', '0', '', '', '0', '200', '200', '', '', '', '0', 0, '1', NULL, NULL, '2024-07-19 12:59:42', '2024-07-19 12:59:42'),
(12, 'COL-112', 6, '123456789012', 'Ramesh', '5', '16', '8', '2', 'Present', 'Current', '38115', '4115', '34000', '4235', '0', '120', '0', '0', '1', '', '', '', '0000-00-00', '2024-07-19 15:25:42', '4000', '', '', '0', '0', '4000', '30000', '', '', '30000', 1, '1', NULL, NULL, '2024-07-19 15:25:42', '2024-07-20 09:59:26'),
(13, 'COL-113', 15, '446677889097', 'Ashok', '1', '5', '1', '1', 'Present', 'Current', '29200', '0', '29200', '3650', '0', '3650', '0', '100', '2', '3', '13', '45678', '2024-07-19', '2024-07-19 17:43:31', '3650', '', '', '0', '0', '3650', '25550', '', '100', '25650', 1, '1', NULL, NULL, '2024-07-19 17:43:31', '2024-07-20 09:59:37'),
(14, 'COL-114', 9, '045566789999', 'Meena', '1', '8', '2', '2', 'Present', 'Current', '50000', '1100', '48900', '500', '0', '0', '0', '100', '1', '', '', '', '0000-00-00', '2024-07-20 10:30:51', '500', '', '', '0', '100', '600', '', '', '', '0', 0, '5', NULL, NULL, '2024-07-20 10:30:51', '2024-07-20 10:30:51'),
(15, 'COL-115', 11, '345609871234', 'Gowtham', '1', '7', '2', '2', 'Present', 'Current', '40000', '0', '40000', '4000', '0', '4000', '0', '0', '1', '', '', '', '0000-00-00', '2024-07-20 10:33:21', '4000', '', '', '0', '0', '4000', '10000', '', '', '10000', 0, '5', NULL, NULL, '2024-07-20 10:33:21', '2024-07-20 10:33:21'),
(16, 'COL-116', 8, '994248402222', 'akash', '5', '15', '8', '1', 'Present', 'Current', '30000', '0', '30000', '3000', '0', '3000', '0', '0', '1', '', '', '', '0000-00-00', '2024-07-20 10:58:56', '3000', '', '', '0', '0', '3000', '', '', '', '0', 0, '1', NULL, NULL, '2024-07-20 10:58:56', '2024-07-20 10:58:56'),
(17, 'COL-117', 18, '100010001000', 'Lubi', '1', '1', '1', '1', 'Present', 'Current', '57015', '0', '57015', '8145', '0', '8145', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-01 13:37:45', '8145', '', '', '', '', '8145', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-01 13:37:45', '2024-08-01 13:37:45'),
(18, 'COL-118', 21, '434351516776', 'Priya', '1', '2', '1', '1', 'Present', 'Current', '20000', '0', '20000', '2000', '0', '2000', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-29 12:31:14', '2000', '', '', '', '', '2000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-29 12:31:14', '2024-08-29 12:31:14'),
(19, 'COL-119', 21, '434351516776', 'Priya', '1', '2', '1', '1', 'Present', 'Current', '20000', '2000', '18000', '2000', '0', '0', '0', '0', '5', '1', '', '1e23534657', '2024-08-29', '2024-08-29 12:33:43', '2000', '', '', '', '', '2000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-29 12:33:43', '2024-08-29 12:33:43'),
(20, 'COL-120', 21, '434351516776', 'Priya', '1', '2', '1', '1', 'Present', 'Current', '20000', '4000', '16000', '2000', '0', '0', '0', '0', '2', '1', '19', 'hfgfsdtf', '2024-08-29', '2024-08-29 14:31:39', '2000', '', '', '', '', '2000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-29 14:31:39', '2024-08-29 14:31:39'),
(21, 'COL-121', 21, '434351516776', 'Priya', '1', '2', '1', '1', 'Present', 'Current', '20000', '6000', '14000', '2000', '0', '0', '0', '0', '5', '2', '', 'qdscfSfs', '2024-08-29', '2024-08-29 15:00:24', '2000', '', '', '', '', '2000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-29 15:00:24', '2024-08-29 15:00:24'),
(22, 'COL-122', 21, '434351516776', 'Priya', '1', '2', '1', '1', 'Present', 'Current', '20000', '8000', '12000', '2000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-29 15:02:43', '2000', '', '', '', '', '2000', '10000', '', '', '10000', 0, '1', NULL, NULL, '2024-08-29 15:02:43', '2024-08-29 15:02:43'),
(23, 'COL-123', 18, '100010001000', 'Lubi', '1', '1', '1', '1', 'Present', 'Current', '57015', '8145', '48870', '8145', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-29 15:41:21', '8145', '', '', '', '', '8145', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-29 15:41:21', '2024-08-29 15:41:21'),
(24, 'COL-124', 17, '111111111111', 'shanmugam', '1', '2', '1', '1', 'Present', 'Current', '11250', '0', '11250', '2250', '0', '2250', '0', '2200', '1', '', '', '', '0000-00-00', '2024-08-29 15:45:40', '2250', '', '', '', '', '2250', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-29 15:45:40', '2024-08-29 15:45:40'),
(25, 'COL-125', 11, '345609871234', 'Gowtham', '1', '7', '2', '2', 'Present', 'Current', '40000', '4000', '26000', '4000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-29 17:01:13', '8000', '', '', '', '', '8000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-29 17:01:13', '2024-08-29 17:01:13'),
(26, 'COL-126', 23, '765423129850', 'Nirmal', '5', '15', '8', '2', 'Present', 'Current', '80000', '0', '80000', '800', '0', '800', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-30 14:12:43', '800', '', '', '', '', '800', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-30 14:12:43', '2024-08-30 14:12:43'),
(27, 'COL-127', 17, '111111111111', 'shanmugam', '1', '2', '1', '1', 'Present', 'Current', '11250', '2250', '9000', '2250', '0', '0', '0', '3200', '1', '', '', '', '0000-00-00', '2024-08-30 14:51:26', '', '', '', '', '2200', '2200', '', '', '', '', 0, '1', NULL, NULL, '2024-08-30 14:51:26', '2024-08-30 14:51:26'),
(28, 'COL-128', 11, '345609871234', 'Gowtham', '1', '7', '2', '2', 'Present', 'Current', '40000', '12000', '18000', '4000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-30 15:15:32', '4000', '', '', '', '', '4000', '5000', '', '', '5000', 0, '1', NULL, NULL, '2024-08-30 15:15:32', '2024-08-30 15:15:32'),
(29, 'COL-129', 11, '345609871234', 'Gowtham', '1', '7', '2', '2', 'Present', 'Current', '40000', '16000', '9000', '4000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-30 15:21:20', '4000', '', '', '', '', '4000', '5000', '', '', '5000', 0, '1', NULL, NULL, '2024-08-30 15:21:20', '2024-08-30 15:21:20'),
(30, 'COL-130', 28, '100010001000', 'Lubi', '1', '1', '1', '1', 'Present', 'Current', '10000', '0', '10000', '1000', '0', '1000', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-30 15:55:05', '1000', '', '', '', '', '1000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-30 15:55:05', '2024-08-30 15:55:05'),
(31, 'COL-131', 28, '100010001000', 'Lubi', '1', '1', '1', '1', 'Present', 'Current', '10000', '1000', '9000', '1000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-30 17:04:29', '1000', '', '', '', '', '1000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-30 17:04:29', '2024-08-30 17:04:29'),
(32, 'COL-132', 28, '100010001000', 'Lubi', '1', '1', '1', '1', 'Present', 'Current', '10000', '2000', '8000', '1000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-30 17:05:44', '1000', '', '', '', '', '1000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-30 17:05:44', '2024-08-30 17:05:44'),
(33, 'COL-133', 8, '994248402222', 'akash', '5', '15', '8', '1', 'Present', 'Pending', '30000', '3000', '27000', '3000', '15000', '18000', '1350', '0', '1', '', '', '', '0000-00-00', '2024-08-30 17:58:11', '3000', '', '', '', '', '3000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-30 17:58:11', '2024-08-30 17:58:11'),
(34, 'COL-134', 8, '994248402222', 'akash', '5', '15', '8', '1', 'Present', 'Pending', '30000', '6000', '24000', '3000', '12000', '15000', '1350', '0', '1', '', '', '', '0000-00-00', '2024-08-30 17:58:57', '', '', '', '1300', '', '1300', '', '', '', '', 0, '1', NULL, NULL, '2024-08-30 17:58:57', '2024-08-30 17:58:57'),
(35, 'COL-135', 23, '765423129850', 'Nirmal', '5', '15', '8', '2', 'Present', 'Current', '80000', '800', '79200', '800', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 15:16:54', '800', '', '', '', '', '800', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 15:16:54', '2024-08-31 15:16:54'),
(36, 'COL-136', 23, '765423129850', 'Nirmal', '5', '15', '8', '2', 'Present', 'Current', '80000', '1600', '78400', '800', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 15:17:51', '1000', '', '', '', '', '1000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 15:17:51', '2024-08-31 15:17:51'),
(37, 'COL-137', 28, '100010001000', 'Lubi', '1', '1', '1', '1', 'Present', 'Current', '10000', '3000', '7000', '1000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 15:21:08', '1500', '', '', '', '', '1500', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 15:21:08', '2024-08-31 15:21:08'),
(38, 'COL-138', 27, '765423129850', 'Nirmal', '5', '15', '8', '1', 'Present', 'Current', '50000', '0', '50000', '5000', '0', '5000', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 15:23:01', '1000', '', '', '', '', '1000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 15:23:01', '2024-08-31 15:23:01'),
(39, 'COL-139', 8, '994248402222', 'akash', '5', '15', '8', '1', 'Present', 'Pending', '30000', '6000', '24000', '3000', '12000', '15000', '50', '0', '1', '', '', '', '0000-00-00', '2024-08-31 15:24:49', '3000', '', '', '50', '', '3050', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 15:24:49', '2024-08-31 15:24:49'),
(40, 'COL-140', 7, '994248402222', 'akash', '5', '15', '8', '1', 'Present', 'Current', '48405', '0', '48405', '6915', '0', '6915', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 15:29:33', '6900', '', '', '', '', '6900', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 15:29:33', '2024-08-31 15:29:33'),
(41, 'COL-141', 10, '456789092384', 'Gopal', '1', '4', '1', '1', 'Present', 'Current', '20000', '0', '20000', '2000', '0', '2000', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 15:33:17', '2000', '', '', '', '', '2000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 15:33:17', '2024-08-31 15:33:17'),
(42, 'COL-142', 9, '045566789999', 'Meena', '1', '8', '2', '2', 'Present', 'Current', '50000', '1600', '48400', '500', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 16:08:14', '500', '', '', '', '', '500', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 16:08:14', '2024-08-31 16:08:14'),
(43, 'COL-143', 17, '111111111111', 'shanmugam', '1', '2', '1', '1', 'Present', 'Current', '11250', '2250', '9000', '2250', '0', '0', '0', '1000', '1', '', '', '', '0000-00-00', '2024-08-31 16:19:31', '2000', '', '', '', '', '2000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 16:19:31', '2024-08-31 16:19:31'),
(44, 'COL-144', 29, '123456789122', 'Rohini', '1', '9', '2', '1', 'Present', 'Current', '60000', '0', '60000', '600', '0', '600', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 16:39:41', '600', '', '', '', '', '600', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 16:39:41', '2024-08-31 16:39:41'),
(45, 'COL-145', 30, '879456456123', 'surya', '1', '2', '1', '1', 'Present', 'Current', '50000', '0', '50000', '5000', '0', '5000', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 18:39:07', '5000', '', '', '', '', '5000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 18:39:07', '2024-08-31 18:39:07'),
(46, 'COL-146', 30, '879456456123', 'surya', '1', '2', '1', '1', 'Present', 'Current', '50000', '5000', '45000', '5000', '0', '0', '0', '300', '5', '1', '', '478559', '2024-08-31', '2024-08-31 18:43:02', '1000', '', '', '', '0', '1000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 18:43:02', '2024-08-31 18:43:02'),
(47, 'COL-147', 30, '879456456123', 'surya', '1', '2', '1', '1', 'Present', 'Current', '50000', '6000', '44000', '5000', '0', '0', '0', '300', '1', '', '', '', '0000-00-00', '2024-08-31 18:44:45', '', '', '', '', '200', '200', '', '', '', '', 0, '1', NULL, NULL, '2024-08-31 18:44:45', '2024-08-31 18:44:45'),
(48, 'COL-148', 31, '224489088111', 'Ranjith', '1', '9', '2', '2', 'Present', 'Current', '80000', '0', '80000', '8000', '0', '8000', '0', '0', '4', '5', '', '74598j5', '2024-08-31', '2024-08-31 18:58:18', '8000', '', '', '', '', '8000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 18:58:18', '2024-08-31 18:58:18'),
(49, 'COL-149', 32, '415236699752', 'Siva kumar', '4', '12', '10', '1', 'Present', 'Current', '33600', '0', '33600', '5600', '0', '5600', '0', '0', '3', '3', '', '145525', '2024-08-31', '2024-08-31 19:17:58', '3000', '', '', '', '', '3000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 19:17:58', '2024-08-31 19:17:58'),
(50, 'COL-150', 33, '841256397000', 'Robert', '5', '15', '8', '3', 'Present', 'Current', '100000', '0', '100000', '1000', '0', '1000', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 19:37:48', '1000', '', '', '', '', '1000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 19:37:48', '2024-08-31 19:37:48'),
(51, 'COL-151', 33, '841256397000', 'Robert', '5', '15', '8', '3', 'Present', 'Current', '100000', '1000', '99000', '1000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 19:38:05', '2000', '', '', '', '', '2000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 19:38:05', '2024-08-31 19:38:05'),
(52, 'COL-152', 34, '753214896025', 'Vasanth', '1', '1', '1', '3', 'Present', 'Current', '60025', '0', '60025', '8575', '0', '8575', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 19:48:48', '8000', '', '', '', '', '8000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 19:48:48', '2024-08-31 19:48:48'),
(53, 'COL-153', 35, '878712126789', 'Thomas', '5', '15', '8', '1', 'Present', 'Current', '40000', '0', '40000', '8000', '0', '8000', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 19:53:06', '8000', '', '', '', '', '8000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 19:53:06', '2024-08-31 19:53:06'),
(54, 'COL-154', 36, '045566789999', 'Meena', '1', '8', '2', '2', 'Present', 'Current', '36000', '0', '36000', '3600', '0', '3600', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 19:58:05', '3600', '', '', '', '', '3600', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 19:58:05', '2024-08-31 19:58:05'),
(55, 'COL-155', 19, '446677889097', 'Ashok', '1', '5', '1', '1', 'Present', 'Current', '60000', '0', '60000', '6000', '0', '6000', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 20:02:51', '6000', '', '', '', '', '6000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 20:02:51', '2024-08-31 20:02:51'),
(56, 'COL-156', 35, '878712126789', 'Thomas', '5', '15', '8', '1', 'Present', 'Current', '40000', '8000', '32000', '8000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 20:04:48', '4000', '', '', '', '', '4000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 20:04:48', '2024-08-31 20:04:48'),
(57, 'COL-157', 31, '224489088111', 'Ranjith', '1', '9', '2', '2', 'Present', 'Current', '80000', '8000', '72000', '8000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 20:05:06', '4000', '', '', '', '', '4000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 20:05:06', '2024-08-31 20:05:06'),
(58, 'COL-158', 31, '123456789122', 'Rohini', '1', '9', '2', '2', 'Present', 'Current', '80000', '12000', '68000', '8000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 20:05:34', '3000', '', '', '', '', '3000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 20:05:34', '2024-08-31 20:05:34'),
(59, 'COL-159', 33, '841256397000', 'Robert', '5', '15', '8', '3', 'Present', 'Current', '100000', '3000', '97000', '1000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-08-31 20:05:53', '2000', '', '', '', '', '2000', '', '', '', '0', 0, '1', NULL, NULL, '2024-08-31 20:05:53', '2024-08-31 20:05:53'),
(60, 'COL-160', 34, '753214896025', 'Vasanth', '1', '1', '1', '3', 'Present', 'Pending', '60025', '8000', '52025', '8575', '575', '9150', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-02 09:35:13', '7000', '', '', '', '', '7000', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 09:35:13', '2024-09-02 09:35:13'),
(61, 'COL-161', 18, '100010001000', 'Lubi', '1', '1', '1', '1', 'Present', 'Current', '57015', '16290', '40725', '8145', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-02 10:34:29', '8145', '', '', '', '', '8145', '20000', '', '', '20000', 0, '1', NULL, NULL, '2024-09-02 10:34:29', '2024-09-02 10:34:29'),
(62, 'COL-162', 8, '994248402222', 'akash', '5', '15', '8', '1', 'Present', 'Pending', '30000', '9000', '21000', '3000', '12000', '15000', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-02 10:36:44', '3000', '', '', '', '', '3000', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 10:36:44', '2024-09-02 10:36:44'),
(63, 'COL-163', 7, '994248402222', 'akash', '5', '15', '8', '1', 'Present', 'Pending', '48405', '6900', '41505', '6915', '15', '6930', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-02 10:39:24', '4000', '', '', '', '', '4000', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 10:39:23', '2024-09-02 10:39:23'),
(64, 'COL-164', 35, '878712126789', 'Thomas', '5', '15', '8', '1', 'Present', 'Current', '40000', '12000', '28000', '8000', '0', '4000', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-02 10:51:16', '8000', '', '', '', '', '8000', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 10:51:16', '2024-09-02 10:51:16'),
(65, 'COL-165', 35, '878712126789', 'Thomas', '5', '15', '8', '1', 'Present', 'Current', '40000', '20000', '20000', '8000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-02 10:52:50', '8000', '', '', '', '', '8000', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 10:52:50', '2024-09-02 10:52:50'),
(66, 'COL-166', 29, '123456789122', 'Rohini', '1', '9', '2', '1', 'Present', 'Pending', '60000', '600', '59400', '600', '600', '1200', '18', '500', '1', '', '', '', '0000-00-00', '2024-09-02 11:12:47', '1200', '', '', '', '', '1200', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 11:12:47', '2024-09-02 11:12:47'),
(67, 'COL-167', 23, '765423129850', 'Nirmal', '5', '15', '8', '2', 'Present', 'Current', '80000', '2600', '77400', '800', '0', '0', '0', '0', '5', '5', '', '657r 6 56', '2024-09-02', '2024-09-02 11:17:18', '800', '', '', '', '', '800', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 11:17:18', '2024-09-02 11:17:18'),
(68, 'COL-168', 32, '415236699752', 'Siva kumar', '4', '12', '10', '1', 'Present', 'Pending', '33600', '3000', '30600', '5600', '2600', '8200', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-02 14:28:44', '1000', '', '', '', '', '1000', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 14:28:44', '2024-09-02 14:28:44'),
(69, 'COL-169', 32, '415236699752', 'Siva kumar', '4', '12', '10', '1', 'Present', 'Pending', '33600', '4000', '29600', '5600', '1600', '7200', '0', '0', '5', '2', '', '4521366', '2024-02-09', '2024-09-02 14:32:23', '600', '', '', '', '', '600', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 14:32:23', '2024-09-02 14:32:23'),
(70, 'COL-170', 31, '224489088111', 'Ranjith', '1', '9', '2', '2', 'Present', 'Current', '80000', '15000', '65000', '8000', '0', '1000', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-02 14:36:41', '500', '', '', '', '', '500', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 14:36:41', '2024-09-02 14:36:41'),
(71, 'COL-171', 30, '879456456123', 'surya', '1', '2', '1', '1', 'Present', 'Current', '50000', '6000', '44000', '5000', '0', '4000', '0', '100', '1', '', '', '', '0000-00-00', '2024-09-02 14:41:31', '2000', '', '', '', '', '2000', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 14:41:31', '2024-09-02 14:41:31'),
(72, 'COL-172', 27, '765423129850', 'Nirmal', '5', '15', '8', '1', 'Present', 'Current', '50000', '1000', '49000', '5000', '0', '4000', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-02 14:46:37', '2000', '', '', '', '', '2000', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 14:46:37', '2024-09-02 14:46:37'),
(73, 'COL-173', 19, '446677889097', 'Ashok', '1', '5', '1', '1', 'Present', 'Current', '60000', '6000', '54000', '6000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-02 14:50:24', '3000', '', '', '', '', '3000', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 14:50:24', '2024-09-02 14:50:24'),
(74, 'COL-174', 29, '123456789122', 'Rohini', '1', '9', '2', '1', 'Present', 'Current', '60000', '1800', '58200', '600', '0', '0', '18', '500', '1', '', '', '', '0000-00-00', '2024-09-02 15:12:25', '', '', '', '18', '', '18', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-02 15:12:25', '2024-09-02 15:12:25'),
(75, 'COL-175', 29, '123456789122', 'Rohini', '1', '9', '2', '1', 'Present', 'Current', '60000', '1800', '58200', '600', '0', '0', '0', '500', '1', '', '', '', '0000-00-00', '2024-09-02 15:14:04', '600', '', '', '', '', '600', '', '', '500', '500', 0, '1', NULL, NULL, '2024-09-02 15:14:04', '2024-09-02 15:14:04'),
(76, 'COL-176', 30, '879456456123', 'surya', '1', '2', '1', '1', 'Present', 'Current', '50000', '8000', '42000', '5000', '0', '2000', '0', '100', '1', '', '', '', '0000-00-00', '2024-09-02 15:16:03', '', '', '', '', '100', '100', '', '', '', '', 0, '1', NULL, NULL, '2024-09-02 15:16:03', '2024-09-02 15:16:03'),
(77, 'COL-177', 8, '994248402222', 'akash', '5', '15', '8', '1', 'Present', 'Pending', '30000', '12000', '18000', '3000', '9000', '12000', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-02 16:28:38', '3000', '', '', '', '', '3000', '5000', '', '', '5000', 0, '1', NULL, NULL, '2024-09-02 16:28:38', '2024-09-02 16:28:38'),
(78, 'COL-178', 40, '142365987899', 'priyanka', '1', '8', '2', '2', 'Present', 'Pending', '50015', '0', '50015', '7145', '7145', '14290', '143', '0', '1', '', '', '', '0000-00-00', '2024-09-05 15:51:50', '7145', '', '', '143', '', '7288', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-05 15:51:50', '2024-09-05 15:51:50'),
(79, 'COL-179', 40, '142365987899', 'priyanka', '1', '8', '2', '2', 'Present', 'Current', '50015', '7145', '42870', '7145', '0', '7145', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-05 15:53:38', '7145', '', '', '', '', '7145', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-05 15:53:38', '2024-09-05 15:53:38'),
(80, 'COL-180', 34, '753214896025', 'Vasanth', '1', '1', '1', '3', 'Present', 'Current', '60025', '15000', '45025', '8575', '0', '2150', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-05 16:09:24', '2150', '', '', '', '', '2150', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-05 16:09:24', '2024-09-05 16:09:24'),
(81, 'COL-181', 29, '123456789122', 'Rohini', '1', '9', '2', '1', 'Present', 'Pending', '60000', '2400', '57600', '600', '600', '1200', '54', '0', '1', '', '', '', '0000-00-00', '2024-09-05 16:21:19', '600', '', '', '', '', '', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-05 16:21:19', '2024-09-05 16:21:19'),
(82, 'COL-182', 37, '234156437665', 'Alisha', '1', '1', '1', '3', 'Present', 'Current', '300000', '0', '300000', '30000', '0', '30000', '0', '0', '4', '1', '', '21526', '2024-09-05', '2024-09-05 16:52:44', '30000', '', '', '', '', '30000', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-05 16:52:44', '2024-09-05 16:52:44'),
(83, 'COL-183', 33, '841256397000', 'Robert', '5', '15', '8', '3', 'Present', 'Current', '100000', '5000', '95000', '1000', '0', '1000', '0', '0', '5', '1', '', '125', '2024-09-05', '2024-09-05 17:02:54', '1000', '', '', '', '', '1000', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-05 17:02:54', '2024-09-05 17:02:54'),
(84, 'COL-184', 32, '415236699752', 'Siva kumar', '4', '12', '10', '1', 'Present', 'Pending', '33600', '4600', '29000', '5600', '1000', '6600', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-05 17:07:46', '6600', '', '', '', '', '6600', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-05 17:07:46', '2024-09-05 17:07:46'),
(85, 'COL-185', 18, '100010001000', 'Lubi', '1', '1', '1', '1', 'Present', 'Current', '57015', '24435', '12580', '8145', '0', '0', '0', '0', '5', '1', '', '3562', '2024-09-05', '2024-09-05 17:14:03', '8145', '', '', '', '', '8145', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-05 17:14:03', '2024-09-05 17:14:03'),
(86, 'COL-186', 17, '111111111111', 'shanmugam', '1', '2', '1', '1', 'Present', 'Current', '11250', '4250', '7000', '2250', '0', '250', '0', '1000', '1', '', '', '', '0000-00-00', '2024-09-05 17:17:30', '250', '', '', '', '', '250', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-05 17:17:30', '2024-09-05 17:17:30'),
(87, 'COL-187', 38, '475896547989', 'Vijay', '2', '10', '6', '1', 'Present', 'Pending', '50000', '0', '50000', '500', '2000', '2500', '105', '0', '1', '', '', '', '0000-00-00', '2024-09-06 10:31:31', '2500', '', '', '105', '', '2605', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-06 10:31:31', '2024-09-06 10:31:31'),
(88, 'COL-188', 29, '123456789122', 'Rohini', '1', '9', '2', '1', 'Present', 'Pending', '60000', '3000', '57000', '600', '600', '1200', '54', '0', '5', '3', '', '421353', '2024-09-05', '2024-09-06 10:36:34', '600', '', '', '54', '', '654', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-06 10:36:34', '2024-09-06 10:36:34'),
(89, 'COL-189', 7, '994248402222', 'akash', '5', '15', '8', '1', 'Present', 'Current', '48405', '10900', '37505', '6915', '0', '2930', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-06 14:16:26', '6915', '', '', '', '', '6915', '30590', '', '', '30590', 0, '1', NULL, NULL, '2024-09-06 14:16:26', '2024-09-06 14:16:26'),
(90, 'COL-190', 9, '045566789999', 'Meena', '1', '8', '2', '2', 'Present', 'Current', '50000', '2100', '47900', '500', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-06 14:37:45', '10000', '', '', '', '', '10000', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-06 14:37:45', '2024-09-06 14:37:45'),
(91, 'COL-191', 9, '045566789999', 'Meena', '1', '8', '2', '2', 'Present', 'Current', '50000', '12100', '37900', '500', '0', '0', '0', '0', '4', '2', '', 'htrgee', '2024-09-06', '2024-09-06 14:43:46', '500', '', '', '', '', '500', '15000', '', '', '15000', 0, '1', NULL, NULL, '2024-09-06 14:43:46', '2024-09-06 14:43:46'),
(92, 'COL-192', 10, '456789092384', 'Gopal', '1', '4', '1', '1', 'Present', 'Current', '20000', '2000', '18000', '2000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-06 15:37:06', '2000', '', '', '', '', '2000', '12000', '', '', '12000', 0, '1', NULL, NULL, '2024-09-06 15:37:06', '2024-09-06 15:37:06'),
(93, 'COL-193', 40, '142365987899', 'priyanka', '1', '8', '2', '2', 'Present', 'Current', '50015', '14290', '35725', '7145', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-06 18:11:47', '35725', '', '', '', '', '35725', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-06 18:11:47', '2024-09-06 18:11:47'),
(94, 'COL-194', 38, '475896547989', 'Vijay', '2', '10', '6', '1', 'Present', 'Pending', '50000', '2500', '47500', '500', '1000', '1500', '45', '0', '1', '', '', '', '0000-00-00', '2024-09-09 13:00:09', '1500', '', '', '45', '', '1545', '', '45', '', '45', 0, '1', NULL, NULL, '2024-09-09 13:00:09', '2024-09-09 13:00:09'),
(95, 'COL-195', 33, '841256397000', 'Robert', '5', '15', '8', '3', 'Present', 'Pending', '100000', '6000', '94000', '1000', '3000', '4000', '560', '0', '1', '', '', '', '0000-00-00', '2024-09-09 14:23:24', '1000', '', '', '', '', '1000', '', '25', '', '25', 0, '1', NULL, NULL, '2024-09-09 14:23:24', '2024-09-09 14:23:24'),
(96, 'COL-196', 33, '841256397000', 'Robert', '5', '15', '8', '3', 'Present', 'Pending', '100000', '7000', '93000', '1000', '2000', '3000', '535', '0', '1', '', '', '', '0000-00-00', '2024-09-09 14:25:45', '1000', '', '', '200', '', '1200', '', '150', '', '150', 0, '1', NULL, NULL, '2024-09-09 14:25:45', '2024-09-09 14:25:45'),
(97, 'COL-197', 29, '123456789122', 'Rohini', '1', '9', '2', '1', 'Present', 'Pending', '60000', '3600', '56400', '600', '1800', '2400', '54', '0', '1', '', '', '', '0000-00-00', '2024-09-09 14:39:38', '', '', '', '24', '', '24', '', '30', '', '30', 0, '1', NULL, NULL, '2024-09-09 14:39:38', '2024-09-09 14:39:38'),
(98, 'COL-198', 36, '045566789999', 'Meena', '1', '8', '2', '2', 'Present', 'Current', '36000', '3600', '32400', '3600', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-09 14:50:55', '3600', '', '', '', '', '3600', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-09 14:50:55', '2024-09-09 14:50:55'),
(99, 'COL-199', 38, '475896547989', 'Vijay', '2', '10', '6', '1', 'Present', 'Current', '50000', '4000', '46000', '500', '0', '500', '-45', '0', '1', '', '', '', '0000-00-00', '2024-09-10 10:59:47', '500', '', '', '', '', '', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-10 10:59:47', '2024-09-10 10:59:47'),
(100, 'COL-200', 37, '234156437665', 'Alisha', '1', '1', '1', '3', 'Present', 'Current', '300000', '30000', '270000', '30000', '0', '0', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-10 11:11:15', '30000', '', '', '', '', '30000', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-10 11:11:15', '2024-09-10 11:11:15'),
(101, 'COL-201', 53, '123412341236', 'Rani', '', '0', '', '1', 'Present', 'Current', '26000', '0', '26000', '2600', '0', '2600', '0', '0', '1', '', '', '', '0000-00-00', '2024-09-12 15:29:59', '2600', '', '', '0', '0', '2600', '', '', '', '0', 0, '1', NULL, NULL, '2024-09-12 15:29:59', '2024-09-12 15:29:59');

-- --------------------------------------------------------

--
-- Table structure for table `collection_charges`
--

CREATE TABLE `collection_charges` (
  `id` int(11) NOT NULL COMMENT 'Primary Key',
  `cus_profile_id` int(11) DEFAULT NULL,
  `cus_id` varchar(255) DEFAULT NULL,
  `coll_date` varchar(255) DEFAULT NULL,
  `coll_purpose` varchar(255) DEFAULT NULL,
  `coll_charge` varchar(255) NOT NULL DEFAULT '0',
  `paid_date` varchar(255) DEFAULT NULL,
  `paid_amnt` varchar(255) DEFAULT '0',
  `waiver_amnt` varchar(255) DEFAULT '0',
  `status` int(11) DEFAULT NULL,
  `insert_login_id` varchar(255) DEFAULT NULL,
  `update_login_id` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL COMMENT 'Create Time',
  `updated_date` datetime DEFAULT current_timestamp() COMMENT 'Update Time'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `collection_charges`
--

INSERT INTO `collection_charges` (`id`, `cus_profile_id`, `cus_id`, `coll_date`, `coll_purpose`, `coll_charge`, `paid_date`, `paid_amnt`, `waiver_amnt`, `status`, `insert_login_id`, `update_login_id`, `created_date`, `updated_date`) VALUES
(1, 1, '111111110000', '2024-07-16', 'Test', '100', NULL, '0', '0', 0, '2', NULL, '2024-07-16 13:30:32', '2024-07-16 13:30:32'),
(2, 2, NULL, NULL, NULL, '0', '2024-07-18', '0', '', NULL, NULL, NULL, NULL, '2024-07-18 10:35:21'),
(3, 2, NULL, NULL, NULL, '0', '2024-07-18', '0', '', NULL, NULL, NULL, NULL, '2024-07-18 11:15:35'),
(4, 1, '111111110000', '2024-07-18', 'penalty', '500', NULL, '0', '0', 0, '1', NULL, '2024-07-18 12:36:43', '2024-07-18 12:36:43'),
(5, 1, NULL, NULL, NULL, '0', '2024-07-18', '0', '', NULL, NULL, NULL, NULL, '2024-07-18 12:45:54'),
(6, 1, NULL, NULL, NULL, '0', '2024-07-18', '0', '', NULL, NULL, NULL, NULL, '2024-07-18 13:14:39'),
(7, 1, NULL, NULL, NULL, '0', '2024-07-18', '600', '', NULL, NULL, NULL, NULL, '2024-07-18 13:17:00'),
(8, 6, '123456789012', '2024-07-18', 'testing', '200', NULL, '0', '0', 0, '1', NULL, '2024-07-18 17:46:05', '2024-07-18 17:46:05'),
(9, 6, NULL, NULL, NULL, '0', '2024-07-18', '200', '', NULL, NULL, NULL, NULL, '2024-07-18 17:47:46'),
(10, 6, NULL, NULL, NULL, '0', '2024-07-18', '0', '', NULL, NULL, NULL, NULL, '2024-07-18 18:55:03'),
(11, 9, NULL, NULL, NULL, '0', '2024-07-19', '0', '', NULL, NULL, NULL, NULL, '2024-07-19 10:14:45'),
(12, 1, NULL, NULL, NULL, '0', '2024-07-19', '0', '', NULL, NULL, NULL, NULL, '2024-07-19 11:29:49'),
(13, 10, '456789092384', '2024-07-19', 'Test', '200', NULL, '0', '0', 0, '1', NULL, '2024-07-19 12:28:09', '2024-07-19 12:28:09'),
(14, 9, '045566789999', '2024-07-19', 'test', '100', NULL, '0', '0', 0, '1', NULL, '2024-07-19 12:34:36', '2024-07-19 12:34:36'),
(15, 9, NULL, NULL, NULL, '0', '2024-07-19', '0', '', NULL, NULL, NULL, NULL, '2024-07-19 12:35:29'),
(16, 10, NULL, NULL, NULL, '0', '2024-07-19', '200', '', NULL, NULL, NULL, NULL, '2024-07-19 12:59:42'),
(17, 6, NULL, NULL, NULL, '0', '2024-07-19', '0', '', NULL, NULL, NULL, NULL, '2024-07-19 15:25:42'),
(18, 15, '446677889097', '2024-07-19', 'test', '100', NULL, '0', '0', 0, '1', NULL, '2024-07-19 17:40:07', '2024-07-19 17:40:07'),
(19, 15, NULL, NULL, NULL, '0', '2024-07-19', '0', '100', NULL, NULL, NULL, NULL, '2024-07-19 17:43:31'),
(20, 9, NULL, NULL, NULL, '0', '2024-07-20', '100', '', NULL, NULL, NULL, NULL, '2024-07-20 10:30:51'),
(21, 11, NULL, NULL, NULL, '0', '2024-07-20', '0', '', NULL, NULL, NULL, NULL, '2024-07-20 10:33:21'),
(22, 8, NULL, NULL, NULL, '0', '2024-07-20', '0', '', NULL, NULL, NULL, NULL, '2024-07-20 10:58:56'),
(23, 17, '111111111111', '2024-08-29', 'late', '2200', NULL, '0', '0', 0, '1', NULL, '2024-08-29 15:43:57', '2024-08-29 15:43:57'),
(24, 17, '111111111111', '2024-08-30', 'late pay', '1000', NULL, '0', '0', 0, '1', NULL, '2024-08-30 14:50:16', '2024-08-30 14:50:16'),
(25, 17, NULL, NULL, NULL, '0', '2024-08-30', '2200', '', NULL, NULL, NULL, NULL, '2024-08-30 14:51:33'),
(26, 30, '879456456123', '2024-08-31', 'Test', '100', NULL, '0', '0', 0, '1', NULL, '2024-08-31 18:39:33', '2024-08-31 18:39:33'),
(27, 30, '879456456123', '2024-08-31', 'test', '200', NULL, '0', '0', 0, '1', NULL, '2024-08-31 18:41:13', '2024-08-31 18:41:13'),
(28, 30, NULL, NULL, NULL, '0', '2024-08-31', '0', '', NULL, NULL, NULL, NULL, '2024-08-31 18:43:03'),
(29, 29, '123456789122', '2024-08-31', 'test', '500', NULL, '0', '0', 0, '1', NULL, '2024-08-31 18:43:57', '2024-08-31 18:43:57'),
(30, 30, NULL, NULL, NULL, '0', '2024-08-31', '200', '', NULL, NULL, NULL, NULL, '2024-08-31 18:44:46'),
(31, 29, NULL, NULL, NULL, '0', '2024-09-02', '', '500', NULL, NULL, NULL, NULL, '2024-09-02 15:14:05'),
(32, 30, NULL, NULL, NULL, '0', '2024-09-02', '100', '', NULL, NULL, NULL, NULL, '2024-09-02 15:16:03'),
(33, 53, NULL, NULL, NULL, '0', '2024-09-12', '0', '', NULL, NULL, NULL, NULL, '2024-09-12 15:29:59');

-- --------------------------------------------------------

--
-- Table structure for table `company_creation`
--

CREATE TABLE `company_creation` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `district` int(11) DEFAULT NULL,
  `taluk` int(11) DEFAULT NULL,
  `place` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `mailid` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `whatsapp` varchar(255) DEFAULT NULL,
  `landline_code` varchar(100) DEFAULT NULL,
  `landline` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `insert_user_id` int(11) DEFAULT NULL,
  `update_user_id` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `updated_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_creation`
--

INSERT INTO `company_creation` (`id`, `company_name`, `address`, `state`, `district`, `taluk`, `place`, `pincode`, `website`, `mailid`, `mobile`, `whatsapp`, `landline_code`, `landline`, `status`, `insert_user_id`, `update_user_id`, `created_date`, `updated_date`) VALUES
(1, 'Uzhavan FInance', 'No 25 ', 1, 34, 278, 'Gandhi Road', '604408', '', 'uzhavanfinance@gmail.com', '9842138111', '9842183111', '044', '18005421', 1, 1, 1, '2024-07-16 12:37:59', '2024-08-29');

-- --------------------------------------------------------

--
-- Table structure for table `customer_data`
--

CREATE TABLE `customer_data` (
  `id` int(11) NOT NULL,
  `cus_name` varchar(100) NOT NULL,
  `area` varchar(100) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `loan_cat` varchar(100) NOT NULL,
  `loan_amount` varchar(100) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) NOT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_data`
--

INSERT INTO `customer_data` (`id`, `cus_name`, `area`, `mobile`, `loan_cat`, `loan_amount`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'Arun', 'cheyyar', '8796054313', 'personal loan', '25000', 1, 0, '2024-07-18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer_profile`
--

CREATE TABLE `customer_profile` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_name` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `age` varchar(100) NOT NULL,
  `mobile1` varchar(100) NOT NULL,
  `mobile2` varchar(100) NOT NULL,
  `whatsapp_no` varchar(50) DEFAULT NULL,
  `aadhar_num` varchar(100) DEFAULT NULL,
  `pic` varchar(100) NOT NULL,
  `guarantor_name` varchar(100) NOT NULL,
  `gu_pic` varchar(100) NOT NULL,
  `cus_data` varchar(100) NOT NULL,
  `cus_status` varchar(100) NOT NULL,
  `res_type` varchar(100) NOT NULL,
  `res_detail` varchar(100) NOT NULL,
  `res_address` varchar(100) NOT NULL,
  `native_address` varchar(100) NOT NULL,
  `occupation` varchar(100) NOT NULL,
  `occ_detail` varchar(100) NOT NULL,
  `occ_income` varchar(100) NOT NULL,
  `occ_address` varchar(100) NOT NULL,
  `area_confirm` varchar(100) NOT NULL,
  `area` int(11) NOT NULL,
  `line` varchar(100) NOT NULL,
  `cus_limit` varchar(100) NOT NULL,
  `about_cus` varchar(100) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_profile`
--

INSERT INTO `customer_profile` (`id`, `cus_id`, `cus_name`, `gender`, `dob`, `age`, `mobile1`, `mobile2`, `whatsapp_no`, `aadhar_num`, `pic`, `guarantor_name`, `gu_pic`, `cus_data`, `cus_status`, `res_type`, `res_detail`, `res_address`, `native_address`, `occupation`, `occ_detail`, `occ_income`, `occ_address`, `area_confirm`, `area`, `line`, `cus_limit`, `about_cus`, `remark`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '111111110000', 'Rahul', '1', '1991-01-31', '33', '9879865432', '6789654355', NULL, NULL, '6696251decf41.jpg', '3', '6696251ded52a.jpg', 'New', '', '1', '2 floor building', 'no 25 , gandhi road , vandavasi', 'no 255/1 , kovil st, Ponnur', 'Medical Rep', 'Area Supervisor', '25000', 'Cipla Kanchipuram', '1', 2, '1', '100000', 'Well responsible', NULL, 3, 3, '2024-07-16 13:06:26', '2024-07-16'),
(2, '879456456123', 'surya', '1', '1990-03-18', '34', '9874561230', '', NULL, NULL, '66989aa2a97f1.jpg', '4', '66989aa2aa2bc.jpg', 'New', '', '1', 'anakavur', 'cheyyar', 'vandavasi', '', '', '', '', '1', 9, '2', '60000', '', NULL, 1, 1, '2024-07-18 09:52:35', '2024-07-18'),
(3, '879456456123', 'surya', '1', '1990-03-18', '34', '9874561230', '', NULL, NULL, '66989aa2a97f1.jpg', '4', '66989aa2aa2bc.jpg', 'Existing', 'Additional/Renewal', '1', 'anakavur', 'cheyyar', 'vandavasi', '', '', '', '', '1', 9, '2', '60000', '', 'the person already in loan', 1, 1, '2024-07-18 11:03:09', '2024-07-18'),
(4, '879456456123', 'surya', '1', '1990-03-18', '34', '9874561230', '', NULL, NULL, '66989aa2a97f1.jpg', '5', '66989aa2aa2bc.jpg', 'Existing', 'Additional/Renewal', '1', 'anakavur', 'cheyyar', 'vandavasi', '', '', '', '', '1', 10, '6', '100000', '', 'negative', 1, 1, '2024-07-18 11:39:20', '2024-07-18'),
(5, '879456456123', 'surya', '1', '1990-03-22', '34', '9874561230', '', NULL, NULL, '66989aa2a97f1.jpg', '4', '6698bbbdf003a.jpg', 'Existing', 'Renewal', '1', 'gandhi rd', 'vandavasi', 'vsi', '', '', '', '', '1', 2, '1', '10000', '', 'adhar mismatch', 1, 1, '2024-07-18 11:57:36', '2024-07-18'),
(6, '123456789012', 'Ramesh', '2', '2024-07-02', '0', '6575894321', '', NULL, NULL, '6698e1e3bf82c.jpg', '6', '6698e1e3bfece.jpg', 'New', '', '1', 'nedungunam', 'chetpet', 'chetpet', '', '', '', '', '1', 16, '8', '100000', 'good responce', NULL, 1, 1, '2024-07-18 14:58:42', '2024-07-18'),
(7, '994248402222', 'akash', '1', '1988-06-18', '36', '8765432190', '', NULL, NULL, '6698f1eda56de.jpg', '7', '6698f1eda6298.jpg', 'New', '', '1', '3 floor building', 'chetpet', 'chetpet', '', '', '', '', '1', 15, '8', '300000', 'good response', NULL, 1, 1, '2024-07-18 16:10:38', '2024-07-18'),
(8, '994248402222', 'akash', '1', '1988-06-18', '36', '8765432190', '', NULL, NULL, '6698f1eda56de.jpg', '7', '6698f1eda6298.jpg', 'Existing', 'Additional/Renewal', '1', '3 floor building', 'chetpet', 'chetpet', '', '', '', '', '1', 15, '8', '1000000', 'good response', NULL, 1, 1, '2024-07-18 17:35:50', '2024-07-18'),
(9, '045566789999', 'Meena', '2', '1994-06-16', '30', '8597834512', '', NULL, NULL, '6699e94cc1bd2.jpg', '8', '6699e94cc22b7.jpg', 'New', '', '1', 'Building', 'akkur', 'cheyyar', '', '', '', '', '1', 8, '2', '500000', 'Good', NULL, 1, 1, '2024-07-19 09:42:23', '2024-07-19'),
(10, '456789092384', 'Gopal', '1', '1988-07-30', '35', '8012648209', '', NULL, NULL, '6699f7f7bb193.jpg', '9', '6699f7f7bb743.jpg', 'New', '', '2', 'Apartment', 'vandavasi', 'vandavasi', 'Teacher', '5 years', '25000', 'maruvathur', '1', 4, '1', '20000', '', NULL, 1, 1, '2024-07-19 10:45:06', '2024-07-19'),
(11, '345609871234', 'Gowtham', '1', '1998-05-19', '26', '9089070604', '', NULL, NULL, '669a07e6f228b.jfif', '10', '669a07e6f2e0b.jpg', 'New', '', '1', 'Building', 'echur', 'cheyyar', '', '', '', '', '1', 7, '2', '100000', '', NULL, 1, 1, '2024-07-19 11:55:01', '2024-07-19'),
(12, '123456789012', 'Ramesh', '1', '1993-10-19', '30', '6575894321', '', NULL, NULL, '6698e1e3bf82c.jpg', '6', '6698e1e3bfece.jpg', 'Existing', 'Additional/Renewal', '1', 'nedungunam', 'chetpet', 'chetpet', 'driver', '5 years', '30000', 'chennai', '1', 16, '8', '100000', 'good responce', NULL, 1, 1, '2024-07-19 15:39:30', '2024-07-19'),
(13, '012346758906', 'Arun', '1', '1987-12-01', '36', '6677889900', '', NULL, NULL, '669a4546345a9.jfif', '12', '669a454634b8a.jpg', 'New', '', '3', '2 floor', 'uthiramerur', 'Uthiramerur', 'farmer', '', '28000', 'Uthiramerur', '1', 6, '1', '50000', '', 'not good', 1, 1, '2024-07-19 16:10:26', '2024-07-19'),
(14, '213574689023', 'Krishna', '1', '1995-05-30', '29', '6700213141', '', '', NULL, '669a4c30cb08a.jpg', '14', '669a4c30cbbf6.jpg', 'New', '', '3', '5 years lease', 'New street, chetpet', 'chetpet', '', '', '', '', '1', 15, '8', '80000', '', NULL, 1, 1, '2024-07-19 16:42:51', '2024-09-02'),
(15, '446677889097', 'Ashok', '1', '1996-08-14', '27', '8709565433', '', NULL, NULL, '669a52f511eef.jfif', '15', '669a52f512427.jpg', 'New', '', '1', 'Tiled house', 'Mummuni', 'vandavasi', 'Sales Executive', '6 years', '25000', 'vandavasi', '1', 5, '1', '80000', '', NULL, 1, 1, '2024-07-19 17:11:40', '2024-07-19'),
(16, '224489088111', 'Ranjith', '1', '1994-08-16', '29', '7502988651', '', NULL, NULL, '669b487d680bc.jpg', '17', '669b487d686cb.jpg', 'New', '', '1', '2 floor building', 'cheyyar', 'cheyyar', 'Real estate', '4 years', '40000', 'cheyyar', '1', 9, '2', '100000', '', NULL, 5, 5, '2024-07-20 10:42:32', '2024-07-20'),
(17, '111111111111', 'shanmugam', '1', '1986-01-06', '38', '8123070349', '', NULL, NULL, '669b60e9cf00c.jpg', '18', '669b60e9cfc35.jpg', 'New', '', '2', '', '', '', 'Salaried ', 'manager', '100000', 'chennai', '2', 2, '1', '10000', 'We can process the loan to the customer', NULL, 1, 1, '2024-07-20 12:21:51', '2024-07-20'),
(18, '100010001000', 'Lubi', '1', '1994-12-12', '29', '7895645121', '7418529630', NULL, NULL, '66ab40e52a71e.png', '19', '66ab40e52acbf.png', 'New', '', '1', 'Apartment', 'XYZ', 'XYZ', '', '', '', '', '1', 1, '1', '450000', 'testing record', NULL, 1, 1, '2024-08-01 13:30:02', '2024-08-01'),
(19, '446677889097', 'Ashok', '1', '1996-08-14', '27', '8709565433', '', NULL, NULL, '669a52f511eef.jfif', '15', '669a52f512427.jpg', 'Existing', 'Additional/Renewal', '1', 'Tiled house', 'Mummuni', 'vandavasi', 'Sales Executive', '6 years', '25000', 'vandavasi', '1', 5, '1', '80000', '', NULL, 1, 1, '2024-08-22 18:58:38', '2024-08-22'),
(20, '123415671890', 'Arun', '1', '1991-09-23', '32', '9876556789', '9123456780', '9876556789', NULL, '66d006b06e156.jpg', '20', '66d006b06e68e.jpg', 'New', '', '1', 'door no.99', 'main street', 'cheyyur village', '', '', '', '', '1', 1, '1', '1000000', '', 'not applicable', 1, 1, '2024-08-29 10:21:53', '2024-08-29'),
(21, '434351516776', 'Priya', '2', '1992-06-29', '32', '9123452345', '9976542311', '9123452345', NULL, '66d012c6bd0b5.png', '21', '66d012c6bdb52.jpg', 'New', '', '2', '1bhk', 'kovil street', 'vellore', 'housewife', '', '', '', '1', 2, '1', '100000', '', NULL, 1, 1, '2024-08-29 11:31:31', '2024-08-29'),
(22, '878712126789', 'Thomas', '1', '1985-12-03', '38', '7534567800', '9087654567', '7534567800', NULL, '66d01ab5cff1b.jpg', '22', '66d01ab5d1358.jfif', 'New', '', '1', '2bhk', 'echur village', 'echur', '', '', '', '', '1', 7, '2', '75000', '', 'not eligible', 1, 1, '2024-08-29 12:15:15', '2024-08-29'),
(23, '765423129850', 'Nirmal', '1', '1989-04-17', '35', '8765433210', '8765433210', '8765433210', NULL, '66d03b7087d0b.jpg', '23', '66d053b4c2ec4.jfif', 'New', '', '3', 'chetpet', 'chetpet', 'chetpet', 'Real estate', '4 years', '300000', 'chetpet', '2', 15, '8', '100000', '', NULL, 1, 1, '2024-08-29 14:42:16', '2024-08-29'),
(24, '123415671890', 'Arun', '1', '1991-09-23', '32', '9876556789', '9123456780', '9876556789', NULL, '66d006b06e156.jpg', '20', '66d006b06e68e.jpg', 'Existing', 'Additional/Renewal', '1', 'door no.99', 'main street', 'cheyyur village', '', '', '', '', '1', 1, '1', '100000', '', NULL, 1, 1, '2024-08-29 18:01:47', '2024-08-29'),
(25, '878712126789', 'Thomas', '1', '1985-12-03', '38', '7534567800', '9087654567', '7534567800', NULL, '66d01ab5cff1b.jpg', '22', '66d1554670237.jpeg', 'Existing', '', '1', 'apartment', 'kovil street', 'chetpet', '', '', '', '', '1', 15, '8', '200000', '', 'document needed', 1, 1, '2024-08-29 18:40:27', '2024-08-30'),
(26, '012346758906', 'Arun', '1', '1987-12-01', '36', '6677889900', '', '', NULL, '669a4546345a9.jfif', '13', '66d1a19b84360.jpeg', 'Existing', '', '4', 'nedungunam', 'vandavasi', 'nedunganam', '', '', '', '', '1', 16, '8', '200000', '', NULL, 1, 1, '2024-08-29 18:41:16', '2024-09-02'),
(27, '765423129850', 'Nirmal', '1', '1989-04-17', '35', '8765433210', '8765433210', '8765433210', NULL, '66d03b7087d0b.jpg', '23', '66d053b4c2ec4.jfif', 'Existing', 'Additional/Renewal', '3', 'chetpet', 'chetpet', 'chetpet', 'Real estate', '4 years', '300000', 'chetpet', '2', 15, '8', '100000', '', NULL, 1, 1, '2024-08-30 09:37:31', '2024-08-30'),
(28, '100010001000', 'Lubi', '1', '1994-12-12', '29', '7895645121', '7418529630', '', NULL, '66ab40e52a71e.png', '19', '66ab40e52acbf.png', 'Existing', 'Additional/Renewal', '1', 'Apartment', 'XYZ', 'XYZ', '', '', '', '', '1', 1, '1', '450000', 'testing record', NULL, 1, 1, '2024-08-30 10:19:00', '2024-08-30'),
(29, '123456789122', 'Rohini', '2', '0000-00-00', '', '8855664479', '', '', NULL, '66d2ed0248b06.png', '24', '66d2ed0249085.png', 'New', '', '1', '1 floor house', 'Anakavur', 'Anakavur', 'private', 'private ', '20000', 'cheyyar', '1', 9, '2', '100000', 'New', NULL, 1, 1, '2024-08-31 15:37:39', '2024-08-31'),
(30, '879456456123', 'surya', '1', '1990-03-22', '34', '9874561230', '', '', NULL, '66d589e8b3c6c.png', '4', '6698bbbdf003a.jpg', 'Existing', 'Renewal', '1', 'gandhi rd', 'vandavasi', 'vsi', 'sipcot company', 'private ', '30000', 'CYR', '1', 2, '1', '100000', 'Responsible customer', NULL, 1, 1, '2024-08-31 18:21:43', '2024-09-02'),
(31, '224489088111', 'Ranjith', '1', '1994-08-16', '29', '7502988651', '', '', NULL, '669b487d680bc.jpg', '17', '669b487d686cb.jpg', 'Existing', 'Additional/Renewal', '1', '2 floor building', 'cheyyar', 'cheyyar', 'Real estate', '4 years', '40000', 'cheyyar', '1', 9, '2', '100000', '', NULL, 1, 1, '2024-08-31 18:46:34', '2024-08-31'),
(32, '415236699752', 'Siva kumar', '1', '1987-06-30', '37', '6854795512', '', '', NULL, '66d31c8ca859b.png', '25', '66d31c8ca9791.png', 'New', '', '1', '22', 'vandavasi', 'vsi', 'IT company', 'private ', '40000', 'chennai', '1', 12, '10', '200000', '', NULL, 1, 1, '2024-08-31 19:02:36', '2024-08-31'),
(33, '841256397000', 'Robert', '1', '1990-02-25', '34', '7458963258', '', '', NULL, '66d3220e5febe.png', '26', '66d3220e603ab.png', 'New', '', '2', '23', 'chetpet', 'chetpet', 'Stationary store', 'business', '50000', 'cpt', '1', 15, '8', '200000', '', NULL, 1, 1, '2024-08-31 19:25:33', '2024-08-31'),
(34, '753214896025', 'Vasanth', '1', '1992-02-23', '32', '7541236985', '', '', NULL, '66d324fd2304a.png', '27', '66d324fd2358c.png', 'New', '', '1', '1 floor house', 'vandavasi', 'vsi', '', '', '', '', '1', 1, '1', '100000', '', NULL, 1, 1, '2024-08-31 19:40:22', '2024-08-31'),
(35, '878712126789', 'Thomas', '1', '1985-12-03', '38', '7534567800', '9087654567', '7534567800', NULL, '66d326a32a8a7.png', '22', '66d326a32add6.png', 'Existing', 'Additional/Renewal', '1', 'apartment', 'kovil street', 'chetpet', '', '', '', '', '1', 15, '8', '200000', '', NULL, 1, 1, '2024-08-31 19:49:31', '2024-08-31'),
(36, '045566789999', 'Meena', '2', '1994-06-16', '30', '8597834512', '', '', NULL, '6699e94cc1bd2.jpg', '8', '6699e94cc22b7.jpg', 'Existing', 'Additional/Renewal', '1', 'Building', 'akkur', 'cheyyar', '', '', '', '', '1', 8, '2', '500000', 'Good', NULL, 1, 1, '2024-08-31 19:54:05', '2024-08-31'),
(37, '234156437665', 'Alisha', '2', '1985-09-12', '38', '7659023657', '7659023657', '7659023657', NULL, '66d5403c0454b.jpeg', '28', '66d5403c05039.jpg', 'New', '', '1', '1bhk', 'new street', 'vandavasi', '', '', '', '', '1', 1, '1', '300000', '', NULL, 1, 1, '2024-09-02 09:55:47', '2024-09-02'),
(38, '475896547989', 'Vijay', '1', '1985-02-21', '39', '8459214639', '', '', NULL, '66d54f2be8c39.png', '29', '66d54f2be915a.png', 'New', '', '1', '2 floor building', 'vandavasi', 'vsi', '', '', '', '', '1', 10, '6', '200000', '', NULL, 1, 1, '2024-09-02 11:05:21', '2024-09-02'),
(39, '367861903455', 'Dev', '1', '1991-09-23', '32', '9056728188', '9056728188', '9056728188', NULL, '66d57d69c2730.jpg', '30', '66d57d69c2d04.jpg', 'New', '', '1', 'house', 'chetpet', 'chetpet', '', '', '', '', '1', 15, '8', '100000', '', NULL, 1, 1, '2024-09-02 14:21:06', '2024-09-02'),
(40, '142365987899', 'priyanka', '2', '1990-02-21', '34', '7401236985', '', '', NULL, '66d58610261ae.png', '31', '66d58610266ac.png', 'New', '', '2', 'Rental house', 'akkur', 'cheyyar', '', '', '', '', '1', 8, '2', '300000', '', NULL, 1, 1, '2024-09-02 14:58:58', '2024-09-02'),
(41, '671297986425', 'Kamlesh', '1', '1989-05-04', '35', '9089076544', '', '9089076544', NULL, '66daa2caefcd0.jpeg', '32', '66daa2caf0295.jpg', 'New', '', '1', 'house', 'keshava street', 'Vandavasi', 'Engineer', '10 years', '150000', 'chennai', '1', 1, '1', '150000', '', NULL, 1, 1, '2024-09-06 12:00:50', '2024-09-06'),
(42, '879456456123', 'surya', '1', '1990-03-22', '34', '9874561230', '', '9874561230', NULL, '66d589e8b3c6c.png', '4', '6698bbbdf003a.jpg', 'Existing', 'Additional/Renewal', '1', 'gandhi rd', 'vandavasi', 'vsi', 'sipcot company', 'private ', '30000', 'CYR', '1', 2, '1', '100000', 'Responsible customer', NULL, 1, 1, '2024-09-09 12:47:19', '2024-09-09'),
(43, '233461412583', 'Prakash', '1', '1991-09-29', '32', '9098763901', '', '9098763901', NULL, '66dee5f9a4258.', '33', '66deeac4b68f1.jpeg', 'New', '', '2', 'Apartment', 'vandavasi', 'Cheyyar', '', '', '', '', '1', 3, '1', '150000', '', NULL, 1, 1, '2024-09-09 17:41:37', '2024-09-10'),
(44, '233461412583', 'Prakash', '1', '1991-09-29', '32', '9098763901', '', '9098763901', NULL, '66dee818388fe.', '33', '66dfc94880e77.jpg', 'Existing', '', '2', 'Apartment', 'Vandavasi', 'cheyyar', '', '', '', '', '1', 1, '1', '150000', '', 'too many loans', 1, 1, '2024-09-09 17:50:40', '2024-09-10'),
(45, '233461412583', 'Prakash', '1', '1991-09-29', '32', '9098763901', '', '9098763901', NULL, '66dee81f9f8a3.', '33', '66dfd4c34c5c9.', 'Existing', 'Additional', '1', '1bhk', 'vandavasi', 'Cheyyar', '', '', '', '', '1', 2, '1', '200000', '', NULL, 1, 1, '2024-09-09 17:50:47', '2024-09-10'),
(46, '233461412583', 'Prakash', '1', '1991-09-29', '32', '9098763901', '', '9098763901', NULL, '66dee840dca3f.', '33', '66dfcdd6c9263.jpeg', 'Existing', '', '1', 'house', 'vandavasi', 'Cheyyar', '', '', '', '', '1', 1, '1', '150000', '', NULL, 1, 1, '2024-09-09 17:51:20', '2024-09-10'),
(47, '233461412583', 'Prakash', '1', '1991-09-29', '32', '9098763901', '', '9098763901', NULL, '66dee85f3ce1e.', '33', '66dfd060792d8.', 'Existing', '', '2', 'Apartment', 'Vandavasi', 'Cheyyar', '', '', '', '', '1', 1, '1', '200000', '', 'loan exceeded', 1, 1, '2024-09-09 17:51:51', '2024-09-10'),
(48, '233461412583', 'Prakash', '1', '1991-09-29', '32', '9098763901', '', '9098763901', NULL, '66dee874e7f29.', '34', '66dfc7c1d0b22.jpg', 'Existing', '', '1', '2 floor building', 'Vandavasi', 'Cheyyar', '', '', '', '', '1', 1, '1', '200000', '', NULL, 1, 1, '2024-09-09 17:52:12', '2024-09-10'),
(49, '233461412583', 'Prakash', '1', '1991-09-29', '32', '9098763901', '', '9098763901', NULL, '66dee8acc5b54.', '33', '66dfc66c4f123.', 'Existing', '', '2', 'Apartment', 'vandavasi', 'cheyyar', '', '', '', '', '1', 1, '1', '150000', '', NULL, 1, 1, '2024-09-09 17:53:08', '2024-09-10'),
(50, '475896547989', 'Vijay', '1', '1985-02-21', '39', '8459214639', '', '', NULL, '66d54f2be8c39.png', '', '', 'Existing', 'Additional/Renewal', '', '', '', '', '', '', '', '', '', 0, '', '', '', NULL, 1, 0, '2024-09-10 12:01:31', NULL),
(51, '111122223333', 'Varun', '1', '1994-10-05', '29', '8889997777', '8855885585', '8889997777', NULL, '66dff767d85bb.jpg', '37', '66dff767d9016.jpg', 'New', '', '1', 'xxxxyyyy', 'xxxxyyyyy', 'xxxxxyyyy', 'Private', 'Supervisor', '25000', 'xxxxyyyyy', '1', 10, '6', '200000', 'sd', NULL, 1, 1, '2024-09-10 13:00:32', '2024-09-10'),
(52, '994248402222', 'akash', '1', '1988-06-18', '36', '8765432190', '', '', '', '6698f1eda56de.jpg', '7', '6698f1eda6298.jpg', 'Existing', 'Additional/Renewal', '1', '3 floor building', 'chetpet', 'chetpet', '', '', '', '', '1', 15, '8', '', 'good response', NULL, 1, 1, '2024-09-10 13:11:03', '2024-09-13'),
(53, '123412341236', 'Rani', '2', '1978-12-05', '45', '9955995555', '', '9955995555', NULL, '66dff9d15f3e4.jpg', '39', '66dff9d15f91f.jpg', 'New', '', '1', 'xxxxyyyy', 'xxxxyyyyy', 'xxxxxyyyy', '', '', '', '', '1', 10, '6', '50000', 'we', NULL, 1, 1, '2024-09-10 13:15:44', '2024-09-10'),
(54, '123412341236', 'Rani', '2', '1978-12-05', '45', '9955995555', '', '9955995555', NULL, '66dff9d15f3e4.jpg', '', '', 'Existing', 'Additional/Renewal', '', '', '', '', '', '', '', '', '', 0, '', '', '', NULL, 1, 0, '2024-09-10 13:23:51', NULL),
(55, '123412341236', 'Rani', '2', '1978-12-05', '45', '9955995555', '', '9955995555', NULL, '66dff9d15f3e4.jpg', '', '', 'Existing', 'Additional/Renewal', '', '', '', '', '', '', '', '', '', 0, '', '', '', NULL, 1, 0, '2024-09-10 13:27:41', NULL),
(56, '994248402222', 'akash', '1', '1988-06-18', '36', '8765432190', '', '', NULL, '66e29588afa39.png', '', '', 'Existing', 'Additional/Renewal', '', '', '', '', '', '', '', '', '', 0, '', '', '', NULL, 1, 0, '2024-09-12 12:47:28', NULL),
(57, '951203587633', 'Rudhra', '2', '0000-00-00', '', '9089070604', '', '', NULL, '66e2af5798cd4.png', '40', '66e2af5799220.png', 'New', '', '1', '2 floor building', 'cheyyar', 'cheyyar', '', '', '', '', '1', 20, '12', '200000', '', NULL, 1, 1, '2024-09-12 14:28:32', '2024-09-12'),
(58, '534534534534', 'Anu', '2', '0000-00-00', '', '8978978977', '', '7655557567', NULL, '66e2ca3e9cce8.jpg', '', '', 'New', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', NULL, 1, 0, '2024-09-12 16:32:22', NULL),
(60, '4545454545ghjg', 'kiran', '1', '0000-00-00', '', '7567767567', '', '7567767567', '', '66e2e1d69a620.jpg', '41', '66e2e1d69a958.jpg', 'New', '', '2', 'ghhfg', 'Puducherry', 'TamilNadu', '', '', '', '', '1', 2, '1', '', '', NULL, 1, 1, '2024-09-12 18:09:52', '2024-09-13'),
(61, '111111110000', 'Rahul', '1', '1991-01-31', '33', '9879865432', '6789654355', '', '', '6696251decf41.jpg', '3', '6696251ded52a.jpg', 'Existing', 'Renewal', '1', '2 floor building', 'no 25 , gandhi road , vandavasi', 'no 255/1 , kovil st, Ponnur', 'Medical Rep', 'Area Supervisor', '25000', 'Cipla Kanchipuram', '1', 2, '1', '100000', 'Well responsible', NULL, 1, 1, '2024-09-13 10:55:16', '2024-09-13'),
(62, '994248402222', 'akash', '1', '1988-06-18', '36', '8765432190', '', '8765432190', '', '66e29588afa39.png', '', '', 'Existing', 'Additional', '', '', '', '', '', '', '', '', '', 0, '', '', '', NULL, 1, 0, '2024-09-13 11:15:09', NULL),
(67, '67567567567567', 'Kalai', '1', '0000-00-00', '', '8978987987', '', '8978987987', '', '66e3ea2aa11e0.jpg', '42', '66e3ea2aa2a24.jpg', 'New', '', '2', '879789', 'Puducherry', 'TamilNadu', '', '', '', '', '1', 6, '1', '', '', NULL, 1, 1, '2024-09-13 12:59:37', '2024-09-17'),
(70, '546564565', 'Madhu', '2', '0000-00-00', '', '7687687687', '', '7687687687', '', '66e3ee833fd59.jpg', '43', '66e3ee834004d.jpg', 'New', '', '1', 'Residential Details', 'Puducherry', 'TamilNadu', '', '', '', '', '1', 1, '1', '6675690', '', NULL, 1, 1, '2024-09-13 13:09:37', '2024-09-16'),
(74, '23452354534545', 'Magi', '2', '0000-00-00', '', '7675676745', '', '7675676745', '', '66e7b45522820.jpg', '44', '', 'New', '', '1', 'Residential Details', 'Puducherry', 'TamilNadu', '', '', '', '', '1', 2, '1', '78900', '', NULL, 1, 1, '2024-09-16 09:59:00', '2024-09-16'),
(75, '6565456456456', 'Madhavan', '1', '0000-00-00', '', '6786787878', '', '6786787878', '', '66e80192eb0ef.jpg', '', '', 'New', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', NULL, 1, 0, '2024-09-16 15:29:46', NULL),
(76, '54654654656', 'Nisha', '2', '0000-00-00', '', '6767868786', '', '6767868786', '', '66e802835a614.jpg', '45', '', 'New', '', '1', 'Residential Details', 'Puducherry', 'TamilNadu', '', '', '', '', '1', 2, '1', '100000', '', NULL, 1, 1, '2024-09-16 15:31:26', '2024-09-17'),
(77, '446677889097', 'Kannan', '2', '2001-12-08', '54', '9876512342', '', '9876512342', '', '', '15', '', 'Existing', 'Additional', '2', 'Pondy', 'Pondy', 'Tamilnadu', '', '', '', '', '1', 6, '1', '890000', 'good', NULL, 1, 1, '2024-07-11 00:00:00', '2024-09-17'),
(79, '994248402222', 'Kannan', '2', '2001-12-08', '54', '9876512342', '', NULL, NULL, '', '7', '', 'Existing', 'Additional', '2', 'Pondy', 'Pondy', 'Tamilnadu', '', '', '', '', '1', 6, '1', '890000', 'good', NULL, 1, 0, '2024-07-11 00:00:00', '2024-07-11');

-- --------------------------------------------------------

--
-- Table structure for table `customer_status`
--

CREATE TABLE `customer_status` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_profile_id` int(11) NOT NULL,
  `loan_calculation_id` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `sub_status` int(11) DEFAULT NULL,
  `closed_date` date DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date NOT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_status`
--

INSERT INTO `customer_status` (`id`, `cus_id`, `cus_profile_id`, `loan_calculation_id`, `status`, `sub_status`, `closed_date`, `remark`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '111111110000', 1, 1, 11, 1, '2024-07-19', 'Re', 3, 1, '2024-07-16', '2024-07-19'),
(2, '879456456123', 2, 2, 11, 1, '2024-07-18', '', 1, 1, '2024-07-18', '2024-07-20'),
(3, '879456456123', 3, 3, 5, NULL, NULL, NULL, 1, 1, '2024-07-18', '2024-07-18'),
(4, '879456456123', 4, 4, 6, NULL, NULL, NULL, 1, 5, '2024-07-18', '2024-07-18'),
(5, '879456456123', 5, 5, 5, NULL, NULL, NULL, 1, 1, '2024-07-18', '2024-07-18'),
(6, '123456789012', 6, 6, 12, 1, '2024-07-19', 'good customer', 1, 1, '2024-07-18', '2024-09-06'),
(7, '994248402222', 7, 7, 8, NULL, NULL, NULL, 1, 1, '2024-07-18', '2024-09-06'),
(8, '994248402222', 8, 11, 7, NULL, NULL, NULL, 1, 1, '2024-07-18', '2024-07-19'),
(9, '045566789999', 9, 8, 7, NULL, NULL, NULL, 1, 1, '2024-07-19', '2024-07-19'),
(10, '456789092384', 10, 9, 7, NULL, NULL, NULL, 1, 1, '2024-07-19', '2024-07-19'),
(11, '345609871234', 11, 10, 9, 1, '2024-09-09', 'good customer \n', 1, 1, '2024-07-19', '2024-09-09'),
(12, '123456789012', 12, 12, 4, NULL, NULL, NULL, 1, 1, '2024-07-19', '2024-07-19'),
(13, '012346758906', 13, 13, 6, NULL, NULL, NULL, 1, 1, '2024-07-19', '2024-08-29'),
(14, '213574689023', 14, 14, 7, NULL, NULL, NULL, 1, 1, '2024-07-19', '2024-09-09'),
(15, '446677889097', 15, 16, 10, 1, '2024-08-22', 'ok', 1, 1, '2024-07-19', '2024-08-22'),
(16, '224489088111', 16, 17, 2, NULL, NULL, NULL, 5, 5, '2024-07-20', '2024-07-20'),
(17, '111111111111', 17, 18, 7, NULL, NULL, NULL, 1, 1, '2024-07-20', '2024-07-20'),
(18, '100010001000', 18, 19, 7, NULL, NULL, NULL, 1, 1, '2024-08-01', '2024-08-01'),
(19, '446677889097', 19, 20, 7, NULL, NULL, NULL, 1, 1, '2024-08-22', '2024-08-31'),
(20, '123415671890', 20, 21, 5, NULL, NULL, NULL, 1, 1, '2024-08-29', '2024-08-29'),
(21, '434351516776', 21, 22, 11, 1, '2024-08-29', 'good', 1, 1, '2024-08-29', '2024-08-29'),
(22, '878712126789', 22, 23, 6, NULL, NULL, NULL, 1, 1, '2024-08-29', '2024-08-29'),
(23, '765423129850', 23, 24, 7, NULL, NULL, NULL, 1, 1, '2024-08-29', '2024-08-29'),
(24, '123415671890', 24, 25, 7, NULL, NULL, NULL, 1, 1, '2024-08-29', '2024-09-09'),
(25, '878712126789', 25, 28, 5, NULL, NULL, NULL, 1, 1, '2024-08-29', '2024-08-30'),
(26, '012346758906', 26, 37, 4, NULL, NULL, NULL, 1, 1, '2024-08-29', '2024-09-09'),
(27, '765423129850', 27, 26, 7, NULL, NULL, NULL, 1, 1, '2024-08-30', '2024-08-30'),
(28, '100010001000', 28, 27, 7, NULL, NULL, NULL, 1, 1, '2024-08-30', '2024-08-30'),
(29, '123456789122', 29, 29, 7, NULL, NULL, NULL, 1, 1, '2024-08-31', '2024-08-31'),
(30, '879456456123', 30, 30, 7, NULL, NULL, NULL, 1, 1, '2024-08-31', '2024-08-31'),
(31, '224489088111', 31, 31, 7, NULL, NULL, NULL, 1, 1, '2024-08-31', '2024-08-31'),
(32, '415236699752', 32, 32, 7, NULL, NULL, NULL, 1, 1, '2024-08-31', '2024-08-31'),
(33, '841256397000', 33, 33, 7, NULL, NULL, NULL, 1, 1, '2024-08-31', '2024-08-31'),
(34, '753214896025', 34, 34, 7, NULL, NULL, NULL, 1, 1, '2024-08-31', '2024-08-31'),
(35, '878712126789', 35, 35, 7, NULL, NULL, NULL, 1, 1, '2024-08-31', '2024-08-31'),
(36, '045566789999', 36, 36, 7, NULL, NULL, NULL, 1, 1, '2024-08-31', '2024-08-31'),
(37, '234156437665', 37, 38, 7, NULL, NULL, NULL, 1, 1, '2024-09-02', '2024-09-02'),
(38, '475896547989', 38, 39, 7, NULL, NULL, NULL, 1, 1, '2024-09-02', '2024-09-02'),
(39, '367861903455', 39, 40, 7, NULL, NULL, NULL, 1, 1, '2024-09-02', '2024-09-05'),
(40, '142365987899', 40, 41, 10, 1, '2024-09-09', 'good', 1, 1, '2024-09-02', '2024-09-09'),
(41, '671297986425', 41, 42, 7, NULL, NULL, NULL, 1, 1, '2024-09-06', '2024-09-06'),
(42, '879456456123', 42, 43, 3, NULL, NULL, NULL, 1, 1, '2024-09-09', '2024-09-10'),
(43, '233461412583', 43, 44, 7, NULL, NULL, NULL, 1, 1, '2024-09-09', '2024-09-10'),
(44, '233461412583', 44, 47, 6, NULL, NULL, NULL, 1, 1, '2024-09-09', '2024-09-10'),
(45, '233461412583', 45, 50, 7, NULL, NULL, NULL, 1, 1, '2024-09-09', '2024-09-10'),
(46, '233461412583', 46, 48, 7, NULL, NULL, NULL, 1, 1, '2024-09-09', '2024-09-10'),
(47, '233461412583', 47, 49, 5, NULL, NULL, NULL, 1, 1, '2024-09-09', '2024-09-10'),
(48, '233461412583', 48, 46, 7, NULL, NULL, NULL, 1, 1, '2024-09-09', '2024-09-10'),
(49, '233461412583', 49, 45, 7, NULL, NULL, NULL, 1, 1, '2024-09-09', '2024-09-10'),
(50, '475896547989', 50, NULL, 1, NULL, NULL, NULL, 1, NULL, '2024-09-10', NULL),
(51, '111122223333', 51, 51, 3, NULL, NULL, NULL, 1, 1, '2024-09-10', '2024-09-10'),
(52, '994248402222', 52, 52, 1, NULL, NULL, NULL, 1, 1, '2024-09-10', '2024-09-13'),
(53, '123412341236', 53, 53, 7, NULL, NULL, NULL, 1, 1, '2024-09-10', '2024-09-10'),
(54, '123412341236', 54, NULL, 1, NULL, NULL, NULL, 1, NULL, '2024-09-10', NULL),
(55, '123412341236', 55, NULL, 1, NULL, NULL, NULL, 1, NULL, '2024-09-10', NULL),
(56, '994248402222', 56, NULL, 1, NULL, NULL, NULL, 1, NULL, '2024-09-12', NULL),
(57, '951203587633', 57, 54, 7, NULL, NULL, NULL, 1, 1, '2024-09-12', '2024-09-12'),
(58, '534534534534', 58, NULL, 1, NULL, NULL, NULL, 1, NULL, '2024-09-12', NULL),
(60, '4545454545ghjg', 60, 55, 3, NULL, NULL, NULL, 1, 1, '2024-09-12', '2024-09-13'),
(61, '111111110000', 61, NULL, 1, NULL, NULL, NULL, 1, 1, '2024-09-13', '2024-09-13'),
(62, '994248402222', 62, NULL, 0, NULL, NULL, NULL, 1, NULL, '2024-09-13', NULL),
(67, '67567567567567', 67, 57, 2, NULL, NULL, NULL, 1, 1, '2024-09-13', '2024-09-13'),
(70, '546564565', 70, 56, 3, NULL, NULL, NULL, 1, 1, '2024-09-13', '2024-09-13'),
(74, '23452354534545', 74, 59, 3, NULL, NULL, NULL, 1, 1, '2024-09-16', '2024-09-16'),
(75, '6565456456456', 75, NULL, 0, NULL, NULL, NULL, 1, NULL, '2024-09-16', NULL),
(76, '54654654656', 76, 58, 3, NULL, NULL, NULL, 1, 1, '2024-09-16', '2024-09-16'),
(77, '446677889097', 77, 60, 7, NULL, NULL, NULL, 0, 1, '0000-00-00', '2024-09-16'),
(79, '994248402222', 79, 61, 7, NULL, NULL, NULL, 0, 1, '0000-00-00', '2024-09-17');

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
  `id` int(11) NOT NULL,
  `designation` varchar(150) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`id`, `designation`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'Manager', 1, NULL, '2024-07-16', NULL),
(2, 'Executive', 1, NULL, '2024-07-16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

CREATE TABLE `districts` (
  `id` int(11) NOT NULL,
  `state_id` int(11) NOT NULL,
  `district_name` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `districts`
--

INSERT INTO `districts` (`id`, `state_id`, `district_name`, `status`) VALUES
(1, 1, 'Ariyalur', 1),
(2, 1, 'Chennai', 1),
(3, 1, 'Chengalpattu', 1),
(4, 1, 'Coimbatore', 1),
(5, 1, 'Cuddalore', 1),
(6, 1, 'Dharmapuri', 1),
(7, 1, 'Dindigul', 1),
(8, 1, 'Erode', 1),
(9, 1, 'Kallakurichi', 1),
(10, 1, 'Kancheepuram', 1),
(11, 1, 'Kanniyakumari', 1),
(12, 1, 'Karur', 1),
(13, 1, 'Krishnagiri', 1),
(14, 1, 'Madurai', 1),
(15, 1, 'Mayiladuthurai', 1),
(16, 1, 'Nagapattinam', 1),
(17, 1, 'Namakkal', 1),
(18, 1, 'Nilgiris', 1),
(19, 1, 'Perambalur', 1),
(20, 1, 'Pudukkottai', 1),
(21, 1, 'Ramanathapuram', 1),
(22, 1, 'Ranipet', 1),
(23, 1, 'Salem', 1),
(24, 1, 'Sivaganga', 1),
(25, 1, 'Tenkasi', 1),
(26, 1, 'Thanjavur', 1),
(27, 1, 'Theni', 1),
(28, 1, 'Thoothukudi', 1),
(29, 1, 'Tiruchirappalli', 1),
(30, 1, 'Tirunelveli', 1),
(31, 1, 'Tiruppur', 1),
(32, 1, 'Tirupathur', 1),
(33, 1, 'Tiruvallur', 1),
(34, 1, 'Tiruvannamalai', 1),
(35, 1, 'Tiruvarur', 1),
(36, 1, 'Vellore', 1),
(37, 1, 'Viluppuram', 1),
(38, 1, 'Virudhunagar', 1),
(39, 2, 'Puducherry', 1);

-- --------------------------------------------------------

--
-- Table structure for table `document_info`
--

CREATE TABLE `document_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_profile_id` int(11) NOT NULL,
  `doc_name` varchar(150) NOT NULL,
  `doc_type` int(11) NOT NULL,
  `holder_name` int(11) NOT NULL,
  `relationship` varchar(50) NOT NULL,
  `upload` varchar(100) NOT NULL,
  `noc_status` int(11) NOT NULL DEFAULT 0,
  `date_of_noc` date DEFAULT NULL,
  `noc_member` varchar(150) DEFAULT NULL,
  `noc_relationship` varchar(150) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document_info`
--

INSERT INTO `document_info` (`id`, `cus_id`, `cus_profile_id`, `doc_name`, `doc_type`, `holder_name`, `relationship`, `upload`, `noc_status`, `date_of_noc`, `noc_member`, `noc_relationship`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '111111110000', 1, 'Agri Land', 1, 1, 'Father', '66962847c9c29.jpg', 1, '2024-07-19', '1', 'Father', 2, 1, '2024-07-16', '2024-07-19'),
(2, '123456789012', 6, 'smart card', 1, 6, 'Mother', '6698fe1349c3b.jpg', 1, '2024-07-19', 'Ramesh', 'Customer', 5, 1, '2024-07-18', '2024-07-19'),
(3, '123456789012', 12, 'House document', 1, 6, 'Mother', '669a3fdcd69ab.jpeg', 0, NULL, NULL, NULL, 1, NULL, '2024-07-19', NULL),
(4, '446677889097', 15, 'Bike Rc book', 1, 15, 'Father', '669a5526823f1.png', 0, NULL, NULL, NULL, 1, NULL, '2024-07-19', NULL),
(5, '879456456123', 3, 'Bike RC', 1, 5, 'Father', '669b414b218ac.jpg', 0, NULL, NULL, NULL, 1, NULL, '2024-07-20', NULL),
(6, '123456789122', 29, 'land document', 2, 24, 'Father', '', 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(7, '879456456123', 30, 'Land document', 2, 5, 'Father', '', 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(8, '224489088111', 31, 'House doc', 1, 16, 'Father', '', 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(9, '415236699752', 32, 'House doc', 1, 25, 'Father', '', 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(10, '841256397000', 33, 'land doc', 1, 26, 'Brother', '', 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(11, '142365987899', 40, 'Salary slip', 1, 31, 'Spouse', '', 0, NULL, NULL, NULL, 1, NULL, '2024-09-02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `document_need`
--

CREATE TABLE `document_need` (
  `id` int(11) NOT NULL,
  `cus_profile_id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `document_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document_need`
--

INSERT INTO `document_need` (`id`, `cus_profile_id`, `cus_id`, `document_name`) VALUES
(1, 1, '1111 1111 0000', 'Cheque - Rahul -2'),
(2, 1, '1111 1111 0000', 'House original document  or Agri land original document'),
(3, 2, '879456456123', 'adhar'),
(4, 0, '879456456123', 'ADHAR'),
(5, 3, '879456456123', 'ADHAR'),
(6, 4, '879456456123', 'adhar'),
(7, 5, '879456456123', 'adhar'),
(8, 5, '879456456123', 'smart card'),
(9, 5, '879456456123', 'check slip'),
(10, 5, '879456456123', 'eb bill'),
(11, 5, '879456456123', 'photo'),
(12, 6, '123456789012', 'adhar'),
(13, 6, '123456789012', 'smart card'),
(14, 6, '123456789012', 'eb bill'),
(15, 6, '123456789012', 'photo'),
(16, 6, '123456789012', 'check slip'),
(17, 6, '123456789012', 'salary slip/ work id'),
(18, 7, '9942 4840 2222', 'adhar'),
(19, 9, '0455 6678 9999', 'Adhar'),
(20, 10, '4567 8909 2384', 'work id'),
(21, 11, '3456 0987 1234', 'Adhar'),
(22, 11, '3456 0987 1234', 'check slip'),
(23, 8, '994248402222', 'Adhar'),
(24, 8, '994248402222', 'smart card'),
(25, 8, '994248402222', 'check'),
(26, 12, '123456789012', 'check slip'),
(27, 12, '123456789012', 'original document of house'),
(28, 13, '012346758906', 'Check slip 2'),
(29, 13, '012346758906', 'agri land document'),
(30, 14, '213574689023', 'original documents for land'),
(31, 14, '213574689023', 'Adhar card xerox'),
(32, 14, '213574689023', 'Check slip 2'),
(33, 15, '4466 7788 9097', 'Adhar card'),
(34, 15, '4466 7788 9097', 'Salary slip'),
(35, 15, '4466 7788 9097', 'check slip'),
(36, 16, '2244 8908 8111', 'Document of house'),
(37, 16, '2244 8908 8111', 'check slip'),
(38, 17, '1111 1111 1111', 'Aadhar '),
(39, 18, '1000 1000 1000', 'Aadhaar'),
(41, 19, '446677889097', 'kyc'),
(42, 20, '123415671890', 'proof'),
(43, 21, '4343 5151 6776', 'adhaar'),
(44, 22, '8787 1212 6789', 'bank'),
(45, 23, '765423129850', 'cheque'),
(46, 24, '123415671890', 'aadhar'),
(47, 27, '765423129850', 'cheque'),
(48, 28, '100010001000', 'Adhaar'),
(49, 25, '878712126789', 'salary slip'),
(50, 29, '123456789122', 'Adhar copy'),
(51, 29, '123456789122', 'Photo'),
(52, 29, '123456789122', 'EB bill'),
(53, 29, '123456789122', 'Cheque slip 2'),
(54, 30, '879456456123', 'Adhar card copy'),
(55, 30, '879456456123', 'Photo'),
(56, 30, '879456456123', 'Land document'),
(57, 30, '879456456123', 'Check slip'),
(58, 31, '224489088111', 'House doc'),
(59, 31, '224489088111', 'Check leaf'),
(60, 32, '4152 3669 9752', 'Check slip'),
(61, 32, '4152 3669 9752', 'House doc'),
(62, 33, '841256397000', 'land doc'),
(63, 34, '7532 1489 6025', 'cheque'),
(64, 35, '878712126789', 'Adhar'),
(65, 35, '878712126789', 'check'),
(66, 36, '045566789999', 'house doc'),
(67, 26, '012346758906', 'aadhar'),
(68, 37, '2341 5643 7665', 'payslip'),
(70, 38, '4758 9654 7989', 'Check slip'),
(71, 39, '367861903455', 'aadhar'),
(72, 40, '1423 6598 7899', 'salary slip'),
(73, 40, '1423 6598 7899', 'check'),
(74, 41, '671297986425', 'payslip'),
(75, 42, '879456456123', 'payslip'),
(76, 43, '233461412583', 'aadhar'),
(77, 49, '233461412583', 'Aadhar'),
(78, 48, '233461412583', 'payslip'),
(79, 44, '233461412583', 'Originals'),
(80, 46, '233461412583', 'xerox'),
(81, 47, '233461412583', 'aadhar'),
(82, 45, '233461412583', 'origials'),
(83, 51, '1111 2222 3333', 'Home Doc'),
(84, 52, '994248402222', 'home'),
(85, 53, '1234 1234 1236', 'Home'),
(86, 57, '9512 0358 7633', 'Cheque slip'),
(87, 57, '9512 0358 7633', 'EB bill'),
(89, 70, '546564565', 'Aadhar Card');

-- --------------------------------------------------------

--
-- Table structure for table `endorsement_info`
--

CREATE TABLE `endorsement_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_profile_id` int(11) NOT NULL,
  `owner_name` int(11) NOT NULL,
  `relationship` varchar(50) NOT NULL,
  `vehicle_details` varchar(255) NOT NULL,
  `endorsement_name` varchar(250) NOT NULL,
  `key_original` varchar(50) NOT NULL,
  `rc_original` varchar(50) NOT NULL,
  `upload` varchar(255) NOT NULL,
  `noc_status` int(11) NOT NULL DEFAULT 0,
  `date_of_noc` date DEFAULT NULL,
  `noc_member` varchar(150) DEFAULT NULL,
  `noc_relationship` varchar(150) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) NOT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `endorsement_info`
--

INSERT INTO `endorsement_info` (`id`, `cus_id`, `cus_profile_id`, `owner_name`, `relationship`, `vehicle_details`, `endorsement_name`, `key_original`, `rc_original`, `upload`, `noc_status`, `date_of_noc`, `noc_member`, `noc_relationship`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '345609871234', 11, 10, 'Other', 'pulsar NS\r\nTN 25 Y4356', 'bike', 'NO', 'NO', '', 0, NULL, NULL, NULL, 1, 0, '2024-07-19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `existing_customer`
--

CREATE TABLE `existing_customer` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_name` varchar(100) NOT NULL,
  `area` varchar(100) NOT NULL,
  `mobile1` varchar(100) NOT NULL,
  `linename` varchar(100) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `c_sts` varchar(100) NOT NULL,
  `c_substs` varchar(100) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `existing_customer`
--

INSERT INTO `existing_customer` (`id`, `cus_id`, `cus_name`, `area`, `mobile1`, `linename`, `branch_name`, `c_sts`, `c_substs`, `insert_login_id`, `created_on`) VALUES
(1, '111111110000', 'Rahul', 'Vsi - Gandhi road', '9879865432', 'linename', 'Vandavasi', '11', '1', 0, '2024-07-19 12:15:41'),
(2, '446677889097', 'Ashok', 'Mummuni', '8709565433', 'linename', 'Vandavasi', '9', '1', 0, '2024-08-22 18:47:21'),
(3, '434351516776', 'Priya', 'Vsi - Gandhi road', '9123452345', 'linename', 'Vandavasi', '11', '1', 0, '2024-08-30 18:45:36');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `coll_mode` int(11) NOT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `invoice_id` varchar(100) NOT NULL,
  `branch` int(11) NOT NULL,
  `expenses_category` varchar(50) NOT NULL,
  `agent_id` varchar(50) DEFAULT NULL,
  `total_issued` varchar(50) DEFAULT NULL,
  `total_amount` varchar(100) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `amount` varchar(150) NOT NULL,
  `trans_id` varchar(150) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `coll_mode`, `bank_id`, `invoice_id`, `branch`, `expenses_category`, `agent_id`, `total_issued`, `total_amount`, `description`, `amount`, `trans_id`, `insert_login_id`, `created_on`) VALUES
(1, 1, 0, '2407001', 1, '6', '', '', '', 'lunch', '1000', '434566', 1, '2024-07-18 17:52:23'),
(2, 1, 0, '2407002', 1, '11', '', '', '', 'Manager', '10000', '123', 1, '2024-07-19 12:06:41'),
(3, 1, 0, '2407003', 1, '6', '', '', '', 'Treat', '5000', '254141', 1, '2024-07-20 17:54:47'),
(4, 1, 0, '2407004', 1, '1', '', '', '', 'tasgdgaf', '8400', '', 1, '2024-08-01 13:43:47'),
(6, 1, 0, '2407005', 1, '4', '', '', '', 'notes', '400', '', 1, '2024-08-30 14:29:08'),
(7, 2, 1, '2407006', 4, '3', '', '', '', 'office vehicle', '1000', '13235465467', 1, '2024-08-30 18:07:45');

-- --------------------------------------------------------

--
-- Table structure for table `family_info`
--

CREATE TABLE `family_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `fam_name` varchar(100) NOT NULL,
  `fam_relationship` varchar(100) NOT NULL,
  `fam_age` varchar(100) NOT NULL,
  `fam_live` varchar(100) NOT NULL,
  `fam_occupation` varchar(100) NOT NULL,
  `fam_aadhar` varchar(100) NOT NULL,
  `fam_mobile` varchar(100) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) NOT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `family_info`
--

INSERT INTO `family_info` (`id`, `cus_id`, `fam_name`, `fam_relationship`, `fam_age`, `fam_live`, `fam_occupation`, `fam_aadhar`, `fam_mobile`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '111111110000', 'Siva', 'Father', '63', '1', 'Farmer', '111111110001', '7788998877', 3, 0, '2024-07-16', NULL),
(2, '111111110000', 'Veni', 'Mother', '51', '1', 'House wife', '111111110002', '9877545678', 3, 0, '2024-07-16', NULL),
(3, '111111110000', 'Sathya', 'Spouse', '26', '1', 'Teacher', '111111110003', '7708009882', 3, 0, '2024-07-16', NULL),
(4, '879456456123', 'arun', 'Brother', '', '1', '', '123456789456', '6549871230', 1, 0, '2024-07-18', NULL),
(5, '879456456123', 'anand', 'Father', '56', '1', '', '879456456123', '7890123456', 1, 0, '2024-07-18', NULL),
(6, '123456789012', 'anitha', 'Mother', '', '1', '', '567890123456', '7890654321', 1, 0, '2024-07-18', NULL),
(7, '994248402222', 'geetha', 'Spouse', '', '1', '', '456789123456', '7658992455', 1, 0, '2024-07-18', NULL),
(8, '045566789999', 'prasath', 'Spouse', '32', '1', '', '345690871223', '7123098713', 1, 0, '2024-07-19', NULL),
(9, '456789092384', 'Devi', 'Mother', '', '1', '', '900000005677', '8765309122', 1, 0, '2024-07-19', NULL),
(10, '345609871234', 'selvam', 'Other', '', '1', '', '667788559900', '08899770066', 1, 0, '2024-07-19', NULL),
(11, '123456789012', 'swetha', 'Spouse', '', '1', '', '389393939393', '8234323487', 1, 0, '2024-07-19', NULL),
(12, '012346758906', 'Mohan', 'Father', '', '1', '', '098765433210', '08181929273', 1, 0, '2024-07-19', NULL),
(13, '012346758906', 'suseela', 'Spouse', '', '1', '', '879065780940', '6877990731', 1, 0, '2024-07-19', NULL),
(14, '213574689023', 'priya', 'Sister', '', '1', '', '123456789098', '6432157890', 1, 0, '2024-07-19', NULL),
(15, '446677889097', 'Madhan', 'Father', '49', '1', 'farmer', '222345678902', '9876543221', 1, 1, '2024-07-19', '2024-07-19'),
(16, '224489088111', 'Kumar', 'Father', '55', '2', '', '334422889991', '9942499012', 5, 0, '2024-07-20', NULL),
(17, '224489088111', 'Babu', 'Brother', '34', '1', 'business', '567788994433', '6677889955', 5, 5, '2024-07-20', '2024-07-20'),
(18, '111111111111', 'priya', 'Sister', '28', '1', 'Salaried ', '111111111111', '8123010290', 1, 0, '2024-07-20', NULL),
(19, '100010001000', 'Raghul', 'Brother', '24', '1', 'Job', '741001444124', '6363545444', 1, 0, '2024-08-01', NULL),
(20, '123415671890', 'Raj', 'Father', '58', '2', 'driver', '987643251657', '9876556789', 1, 1, '2024-08-29', '2024-08-29'),
(21, '434351516776', 'murugan', 'Brother', '45', '1', 'Teacher', '543276891543', '9123452345', 1, 0, '2024-08-29', NULL),
(22, '878712126789', 'selvi', 'Spouse', '35', '1', 'Homemaker', '321456734390', '7534567800', 1, 0, '2024-08-29', NULL),
(23, '765423129850', 'Srinivas', 'Father', '55', '1', 'Business man', '123874357913', '8765433210', 1, 0, '2024-08-29', NULL),
(24, '123456789122', 'Hari', 'Father', '', '1', '', '778945699771', '7745896213', 1, 0, '2024-08-31', NULL),
(25, '415236699752', 'Narayanan', 'Father', '', '1', '', '741582366666', '6010120144', 1, 0, '2024-08-31', NULL),
(26, '841256397000', 'Xaviour', 'Brother', '', '1', '', '701230450598', '6214788555', 1, 0, '2024-08-31', NULL),
(27, '753214896025', 'Bhoopal', 'Father', '', '1', '', '841236597000', '6012354569', 1, 0, '2024-08-31', NULL),
(28, '234156437665', 'ali', 'Spouse', '45', '2', '', '126834338888', '7659023657', 1, 0, '2024-09-02', NULL),
(29, '475896547989', 'Rajendar', 'Father', '', '1', '', '152364799654', '6987451258', 1, 0, '2024-09-02', NULL),
(30, '367861903455', 'Tarun', 'Brother', '38', '1', 'Business', '367861903455', '8978646248', 1, 0, '2024-09-02', NULL),
(31, '142365987899', 'Arun', 'Spouse', '', '1', '', '562143987569', '6501234795', 1, 0, '2024-09-02', NULL),
(32, '671297986425', 'Revathy', 'Spouse', '33', '1', 'Private job', '452381652423', '9089076544', 1, 0, '2024-09-06', NULL),
(33, '233461412583', 'Neela', 'Spouse', '28', '1', 'tailor', '233461412583', '09098763901', 1, 0, '2024-09-09', NULL),
(34, '233461412583', 'Sundar', 'Father', '57', '1', 'Retired', '242416433745', '8906548433', 1, 0, '2024-09-10', NULL),
(35, '111122223333', 'Raja', 'Father', '55', '1', 'Mechanic', '123412341235', '9955995599', 1, 0, '2024-09-10', NULL),
(36, '111122223333', 'Rani', 'Mother', '45', '1', 'House wife', '123412341236', '9955995559', 1, 0, '2024-09-10', NULL),
(37, '111122223333', 'Vithiya', 'Spouse', '24', '1', 'House wife', '123412341237', '8888888888', 1, 0, '2024-09-10', NULL),
(38, '123412341236', 'Varun', 'Son', '29', '1', 'Supervisor', '123412341234', '9995595959', 1, 0, '2024-09-10', NULL),
(39, '123412341236', 'Raja', 'Spouse', '55', '1', 'Mechanic', '123412341235', '9898989898', 1, 0, '2024-09-10', NULL),
(40, '951203587633', 'Renuga', 'Mother', '', '1', '', '145236999874', '9089070604', 1, 0, '2024-09-12', NULL),
(41, '4545454545ghjg', 'Kavitha', 'Spouse', '45', '1', '', '546456456456', '7856456457', 1, 0, '2024-09-12', NULL),
(42, '67567567567567', 'thiru', 'Father', '', '1', '', '896786756757', '8798797897', 1, 1, '2024-09-13', '2024-09-17'),
(43, '546564565', 'keerthana', 'Mother', '67', '1', '', '678967867867', '8907898987', 1, 0, '2024-09-13', NULL),
(44, '23452354534545', 'Logi', 'Mother', '', '1', '', '675463453454', '7665767567', 1, 0, '2024-09-16', NULL),
(45, '54654654656', 'Mani', 'Father', '', '1', '', '675676767677', '8968678678', 1, 0, '2024-09-16', NULL),
(46, '534534534534', 'Latha', 'Mother', '', '1', '', '342342342342', '8753452354', 1, 0, '2024-09-16', NULL),
(47, '446677889097', 'jai', 'Father', '76', '1', 'Doctor', '890989089096', '8798798798', 1, 0, '2024-07-11', '2024-07-11'),
(48, '994248402222', 'jai', 'Father', '76', '1', 'Doctor', '890989089096', '8798798798', 1, 0, '2024-07-11', '2024-07-11'),
(49, '67567567567567', 'jina', 'Son', '', '1', '', '875634523424', '7867865674', 1, 0, '2024-09-17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `feedback_info`
--

CREATE TABLE `feedback_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_profile_id` varchar(100) NOT NULL,
  `feed_label` varchar(100) NOT NULL,
  `feedback` varchar(100) NOT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) NOT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback_info`
--

INSERT INTO `feedback_info` (`id`, `cus_id`, `cus_profile_id`, `feed_label`, `feedback`, `remark`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(2, '67567567567567', '67', 'fghh', '4', 'fghfg', 1, 1, '2024-09-17', '2024-09-17'),
(3, '67567567567567', '67', 'bacjk', '2', 'jkkjkj', 1, 1, '2024-09-17', '2024-09-17'),
(4, '111111110000', '61', 'entr', '3', '', 1, 0, '2024-09-17', NULL),
(6, '67567567567567', '67', 'gj', '4', 'gfhgdfgdf', 1, 1, '2024-09-17', '2024-09-17'),
(8, '54654654656', '76', 'sdf', '3', 'jghj', 1, 1, '2024-09-17', '2024-09-17'),
(10, '67567567567567', '67', 'fgd', '4', 'gffdg', 1, 0, '2024-09-17', NULL),
(13, '54654654656', '76', 'dfs', '5', 'fgd', 1, 1, '2024-09-17', '2024-09-17');

-- --------------------------------------------------------

--
-- Table structure for table `gold_info`
--

CREATE TABLE `gold_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_profile_id` int(11) NOT NULL,
  `gold_type` varchar(150) NOT NULL,
  `purity` varchar(150) NOT NULL,
  `weight` varchar(150) NOT NULL,
  `value` varchar(150) NOT NULL,
  `noc_status` int(11) NOT NULL DEFAULT 0,
  `date_of_noc` date DEFAULT NULL,
  `noc_member` varchar(150) DEFAULT NULL,
  `noc_relationship` varchar(150) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gold_info`
--

INSERT INTO `gold_info` (`id`, `cus_id`, `cus_profile_id`, `gold_type`, `purity`, `weight`, `value`, `noc_status`, `date_of_noc`, `noc_member`, `noc_relationship`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '123456789012', 6, 'jwels', '24 carot', '5', '250000', 1, '2024-07-19', 'Ramesh', 'Customer', 5, 1, '2024-07-18', '2024-07-19'),
(2, '841256397000', 33, 'Jwels', '916', '16', '90000', 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL),
(3, '012346758906', 26, 'Chain', '916', '22', '300000', 0, NULL, NULL, NULL, 1, NULL, '2024-09-17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kyc_info`
--

CREATE TABLE `kyc_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_profile_id` varchar(255) NOT NULL,
  `proof_of` varchar(100) NOT NULL,
  `fam_mem` int(11) DEFAULT NULL,
  `proof` int(11) NOT NULL,
  `proof_detail` varchar(100) NOT NULL,
  `upload` varchar(100) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) NOT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kyc_info`
--

INSERT INTO `kyc_info` (`id`, `cus_id`, `cus_profile_id`, `proof_of`, `fam_mem`, `proof`, `proof_detail`, `upload`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '111111110000', '1', '1', NULL, 1, '111111110000', '669624c885bb8.jpg', 3, 0, '2024-07-16', NULL),
(2, '111111110000', '1', '2', 1, 1, '111111110001', '669624e0f0b03.jpg', 3, 0, '2024-07-16', NULL),
(3, '111111110000', '1', '2', 3, 1, '111111110003', '669624f5413b7.jpg', 3, 0, '2024-07-16', NULL),
(4, '111111110000', '1', '1', NULL, 3, 'Mar 24', '66962507e4326.png', 3, 0, '2024-07-16', NULL),
(5, '879456456123', '2', '1', NULL, 1, '789456123698', '', 1, 0, '2024-07-18', NULL),
(6, '879456456123', '3', '2', 4, 1, '123456789987', '', 1, 0, '2024-07-18', NULL),
(7, '879456456123', '4', '1', NULL, 1, '87945645612', '', 1, 0, '2024-07-18', NULL),
(8, '879456456123', '5', '1', NULL, 1, '12345676788', '', 1, 0, '2024-07-18', NULL),
(9, '123456789012', '6', '2', 6, 1, 'A', '', 1, 0, '2024-07-18', NULL),
(10, '994248402222', '7', '1', NULL, 1, '994248402222', '', 1, 0, '2024-07-18', NULL),
(11, '994248402222', '8', '1', NULL, 1, '1244578999', '', 1, 0, '2024-07-18', NULL),
(12, '045566789999', '9', '1', NULL, 1, '234450992', '6699e92216111.webp', 1, 0, '2024-07-19', NULL),
(13, '456789092384', '10', '1', NULL, 3, '6 months salry slip', '6699f7b6c2842.jpg', 1, 0, '2024-07-19', NULL),
(14, '345609871234', '11', '1', NULL, 1, 'customer adhar', '', 1, 0, '2024-07-19', NULL),
(15, '345609871234', '11', '1', NULL, 3, '3 month salary slip', '', 1, 0, '2024-07-19', NULL),
(16, '123456789012', '12', '1', NULL, 1, '123456789012', '669a3d345abee.png', 1, 0, '2024-07-19', NULL),
(17, '012346758906', '13', '1', NULL, 1, '098765432109', '669a44e2a3a59.png', 1, 0, '2024-07-19', NULL),
(18, '012346758906', '13', '2', 13, 3, '5 months salary slip', '669a4523e7705.jpg', 1, 0, '2024-07-19', NULL),
(19, '213574689023', '14', '1', NULL, 1, '34567890234', '669a4b5dc2d04.png', 1, 0, '2024-07-19', NULL),
(20, '446677889097', '15', '1', NULL, 1, 'xerox copy', '669a52dc9b2a9.png', 1, 0, '2024-07-19', NULL),
(21, '224489088111', '16', '1', NULL, 1, '88997766543321', '669b4861ed814.png', 5, 0, '2024-07-20', NULL),
(22, '111111111111', '17', '1', NULL, 1, '11111111111', '669b5f9a1791b.jpg', 1, 0, '2024-07-20', NULL),
(23, '100010001000', '18', '1', NULL, 1, 'ABCS', '', 1, 0, '2024-08-01', NULL),
(24, '446677889097', '19', '1', NULL, 1, '5464565454', '66c73d208cb65.jpg', 1, 0, '2024-08-22', NULL),
(25, '123415671890', '20', '1', NULL, 1, '123456789012', '', 1, 0, '2024-08-29', NULL),
(26, '123415671890', '20', '2', 20, 1, '453216789', '', 1, 0, '2024-08-29', NULL),
(27, '434351516776', '21', '1', NULL, 1, '123456789123', '', 1, 0, '2024-08-29', NULL),
(28, '878712126789', '22', '2', 22, 2, 'ration card', '', 1, 0, '2024-08-29', NULL),
(29, '878712126789', '22', '2', 22, 2, 'ration card', '', 1, 0, '2024-08-29', NULL),
(30, '765423129850', '23', '1', NULL, 1, '342167543875', '', 1, 0, '2024-08-29', NULL),
(31, '123415671890', '24', '1', NULL, 2, 'ration card', '', 1, 0, '2024-08-29', NULL),
(32, '765423129850', '27', '1', NULL, 1, '123456789012', '', 1, 0, '2024-08-30', NULL),
(33, '100010001000', '28', '1', NULL, 1, '123456789012', '', 1, 0, '2024-08-30', NULL),
(34, '878712126789', '25', '1', NULL, 3, 'salary', '', 1, 0, '2024-08-30', NULL),
(35, '012346758906', '26', '2', 13, 2, 'fyuare87q8', '', 1, 0, '2024-08-30', NULL),
(36, '123456789122', '29', '1', NULL, 1, 'Adhar copy', '', 1, 0, '2024-08-31', NULL),
(37, '879456456123', '30', '1', NULL, 1, 'adhar copy', '', 1, 0, '2024-08-31', NULL),
(38, '224489088111', '31', '1', NULL, 1, 'Adhar copy', '', 1, 0, '2024-08-31', NULL),
(39, '415236699752', '32', '1', NULL, 3, '3 month salary slip', '', 1, 0, '2024-08-31', NULL),
(40, '841256397000', '33', '1', NULL, 1, 'copy', '', 1, 0, '2024-08-31', NULL),
(41, '753214896025', '34', '1', NULL, 1, 'original', '', 1, 0, '2024-08-31', NULL),
(42, '878712126789', '35', '2', 22, 1, 'copy', '', 1, 0, '2024-08-31', NULL),
(43, '045566789999', '36', '2', 8, 3, '2 month salary slip', '', 1, 0, '2024-08-31', NULL),
(44, '234156437665', '37', '1', NULL, 1, '13252643758', '', 1, 0, '2024-09-02', NULL),
(45, '475896547989', '38', '1', NULL, 3, '6 month salary slip', '', 1, 0, '2024-09-02', NULL),
(47, '367861903455', '39', '1', NULL, 1, '367861903455', '', 1, 0, '2024-09-02', NULL),
(48, '142365987899', '40', '2', 31, 1, 'copy', '', 1, 0, '2024-09-02', NULL),
(49, '671297986425', '41', '1', NULL, 3, 'salary details', '', 1, 0, '2024-09-06', NULL),
(50, '879456456123', '42', '1', NULL, 2, 'Ration card', '', 1, 0, '2024-09-09', NULL),
(51, '233461412583', '43', '1', NULL, 2, 'ration card', '', 1, 0, '2024-09-09', NULL),
(52, '233461412583', '49', '1', NULL, 3, 'pay slip', '', 1, 0, '2024-09-10', NULL),
(53, '233461412583', '48', '2', 34, 1, '123456789012', '', 1, 0, '2024-09-10', NULL),
(54, '233461412583', '44', '1', NULL, 2, 'Detail', '', 1, 0, '2024-09-10', NULL),
(55, '233461412583', '46', '1', NULL, 3, 'submitted', '', 1, 0, '2024-09-10', NULL),
(56, '233461412583', '47', '1', NULL, 1, '123456789012', '', 1, 0, '2024-09-10', NULL),
(57, '233461412583', '45', '1', NULL, 2, '123456789012', '', 1, 0, '2024-09-10', NULL),
(58, '111122223333', '51', '1', NULL, 1, '5464565454', '66dff75261b2e.jpg', 1, 0, '2024-09-10', NULL),
(60, '994248402222', '52', '1', NULL, 1, '5464565454', '66dff853624a0.jpg', 1, 0, '2024-09-10', NULL),
(61, '123412341236', '53', '1', NULL, 1, '5464565454', '66dff9c5beaf9.jpg', 1, 0, '2024-09-10', NULL),
(62, '951203587633', '57', '1', NULL, 3, '3 months salry slip', '66e2aebbb527e.png', 1, 1, '2024-09-12', '2024-09-12'),
(63, '4545454545ghjg', '60', '1', NULL, 1, 'asak', '', 1, 1, '2024-09-12', '2024-09-13'),
(66, '4545454545ghjg', '60', '1', NULL, 1, 'asa', '', 1, 0, '2024-09-13', NULL),
(68, '111111110000', '61', '1', NULL, 1, '1', '', 1, 0, '2024-09-13', NULL),
(69, '4545454545ghjg', '60', '2', 41, 1, '1', '', 1, 1, '2024-09-13', '2024-09-13'),
(70, '4545454545ghjg', '60', '1', NULL, 2, 'asa', '', 1, 0, '2024-09-13', NULL),
(72, '67567567567567', '67', '2', 42, 1, 'asa', '', 1, 1, '2024-09-13', '2024-09-17'),
(73, '546564565', '70', '1', NULL, 1, '2', '', 1, 1, '2024-09-13', '2024-09-13'),
(74, '546564565', '70', '2', 43, 2, '1', '', 1, 1, '2024-09-13', '2024-09-16'),
(75, '23452354534545', '74', '2', 44, 2, '1', '', 1, 1, '2024-09-16', '2024-09-17'),
(77, '54654654656', '76', '1', NULL, 1, '1', '', 1, 0, '2024-09-16', NULL),
(78, '546564565', '70', '1', NULL, 3, '1', '', 1, 0, '2024-09-17', NULL),
(79, '67567567567567', '67', '1', NULL, 3, '2', '', 1, 0, '2024-09-17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `line_name_creation`
--

CREATE TABLE `line_name_creation` (
  `id` int(11) NOT NULL,
  `linename` varchar(150) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `line_name_creation`
--

INSERT INTO `line_name_creation` (`id`, `linename`, `branch_id`, `status`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'A', 1, 1, 1, NULL, '2024-07-16 12:50:08', NULL),
(2, 'B', 1, 1, 1, NULL, '2024-07-16 12:50:13', NULL),
(3, 'C', 1, 1, 1, NULL, '2024-07-16 12:50:18', NULL),
(4, 'D', 1, 1, 1, NULL, '2024-07-16 12:50:22', NULL),
(5, 'E', 1, 1, 1, NULL, '2024-07-16 12:50:27', NULL),
(6, 'A', 2, 1, 1, NULL, '2024-07-16 12:53:29', NULL),
(7, 'B', 4, 1, 1, NULL, '2024-07-16 12:54:07', NULL),
(8, 'C1', 5, 1, 1, 1, '2024-07-17 17:10:10', '2024-07-17'),
(10, 'C', 4, 1, 1, NULL, '2024-07-20 14:40:54', NULL),
(12, 'C1', 6, 1, 1, NULL, '2024-08-29 10:13:51', NULL),
(13, 'C2', 6, 1, 1, NULL, '2024-08-29 10:14:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `loan_category`
--

CREATE TABLE `loan_category` (
  `id` int(11) NOT NULL,
  `loan_category` varchar(150) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loan_category`
--

INSERT INTO `loan_category` (`id`, `loan_category`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(2, 'Business', 1, NULL, '2024-07-16', NULL),
(3, 'Personal', 1, NULL, '2024-07-16', NULL),
(4, 'Mortgage', 1, NULL, '2024-08-29', NULL),
(5, 'Appliances', 1, NULL, '2024-08-31', NULL),
(6, 'Property', 1, NULL, '2024-09-10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `loan_category_creation`
--

CREATE TABLE `loan_category_creation` (
  `id` int(11) NOT NULL,
  `loan_category` int(11) NOT NULL,
  `loan_limit` varchar(100) NOT NULL,
  `due_method` varchar(50) NOT NULL,
  `due_type` varchar(50) NOT NULL,
  `interest_rate_min` varchar(50) DEFAULT NULL,
  `interest_rate_max` varchar(50) DEFAULT NULL,
  `due_period_min` varchar(50) DEFAULT NULL,
  `due_period_max` varchar(50) DEFAULT NULL,
  `doc_charge_min` varchar(50) DEFAULT NULL,
  `doc_charge_max` varchar(50) DEFAULT NULL,
  `processing_fee_min` varchar(50) DEFAULT NULL,
  `processing_fee_max` varchar(100) DEFAULT NULL,
  `overdue_penalty` varchar(100) DEFAULT NULL,
  `scheme_name` varchar(150) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loan_category_creation`
--

INSERT INTO `loan_category_creation` (`id`, `loan_category`, `loan_limit`, `due_method`, `due_type`, `interest_rate_min`, `interest_rate_max`, `due_period_min`, `due_period_max`, `doc_charge_min`, `doc_charge_max`, `processing_fee_min`, `processing_fee_max`, `overdue_penalty`, `scheme_name`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 3, '100000', 'Monthly', 'emi', '2', '3', '5', '10', '1', '3', '0', '2', '3', '1,2,3', 1, 1, '2024-07-16', '2024-09-05'),
(2, 2, '1000000', 'Monthly', 'emi', '0', '3', '5', '12', '0', '2', '0', '3', '2', '4,5,6', 1, 1, '2024-07-17', '2024-07-19'),
(3, 4, '1500000', 'Monthly', 'emi', '1.5', '3', '5', '15', '1', '3', '1', '2', '3', '1,2,3,4,5,6', 1, 1, '2024-08-29', '2024-08-29'),
(4, 5, '100000', 'Monthly', 'emi', '2', '3', '5', '12', '2', '4', '0', '0', '2', '6', 1, 1, '2024-08-31', '2024-09-06'),
(5, 2, '10000', 'Monthly', 'interest', '1', '4', '2', '6', '1', '4', '1', '34', '670', '', 1, NULL, '2024-09-13', NULL),
(6, 5, '100000', 'Monthly', '', '', '', '', '', '', '', '', '', '', '2,5', 1, NULL, '2024-09-13', NULL),
(7, 4, '200000', 'Monthly', 'emi', '2', '4', '1', '6', '2', '4', '2', '5', '789', '8,6,1', 1, NULL, '2024-09-13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `loan_entry_loan_calculation`
--

CREATE TABLE `loan_entry_loan_calculation` (
  `id` int(11) NOT NULL,
  `cus_profile_id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `loan_id` varchar(50) NOT NULL,
  `loan_category` varchar(50) NOT NULL,
  `category_info` varchar(255) NOT NULL,
  `loan_amount` int(11) NOT NULL,
  `profit_type` int(11) NOT NULL,
  `due_method` varchar(50) DEFAULT NULL,
  `due_type` varchar(50) DEFAULT NULL,
  `profit_method` varchar(50) DEFAULT NULL,
  `scheme_due_method` varchar(50) DEFAULT NULL,
  `scheme_day` varchar(50) DEFAULT NULL,
  `scheme_name` varchar(100) DEFAULT NULL,
  `interest_rate` int(11) NOT NULL,
  `due_period` int(11) NOT NULL,
  `doc_charge` int(11) NOT NULL,
  `processing_fees` int(11) NOT NULL,
  `loan_amnt` int(11) NOT NULL,
  `principal_amnt` int(11) NOT NULL,
  `interest_amnt` int(11) NOT NULL,
  `total_amnt` int(11) NOT NULL,
  `due_amnt` int(11) NOT NULL,
  `doc_charge_calculate` int(11) NOT NULL,
  `processing_fees_calculate` int(11) NOT NULL,
  `net_cash` int(11) NOT NULL,
  `loan_date` date NOT NULL,
  `due_startdate` date NOT NULL,
  `maturity_date` date NOT NULL,
  `referred` int(11) NOT NULL,
  `agent_id` varchar(100) DEFAULT NULL,
  `agent_name` varchar(150) DEFAULT NULL,
  `cus_status` int(11) NOT NULL DEFAULT 0,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loan_entry_loan_calculation`
--

INSERT INTO `loan_entry_loan_calculation` (`id`, `cus_profile_id`, `cus_id`, `loan_id`, `loan_category`, `category_info`, `loan_amount`, `profit_type`, `due_method`, `due_type`, `profit_method`, `scheme_due_method`, `scheme_day`, `scheme_name`, `interest_rate`, `due_period`, `doc_charge`, `processing_fees`, `loan_amnt`, `principal_amnt`, `interest_amnt`, `total_amnt`, `due_amnt`, `doc_charge_calculate`, `processing_fees_calculate`, `net_cash`, `loan_date`, `due_startdate`, `maturity_date`, `referred`, `agent_id`, `agent_name`, `cus_status`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 1, '111111110000', 'LID-101', '1', 'House Renovation - Front Side Sheet', 50000, 1, '', '', 'After Benefit', '1', '', '3', 15, 5, 200, 100, 50000, 42500, 7500, 50000, 10000, 200, 100, 42200, '2024-07-16', '2024-08-01', '2024-12-01', 0, '1', 'Ram', 0, 3, 2, '2024-07-16', '2024-07-16'),
(2, 2, '879456456123', 'LID-102', '1', '', 50000, 1, '', '', 'After Benefit', '2', '6', '2', 12, 10, 200, 100, 50000, 44000, 6000, 50000, 5000, 200, 100, 43700, '2024-07-18', '2024-07-18', '2024-09-21', 0, '1', 'Ram', 0, 1, 1, '2024-07-18', '2024-07-18'),
(3, 3, '879456456123', 'LID-103', '2', '', 30000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 3, 8, 2, 2, 30000, 30000, 6000, 36000, 4500, 600, 600, 28800, '2024-07-18', '2024-08-01', '2025-03-01', 0, '1', 'Ram', 0, 1, NULL, '2024-07-18', NULL),
(4, 4, '879456456123', 'LID-104', '2', '', 80000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 12, 2, 3, 80000, 80000, 19240, 99240, 8270, 1600, 2400, 76000, '2024-07-18', '2024-08-10', '2025-07-10', 1, '', '', 0, 1, NULL, '2024-07-18', NULL),
(5, 5, '879456456123', 'LID-105', '1', '', 10000, 1, '', '', 'After Benefit', '3', '', '1', 10, 100, 200, 100, 10000, 9000, 1000, 10000, 100, 200, 100, 8700, '2024-07-18', '2024-07-19', '2024-10-26', 0, '1', 'Ram', 0, 1, NULL, '2024-07-18', NULL),
(6, 6, '123456789012', 'LID-106', '2', '', 30000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 3, 9, 2, 2, 30000, 30000, 8115, 38115, 4235, 600, 600, 28800, '2024-07-18', '2024-08-05', '2025-04-05', 1, '', '', 0, 1, 5, '2024-07-18', '2024-07-18'),
(7, 7, '994248402222', 'LID-107', '1', '', 40000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 3, 7, 2, 0, 40000, 40000, 8405, 48405, 6915, 800, 0, 39200, '2024-07-18', '2024-08-02', '2025-02-02', 0, '2', 'babu', 0, 1, 1, '2024-07-18', '2024-07-18'),
(8, 9, '045566789999', 'LID-108', '2', 'for business purposes', 50000, 1, '', '', 'After Benefit', '3', '', '4', 12, 100, 2, 2, 50000, 44000, 6000, 50000, 500, 1000, 1000, 42000, '2024-07-19', '2024-10-25', '2025-02-01', 0, '1', 'Ram', 0, 1, 1, '2024-07-19', '2024-07-19'),
(9, 10, '456789092384', 'LID-109', '1', '', 20000, 1, '', '', 'After Benefit', '2', '7', '2', 12, 10, 200, 100, 20000, 17600, 2400, 20000, 2000, 200, 100, 17300, '2024-07-19', '2024-09-22', '2024-11-24', 0, '2', 'babu', 0, 1, 1, '2024-07-19', '2024-07-19'),
(10, 11, '345609871234', 'LID-110', '2', '', 40000, 1, '', '', 'After Benefit', '1', '', '6', 10, 10, 5, 0, 40000, 36000, 4000, 40000, 4000, 2000, 0, 34000, '2024-07-19', '2024-07-25', '2025-04-25', 1, '', '', 0, 1, 1, '2024-07-19', '2024-07-19'),
(11, 8, '994248402222', 'LID-111', '1', '', 30000, 1, '', '', 'After Benefit', '2', '1', '2', 12, 10, 200, 0, 30000, 26400, 3600, 30000, 3000, 200, 0, 26200, '2024-07-19', '2024-07-20', '2024-09-16', 1, '', '', 0, 1, 1, '2024-07-19', '2024-07-19'),
(12, 12, '123456789012', 'LID-112', '1', 'Medical expense', 50000, 1, '', '', 'After Benefit', '3', '', '1', 10, 100, 200, 100, 50000, 45000, 5000, 50000, 500, 200, 100, 44700, '2024-07-19', '2024-07-22', '2024-10-29', 0, '1', 'Ram', 0, 1, NULL, '2024-07-19', NULL),
(13, 13, '012346758906', 'LID-113', '2', '', 45000, 1, '', '', 'After Benefit', '2', '3', '5', 3, 7, 3, 0, 45000, 43650, 1360, 45010, 6430, 1350, 0, 42300, '2024-07-19', '2024-07-24', '2024-09-04', 1, '', '', 0, 1, NULL, '2024-07-19', NULL),
(14, 14, '213574689023', 'LID-114', '2', '', 100000, 1, '', '', 'After Benefit', '3', '', '4', 12, 100, 2, 2, 100000, 88000, 12000, 100000, 1000, 2000, 2000, 84000, '2024-07-19', '2024-07-25', '2024-11-01', 0, '1', 'Ram', 0, 1, 1, '2024-07-19', '2024-09-09'),
(15, 14, '213574689023', 'LID-114', '1', '', 30000, 1, '', '', 'After Benefit', '1', '', '3', 15, 5, 200, 0, 30000, 25500, 4500, 30000, 6000, 200, 0, 25300, '2024-07-19', '2024-07-25', '2024-11-01', 0, '1', 'Ram', 0, 1, 1, '2024-07-19', '2024-09-09'),
(16, 15, '446677889097', 'LID-115', '1', '', 25000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 8, 2, 0, 25000, 25000, 4200, 29200, 3650, 500, 0, 24500, '2024-07-19', '2024-08-10', '2025-03-10', 0, '2', 'babu', 0, 1, 0, '2024-07-19', '2024-07-19'),
(17, 16, '224489088111', 'LID-116', '2', '', 100000, 1, '', '', 'After Benefit', '2', '5', '5', 3, 7, 2, 1, 100000, 97000, 3030, 100030, 14290, 2000, 1000, 94000, '2024-07-20', '2024-07-26', '2024-09-06', 0, '2', 'babu', 0, 5, 5, '2024-07-20', '2024-07-20'),
(18, 17, '111111111111', 'LID-117', '1', 'Loan ', 10000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 3, 5, 1, 0, 10000, 10000, 1250, 11250, 2250, 100, 20, 9880, '2024-07-20', '2024-08-08', '2024-12-08', 0, '1', 'Ram', 0, 1, 1, '2024-07-20', '2024-07-20'),
(19, 18, '100010001000', 'LID-118', '1', 'testing record', 50000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 7, 1, 1, 50000, 50000, 7015, 57015, 8145, 500, 500, 49000, '2024-08-01', '2024-08-01', '2025-02-01', 1, '', '', 0, 1, 1, '2024-08-01', '2024-08-01'),
(20, 19, '446677889097', 'LID-119', '1', '', 50000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 10, 2, 0, 50000, 50000, 10000, 60000, 6000, 1000, 0, 49000, '2024-08-22', '2024-09-01', '2025-06-01', 1, '', '', 0, 1, 1, '2024-08-22', '2024-08-31'),
(21, 20, '123415671890', 'LID-120', '2', '', 1000000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 3, 10, 2, 3, 1000000, 1000000, 300000, 1300000, 130000, 20000, 30000, 950000, '2024-08-29', '2024-09-05', '2025-06-05', 1, '', '', 0, 1, 1, '2024-08-29', '2024-08-29'),
(22, 21, '434351516776', 'LID-121', '1', 'personal loan', 20000, 1, '', '', 'After Benefit', '2', '3', '2', 12, 10, 100, 80, 20000, 17600, 2400, 20000, 2000, 100, 80, 17420, '2024-08-29', '2024-09-12', '2024-11-13', 0, '1', 'Ram', 0, 1, 1, '2024-08-29', '2024-08-29'),
(23, 22, '878712126789', 'LID-122', '1', '', 50000, 1, '', '', 'After Benefit', '1', '', '3', 15, 5, 150, 100, 50000, 42500, 7500, 50000, 10000, 150, 100, 42250, '2024-08-29', '2024-09-10', '2025-01-10', 0, '2', 'babu', 0, 1, NULL, '2024-08-29', NULL),
(24, 23, '765423129850', 'LID-123', '2', '', 80000, 1, '', '', 'After Benefit', '3', '', '4', 12, 100, 1, 1, 80000, 70400, 9600, 80000, 800, 800, 800, 68800, '2024-08-29', '2024-09-10', '2024-12-18', 0, '3', 'Sameer', 0, 1, 1, '2024-08-29', '2024-08-29'),
(25, 24, '123415671890', 'LID-124', '1', '', 20000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 3, 10, 2, 2, 20000, 20000, 6000, 26000, 2600, 400, 400, 19200, '2024-08-29', '2024-09-06', '2025-06-06', 0, '3', 'Sameer', 0, 1, 1, '2024-08-29', '2024-09-09'),
(26, 27, '765423129850', 'LID-125', '1', '', 50000, 1, '', '', 'After Benefit', '2', '1', '2', 12, 10, 150, 80, 50000, 44000, 6000, 50000, 5000, 150, 80, 43770, '2024-08-30', '2024-09-09', '2024-11-11', 0, '2', 'babu', 0, 1, 1, '2024-08-30', '2024-08-30'),
(27, 28, '100010001000', 'LID-126', '1', '', 10000, 1, '', '', 'After Benefit', '2', '4', '2', 12, 10, 150, 80, 10000, 8800, 1200, 10000, 1000, 150, 80, 8570, '2024-08-30', '2024-09-12', '2024-11-14', 0, '1', 'Ram', 0, 1, 1, '2024-08-30', '2024-08-30'),
(28, 25, '878712126789', 'LID-127', '1', '', 35000, 1, '', '', 'After Benefit', '1', '', '3', 15, 5, 180, 80, 35000, 29750, 5250, 35000, 7000, 180, 80, 29490, '2024-08-30', '2024-10-02', '2025-02-02', 0, '1', 'Ram', 0, 1, NULL, '2024-08-30', NULL),
(29, 29, '123456789122', 'LID-128', '1', '', 60000, 1, '', '', 'After Benefit', '3', '', '1', 10, 100, 200, 100, 60000, 54000, 6000, 60000, 600, 200, 100, 53700, '2024-08-31', '2024-08-31', '2024-12-08', 0, '3', 'Sameer', 0, 1, 1, '2024-08-31', '2024-08-31'),
(30, 30, '879456456123', 'LID-129', '1', '', 50000, 1, '', '', 'After Benefit', '2', '6', '2', 12, 10, 200, 100, 50000, 44000, 6000, 50000, 5000, 200, 100, 43700, '2024-08-31', '2024-08-31', '2024-11-02', 1, '', '', 0, 1, 1, '2024-08-31', '2024-08-31'),
(31, 31, '224489088111', 'LID-130', '2', '', 80000, 1, '', '', 'After Benefit', '1', '', '6', 10, 10, 5, 0, 80000, 72000, 8000, 80000, 8000, 4000, 0, 68000, '2024-08-31', '2024-08-31', '2025-05-30', 1, '', '', 0, 1, 1, '2024-08-31', '2024-08-31'),
(32, 32, '415236699752', 'LID-131', '1', '', 30000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 6, 2, 0, 30000, 30000, 3600, 33600, 5600, 600, 0, 29400, '2024-08-31', '2024-08-31', '2025-01-28', 0, '2', 'babu', 0, 1, 1, '2024-08-31', '2024-08-31'),
(33, 33, '841256397000', 'LID-132', '3', '', 100000, 1, '', '', 'After Benefit', '3', '', '4', 12, 100, 1, 0, 100000, 88000, 12000, 100000, 1000, 1000, 0, 87000, '2024-08-31', '2024-08-31', '2024-12-08', 1, '', '', 0, 1, 1, '2024-08-31', '2024-08-31'),
(34, 34, '753214896025', 'LID-133', '3', '', 60000, 1, '', '', 'After Benefit', '2', '6', '5', 3, 7, 2, 0, 60000, 58200, 1825, 60025, 8575, 1200, 0, 57000, '2024-08-31', '2024-08-31', '2024-10-12', 0, '1', 'Ram', 0, 1, 1, '2024-08-31', '2024-08-31'),
(35, 35, '878712126789', 'LID-134', '1', '', 40000, 1, '', '', 'After Benefit', '1', '', '3', 15, 5, 200, 100, 40000, 34000, 6000, 40000, 8000, 200, 100, 33700, '2024-08-31', '2024-08-31', '2024-12-31', 1, '', '', 0, 1, 1, '2024-08-31', '2024-08-31'),
(36, 36, '045566789999', 'LID-135', '2', '', 30000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 10, 2, 0, 30000, 30000, 6000, 36000, 3600, 600, 0, 29400, '2024-08-31', '2024-09-01', '2025-06-01', 1, '', '', 0, 1, 1, '2024-08-31', '2024-08-31'),
(37, 26, '012346758906', 'LID-136', '4', '', 45000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 8, 2, 0, 45000, 45000, 7200, 52200, 6525, 900, 0, 44100, '2024-09-02', '2024-10-02', '2025-05-02', 0, '2', 'babu', 0, 1, 1, '2024-09-02', '2024-09-09'),
(38, 37, '234156437665', 'LID-137', '3', '', 250000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 10, 2, 1, 250000, 250000, 50000, 300000, 30000, 5000, 2500, 242500, '2024-09-02', '2024-10-10', '2025-07-10', 1, '', '', 0, 1, 1, '2024-09-02', '2024-09-02'),
(39, 38, '475896547989', 'LID-138', '1', '', 50000, 1, '', '', 'After Benefit', '3', '', '1', 10, 100, 200, 0, 50000, 45000, 5000, 50000, 500, 200, 0, 44800, '2024-09-02', '2024-09-02', '2024-12-10', 1, '', '', 0, 1, 1, '2024-09-02', '2024-09-02'),
(40, 39, '367861903455', 'LID-139', '4', '', 25000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 7, 2, 0, 25000, 25000, 3525, 28525, 4075, 500, 0, 24500, '2024-09-02', '2024-10-02', '2025-04-02', 0, '2', 'babu', 0, 1, 1, '2024-09-02', '2024-09-05'),
(41, 40, '142365987899', 'LID-140', '2', '', 50000, 1, '', '', 'After Benefit', '2', '2', '5', 3, 7, 3, 0, 50000, 48500, 1515, 50015, 7145, 1500, 0, 47000, '2024-09-02', '2024-09-03', '2024-10-15', 0, '2', 'babu', 0, 1, 1, '2024-09-02', '2024-09-02'),
(42, 41, '671297986425', 'LID-141', '1', 'self', 100000, 1, '', '', 'After Benefit', '1', '', '3', 15, 5, 200, 100, 100000, 85000, 15000, 100000, 20000, 200, 100, 84700, '2024-09-06', '2024-10-05', '2025-02-05', 0, '2', 'babu', 0, 1, 1, '2024-09-06', '2024-09-06'),
(43, 42, '879456456123', 'LID-142', '4', 'mobile', 23000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 8, 2, 0, 23000, 23000, 3680, 26680, 3335, 460, 0, 22540, '2024-09-09', '2024-10-09', '2025-05-09', 0, '2', 'babu', 0, 1, NULL, '2024-09-09', NULL),
(44, 43, '233461412583', 'LID-143', '1', 'personal', 70000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 10, 2, 2, 70000, 70000, 14000, 84000, 8400, 1400, 1050, 67550, '2024-09-09', '2024-10-09', '2025-07-09', 0, '1', 'Ram', 0, 1, 1, '2024-09-09', '2024-09-10'),
(45, 49, '233461412583', 'LID-144', '1', 'personal', 25000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 5, 2, 1, 25000, 25000, 2500, 27500, 5500, 500, 250, 24250, '2024-09-10', '2024-10-05', '2025-02-05', 0, '3', 'Sameer', 0, 1, 1, '2024-09-10', '2024-09-10'),
(46, 48, '233461412583', 'LID-145', '2', '', 30000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 8, 2, 2, 30000, 30000, 4800, 34800, 4350, 600, 450, 28950, '2024-09-10', '2024-10-10', '2025-05-10', 0, '3', 'Sameer', 0, 1, 1, '2024-09-10', '2024-09-10'),
(47, 44, '233461412583', 'LID-146', '1', 'Mobile', 17000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 3, 10, 2, 1, 17000, 17000, 5100, 22100, 2210, 340, 170, 16490, '2024-09-10', '2024-10-02', '2025-07-02', 0, '1', 'Ram', 0, 1, NULL, '2024-09-10', NULL),
(48, 46, '233461412583', 'LID-147', '2', '', 50000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 3, 10, 2, 2, 50000, 50000, 15000, 65000, 6500, 1000, 1000, 48000, '2024-09-10', '2024-10-09', '2025-07-09', 0, '2', 'babu', 0, 1, 1, '2024-09-10', '2024-09-10'),
(49, 47, '233461412583', 'LID-148', '1', '', 15000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 10, 2, 1, 15000, 15000, 3000, 18000, 1800, 300, 150, 14550, '2024-09-10', '2024-10-02', '2025-07-02', 1, '', '', 0, 1, NULL, '2024-09-10', NULL),
(50, 45, '233461412583', 'LID-149', '1', '', 40000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 10, 2, 2, 40000, 40000, 8000, 48000, 4800, 800, 600, 38600, '2024-09-10', '2024-10-02', '2025-07-02', 0, '2', 'babu', 0, 1, 1, '2024-09-10', '2024-09-10'),
(51, 51, '111122223333', 'LID-150', '1', 'sds', 50000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 10, 2, 1, 50000, 50000, 10000, 60000, 6000, 1000, 500, 48500, '2024-09-10', '2024-10-01', '2025-07-01', 1, '', '', 0, 1, 1, '2024-09-10', '2024-09-10'),
(52, 52, '994248402222', 'LID-151', '2', 'ere', 20000, 1, '', '', 'After Benefit', '3', '', '4', 12, 100, 1, 0, 20000, 17600, 2400, 20000, 200, 200, 0, 17400, '2024-09-10', '2024-09-11', '2024-12-19', 1, '', '', 0, 1, NULL, '2024-09-10', NULL),
(53, 53, '123412341236', 'LID-152', '1', 'we', 20000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 3, 10, 1, 1, 20000, 20000, 6000, 26000, 2600, 200, 200, 19600, '2024-09-10', '2024-10-01', '2025-07-01', 1, '', '', 0, 1, 1, '2024-09-10', '2024-09-10'),
(54, 57, '951203587633', 'LID-153', '1', '', 80000, 1, '', '', 'After Benefit', '2', '5', '2', 12, 10, 200, 100, 80000, 70400, 9600, 80000, 8000, 200, 100, 70100, '2024-09-12', '2024-09-13', '2024-11-15', 0, '2', 'babu', 0, 1, 1, '2024-09-12', '2024-09-12'),
(55, 60, '4545454545ghjg', 'LID-154', '1', 'khjk', 100000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 5, 1, 2, 100000, 100000, 10000, 110000, 22000, 1000, 2000, 97000, '2024-09-13', '2024-09-13', '2025-01-13', 0, '2', 'AG-102', 0, 1, 1, '2024-09-13', '2024-09-13'),
(56, 70, '546564565', 'LID-155', '3', '', 67000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 3, 5, 1, 1, 67000, 67000, 10050, 77050, 15410, 670, 670, 65660, '2024-09-13', '2024-09-13', '2025-01-13', 0, '2', 'AG-102', 0, 1, 1, '2024-09-13', '2024-09-16'),
(57, 67, '67567567567567', 'LID-156', '1', '', 90000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 5, 1, 2, 90000, 90000, 9000, 99000, 19800, 900, 1800, 87300, '2024-09-13', '2024-09-14', '2025-01-14', 0, '2', 'AG-102', 0, 1, 1, '2024-09-13', '2024-09-17'),
(58, 76, '54654654656', 'LID-157', '1', '', 86000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 5, 1, 2, 86000, 86000, 8600, 94600, 18920, 860, 1720, 83420, '2024-09-16', '2024-09-16', '2025-01-16', 0, '3', 'AG-103', 0, 1, 1, '2024-09-16', '2024-09-17'),
(59, 74, '23452354534545', 'LID-158', '2', '', 67000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 3, 5, 2, 3, 67000, 67000, 10050, 77050, 15410, 1340, 2010, 63650, '2024-09-16', '2024-09-17', '2025-01-17', 1, '', '', 0, 1, NULL, '2024-09-16', NULL),
(60, 77, '446677889097', 'LID-159', '1', '', 76000, 1, '', '', '', '2', '5', '8', 12, 5, 1, 2, 76000, 450000, 890000, 908000, 786, 450, 567, 98000, '2024-07-11', '2024-07-12', '2002-08-13', 1, '', '', 0, 1, NULL, '2024-07-11', '2024-07-11'),
(61, 79, '994248402222', 'LID-160', '1', '', 76000, 1, '', '', '', '2', '5', '8', 12, 5, 1, 2, 76000, 450000, 890000, 908000, 786, 450, 567, 98000, '2024-07-11', '2024-07-12', '2002-08-13', 1, '', '', 0, 1, NULL, '2024-07-11', '2024-07-11');

-- --------------------------------------------------------

--
-- Table structure for table `loan_issue`
--

CREATE TABLE `loan_issue` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(255) NOT NULL,
  `cus_profile_id` int(11) NOT NULL,
  `loan_amnt` int(11) NOT NULL,
  `net_cash` int(11) NOT NULL,
  `payment_mode` int(11) NOT NULL,
  `issue_amnt` int(11) NOT NULL,
  `transaction_id` varchar(50) DEFAULT NULL,
  `cheque_no` varchar(50) DEFAULT NULL,
  `issue_date` date NOT NULL,
  `issue_person` varchar(50) NOT NULL,
  `relationship` varchar(50) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loan_issue`
--

INSERT INTO `loan_issue` (`id`, `cus_id`, `cus_profile_id`, `loan_amnt`, `net_cash`, `payment_mode`, `issue_amnt`, `transaction_id`, `cheque_no`, `issue_date`, `issue_person`, `relationship`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '111111110000', 1, 50000, 42200, 1, 42200, '', '', '2024-07-16', 'Rahul', 'Customer', 2, NULL, '2024-07-16 13:29:36', NULL),
(2, '879456456123', 2, 50000, 43700, 1, 43700, '', '', '2024-07-18', 'arun', 'Brother', 1, NULL, '2024-07-18 10:34:05', NULL),
(3, '123456789012', 6, 30000, 28800, 2, 28800, '5876444', '', '2024-07-18', 'Ramesh', 'Customer', 5, NULL, '2024-07-18 17:11:48', NULL),
(4, '994248402222', 7, 40000, 39200, 1, 39200, '', '', '2024-07-18', 'geetha', 'Spouse', 1, NULL, '2024-07-18 18:35:12', NULL),
(5, '045566789999', 9, 50000, 42000, 1, 42000, '', '', '2024-07-19', 'prasath', 'Spouse', 1, NULL, '2024-07-19 10:01:24', NULL),
(6, '456789092384', 10, 20000, 17300, 1, 17300, '', '', '2024-07-19', 'Gopal', 'Customer', 1, NULL, '2024-07-19 10:57:34', NULL),
(7, '345609871234', 11, 40000, 34000, 2, 34000, '12345', '', '2024-07-19', 'Gowtham', 'Customer', 1, NULL, '2024-07-19 13:12:18', NULL),
(8, '994248402222', 8, 30000, 26200, 1, 26200, '', '', '2024-07-19', 'geetha', 'Spouse', 1, NULL, '2024-07-19 13:33:26', NULL),
(9, '446677889097', 15, 25000, 24500, 1, 24500, '', '', '2024-07-19', 'Ashok', 'Customer', 0, NULL, '2024-07-19 17:31:43', NULL),
(10, '446677889097', 15, 25000, 24500, 1, 24500, '', '', '2024-07-19', 'Ashok', 'Customer', 0, NULL, '2024-07-19 17:32:31', NULL),
(11, '446677889097', 15, 25000, 24500, 1, 24500, '', '', '2024-07-19', 'Madhan', 'Father', 0, NULL, '2024-07-19 17:33:26', NULL),
(12, '111111111111', 17, 10000, 9880, 1, 9880, '', '', '2024-07-20', 'shanmugam', 'Customer', 1, NULL, '2024-07-20 12:37:00', NULL),
(13, '100010001000', 18, 50000, 49000, 1, 49000, '', '', '2024-08-01', 'Lubi', 'Customer', 1, NULL, '2024-08-01 13:37:12', NULL),
(14, '434351516776', 21, 20000, 17420, 1, 17420, '', '', '2024-08-29', 'Priya', 'Customer', 1, NULL, '2024-08-29 12:09:15', NULL),
(15, '765423129850', 23, 80000, 68800, 1, 68800, '', '', '2024-08-29', 'Nirmal', 'Customer', 1, NULL, '2024-08-29 16:55:11', NULL),
(16, '100010001000', 28, 10000, 8570, 1, 8570, '', '', '2024-08-30', 'Lubi', 'Customer', 1, NULL, '2024-08-30 14:15:29', NULL),
(17, '100010001000', 28, 10000, 8570, 1, 8570, '', '', '2024-08-30', 'Lubi', 'Customer', 1, NULL, '2024-08-30 14:15:55', NULL),
(18, '100010001000', 28, 10000, 8570, 1, 8570, '', '', '2024-08-30', 'Lubi', 'Customer', 1, NULL, '2024-08-30 14:15:55', NULL),
(19, '765423129850', 27, 50000, 43770, 1, 43770, '', '', '2024-08-30', 'Nirmal', 'Customer', 1, NULL, '2024-08-30 17:41:36', NULL),
(20, '123456789122', 29, 60000, 53700, 1, 53700, '', '', '2024-08-31', 'Rohini', 'Customer', 1, NULL, '2024-08-31 16:01:16', NULL),
(21, '879456456123', 30, 50000, 43700, 1, 43700, '', '', '2024-08-31', 'surya', 'Customer', 1, NULL, '2024-08-31 18:38:34', NULL),
(22, '224489088111', 31, 80000, 68000, 2, 68000, '78954632', '', '2024-08-31', 'Ranjith', 'Customer', 1, NULL, '2024-08-31 18:56:56', NULL),
(23, '415236699752', 32, 30000, 29400, 1, 29400, '', '', '2024-08-31', 'Siva kumar', 'Customer', 1, NULL, '2024-08-31 19:16:44', NULL),
(24, '841256397000', 33, 100000, 87000, 1, 87000, '', '', '2024-08-31', 'Xaviour', 'Brother', 1, NULL, '2024-08-31 19:37:25', NULL),
(25, '753214896025', 34, 60000, 57000, 1, 57000, '', '', '2024-08-31', 'Vasanth', 'Customer', 1, NULL, '2024-08-31 19:48:18', NULL),
(26, '878712126789', 35, 40000, 33700, 1, 33700, '', '', '2024-08-31', 'selvi', 'Spouse', 1, NULL, '2024-08-31 19:52:39', NULL),
(27, '045566789999', 36, 30000, 29400, 1, 29400, '', '', '2024-08-31', 'Meena', 'Customer', 1, NULL, '2024-08-31 19:57:32', NULL),
(28, '446677889097', 19, 50000, 49000, 1, 49000, '', '', '2024-08-31', 'Ashok', 'Customer', 1, NULL, '2024-08-31 20:01:40', NULL),
(29, '475896547989', 38, 50000, 44800, 1, 44800, '', '', '2024-09-02', 'Vijay', 'Customer', 1, NULL, '2024-09-02 11:12:03', NULL),
(30, '234156437665', 37, 250000, 242500, 1, 242500, '', '', '2024-09-02', 'Alisha', 'Customer', 1, NULL, '2024-09-02 14:49:58', NULL),
(31, '142365987899', 40, 50000, 47000, 1, 47000, '', '', '2024-09-02', 'Arun', 'Spouse', 1, NULL, '2024-09-02 15:24:47', NULL),
(32, '367861903455', 39, 25000, 24500, 1, 24500, '', '', '2024-09-05', 'Dev', 'Customer', 1, NULL, '2024-09-05 17:52:35', NULL),
(33, '671297986425', 41, 100000, 84700, 1, 84700, '', '', '2024-09-06', 'Kamlesh', 'Customer', 1, NULL, '2024-09-06 15:10:22', NULL),
(34, '213574689023', 14, 100000, 84000, 2, 84000, '5171751', '', '2024-09-09', 'Krishna', 'Customer', 1, NULL, '2024-09-09 15:01:30', NULL),
(35, '213574689023', 14, 100000, 84000, 2, 84000, '5171751', '', '2024-09-09', 'Krishna', 'Customer', 1, NULL, '2024-09-09 15:01:46', NULL),
(36, '213574689023', 14, 100000, 84000, 2, 84000, '5171751', '', '2024-09-09', 'Krishna', 'Customer', 1, NULL, '2024-09-09 15:01:47', NULL),
(37, '123415671890', 24, 20000, 19200, 1, 19200, '', '', '2024-09-09', 'Raj', 'Father', 1, NULL, '2024-09-09 18:30:16', NULL),
(38, '233461412583', 43, 70000, 67550, 1, 67550, '', '', '2024-09-10', 'Prakash', 'Customer', 1, NULL, '2024-09-10 10:34:53', NULL),
(39, '233461412583', 46, 50000, 48000, 2, 48000, '356876487', '', '2024-09-10', 'Prakash', 'Customer', 1, NULL, '2024-09-10 10:37:16', NULL),
(40, '233461412583', 49, 25000, 24250, 1, 24250, '', '', '2024-09-10', 'Neela', 'Spouse', 1, NULL, '2024-09-10 10:44:22', NULL),
(41, '233461412583', 48, 30000, 28950, 1, 28950, '', '', '2024-09-10', 'Sundar', 'Father', 1, NULL, '2024-09-10 10:47:19', NULL),
(42, '233461412583', 45, 40000, 38600, 1, 38600, '', '', '2024-09-10', 'Prakash', 'Customer', 1, NULL, '2024-09-10 10:47:55', NULL),
(43, '123412341236', 53, 20000, 19600, 1, 19600, '', '', '2024-09-10', 'Rani', 'Customer', 1, NULL, '2024-09-10 14:05:43', NULL),
(44, '951203587633', 57, 80000, 70100, 2, 70100, '123456', '', '2024-09-12', 'Rudhra', 'Customer', 1, NULL, '2024-09-12 15:16:04', NULL),
(45, '446677889097', 77, 76000, 98000, 2, 98000, '98787678676897', '32456566766', '2024-10-07', 'Jai', 'Father', 1, NULL, '2024-07-11 00:00:00', NULL),
(46, '994248402222', 79, 76000, 98000, 2, 98000, '98787678676897', '32456566766', '2024-10-07', 'Jai', 'Father', 1, NULL, '2024-07-11 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `menu_list`
--

CREATE TABLE `menu_list` (
  `id` int(11) NOT NULL,
  `menu` varchar(100) NOT NULL,
  `link` varchar(100) NOT NULL,
  `icon` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='All Main Menu''s will be placed here';

--
-- Dumping data for table `menu_list`
--

INSERT INTO `menu_list` (`id`, `menu`, `link`, `icon`) VALUES
(1, 'Dashboard', 'dashboard', 'developer_board'),
(2, 'Master', 'master', 'camera1'),
(3, 'Administration', 'admin', 'layers'),
(4, 'Loan Entry', 'loan_entry', 'archive'),
(5, 'Approval', 'approval', 'user-check'),
(6, 'Loan Issue', 'loan_issue', 'wallet'),
(7, 'Collection', 'collection', 'credit'),
(8, 'Closed', 'closed', 'uninstall'),
(9, 'NOC', 'noc', 'export'),
(10, 'Accounts', 'accounts', 'domain'),
(11, 'Update', 'update', 'share1'),
(12, 'Customer Data', 'customer_data', 'folder_shared'),
(13, 'Search', 'search', 'magnifying-glass'),
(14, 'Reports', 'reports', 'assignment_turned_in'),
(15, 'Bulk Upload', 'bulk_upload', 'cloud_upload');

-- --------------------------------------------------------

--
-- Table structure for table `mortgage_info`
--

CREATE TABLE `mortgage_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_profile_id` int(11) NOT NULL,
  `property_holder_name` int(11) NOT NULL,
  `relationship` varchar(50) NOT NULL,
  `property_details` varchar(255) NOT NULL,
  `mortgage_name` varchar(100) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `mortgage_number` varchar(100) NOT NULL,
  `reg_office` varchar(100) NOT NULL,
  `mortgage_value` varchar(100) NOT NULL,
  `upload` varchar(100) NOT NULL,
  `noc_status` int(11) NOT NULL DEFAULT 0,
  `date_of_noc` date DEFAULT NULL,
  `noc_member` varchar(150) DEFAULT NULL,
  `noc_relationship` varchar(150) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mortgage_info`
--

INSERT INTO `mortgage_info` (`id`, `cus_id`, `cus_profile_id`, `property_holder_name`, `relationship`, `property_details`, `mortgage_name`, `designation`, `mortgage_number`, `reg_office`, `mortgage_value`, `upload`, `noc_status`, `date_of_noc`, `noc_member`, `noc_relationship`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '753214896025', 34, 27, 'Father', 'house', 'House', 'abc', '1585', 'vsi', '200000', '', 0, NULL, NULL, NULL, 1, NULL, '2024-08-31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `noc`
--

CREATE TABLE `noc` (
  `id` int(11) NOT NULL,
  `cus_profile_id` int(11) NOT NULL,
  `cus_id` int(11) NOT NULL,
  `cheque_list` int(11) NOT NULL DEFAULT 0,
  `mortgage_list` int(11) NOT NULL DEFAULT 0,
  `endorsement_list` int(11) NOT NULL DEFAULT 0,
  `document_list` int(11) NOT NULL DEFAULT 0,
  `gold_info` int(11) NOT NULL DEFAULT 0,
  `noc_status` int(11) NOT NULL DEFAULT 0,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `noc`
--

INSERT INTO `noc` (`id`, `cus_profile_id`, `cus_id`, `cheque_list`, `mortgage_list`, `endorsement_list`, `document_list`, `gold_info`, `noc_status`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 1, 2147483647, 2, 2, 2, 2, 2, 2, 1, 1, '2024-07-19', '2024-07-19'),
(2, 6, 2147483647, 2, 2, 2, 2, 2, 2, 1, NULL, '2024-07-19', NULL),
(3, 2, 2147483647, 2, 2, 2, 2, 2, 2, 1, NULL, '2024-07-20', NULL),
(4, 15, 2147483647, 2, 2, 2, 0, 2, 1, 1, NULL, '2024-08-29', NULL),
(5, 21, 2147483647, 2, 2, 2, 2, 2, 2, 1, NULL, '2024-08-29', NULL),
(6, 40, 2147483647, 2, 2, 2, 0, 2, 1, 1, NULL, '2024-09-09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `noc_ref`
--

CREATE TABLE `noc_ref` (
  `id` int(11) NOT NULL,
  `noc_id` int(11) NOT NULL,
  `date_of_noc` date NOT NULL,
  `noc_member` varchar(150) NOT NULL,
  `noc_relationship` varchar(150) NOT NULL,
  `created_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `noc_ref`
--

INSERT INTO `noc_ref` (`id`, `noc_id`, `date_of_noc`, `noc_member`, `noc_relationship`, `created_on`) VALUES
(1, 1, '2024-07-19', 'Rahul', 'Customer', '2024-07-19'),
(2, 0, '2024-07-19', '1', 'Father', '2024-07-19'),
(3, 2, '2024-07-19', 'Ramesh', 'Customer', '2024-07-19'),
(4, 3, '2024-07-20', 'surya', 'Customer', '2024-07-20'),
(5, 4, '2024-08-29', 'Ashok', 'Customer', '2024-08-29'),
(6, 5, '2024-08-29', 'Priya', 'Customer', '2024-08-29'),
(7, 6, '2024-09-09', 'priyanka', 'Customer', '2024-09-09');

-- --------------------------------------------------------

--
-- Table structure for table `other_transaction`
--

CREATE TABLE `other_transaction` (
  `id` int(11) NOT NULL,
  `coll_mode` int(11) NOT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `trans_cat` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `ref_id` varchar(100) DEFAULT NULL,
  `trans_id` varchar(100) NOT NULL,
  `user_name` int(11) DEFAULT NULL,
  `amount` varchar(150) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `other_transaction`
--

INSERT INTO `other_transaction` (`id`, `coll_mode`, `bank_id`, `trans_cat`, `name`, `type`, `ref_id`, `trans_id`, `user_name`, `amount`, `remark`, `insert_login_id`, `created_on`) VALUES
(1, 1, 0, 2, 1, 1, 'INV-101', '56777', 0, '20000', 'fund', 1, '2024-07-18 17:54:24'),
(2, 1, 0, 4, 2, 1, 'EXC-101', '32541', 0, '200000', 'Loan purpuse', 1, '2024-07-20 17:56:40'),
(3, 1, 0, 4, 2, 2, 'EXC-102', '26454', 0, '50000', 'Return', 1, '2024-07-20 17:57:30'),
(4, 1, 0, 2, 1, 1, 'INV-102', '123', 0, '100000', 'xxxx', 1, '2024-07-31 13:10:12'),
(5, 1, 0, 7, 3, 2, 'ADV-101', '', 1, '50000', 'to loan issue', 1, '2024-08-01 13:35:48'),
(6, 1, 0, 1, 4, 1, 'DEP-101', '', 0, '40000', 'test', 1, '2024-08-01 13:39:51'),
(7, 1, 0, 1, 4, 2, 'DEP-102', '', 0, '5000', 'aaaa', 1, '2024-08-01 13:40:10'),
(8, 1, 0, 2, 1, 1, 'INV-103', '', 0, '85000', 'wwww', 1, '2024-08-01 13:40:31'),
(9, 1, 0, 2, 1, 2, 'INV-104', '', 0, '15000', 'eeee', 1, '2024-08-01 13:40:46'),
(10, 1, 0, 3, 5, 1, 'EL-101', '', 0, '20000', 'rrrr', 1, '2024-08-01 13:41:31'),
(11, 1, 0, 3, 5, 2, 'EL-102', '', 0, '4000', 'ttttt', 1, '2024-08-01 13:41:48'),
(12, 1, 0, 4, 2, 1, 'EXC-103', '', 0, '3600', 'ttttt', 1, '2024-08-01 13:42:09'),
(13, 1, 0, 4, 2, 2, 'EXC-104', '', 0, '2000', 'yyyyy', 1, '2024-08-01 13:42:23'),
(14, 1, 0, 8, 6, 1, 'INC-101', '', 0, '2800', 'eas', 1, '2024-08-01 13:42:53'),
(15, 1, 0, 4, 2, 1, 'EXC-105', '11542', 0, '500000', 'exchange', 1, '2024-08-22 18:31:56'),
(16, 1, 0, 2, 7, 1, 'INV-105', '', NULL, '150000', 'Investment amount', 1, '2024-08-30 14:04:28'),
(17, 2, 1, 1, 4, 1, 'DEP-103', '6465242451', NULL, '25000', 'transfer amount', 1, '2024-08-30 14:11:14'),
(18, 2, 2, 6, 8, 1, 'BWDL-101', '6777598745', NULL, '50000', 'to give', 1, '2024-08-30 17:19:38'),
(19, 1, 0, 2, 7, 1, 'INV-106', '', NULL, '50000', 'business', 1, '2024-09-02 10:40:18'),
(20, 2, 3, 1, 4, 1, 'DEP-104', '994248', NULL, '2000', 'Deposite', 1, '2024-09-02 12:07:28');

-- --------------------------------------------------------

--
-- Table structure for table `other_trans_name`
--

CREATE TABLE `other_trans_name` (
  `id` int(11) NOT NULL,
  `trans_cat` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `created_on` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `other_trans_name`
--

INSERT INTO `other_trans_name` (`id`, `trans_cat`, `name`, `insert_login_id`, `created_on`) VALUES
(1, 2, 'sk', 1, '2024-07-18'),
(2, 4, 'Ram', 1, '2024-07-20'),
(3, 7, 'Admin', 1, '2024-08-01'),
(4, 1, 'ABCS', 1, '2024-08-01'),
(5, 3, 'QWERTY', 1, '2024-08-01'),
(6, 8, 'MNB', 1, '2024-08-01'),
(7, 2, 'BM', 1, '2024-08-30'),
(8, 6, 'Ramesh', 1, '2024-08-30');

-- --------------------------------------------------------

--
-- Table structure for table `penalty_charges`
--

CREATE TABLE `penalty_charges` (
  `cus_profile_id` varchar(255) DEFAULT NULL,
  `penalty_date` varchar(255) DEFAULT NULL,
  `penalty` varchar(255) DEFAULT NULL,
  `paid_date` varchar(255) DEFAULT NULL,
  `paid_amnt` varchar(255) DEFAULT '0',
  `waiver_amnt` varchar(255) DEFAULT '0',
  `created_date` datetime DEFAULT current_timestamp(),
  `updated_time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `penalty_charges`
--

INSERT INTO `penalty_charges` (`cus_profile_id`, `penalty_date`, `penalty`, `paid_date`, `paid_amnt`, `waiver_amnt`, `created_date`, `updated_time`) VALUES
('8', '2024-07-27', '90', NULL, '0', '0', '2024-08-30 17:57:51', '2024-08-30 17:57:51'),
('8', '2024-08-03', '180', NULL, '0', '0', '2024-08-30 17:57:51', '2024-08-30 17:57:51'),
('8', '2024-08-10', '270', NULL, '0', '0', '2024-08-30 17:57:51', '2024-08-30 17:57:51'),
('8', '2024-08-17', '360', NULL, '0', '0', '2024-08-30 17:57:53', '2024-08-30 17:57:53'),
('8', '2024-08-24', '450', NULL, '0', '0', '2024-08-30 17:57:53', '2024-08-30 17:57:53'),
('8', NULL, NULL, '2024-08-30', '1300', '', '2024-08-30 17:58:58', '2024-08-30 17:58:58'),
('8', NULL, NULL, '2024-08-31', '50', '', '2024-08-31 15:24:49', '2024-08-31 15:24:49'),
('29', '2024-09-01', '18', NULL, '0', '0', '2024-09-02 11:12:26', '2024-09-02 11:12:26'),
('29', NULL, NULL, '2024-09-02', '18', '', '2024-09-02 15:12:25', '2024-09-02 15:12:25'),
('40', '2024-09-03', '143', NULL, '0', '0', '2024-09-05 11:49:32', '2024-09-05 11:49:32'),
('40', NULL, NULL, '2024-09-05', '143', '', '2024-09-05 15:51:50', '2024-09-05 15:51:50'),
('29', '2024-09-03', '18', NULL, '0', '0', '2024-09-05 16:15:38', '2024-09-05 16:15:38'),
('29', '2024-09-04', '36', NULL, '0', '0', '2024-09-05 16:15:38', '2024-09-05 16:15:38'),
('38', '2024-09-02', '15', NULL, '0', '0', '2024-09-05 16:29:25', '2024-09-05 16:29:25'),
('38', '2024-09-03', '30', NULL, '0', '0', '2024-09-05 16:29:25', '2024-09-05 16:29:25'),
('38', '2024-09-04', '45', NULL, '0', '0', '2024-09-05 16:29:25', '2024-09-05 16:29:25'),
('38', '2024-09-05', '15', NULL, '0', '0', '2024-09-06 10:31:07', '2024-09-06 10:31:07'),
('38', NULL, NULL, '2024-09-06', '105', '', '2024-09-06 10:31:31', '2024-09-06 10:31:31'),
('29', NULL, NULL, '2024-09-06', '54', '', '2024-09-06 10:36:34', '2024-09-06 10:36:34'),
('29', '2024-09-07', '18', NULL, '0', '0', '2024-09-09 12:55:52', '2024-09-09 12:55:52'),
('29', '2024-09-08', '36', NULL, '0', '0', '2024-09-09 12:55:52', '2024-09-09 12:55:52'),
('38', '2024-09-07', '15', NULL, '0', '0', '2024-09-09 12:59:25', '2024-09-09 12:59:25'),
('38', '2024-09-08', '30', NULL, '0', '0', '2024-09-09 12:59:25', '2024-09-09 12:59:25'),
('38', NULL, NULL, '2024-09-09', '45', '45', '2024-09-09 13:00:19', '2024-09-09 13:00:19'),
('33', '2024-09-01', '20', NULL, '0', '0', '2024-09-09 14:20:25', '2024-09-09 14:20:25'),
('33', '2024-09-02', '40', NULL, '0', '0', '2024-09-09 14:20:25', '2024-09-09 14:20:25'),
('33', '2024-09-03', '60', NULL, '0', '0', '2024-09-09 14:20:25', '2024-09-09 14:20:25'),
('33', '2024-09-04', '80', NULL, '0', '0', '2024-09-09 14:20:25', '2024-09-09 14:20:25'),
('33', '2024-09-06', '100', NULL, '0', '0', '2024-09-09 14:20:26', '2024-09-09 14:20:26'),
('33', '2024-09-07', '120', NULL, '0', '0', '2024-09-09 14:20:26', '2024-09-09 14:20:26'),
('33', '2024-09-08', '140', NULL, '0', '0', '2024-09-09 14:20:26', '2024-09-09 14:20:26'),
('33', NULL, NULL, '2024-09-09', '', '25', '2024-09-09 14:23:24', '2024-09-09 14:23:24'),
('33', NULL, NULL, '2024-09-09', '200', '150', '2024-09-09 14:25:45', '2024-09-09 14:25:45'),
('29', NULL, NULL, '2024-09-09', '24', '30', '2024-09-09 14:39:44', '2024-09-09 14:39:44'),
('14', '2024-07-25', '20', NULL, '0', '0', '2024-09-09 15:04:47', '2024-09-09 15:04:47'),
('14', '2024-07-26', '40', NULL, '0', '0', '2024-09-09 15:04:56', '2024-09-09 15:04:56'),
('14', '2024-07-27', '60', NULL, '0', '0', '2024-09-09 15:05:00', '2024-09-09 15:05:00'),
('14', '2024-07-28', '80', NULL, '0', '0', '2024-09-09 15:05:10', '2024-09-09 15:05:10'),
('14', '2024-07-29', '100', NULL, '0', '0', '2024-09-09 15:05:16', '2024-09-09 15:05:16'),
('14', '2024-07-30', '120', NULL, '0', '0', '2024-09-09 15:05:33', '2024-09-09 15:05:33'),
('14', '2024-07-31', '140', NULL, '0', '0', '2024-09-09 15:05:35', '2024-09-09 15:05:35'),
('14', '2024-08-01', '160', NULL, '0', '0', '2024-09-09 15:05:35', '2024-09-09 15:05:35'),
('14', '2024-08-02', '180', NULL, '0', '0', '2024-09-09 15:05:35', '2024-09-09 15:05:35'),
('14', '2024-08-03', '200', NULL, '0', '0', '2024-09-09 15:05:35', '2024-09-09 15:05:35'),
('14', '2024-08-04', '220', NULL, '0', '0', '2024-09-09 15:05:35', '2024-09-09 15:05:35'),
('14', '2024-08-05', '240', NULL, '0', '0', '2024-09-09 15:05:35', '2024-09-09 15:05:35'),
('14', '2024-08-06', '260', NULL, '0', '0', '2024-09-09 15:05:36', '2024-09-09 15:05:36'),
('14', '2024-08-07', '280', NULL, '0', '0', '2024-09-09 15:05:36', '2024-09-09 15:05:36'),
('14', '2024-08-08', '300', NULL, '0', '0', '2024-09-09 15:05:36', '2024-09-09 15:05:36'),
('14', '2024-08-09', '320', NULL, '0', '0', '2024-09-09 15:05:36', '2024-09-09 15:05:36'),
('14', '2024-08-10', '340', NULL, '0', '0', '2024-09-09 15:05:36', '2024-09-09 15:05:36'),
('14', '2024-08-11', '360', NULL, '0', '0', '2024-09-09 15:05:36', '2024-09-09 15:05:36'),
('14', '2024-08-12', '380', NULL, '0', '0', '2024-09-09 15:05:36', '2024-09-09 15:05:36'),
('14', '2024-08-13', '400', NULL, '0', '0', '2024-09-09 15:05:36', '2024-09-09 15:05:36'),
('14', '2024-08-14', '420', NULL, '0', '0', '2024-09-09 15:05:39', '2024-09-09 15:05:39'),
('14', '2024-08-15', '440', NULL, '0', '0', '2024-09-09 15:05:50', '2024-09-09 15:05:50'),
('14', '2024-08-16', '460', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-17', '480', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-18', '500', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-19', '520', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-20', '540', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-21', '560', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-22', '580', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-23', '600', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-24', '620', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-25', '640', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-26', '660', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-27', '680', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-28', '700', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-29', '720', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-30', '740', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-08-31', '760', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-09-01', '780', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-09-02', '800', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-09-03', '820', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-09-04', '840', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-09-05', '860', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-09-06', '880', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-09-07', '900', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-09-08', '920', NULL, '0', '0', '2024-09-09 15:05:54', '2024-09-09 15:05:54'),
('14', '2024-09-09', '20', NULL, '0', '0', '2024-09-11 11:36:58', '2024-09-11 11:36:58'),
('14', '2024-09-10', '40', NULL, '0', '0', '2024-09-11 11:36:59', '2024-09-11 11:36:59'),
('14', '2024-09-11', '20', NULL, '0', '0', '2024-09-12 16:05:57', '2024-09-12 16:05:57'),
('38', '2024-09-11', '15', NULL, '0', '0', '2024-09-17 09:53:17', '2024-09-17 09:53:17'),
('38', '2024-09-12', '30', NULL, '0', '0', '2024-09-17 09:53:17', '2024-09-17 09:53:17'),
('38', '2024-09-13', '45', NULL, '0', '0', '2024-09-17 09:53:17', '2024-09-17 09:53:17'),
('38', '2024-09-14', '60', NULL, '0', '0', '2024-09-17 09:53:17', '2024-09-17 09:53:17'),
('38', '2024-09-15', '75', NULL, '0', '0', '2024-09-17 09:53:17', '2024-09-17 09:53:17'),
('38', '2024-09-16', '90', NULL, '0', '0', '2024-09-17 09:53:17', '2024-09-17 09:53:17'),
('8', '2024-09-14', '90', NULL, '0', '0', '2024-09-17 11:46:06', '2024-09-17 11:46:06');

-- --------------------------------------------------------

--
-- Table structure for table `proof_info`
--

CREATE TABLE `proof_info` (
  `id` int(11) NOT NULL,
  `addProof_name` varchar(100) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) NOT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `proof_info`
--

INSERT INTO `proof_info` (`id`, `addProof_name`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'Aadhar', 3, 0, '2024-07-16', NULL),
(2, 'Family Card', 3, 0, '2024-07-16', NULL),
(3, 'Salary Slip', 3, 0, '2024-07-16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `property_info`
--

CREATE TABLE `property_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_profile_id` varchar(255) NOT NULL,
  `property` varchar(100) NOT NULL,
  `property_detail` varchar(100) NOT NULL,
  `property_holder` int(11) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) NOT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_info`
--

INSERT INTO `property_info` (`id`, `cus_id`, `cus_profile_id`, `property`, `property_detail`, `property_holder`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '111111110000', '1', 'Agri land', '2 acre', 1, 3, 0, '2024-07-16', NULL),
(2, '111111110000', '1', 'House', '2 floor building', 2, 3, 0, '2024-07-16', NULL),
(3, '045566789999', '9', 'land', '10 acre', 8, 1, 0, '2024-07-19', NULL),
(4, '879456456123', '5', 'land', '3 acre', 5, 1, 0, '2024-07-19', NULL),
(5, '123456789012', '12', 'house', '2 floor', 6, 1, 0, '2024-07-19', NULL),
(6, '012346758906', '13', 'Agri land', '5 acre', 12, 1, 0, '2024-07-19', NULL),
(7, '123415671890', '20', 'House', '2 storey building', 20, 1, 0, '2024-08-29', NULL),
(8, '123456789122', '29', 'Agri land', '5 acre', 24, 1, 0, '2024-08-31', NULL),
(9, '224489088111', '31', 'House', '3Floor', 16, 1, 0, '2024-08-31', NULL),
(10, '415236699752', '32', 'House', 'own house', 25, 1, 0, '2024-08-31', NULL),
(11, '234156437665', '37', 'house', '1bhk house', 28, 1, 0, '2024-09-02', NULL),
(12, '111122223333', '51', 'Home', '1200 sq ft', 36, 1, 0, '2024-09-10', NULL),
(13, '67567567567567', '67', 'Land', 'hgj', 42, 1, 0, '2024-09-17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `repromotion_customer`
--

CREATE TABLE `repromotion_customer` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) DEFAULT NULL,
  `cus_name` varchar(100) DEFAULT NULL,
  `mobile1` varchar(11) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `linename` varchar(50) DEFAULT NULL,
  `branch_name` varchar(50) DEFAULT NULL,
  `c_sts` int(11) DEFAULT NULL,
  `insert_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `repromotion_customer`
--

INSERT INTO `repromotion_customer` (`id`, `cus_id`, `cus_name`, `mobile1`, `area`, `linename`, `branch_name`, `c_sts`, `insert_login_id`, `created_on`) VALUES
(1, '878712126789', 'Thomas', '7534567800', 'Echur', 'linename', 'Vandavasi', 6, 0, '2024-08-29'),
(2, '878712126789', 'Thomas', '7534567800', 'Echur', 'linename', 'Vandavasi', 6, 0, '2024-08-29'),
(3, '878712126789', 'Thomas', '7534567800', 'Echur', 'linename', 'Vandavasi', 6, 0, '2024-08-29'),
(4, '878712126789', 'Thomas', '7534567800', '', 'linename', '', 1, 0, '2024-08-29'),
(5, '879456456123', 'surya', '9874561230', 'Vsi - Gandhi road', 'linename', 'Vandavasi', 5, 0, '2024-08-30'),
(6, '878712126789', 'Thomas', '7534567800', 'chetpet', 'linename', 'chetpet', 5, 0, '2024-08-30'),
(7, '123415671890', 'Arun', '9876556789', 'Vandavasi', 'linename', 'Vandavasi', 2, 0, '2024-08-30');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role` varchar(150) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'Partner', 1, 1, '2024-07-16', '2024-07-16'),
(2, 'Staff', 1, NULL, '2024-07-16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `scheme`
--

CREATE TABLE `scheme` (
  `id` int(11) NOT NULL,
  `scheme_name` varchar(150) NOT NULL,
  `due_method` varchar(50) NOT NULL,
  `profit_method` varchar(20) NOT NULL,
  `interest_rate_percent` varchar(10) NOT NULL,
  `due_period_percent` varchar(10) NOT NULL,
  `overdue_penalty_percent` varchar(10) NOT NULL,
  `doc_charge_type` varchar(10) NOT NULL,
  `doc_charge_min` varchar(10) NOT NULL,
  `doc_charge_max` varchar(10) NOT NULL,
  `processing_fee_type` varchar(10) NOT NULL,
  `processing_fee_min` varchar(10) NOT NULL,
  `processing_fee_max` varchar(10) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scheme`
--

INSERT INTO `scheme` (`id`, `scheme_name`, `due_method`, `profit_method`, `interest_rate_percent`, `due_period_percent`, `overdue_penalty_percent`, `doc_charge_type`, `doc_charge_min`, `doc_charge_max`, `processing_fee_type`, `processing_fee_min`, `processing_fee_max`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'Daily 100', '3', 'Pre Benefit', '10', '100', '3', 'rupee', '100', '200', 'rupee', '0', '100', 1, 1, '2024-07-16', '2024-07-16'),
(2, 'WL 10', '2', 'Pre Benefit', '12', '10', '3', 'rupee', '0', '200', 'rupee', '0', '100', 1, NULL, '2024-07-16', NULL),
(3, 'ML5', '1', 'Pre Benefit', '15', '5', '3', 'rupee', '100', '200', 'rupee', '0', '100', 1, NULL, '2024-07-16', NULL),
(4, 'D1000', '3', 'Pre Benefit', '12', '100', '2', 'percent', '0', '2', 'percent', '0', '2', 1, 1, '2024-07-17', '2024-07-18'),
(5, 'W 5000', '2', 'Pre Benefit', '3', '7', '2', 'percent', '2', '5', 'percent', '0', '2', 1, NULL, '2024-07-17', NULL),
(6, 'M10000', '1', 'Pre Benefit', '10', '10', '400', 'percent', '5', '10', 'percent', '0', '5', 1, NULL, '2024-07-18', NULL),
(7, '10 A', '1', 'Pre Benefit', '20', '10', '2', 'percent', '2', '3', 'percent', '2', '3', 1, NULL, '2024-09-10', NULL),
(8, 'Weakly', '2', 'Pre Benefit', '12', '10', '2', 'percent', '2', '5', 'rupee', '0', '500', 1, NULL, '2024-09-12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `state_name` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `state_name`, `status`) VALUES
(1, 'Tamil Nadu', 1),
(2, 'Puducherry', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sub_menu_list`
--

CREATE TABLE `sub_menu_list` (
  `id` int(11) NOT NULL,
  `main_menu` int(11) NOT NULL,
  `sub_menu` varchar(100) NOT NULL,
  `link` varchar(100) NOT NULL,
  `icon` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='All Sub menu of the project should be placed here';

--
-- Dumping data for table `sub_menu_list`
--

INSERT INTO `sub_menu_list` (`id`, `main_menu`, `sub_menu`, `link`, `icon`) VALUES
(1, 1, 'Dashboard', 'dashboard', 'view_comfy'),
(2, 2, 'Company Creation', 'company_creation', 'domain'),
(3, 2, 'Branch Creation', 'branch_creation', 'add-to-list'),
(4, 2, 'Loan Category Creation', 'loan_category_creation', 'recent_actors'),
(5, 2, 'Area Creation', 'area_creation', 'location'),
(6, 3, 'Bank Creation', 'bank_creation', 'store_mall_directory'),
(7, 3, 'Agent Creation', 'agent_creation', 'person_add'),
(8, 3, 'User Creation', 'user_creation', 'group_add'),
(9, 4, 'Loan Entry', 'loan_entry', 'local_library'),
(10, 5, 'Approval', 'approval', 'offline_pin'),
(11, 6, 'Loan Issue', 'loan_issue', 'credit-card'),
(12, 7, 'Collection', 'collection', 'devices_other'),
(13, 8, 'Closed', 'closed', 'circle-with-cross'),
(14, 9, 'NOC', 'noc', 'book'),
(15, 10, 'Accounts', 'accounts', 'rate_review'),
(16, 10, 'Bank Clearance', 'bank_clearance', 'assignment'),
(17, 10, 'Balance Sheet', 'balance_sheet', 'colours'),
(18, 11, 'Update Customer', 'update_customer', 'cloud_upload'),
(19, 12, 'Customer Data', 'customer_data', 'person_pin'),
(20, 13, 'Search', 'search_screen', 'search'),
(21, 14, 'Loan Issue Report', 'loan_issue_report', 'area-graph'),
(22, 14, 'Collection Report', 'collection_report', 'event_note'),
(23, 14, 'Balance Report', 'balance_report', 'event_available'),
(24, 14, 'Closed Report', 'closed_report', 'erase'),
(25, 15, 'Bulk Upload Report', 'bulk_upload', 'cloud_done'),
(26, 14, 'Ledger View Report', 'ledger_view_report', 'terrain');

-- --------------------------------------------------------

--
-- Table structure for table `taluks`
--

CREATE TABLE `taluks` (
  `id` int(11) NOT NULL,
  `state_id` int(11) NOT NULL,
  `district_id` int(11) NOT NULL,
  `taluk_name` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taluks`
--

INSERT INTO `taluks` (`id`, `state_id`, `district_id`, `taluk_name`, `status`) VALUES
(1, 1, 1, 'Ariyalur', 1),
(2, 1, 1, 'Andimadam', 1),
(3, 1, 1, 'Sendurai', 1),
(4, 1, 1, 'Udaiyarpalayam', 1),
(5, 1, 2, 'Alandur', 1),
(6, 1, 2, 'Ambattur', 1),
(7, 1, 2, 'Aminjikarai', 1),
(8, 1, 2, 'Ayanavaram', 1),
(9, 1, 2, 'Egmore', 1),
(10, 1, 2, 'Guindy', 1),
(11, 1, 2, 'Madhavaram', 1),
(12, 1, 2, 'Madhuravoyal', 1),
(13, 1, 2, 'Mambalam', 1),
(14, 1, 2, 'Mylapore', 1),
(15, 1, 2, 'Perambur', 1),
(16, 1, 2, 'Purasavakkam', 1),
(17, 1, 2, 'Sholinganallur', 1),
(18, 1, 2, 'Thiruvottriyur', 1),
(19, 1, 2, 'Tondiarpet', 1),
(20, 1, 2, 'Velacherry', 1),
(21, 1, 3, 'Chengalpattu', 1),
(22, 1, 3, 'Cheyyur', 1),
(23, 1, 3, 'Maduranthakam', 1),
(24, 1, 3, 'Pallavaram', 1),
(25, 1, 3, 'Tambaram', 1),
(26, 1, 3, 'Thirukalukundram', 1),
(27, 1, 3, 'Tiruporur', 1),
(28, 1, 3, 'Vandalur', 1),
(29, 1, 4, 'Aanaimalai', 1),
(30, 1, 4, 'Annur', 1),
(31, 1, 4, 'Coimbatore(North)', 1),
(32, 1, 4, 'Coimbatore(South)', 1),
(33, 1, 4, 'Kinathukadavu', 1),
(34, 1, 4, 'Madukarai', 1),
(35, 1, 4, 'Mettupalayam', 1),
(36, 1, 4, 'Perur', 1),
(37, 1, 4, 'Pollachi', 1),
(38, 1, 4, 'Sulur', 1),
(39, 1, 4, 'Valparai', 1),
(40, 1, 5, 'Cuddalore', 1),
(41, 1, 5, 'Bhuvanagiri', 1),
(42, 1, 5, 'Chidambaram', 1),
(43, 1, 5, 'Kattumannarkoil', 1),
(44, 1, 5, 'Kurinjipadi', 1),
(45, 1, 5, 'Panruti', 1),
(46, 1, 5, 'Srimushnam', 1),
(47, 1, 5, 'Thittakudi', 1),
(48, 1, 5, 'Veppur', 1),
(49, 1, 5, 'Virudhachalam', 1),
(50, 1, 6, 'Dharmapuri', 1),
(51, 1, 6, 'Harur', 1),
(52, 1, 6, 'Karimangalam', 1),
(53, 1, 6, 'Nallampalli', 1),
(54, 1, 6, 'Palacode', 1),
(55, 1, 6, 'Pappireddipatti', 1),
(56, 1, 6, 'Pennagaram', 1),
(57, 1, 7, 'Atthur', 1),
(58, 1, 7, 'Dindigul(East)', 1),
(59, 1, 7, 'Dindigul(West)', 1),
(60, 1, 7, 'Guziliyamparai', 1),
(61, 1, 7, 'Kodaikanal', 1),
(62, 1, 7, 'Natham', 1),
(63, 1, 7, 'Nilakottai', 1),
(64, 1, 7, 'Oddanchatram', 1),
(65, 1, 7, 'Palani', 1),
(66, 1, 7, 'Vedasandur', 1),
(67, 1, 8, 'Erode', 1),
(68, 1, 8, 'Anthiyur', 1),
(69, 1, 8, 'Bhavani', 1),
(70, 1, 8, 'Gobichettipalayam', 1),
(71, 1, 8, 'Kodumudi', 1),
(72, 1, 8, 'Modakurichi', 1),
(73, 1, 8, 'Nambiyur', 1),
(74, 1, 8, 'Perundurai', 1),
(75, 1, 8, 'Sathiyamangalam', 1),
(76, 1, 8, 'Thalavadi', 1),
(77, 1, 9, 'Kallakurichi', 1),
(78, 1, 9, 'Chinnaselam', 1),
(79, 1, 9, 'Kalvarayan Hills', 1),
(80, 1, 9, 'Sankarapuram', 1),
(81, 1, 9, 'Tirukoilur', 1),
(82, 1, 9, 'Ulundurpet', 1),
(83, 1, 10, 'Kancheepuram', 1),
(84, 1, 10, 'Kundrathur', 1),
(85, 1, 10, 'Sriperumbudur', 1),
(86, 1, 10, 'Uthiramerur', 1),
(87, 1, 10, 'Walajabad', 1),
(88, 1, 11, 'Agasteeswaram', 1),
(89, 1, 11, 'Kalkulam', 1),
(90, 1, 11, 'Killiyur', 1),
(91, 1, 11, 'Thiruvatar', 1),
(92, 1, 11, 'Thovalai', 1),
(93, 1, 11, 'Vilavankodu', 1),
(94, 1, 12, 'Karur', 1),
(95, 1, 12, 'Aravakurichi', 1),
(96, 1, 12, 'Kadavur', 1),
(97, 1, 12, 'Krishnarayapuram', 1),
(98, 1, 12, 'Kulithalai', 1),
(99, 1, 12, 'Manmangalam', 1),
(100, 1, 12, 'Pugalur', 1),
(101, 1, 13, 'Krishnagiri', 1),
(102, 1, 13, 'Anjetty', 1),
(103, 1, 13, 'Bargur', 1),
(104, 1, 13, 'Hosur', 1),
(105, 1, 13, 'Pochampalli', 1),
(106, 1, 13, 'Sulagiri', 1),
(107, 1, 13, 'Thenkanikottai', 1),
(108, 1, 13, 'Uthangarai', 1),
(109, 1, 14, 'Kallikudi', 1),
(110, 1, 14, 'Madurai (East)', 1),
(111, 1, 14, 'Madurai (North)', 1),
(112, 1, 14, 'Madurai (South)', 1),
(113, 1, 14, 'Madurai (West)', 1),
(114, 1, 14, 'Melur', 1),
(115, 1, 14, 'Peraiyur', 1),
(116, 1, 14, 'Thirumangalam', 1),
(117, 1, 14, 'Thiruparankundram', 1),
(118, 1, 14, 'Usilampatti', 1),
(119, 1, 14, 'Vadipatti', 1),
(120, 1, 15, 'Mayiladuthurai', 1),
(121, 1, 15, 'Kuthalam', 1),
(122, 1, 15, 'Sirkali', 1),
(123, 1, 15, 'Tharangambadi', 1),
(124, 1, 16, 'Nagapattinam', 1),
(125, 1, 16, 'Kilvelur', 1),
(126, 1, 16, 'Thirukkuvalai', 1),
(127, 1, 16, 'Vedaranyam', 1),
(128, 1, 17, 'Namakkal', 1),
(129, 1, 17, 'Kholli Hills', 1),
(130, 1, 17, 'Kumarapalayam', 1),
(131, 1, 17, 'Mohanoor', 1),
(132, 1, 17, 'Paramathi Velur', 1),
(133, 1, 17, 'Rasipuram', 1),
(134, 1, 17, 'Senthamangalam', 1),
(135, 1, 17, 'Tiruchengode', 1),
(136, 1, 18, 'Udagamandalam', 1),
(137, 1, 18, 'Coonoor', 1),
(138, 1, 18, 'Gudalur', 1),
(139, 1, 18, 'Kothagiri', 1),
(140, 1, 18, 'Kundah', 1),
(141, 1, 18, 'Pandalur', 1),
(142, 1, 19, 'Perambalur', 1),
(143, 1, 19, 'Alathur', 1),
(144, 1, 19, 'Kunnam', 1),
(145, 1, 19, 'Veppanthattai', 1),
(146, 1, 20, 'Pudukottai', 1),
(147, 1, 20, 'Alangudi', 1),
(148, 1, 20, 'Aranthangi', 1),
(149, 1, 20, 'Avudiyarkoil', 1),
(150, 1, 20, 'Gandarvakottai', 1),
(151, 1, 20, 'Iluppur', 1),
(152, 1, 20, 'Karambakudi', 1),
(153, 1, 20, 'Kulathur', 1),
(154, 1, 20, 'Manamelkudi', 1),
(155, 1, 20, 'Ponnamaravathi', 1),
(156, 1, 20, 'Thirumayam', 1),
(157, 1, 20, 'Viralimalai', 1),
(158, 1, 21, 'Ramanathapuram', 1),
(159, 1, 21, 'Kadaladi', 1),
(160, 1, 21, 'Kamuthi', 1),
(161, 1, 21, 'Kezhakarai', 1),
(162, 1, 21, 'Mudukulathur', 1),
(163, 1, 21, 'Paramakudi', 1),
(164, 1, 21, 'Rajasingamangalam', 1),
(165, 1, 21, 'Rameswaram', 1),
(166, 1, 21, 'Tiruvadanai', 1),
(167, 1, 22, 'Arakkonam', 1),
(168, 1, 22, 'Arcot', 1),
(169, 1, 22, 'Kalavai', 1),
(170, 1, 22, 'Nemili', 1),
(171, 1, 22, 'Sholingur', 1),
(172, 1, 22, 'Walajah', 1),
(173, 1, 23, 'Salem', 1),
(174, 1, 23, 'Attur', 1),
(175, 1, 23, 'Edapadi', 1),
(176, 1, 23, 'Gangavalli', 1),
(177, 1, 23, 'Kadaiyampatti', 1),
(178, 1, 23, 'Mettur', 1),
(179, 1, 23, 'Omalur', 1),
(180, 1, 23, 'Pethanayakanpalayam', 1),
(181, 1, 23, 'Salem South', 1),
(182, 1, 23, 'Salem West', 1),
(183, 1, 23, 'Sankari', 1),
(184, 1, 23, 'Vazhapadi', 1),
(185, 1, 23, 'Yercaud', 1),
(186, 1, 24, 'Sivagangai', 1),
(187, 1, 24, 'Devakottai', 1),
(188, 1, 24, 'Ilayankudi', 1),
(189, 1, 24, 'Kalaiyarkovil', 1),
(190, 1, 24, 'Karaikudi', 1),
(191, 1, 24, 'Manamadurai', 1),
(192, 1, 24, 'Singampunari', 1),
(193, 1, 24, 'Thirupuvanam', 1),
(194, 1, 24, 'Tirupathur', 1),
(195, 1, 25, 'Tenkasi', 1),
(196, 1, 25, 'Alangulam', 1),
(197, 1, 25, 'Kadayanallur', 1),
(198, 1, 25, 'Sankarankovil', 1),
(199, 1, 25, 'Shenkottai', 1),
(200, 1, 25, 'Sivagiri', 1),
(201, 1, 25, 'Thiruvengadam', 1),
(202, 1, 25, 'Veerakeralampudur', 1),
(203, 1, 26, 'Thanjavur', 1),
(204, 1, 26, 'Boothalur', 1),
(205, 1, 26, 'Kumbakonam', 1),
(206, 1, 26, 'Orathanadu', 1),
(207, 1, 26, 'Papanasam', 1),
(208, 1, 26, 'Pattukottai', 1),
(209, 1, 26, 'Peravurani', 1),
(210, 1, 26, 'Thiruvaiyaru', 1),
(211, 1, 26, 'Thiruvidaimaruthur', 1),
(212, 1, 27, 'Theni', 1),
(213, 1, 27, 'Aandipatti', 1),
(214, 1, 27, 'Bodinayakanur', 1),
(215, 1, 27, 'Periyakulam', 1),
(216, 1, 27, 'Uthamapalayam', 1),
(217, 1, 28, 'Thoothukudi', 1),
(218, 1, 28, 'Eral', 1),
(219, 1, 28, 'Ettayapuram', 1),
(220, 1, 28, 'Kayathar', 1),
(221, 1, 28, 'Kovilpatti', 1),
(222, 1, 28, 'Ottapidaram', 1),
(223, 1, 28, 'Sattankulam', 1),
(224, 1, 28, 'Srivaikundam', 1),
(225, 1, 28, 'Tiruchendur', 1),
(226, 1, 28, 'Vilathikulam', 1),
(227, 1, 29, 'Lalgudi', 1),
(228, 1, 29, 'Manachanallur', 1),
(229, 1, 29, 'Manapparai', 1),
(230, 1, 29, 'Marungapuri', 1),
(231, 1, 29, 'Musiri', 1),
(232, 1, 29, 'Srirangam', 1),
(233, 1, 29, 'Thottiam', 1),
(234, 1, 29, 'Thuraiyur', 1),
(235, 1, 29, 'Tiruchirapalli (West)', 1),
(236, 1, 29, 'Tiruchirappalli (East)', 1),
(237, 1, 29, 'Tiruverumbur', 1),
(238, 1, 30, 'Tirunelveli', 1),
(239, 1, 30, 'Ambasamudram', 1),
(240, 1, 30, 'Cheranmahadevi', 1),
(241, 1, 30, 'Manur', 1),
(242, 1, 30, 'Nanguneri', 1),
(243, 1, 30, 'Palayamkottai', 1),
(244, 1, 30, 'Radhapuram', 1),
(245, 1, 30, 'Thisayanvilai', 1),
(246, 1, 31, 'Avinashi', 1),
(247, 1, 31, 'Dharapuram', 1),
(248, 1, 31, 'Kangeyam', 1),
(249, 1, 31, 'Madathukkulam', 1),
(250, 1, 31, 'Oothukuli', 1),
(251, 1, 31, 'Palladam', 1),
(252, 1, 31, 'Tiruppur (North)', 1),
(253, 1, 31, 'Tiruppur (South)', 1),
(254, 1, 31, 'Udumalaipettai', 1),
(255, 1, 32, 'Tirupathur\"', 1),
(256, 1, 32, 'Ambur', 1),
(257, 1, 32, 'Natrampalli', 1),
(258, 1, 32, 'Vaniyambadi', 1),
(259, 1, 33, 'Thiruvallur', 1),
(260, 1, 33, 'Avadi', 1),
(261, 1, 33, 'Gummidipoondi', 1),
(262, 1, 33, 'Pallipattu', 1),
(263, 1, 33, 'Ponneri', 1),
(264, 1, 33, 'Poonamallee', 1),
(265, 1, 33, 'R.K. Pet', 1),
(266, 1, 33, 'Tiruthani', 1),
(267, 1, 33, 'Uthukottai', 1),
(268, 1, 34, 'Thiruvannamalai', 1),
(269, 1, 34, 'Arni', 1),
(270, 1, 34, 'Chengam', 1),
(271, 1, 34, 'Chetpet', 1),
(272, 1, 34, 'Cheyyar', 1),
(273, 1, 34, 'Jamunamarathur', 1),
(274, 1, 34, 'Kalasapakkam', 1),
(275, 1, 34, 'Kilpennathur', 1),
(276, 1, 34, 'Polur', 1),
(277, 1, 34, 'Thandramet', 1),
(278, 1, 34, 'Vandavasi', 1),
(279, 1, 34, 'Vembakkam', 1),
(280, 1, 35, 'Thiruvarur', 1),
(281, 1, 35, 'Kodavasal', 1),
(282, 1, 35, 'Koothanallur', 1),
(283, 1, 35, 'Mannargudi', 1),
(284, 1, 35, 'Nannilam', 1),
(285, 1, 35, 'Needamangalam', 1),
(286, 1, 35, 'Thiruthuraipoondi', 1),
(287, 1, 35, 'Valangaiman', 1),
(288, 1, 36, 'Vellore', 1),
(289, 1, 36, 'Aanikattu', 1),
(290, 1, 36, 'Gudiyatham', 1),
(291, 1, 36, 'K V Kuppam', 1),
(292, 1, 36, 'Katpadi', 1),
(293, 1, 36, 'Pernambut', 1),
(294, 1, 37, 'Villupuram', 1),
(295, 1, 37, 'Gingee', 1),
(296, 1, 37, 'Kandachipuram', 1),
(297, 1, 37, 'Marakanam', 1),
(298, 1, 37, 'Melmalaiyanur', 1),
(299, 1, 37, 'Thiruvennainallur', 1),
(300, 1, 37, 'Tindivanam', 1),
(301, 1, 37, 'Vanur', 1),
(302, 1, 37, 'Vikravandi', 1),
(303, 1, 38, 'Virudhunagar', 1),
(304, 1, 38, 'Aruppukottai', 1),
(305, 1, 38, 'Kariyapatti', 1),
(306, 1, 38, 'Rajapalayam', 1),
(307, 1, 38, 'Sathur', 1),
(308, 1, 38, 'Sivakasi', 1),
(309, 1, 38, 'Srivilliputhur', 1),
(310, 1, 38, 'Tiruchuli', 1),
(311, 1, 38, 'Vembakottai', 1),
(312, 1, 38, 'Watrap', 1),
(313, 2, 39, 'Puducherry', 1),
(314, 2, 39, 'Oulgaret', 1),
(315, 2, 39, 'Villianur', 1),
(316, 2, 39, 'Bahour', 1),
(317, 2, 39, 'Karaikal', 1),
(318, 2, 39, 'Thirunallar', 1),
(319, 2, 39, 'Mahe', 1),
(320, 2, 39, 'Yanam', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `user_code` varchar(100) NOT NULL,
  `role` int(11) NOT NULL,
  `designation` int(11) NOT NULL,
  `address` varchar(100) NOT NULL,
  `place` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `branch` varchar(255) NOT NULL,
  `loan_category` varchar(255) NOT NULL,
  `line` varchar(255) NOT NULL,
  `collection_access` int(11) NOT NULL,
  `download_access` int(11) NOT NULL,
  `screens` varchar(255) NOT NULL,
  `insert_login_id` varchar(100) NOT NULL,
  `update_login_id` varchar(100) NOT NULL,
  `created_on` date NOT NULL,
  `updated_on` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='All the users will be stored here with screen access details';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `user_code`, `role`, `designation`, `address`, `place`, `email`, `mobile`, `user_name`, `password`, `branch`, `loan_category`, `line`, `collection_access`, `download_access`, `screens`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'Super Admin', 'US-001', 1, 1, '', '', '', '', 'admin', '123', '1,2,4,5,6', '1,2,3,4', '1,2,6,8,10', 1, 1, '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,26,25', '1', '1', '2024-06-13', '2024-09-17'),
(2, 'Raj', 'US-002', 2, 1, 'No 25', 'Vandavasi', '', '9842138111', 'Manager', '123', '1', '1', '1,2', 1, 2, '1,10,11,12,15,16,17,21,22,23,24', '1', '', '2024-07-16', '0000-00-00'),
(3, 'Prem', 'US-003', 2, 2, '25', 'Vandavasi', '', '', 'Prem', '123', '1', '1', '1', 1, 0, '1,9,11,12', '1', '', '2024-07-16', '0000-00-00'),
(4, 'SK', 'US-004', 2, 2, 'vsi', 'chetpet', '', '6549871230', 'sk', '123', '1,5', '1', '1,8', 2, 0, '9,12', '1', '1', '2024-07-17', '2024-07-20'),
(5, 'sham', 'US-005', 2, 2, '', '', '', '', 'staff', '123', '1,2,4,5,6', '1,2,4,3', '1,2,6,8,10,12', 1, 0, '1,9,10,11,12,13,14,15,18,19,20,21,22,23,24,26,25', '1', '1', '2024-07-18', '2024-09-02'),
(6, 'Farzana', 'US-006', 2, 2, 'Potti Naidu street', 'Vandavasi', '', '', 'Farzana', 'Farz*', '1', '1', '1', 1, 0, '5,9,21,22,23,24,26', '1', '1', '2024-08-29', '2024-09-02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts_collect_entry`
--
ALTER TABLE `accounts_collect_entry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agent_creation`
--
ALTER TABLE `agent_creation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `area_creation`
--
ALTER TABLE `area_creation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Line id` (`line_id`),
  ADD KEY `branch` (`branch_id`);

--
-- Indexes for table `area_name_creation`
--
ALTER TABLE `area_name_creation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branchid` (`branch_id`);

--
-- Indexes for table `bank_clearance`
--
ALTER TABLE `bank_clearance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bank_creation`
--
ALTER TABLE `bank_creation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bank_info`
--
ALTER TABLE `bank_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `branch_creation`
--
ALTER TABLE `branch_creation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `state_id` (`state`),
  ADD KEY `district_id` (`district`),
  ADD KEY `taluk_id` (`taluk`);

--
-- Indexes for table `cash_tally_modes`
--
ALTER TABLE `cash_tally_modes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cheque_info`
--
ALTER TABLE `cheque_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cheque_no_list`
--
ALTER TABLE `cheque_no_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cheque_upd`
--
ALTER TABLE `cheque_upd`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Profileid` (`cus_profile_id`);

--
-- Indexes for table `collection_charges`
--
ALTER TABLE `collection_charges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cusprofileid` (`cus_profile_id`);

--
-- Indexes for table `company_creation`
--
ALTER TABLE `company_creation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `State ids` (`state`),
  ADD KEY `District ids` (`district`),
  ADD KEY `Taluk ids` (`taluk`);

--
-- Indexes for table `customer_data`
--
ALTER TABLE `customer_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_profile`
--
ALTER TABLE `customer_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_status`
--
ALTER TABLE `customer_status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerProfileId` (`cus_profile_id`);

--
-- Indexes for table `designation`
--
ALTER TABLE `designation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `State id` (`state_id`);

--
-- Indexes for table `document_info`
--
ALTER TABLE `document_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `document_need`
--
ALTER TABLE `document_need`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `endorsement_info`
--
ALTER TABLE `endorsement_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `existing_customer`
--
ALTER TABLE `existing_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `family_info`
--
ALTER TABLE `family_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback_info`
--
ALTER TABLE `feedback_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gold_info`
--
ALTER TABLE `gold_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kyc_info`
--
ALTER TABLE `kyc_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proof` (`proof`),
  ADD KEY `fam-mem` (`fam_mem`);

--
-- Indexes for table `line_name_creation`
--
ALTER TABLE `line_name_creation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branch id` (`branch_id`);

--
-- Indexes for table `loan_category`
--
ALTER TABLE `loan_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loan_category_creation`
--
ALTER TABLE `loan_category_creation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Loan Category` (`loan_category`);

--
-- Indexes for table `loan_entry_loan_calculation`
--
ALTER TABLE `loan_entry_loan_calculation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer profile id` (`cus_profile_id`);

--
-- Indexes for table `loan_issue`
--
ALTER TABLE `loan_issue`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_list`
--
ALTER TABLE `menu_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mortgage_info`
--
ALTER TABLE `mortgage_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `noc`
--
ALTER TABLE `noc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `noc_ref`
--
ALTER TABLE `noc_ref`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `other_transaction`
--
ALTER TABLE `other_transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `other_trans_name`
--
ALTER TABLE `other_trans_name`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proof_info`
--
ALTER TABLE `proof_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property_info`
--
ALTER TABLE `property_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_holder` (`property_holder`);

--
-- Indexes for table `repromotion_customer`
--
ALTER TABLE `repromotion_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scheme`
--
ALTER TABLE `scheme`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_menu_list`
--
ALTER TABLE `sub_menu_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Main menu id` (`main_menu`);

--
-- Indexes for table `taluks`
--
ALTER TABLE `taluks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `District id` (`district_id`),
  ADD KEY `States id` (`state_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Role id` (`role`),
  ADD KEY `Designation id` (`designation`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts_collect_entry`
--
ALTER TABLE `accounts_collect_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `agent_creation`
--
ALTER TABLE `agent_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `area_creation`
--
ALTER TABLE `area_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `area_name_creation`
--
ALTER TABLE `area_name_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `bank_clearance`
--
ALTER TABLE `bank_clearance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bank_creation`
--
ALTER TABLE `bank_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bank_info`
--
ALTER TABLE `bank_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `branch_creation`
--
ALTER TABLE `branch_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cash_tally_modes`
--
ALTER TABLE `cash_tally_modes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `cheque_info`
--
ALTER TABLE `cheque_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `cheque_no_list`
--
ALTER TABLE `cheque_no_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `cheque_upd`
--
ALTER TABLE `cheque_upd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `collection`
--
ALTER TABLE `collection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `collection_charges`
--
ALTER TABLE `collection_charges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `company_creation`
--
ALTER TABLE `company_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer_data`
--
ALTER TABLE `customer_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer_profile`
--
ALTER TABLE `customer_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `customer_status`
--
ALTER TABLE `customer_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `designation`
--
ALTER TABLE `designation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `districts`
--
ALTER TABLE `districts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `document_info`
--
ALTER TABLE `document_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `document_need`
--
ALTER TABLE `document_need`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `endorsement_info`
--
ALTER TABLE `endorsement_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `existing_customer`
--
ALTER TABLE `existing_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `family_info`
--
ALTER TABLE `family_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `feedback_info`
--
ALTER TABLE `feedback_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `gold_info`
--
ALTER TABLE `gold_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `kyc_info`
--
ALTER TABLE `kyc_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `line_name_creation`
--
ALTER TABLE `line_name_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `loan_category`
--
ALTER TABLE `loan_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `loan_category_creation`
--
ALTER TABLE `loan_category_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `loan_entry_loan_calculation`
--
ALTER TABLE `loan_entry_loan_calculation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `loan_issue`
--
ALTER TABLE `loan_issue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `menu_list`
--
ALTER TABLE `menu_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `mortgage_info`
--
ALTER TABLE `mortgage_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `noc`
--
ALTER TABLE `noc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `noc_ref`
--
ALTER TABLE `noc_ref`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `other_transaction`
--
ALTER TABLE `other_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `other_trans_name`
--
ALTER TABLE `other_trans_name`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `proof_info`
--
ALTER TABLE `proof_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `property_info`
--
ALTER TABLE `property_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `repromotion_customer`
--
ALTER TABLE `repromotion_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `scheme`
--
ALTER TABLE `scheme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sub_menu_list`
--
ALTER TABLE `sub_menu_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `taluks`
--
ALTER TABLE `taluks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=321;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `area_creation`
--
ALTER TABLE `area_creation`
  ADD CONSTRAINT `Line id` FOREIGN KEY (`line_id`) REFERENCES `line_name_creation` (`id`),
  ADD CONSTRAINT `branch` FOREIGN KEY (`branch_id`) REFERENCES `branch_creation` (`id`);

--
-- Constraints for table `area_name_creation`
--
ALTER TABLE `area_name_creation`
  ADD CONSTRAINT `branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch_creation` (`id`);

--
-- Constraints for table `branch_creation`
--
ALTER TABLE `branch_creation`
  ADD CONSTRAINT `district_id` FOREIGN KEY (`district`) REFERENCES `districts` (`id`),
  ADD CONSTRAINT `state_id` FOREIGN KEY (`state`) REFERENCES `states` (`id`),
  ADD CONSTRAINT `taluk_id` FOREIGN KEY (`taluk`) REFERENCES `taluks` (`id`);

--
-- Constraints for table `collection`
--
ALTER TABLE `collection`
  ADD CONSTRAINT `Profileid` FOREIGN KEY (`cus_profile_id`) REFERENCES `customer_profile` (`id`);

--
-- Constraints for table `collection_charges`
--
ALTER TABLE `collection_charges`
  ADD CONSTRAINT `cusprofileid` FOREIGN KEY (`cus_profile_id`) REFERENCES `customer_profile` (`id`);

--
-- Constraints for table `company_creation`
--
ALTER TABLE `company_creation`
  ADD CONSTRAINT `District ids` FOREIGN KEY (`district`) REFERENCES `districts` (`id`),
  ADD CONSTRAINT `State ids` FOREIGN KEY (`state`) REFERENCES `states` (`id`),
  ADD CONSTRAINT `Taluk ids` FOREIGN KEY (`taluk`) REFERENCES `taluks` (`id`);

--
-- Constraints for table `customer_status`
--
ALTER TABLE `customer_status`
  ADD CONSTRAINT `customerProfileId` FOREIGN KEY (`cus_profile_id`) REFERENCES `customer_profile` (`id`);

--
-- Constraints for table `districts`
--
ALTER TABLE `districts`
  ADD CONSTRAINT `State id` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`);

--
-- Constraints for table `kyc_info`
--
ALTER TABLE `kyc_info`
  ADD CONSTRAINT `fam-mem` FOREIGN KEY (`fam_mem`) REFERENCES `family_info` (`id`),
  ADD CONSTRAINT `kyc_info_ibfk_1` FOREIGN KEY (`proof`) REFERENCES `proof_info` (`id`);

--
-- Constraints for table `line_name_creation`
--
ALTER TABLE `line_name_creation`
  ADD CONSTRAINT `branch id` FOREIGN KEY (`branch_id`) REFERENCES `branch_creation` (`id`);

--
-- Constraints for table `loan_category_creation`
--
ALTER TABLE `loan_category_creation`
  ADD CONSTRAINT `Loan Category` FOREIGN KEY (`loan_category`) REFERENCES `loan_category` (`id`);

--
-- Constraints for table `loan_entry_loan_calculation`
--
ALTER TABLE `loan_entry_loan_calculation`
  ADD CONSTRAINT `customer profile id` FOREIGN KEY (`cus_profile_id`) REFERENCES `customer_profile` (`id`);

--
-- Constraints for table `property_info`
--
ALTER TABLE `property_info`
  ADD CONSTRAINT `property_holder` FOREIGN KEY (`property_holder`) REFERENCES `family_info` (`id`);

--
-- Constraints for table `sub_menu_list`
--
ALTER TABLE `sub_menu_list`
  ADD CONSTRAINT `Main menu id` FOREIGN KEY (`main_menu`) REFERENCES `menu_list` (`id`);

--
-- Constraints for table `taluks`
--
ALTER TABLE `taluks`
  ADD CONSTRAINT `District id` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`),
  ADD CONSTRAINT `States id` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
