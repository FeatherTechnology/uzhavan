-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2025 at 01:38 PM
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
(2, 1, 'L1', 'Villianur', 1, '', 28, '147770', 1, '2025-09-08 15:55:31'),
(3, 1, 'L1', 'Villianur', 2, '1', 1, '2000', 1, '2025-09-08 15:56:04');

-- --------------------------------------------------------

--
-- Table structure for table `agent_creation`
--

CREATE TABLE `agent_creation` (
  `id` int(11) NOT NULL,
  `agent_code` varchar(100) NOT NULL,
  `agent_name` varchar(100) NOT NULL,
  `mobile1` varchar(100) DEFAULT NULL,
  `mobile2` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `insert_login_id` varchar(100) NOT NULL,
  `update_login_id` varchar(100) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agent_creation`
--

INSERT INTO `agent_creation` (`id`, `agent_code`, `agent_name`, `mobile1`, `mobile2`, `area`, `occupation`, `insert_login_id`, `update_login_id`, `created_date`, `updated_date`) VALUES
(1, 'AG-101', 'suba', '7675675675', '', 'JJ', 'Teacher', '1', NULL, '2025-07-10 12:08:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `area_creation`
--

CREATE TABLE `area_creation` (
  `id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `line_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `update_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `area_creation`
--

INSERT INTO `area_creation` (`id`, `branch_id`, `line_id`, `status`, `insert_login_id`, `update_login_id`, `created_on`, `update_on`) VALUES
(1, 2, 1, 1, 1, 1, '2025-07-10 10:52:50', '2025-09-16'),
(2, 2, 2, 1, 1, NULL, '2025-07-10 10:54:08', NULL),
(4, 2, 6, 1, 1, NULL, '2025-09-08 15:05:41', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `area_creation_area_name`
--

CREATE TABLE `area_creation_area_name` (
  `id` int(11) NOT NULL,
  `area_creation_id` int(25) NOT NULL,
  `area_id` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `area_creation_area_name`
--

INSERT INTO `area_creation_area_name` (`id`, `area_creation_id`, `area_id`) VALUES
(1, 1, 2),
(2, 1, 1),
(3, 1, 3),
(4, 2, 4),
(5, 3, 6),
(6, 3, 7),
(7, 4, 6),
(8, 4, 7);

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
(1, 'kaveri', 2, 1, 1, NULL, '2025-07-10 10:52:14', NULL),
(2, 'Ganga', 2, 1, 1, NULL, '2025-07-10 10:52:25', NULL),
(3, 'yamuna', 2, 1, 1, NULL, '2025-07-10 10:52:40', NULL),
(4, 'krishna', 2, 1, 1, NULL, '2025-07-10 10:53:56', NULL),
(5, 'dfgsdg', 2, 0, 1, 1, '2025-09-01 10:00:27', '2025-09-01'),
(6, 'smv', 2, 1, 1, NULL, '2025-09-01 10:03:22', NULL),
(7, 'west car', 2, 1, 1, NULL, '2025-09-01 10:03:33', NULL),
(8, 'kaveri', 3, 1, 1, NULL, '2025-09-01 10:04:30', NULL),
(9, 'north st', 2, 1, 1, NULL, '2025-09-19 11:07:23', NULL),
(10, 'south st', 2, 1, 1, NULL, '2025-09-19 11:07:31', NULL),
(11, 'sivaganapathy', 2, 1, 1, NULL, '2025-09-19 11:07:54', NULL),
(12, 'kottaimedu', 2, 1, 1, NULL, '2025-09-19 11:08:05', NULL);

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
  `qr_code` varchar(100) DEFAULT NULL,
  `gpay` varchar(100) DEFAULT NULL,
  `under_branch` varchar(255) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT '1',
  `insert_login_id` varchar(100) NOT NULL,
  `update_login_id` varchar(100) DEFAULT NULL,
  `delete_login_id` varchar(100) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bank_creation`
--

INSERT INTO `bank_creation` (`id`, `bank_name`, `bank_short_name`, `account_number`, `ifsc_code`, `branch_name`, `qr_code`, `gpay`, `under_branch`, `status`, `insert_login_id`, `update_login_id`, `delete_login_id`, `created_date`, `updated_date`) VALUES
(1, 'State Bank of India', 'SBI', '67867867867867868', 'asdf', 'Villianur', '', '', '2', '1', '1', NULL, NULL, '2025-07-10 10:55:28', NULL),
(2, 'Union Bank Of India', 'UBI', '6786787686786788', '678678', 'Villianur', '', '', '2,3', '1', '1', '1', NULL, '2025-07-10 10:57:48', '2025-07-10');

-- --------------------------------------------------------

--
-- Table structure for table `bank_info`
--

CREATE TABLE `bank_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `aadhar_num` varchar(250) DEFAULT NULL,
  `cus_profile_id` varchar(255) NOT NULL,
  `bank_name` varchar(100) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `acc_holder_name` varchar(100) NOT NULL,
  `acc_number` varchar(100) NOT NULL,
  `ifsc_code` varchar(100) NOT NULL,
  `issue_status` int(11) NOT NULL DEFAULT 0,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bank_info`
--

INSERT INTO `bank_info` (`id`, `cus_id`, `aadhar_num`, `cus_profile_id`, `bank_name`, `branch_name`, `acc_holder_name`, `acc_number`, `ifsc_code`, `issue_status`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'F-102', NULL, '2', 'SBI', 'Villianur', 'Priya', '56756756756', '57567567', 2, 1, NULL, '2025-07-10', NULL),
(2, 'F-101', NULL, '1', 'SBI', 'Villianur', 'ravi', '4645645', 'asdf', 2, 1, NULL, '2025-07-10', NULL),
(3, 'F-104', NULL, '11', 'SBI', 'Villianur', 'JINna', '567575', '567567', 2, 1, NULL, '2025-07-14', NULL),
(4, 'F-108', NULL, '23', 'SBI', 'Villianur', 'JINna', '3454545345', '34534', 2, 1, NULL, '2025-07-19', NULL),
(5, 'F-107', NULL, '24', 'UBI', 'Villianur', 'kiru', '12312312313', 'udfs', 2, 1, NULL, '2025-07-19', NULL),
(6, 'F-110', NULL, '30', 'SBI', 'Villianur', 'hii', '567567567', '567567', 2, 1, NULL, '2025-07-21', NULL),
(7, 'F-115', NULL, '40', 'State Bank OF India', 'Villianur', 'kmn', '567567567567567', '7567567', 0, 1, NULL, '2025-07-25', NULL),
(8, 'F-103', NULL, '13', 'SBI', 'Villianur', 'JINna', '7676876878978', 'SBI-009', 2, 1, NULL, '2025-09-22', NULL),
(9, 'FT-1005', NULL, '9', 'SBI', 'Villianur', 'JINna', '678687668768', 'SBI-009', 2, 1, NULL, '2025-09-27', NULL),
(10, 'FT-1006', NULL, '8', 'SBI', 'Villianur', 'kalai', '789789898997', 'SBI-003', 2, 1, NULL, '2025-09-29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `branch_creation`
--

CREATE TABLE `branch_creation` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `branch_code` varchar(50) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `state` int(11) NOT NULL,
  `district` int(11) NOT NULL,
  `taluk` int(11) NOT NULL,
  `place` varchar(100) NOT NULL,
  `pincode` varchar(100) NOT NULL,
  `email_id` varchar(100) DEFAULT NULL,
  `mobile_number` varchar(100) DEFAULT NULL,
  `whatsapp` varchar(100) DEFAULT NULL,
  `landline_code` varchar(50) DEFAULT NULL,
  `landline` varchar(100) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch_creation`
--

INSERT INTO `branch_creation` (`id`, `company_name`, `branch_code`, `branch_name`, `address`, `state`, `district`, `taluk`, `place`, `pincode`, `email_id`, `mobile_number`, `whatsapp`, `landline_code`, `landline`, `insert_login_id`, `update_login_id`, `created_date`, `updated_date`) VALUES
(2, 'Feather Technology', 'F-101', 'Villianur', '', 1, 1, 1, 'Cheyyar', '605110', '', '7676867867', '', '78678', '67867867', 1, 1, '2025-07-10 10:48:21', '2025-07-10'),
(3, 'Feather Technology', 'F-102', 'chetpet', '', 1, 2, 7, 'Cheyyar', '609122', '', '', '', '', '', 1, NULL, '2025-07-10 10:55:58', NULL);

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
  `holder_id` varchar(25) DEFAULT NULL,
  `relationship` varchar(50) NOT NULL,
  `bank_name` varchar(150) NOT NULL,
  `cheque_cnt` int(11) NOT NULL,
  `upload` varchar(255) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cheque_info`
--

INSERT INTO `cheque_info` (`id`, `cus_id`, `cus_profile_id`, `holder_type`, `holder_name`, `holder_id`, `relationship`, `bank_name`, `cheque_cnt`, `upload`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'FT-1004', 4, 1, 'Niyaz', '', 'Customer', 'hfgh', 2, NULL, 1, NULL, '2025-09-27', NULL),
(2, 'FT-1004', 4, 1, 'Niyaz', '', 'Customer', 'asdas', 2, NULL, 1, NULL, '2025-09-27', NULL);

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
  `take_status` varchar(50) NOT NULL DEFAULT '0',
  `take_date` date DEFAULT NULL,
  `take_person` varchar(50) DEFAULT NULL,
  `take_purpose` varchar(50) DEFAULT NULL,
  `take_remarks` varchar(50) DEFAULT NULL,
  `insert_login_id` int(11) DEFAULT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cheque_no_list`
--

INSERT INTO `cheque_no_list` (`id`, `cus_id`, `cus_profile_id`, `cheque_info_id`, `cheque_no`, `used_status`, `noc_status`, `date_of_noc`, `noc_member`, `noc_relationship`, `take_status`, `take_date`, `take_person`, `take_purpose`, `take_remarks`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'FT-1004', 4, 1, '45654645', 0, 1, '2025-09-29', 'Niyaz', 'Customer', '0', NULL, NULL, NULL, NULL, 1, 1, '2025-09-27', '2025-09-29'),
(2, 'FT-1004', 4, 1, '6565656', 0, 1, '2025-09-29', 'Niyaz', 'Customer', '0', NULL, NULL, NULL, NULL, 1, 1, '2025-09-27', '2025-09-29'),
(3, 'FT-1004', 4, 2, '123434', 0, 1, '2025-09-29', 'Niyaz', 'Customer', '0', NULL, NULL, NULL, NULL, 1, 1, '2025-09-27', '2025-09-29'),
(4, 'FT-1004', 4, 2, '345345', 0, 1, '2025-09-29', 'Niyaz', 'Customer', '0', NULL, NULL, NULL, NULL, 1, 1, '2025-09-27', '2025-09-29');

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
  `collection_method` int(11) NOT NULL,
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

INSERT INTO `collection` (`id`, `coll_code`, `cus_profile_id`, `cus_id`, `cus_name`, `branch`, `area`, `line`, `loan_category`, `coll_status`, `coll_sub_status`, `tot_amt`, `paid_amt`, `bal_amt`, `due_amt`, `pending_amt`, `payable_amt`, `penalty`, `coll_charge`, `collection_method`, `coll_mode`, `bank_id`, `cheque_no`, `trans_id`, `trans_date`, `coll_date`, `due_amt_track`, `princ_amt_track`, `int_amt_track`, `penalty_track`, `coll_charge_track`, `total_paid_track`, `pre_close_waiver`, `penalty_waiver`, `coll_charge_waiver`, `total_waiver`, `collect_sts`, `insert_login_id`, `update_login_id`, `delete_login_id`, `created_date`, `updated_date`) VALUES
(1, 'COL-101', 3, 'FT-1003', 'Anu', '2', '1', '1', '1', 'Present', 'Current', '33000', '0', '33000', '3300', '0', '3300', '0', '0', 1, '1', '', '', '', '0000-00-00', '2025-09-27 13:24:04', '3300', '', '', '', '', '3300', '', '', '', '0', 0, '1', NULL, NULL, '2025-09-27 13:24:04', '2025-09-27 13:24:04'),
(2, 'COL-102', 2, 'FT-1002', 'Riyaz', '2', '4', '2', '1', 'Present', 'Pending', '36000', '0', '36000', '3600', '28800', '32400', '576', '0', 1, '1', '', '', '', '0000-00-00', '2025-09-27 13:41:10', '32400', '', '', '', '', '32400', '', '', '', '0', 0, '1', NULL, NULL, '2025-09-27 13:41:10', '2025-09-27 13:41:10'),
(3, 'COL-103', 2, 'FT-1002', 'Riyaz', '2', '4', '2', '1', 'Present', 'Current', '36000', '32400', '3600', '3600', '0', '0', '576', '0', 1, '1', '', '', '', '0000-00-00', '2025-09-27 13:41:54', '3600', '', '', '', '', '3600', '', '', '', '0', 0, '1', NULL, NULL, '2025-09-27 13:41:54', '2025-09-27 13:41:54'),
(4, 'COL-104', 2, 'FT-1002', 'Riyaz', '2', '4', '2', '1', 'Present', 'Due Nil', '36000', '36000', '0', '3600', '0', '0', '576', '0', 1, '1', '', '', '', '0000-00-00', '2025-09-27 13:42:17', '', '', '', '576', '', '576', '', '', '', '', 0, '1', NULL, NULL, '2025-09-27 13:42:17', '2025-09-27 13:42:17'),
(5, 'COL-105', 1, 'FT-1001', 'Maya', '2', '2', '1', '1', 'Present', 'Pending', '22000', '0', '22000', '2200', '4400', '6600', '132', '0', 1, '1', '', '', '', '0000-00-00', '2025-09-27 15:24:34', '600', '', '', '132', '', '732', '', '', '', '0', 0, '1', NULL, NULL, '2025-09-27 15:24:34', '2025-09-27 15:24:34'),
(6, 'COL-106', 3, 'FT-1003', 'Anu', '2', '1', '1', '1', 'Present', 'Current', '33000', '3300', '29700', '3300', '0', '0', '0', '0', 1, '1', '', '', '', '0000-00-00', '2025-09-27 15:26:20', '20000', '', '', '', '', '20000', '', '', '', '0', 0, '1', NULL, NULL, '2025-09-27 15:26:20', '2025-09-27 15:26:20'),
(7, 'COL-107', 3, 'FT-1003', 'Anu', '2', '1', '1', '1', 'Present', 'Current', '33000', '23300', '9700', '3300', '0', '0', '0', '0', 1, '5', '1', '', '78978978', '2025-09-27', '2025-09-27 15:27:03', '9700', '', '', '', '', '9700', '', '', '', '0', 0, '1', NULL, NULL, '2025-09-27 15:27:03', '2025-09-27 15:27:03'),
(8, 'COL-108', 4, 'FT-1004', 'Niyaz', '2', '4', '2', '1', 'Present', 'Pending', '36000', '0', '36000', '3600', '28800', '32400', '576', '0', 1, '1', '', '', '', '0000-00-00', '2025-09-27 17:32:29', '36000', '', '', '576', '', '36576', '', '', '', '0', 0, '1', NULL, NULL, '2025-09-27 17:32:29', '2025-09-27 17:32:29'),
(9, 'COL-109', 9, 'FT-1005', 'Fayaz', '2', '1', '1', '3', 'Present', 'Pending', '61200', '0', '61200', '6120', '42840', '48960', '854', '0', 1, '1', '', '', '', '0000-00-00', '2025-11-19 13:09:06', '960', '', '', '', '', '960', '', '', '', '0', 0, '1', NULL, NULL, '2025-11-19 13:09:06', '2025-11-19 13:09:06');

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

-- --------------------------------------------------------

--
-- Table structure for table `commitment`
--

CREATE TABLE `commitment` (
  `id` int(11) NOT NULL,
  `cus_profile_id` varchar(255) DEFAULT NULL,
  `cus_id` varchar(255) NOT NULL,
  `follow_up_date` date DEFAULT NULL,
  `follow_type` varchar(10) DEFAULT NULL,
  `follow_status` varchar(55) DEFAULT NULL,
  `follow_person_name` varchar(255) DEFAULT NULL,
  `person_name` varchar(50) NOT NULL,
  `relationship` varchar(255) DEFAULT NULL,
  `commitment_date` date DEFAULT NULL,
  `remark` varchar(100) NOT NULL,
  `user_type` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `hint` varchar(255) DEFAULT NULL,
  `comm_err` varchar(100) DEFAULT NULL,
  `insert_login_id` varchar(55) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `commitment`
--

INSERT INTO `commitment` (`id`, `cus_profile_id`, `cus_id`, `follow_up_date`, `follow_type`, `follow_status`, `follow_person_name`, `person_name`, `relationship`, `commitment_date`, `remark`, `user_type`, `user_name`, `hint`, `comm_err`, `insert_login_id`, `created_date`, `updated_date`) VALUES
(1, '9', 'FT-1005', '2025-09-30', '1', '2', '', '', '', '0000-00-00', 'ok', 'Staff', 'Super Admin', 'not attending the call', '', '1', '2025-09-30 14:48:51', '2025-09-30 14:48:51'),
(2, '8', 'FT-1006', '2025-10-03', '1', '1', '1', 'Moni', 'Customer', '2025-10-03', 'customer is not attending the call loan status - pending', 'Staff', 'Super Admin', 'sdfs', '', '1', '2025-10-03 13:16:07', '2025-10-03 13:16:07'),
(3, '8', 'FT-1006', '2025-10-03', '1', '2', '', '', '', '0000-00-00', 'customer is not attending the call loan status - pending', 'Staff', 'Super Admin', 'no', '', '1', '2025-10-03 13:16:42', '2025-10-03 13:16:42'),
(4, '9', 'FT-1005', '2025-10-03', '1', '1', '2', 'Moni', 'Spouse', '2025-10-03', 'customer ', 'Staff', 'Super Admin', 'call', '', '1', '2025-10-03 14:45:32', '2025-10-03 14:45:32'),
(5, '9', 'FT-1005', '2025-10-03', '1', '2', '', '', '', '0000-00-00', 'customer is not attending the call loan status - pending', 'Staff', 'Super Admin', '1', '2', '1', '2025-10-03 14:46:07', '2025-10-03 14:46:07');

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
(1, 'Feather Technology', 'Bussy Street', 2, 39, 313, 'villianur', '605110', 'feather.com', 'feather@gmail.com', '7896786786', '', '', '', 1, 1, 1, '2025-07-10 10:10:36', '2025-07-10');

-- --------------------------------------------------------

--
-- Table structure for table `concern_creation`
--

CREATE TABLE `concern_creation` (
  `id` int(11) NOT NULL,
  `raising_for` int(11) NOT NULL,
  `aadhar_num` varchar(100) DEFAULT NULL,
  `cus_id` varchar(100) DEFAULT NULL,
  `cus_name` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `line` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `con_code` varchar(100) NOT NULL,
  `concern_date` date NOT NULL,
  `concern_to` int(11) NOT NULL,
  `con_sub` int(11) NOT NULL,
  `con_remark` varchar(100) NOT NULL,
  `assign_to` int(11) NOT NULL,
  `assign_designation` varchar(100) NOT NULL,
  `sol_date` date DEFAULT NULL,
  `communication` varchar(50) DEFAULT NULL,
  `concern_upload` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `participants` varchar(255) NOT NULL,
  `sol_remark` varchar(100) DEFAULT NULL,
  `con_status` int(11) NOT NULL DEFAULT 0,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date NOT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `concern_creation`
--

INSERT INTO `concern_creation` (`id`, `raising_for`, `aadhar_num`, `cus_id`, `cus_name`, `area`, `line`, `mobile`, `user_name`, `con_code`, `concern_date`, `concern_to`, `con_sub`, `con_remark`, `assign_to`, `assign_designation`, `sol_date`, `communication`, `concern_upload`, `location`, `participants`, `sol_remark`, `con_status`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 1, '667867867867', 'FT-1003', 'Anu', 'kaveri', 'L1', '7897897897', '', 'CC-101', '2025-10-16', 2, 1, 'okk', 1, 'Admin', '2025-10-17', '1', '', NULL, '', 'soved', 1, 1, 1, '2025-10-16', '2025-10-17'),
(2, 2, '', '', '', '', '', '', '10', 'CC-102', '2025-10-16', 2, 3, 'ok', 0, '', '2025-10-17', '2', '', NULL, '', 'xxfgdfg', 1, 1, 10, '2025-10-16', '2025-10-17'),
(3, 1, '667867867867', 'FT-1003', 'Anu', 'kaveri', 'L1', '7897897897', '', 'CC-103', '2025-10-16', 2, 10, 'ok', 0, '', '2025-10-17', '2', '', NULL, '', 'xxfgdfg', 1, 1, 10, '2025-10-16', '2025-10-17'),
(4, 2, '', '', '', '', '', '', '10', 'CC-104', '2025-10-17', 2, 2, 'ok solve', 14, 'Manager', '2025-10-17', '2', '', NULL, '', 'issue solved no prblm', 1, 1, 14, '2025-10-17', '2025-10-17'),
(5, 2, '', '', '', '', '', '', '10', 'CC-105', '2025-10-17', 14, 1, 'ok', 10, 'Staff', '0000-00-00', '', '', NULL, '', '', 0, 1, 1, '2025-10-17', '2025-10-17'),
(6, 2, '', '', '', '', '', '', '10', 'CC-106', '2025-10-17', 14, 3, 'sovye', 10, 'Staff', '2025-10-17', '', '', NULL, '', '', 0, 1, 1, '2025-10-17', '2025-10-17'),
(7, 2, '', '', '', '', '', '', '10', 'CC-107', '2025-10-17', 10, 1, 'ok', 14, 'Manager', '2025-10-17', '1', '', NULL, '', 'okay', 1, 1, 14, '2025-10-17', '2025-10-17'),
(8, 1, '667867867867', 'FT-1003', 'Anu', 'kaveri', 'L1', '7897897897', '', 'CC-108', '2025-10-17', 1, 1, 'ok', 1, 'Admin', '2025-10-17', '2', '', NULL, '', 'problem solved', 1, 1, 1, '2025-10-17', '2025-10-17'),
(9, 2, '', '', '', '', '', '', '10', 'CC-109', '2025-10-17', 14, 3, 'fghfghfghfghfghfgh', 1, 'Admin', '2025-10-17', '1', '68f20df79b658.png', NULL, '', 'ghjjgh', 1, 1, 1, '2025-10-17', '2025-10-17'),
(10, 1, '369852321471', 'FT-1006', 'Moni', 'kaveri', 'L1', '6786786786', '', 'CC-110', '2025-10-17', 1, 1, 'fghfghfghf', 10, 'Staff', '2025-10-17', '2', '', NULL, '', 'okay', 1, 1, 10, '2025-10-17', '2025-10-17'),
(11, 2, '', '', '', '', '', '', '10', 'CC-111', '2025-10-17', 14, 4, 'hrtuytyyyuyu', 10, 'Staff', '2025-10-17', '1', '68f2279547722.png', NULL, '', 'lkl;kl;kl;kl;kl;', 1, 1, 10, '2025-10-17', '2025-10-17'),
(12, 1, '147125823693', 'FT-1005', 'Fayaz', 'kaveri', 'L1', '8990878673', '', 'CC-112', '2025-10-17', 10, 2, 'not properly deal the customer', 14, 'Manager', NULL, NULL, NULL, NULL, '', NULL, 0, 1, NULL, '2025-10-17', NULL),
(13, 2, '', '', '', '', '', '', '10', 'CC-113', '2025-10-16', 14, 2, 'not treat the customer properly', 10, 'Staff', '2025-10-18', '1', '68f22638e6e2b.png', NULL, '', 'fgfghghg', 1, 1, 10, '2025-10-17', '2025-10-17'),
(14, 1, '666655554444', 'FT-1001', 'Maya', 'Ganga', 'L1', '9876512342', '', 'CC-114', '2025-10-17', 1, 3, 'not properly', 1, 'Admin', NULL, NULL, NULL, NULL, '', NULL, 0, 1, NULL, '2025-10-17', NULL),
(15, 2, '', '', '', '', '', '', '10', 'CC-115', '2025-10-17', 1, 3, 'dfgdfgdfg', 1, 'Admin', NULL, NULL, NULL, NULL, '', NULL, 0, 1, NULL, '2025-10-17', NULL),
(16, 2, '', '', '', '', '', '', 'Super Admin', 'CC-116', '2025-12-01', 10, 1, 'hy', 1, '3', NULL, NULL, NULL, NULL, '', NULL, 0, 1, NULL, '2025-12-01', NULL),
(17, 2, '', '', '', '', '', '', 'Super Admin', 'CC-117', '2025-12-01', 10, 2, '1', 10, '3', NULL, NULL, NULL, NULL, '', NULL, 0, 1, NULL, '2025-12-01', NULL),
(18, 2, '', '', '', '', '', '', 'Super Admin', 'CC-118', '2025-12-01', 14, 3, 'gdfggdfgdfgdf', 1, '4', '2025-12-02', '2', '', '1', 'staff,client and manager', 'issue resolved', 1, 1, 1, '2025-12-01', '2025-12-02'),
(19, 1, '369852321471', 'FT-1006', 'Moni', 'kaveri', 'L1', '6786786786', '', 'CC-119', '2025-12-01', 10, 5, 'sdfsdfsdf', 15, '5', '2025-12-02', '1', '692e6b6c13a87.jpeg', '', 'staff and client', 'ok ', 2, 1, 15, '2025-12-01', '2025-12-02'),
(20, 2, '', '', '', '', '', '', 'ramya', 'CC-120', '2025-12-01', 1, 2, 'fghfghfgh', 10, '3', NULL, NULL, NULL, NULL, '', NULL, 0, 15, NULL, '2025-12-01', NULL),
(21, 2, '', '', '', '', '', '', 'Super Admin', 'CC-121', '2025-12-02', 16, 6, 'ok', 10, '3', '2025-12-03', '2', '', '1', 'dfgdfgddf', 'dfgdfgd', 2, 1, 10, '2025-12-02', '2025-12-02'),
(22, 2, '', '', '', '', '', '', 'Test1', 'CC-122', '2025-12-02', 14, 2, 'edfgdfg', 15, '5', '2025-12-02', '2', '', '1', 'dfgdfgdfg', 'gfgfdgdfg', 1, 10, 15, '2025-12-02', '2025-12-02'),
(23, 2, '', '', '', '', '', '', 'Super Admin', 'CC-123', '2025-12-02', 14, 1, 'sasd', 16, '2', '2025-12-02', '1', '692ec93fdb0d0.jpeg', '', 'client', 'okgghgfg', 1, 1, 16, '2025-12-02', '2025-12-02'),
(24, 2, '', '', '', '', '', '', 'Super Admin', 'CC-124', '2025-12-02', 10, 2, 'hjhjkjhkjk', 10, '3', NULL, NULL, NULL, NULL, '', NULL, 0, 1, NULL, '2025-12-02', NULL),
(25, 2, '', '', '', '', '', '', 'Super Admin', 'CC-125', '2025-12-02', 1, 1, 'gjhgjgj', 15, '5', '2025-12-02', '2', '', '2', 'fghf', 'ok', 2, 1, 15, '2025-12-02', '2025-12-02'),
(26, 2, '', '', '', '', '', '', 'Super Admin', 'CC-126', '2025-12-02', 1, 5, 'sdfsdf', 1, '4', '2025-12-02', '1', '692ed099481ce.jpeg', '', 'dfghfhfghfghfgh', 'fghfghfghfgh', 1, 1, 1, '2025-12-02', '2025-12-02');

-- --------------------------------------------------------

--
-- Table structure for table `concern_subject`
--

CREATE TABLE `concern_subject` (
  `con_sub_id` int(11) NOT NULL,
  `concern_subject` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `insert_login_id` int(11) DEFAULT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `concern_subject`
--

INSERT INTO `concern_subject` (`con_sub_id`, `concern_subject`, `status`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'Complaint', 0, 1, 1, '2025-12-01 15:05:38', '2025-12-01 15:05:38'),
(2, 'Feedback', 0, 1, 1, '2025-12-01 15:05:38', '2025-12-01 15:05:38'),
(3, 'Suggestion', 0, 1, 1, '2025-12-01 15:05:38', '2025-12-01 15:05:38'),
(4, 'Need', 0, 1, 1, '2025-12-01 15:05:38', '2025-12-01 15:05:38'),
(5, 'Clarification', 0, 1, 1, '2025-12-01 15:05:38', '2025-12-01 15:05:38'),
(6, 'Issue', 0, 1, 1, '2025-12-01 15:05:38', '2025-12-01 15:05:38'),
(7, 'Requirement', 0, 1, 1, '2025-12-01 15:05:38', '2025-12-01 15:05:38'),
(8, 'Support', 0, 1, 1, '2025-12-01 15:05:38', '2025-12-01 15:05:38'),
(9, 'Purpose', 0, 1, 1, '2025-12-01 15:05:38', '2025-12-01 15:05:38'),
(10, 'Other', 0, 1, 1, '2025-12-01 15:05:38', '2025-12-01 15:05:38');

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
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_data`
--

INSERT INTO `customer_data` (`id`, `cus_name`, `area`, `mobile`, `loan_cat`, `loan_amount`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'kaviya', '2', '8678678678', 'Personal', '89000', 1, NULL, '2025-09-27', NULL),
(2, 'Neithiya', '3', '7567567567', 'PERSONl', '7888888', 1, NULL, '2025-09-27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer_profile`
--

CREATE TABLE `customer_profile` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(250) DEFAULT NULL,
  `aadhar_num` varchar(100) NOT NULL,
  `cus_name` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `dob` varchar(50) DEFAULT NULL,
  `age` varchar(100) DEFAULT NULL,
  `mobile1` varchar(100) NOT NULL,
  `mobile2` varchar(100) DEFAULT NULL,
  `whatsapp_no` varchar(50) DEFAULT NULL,
  `pic` varchar(100) NOT NULL,
  `guarantor_name` varchar(100) DEFAULT NULL,
  `gu_pic` varchar(100) DEFAULT NULL,
  `cus_data` varchar(100) DEFAULT NULL,
  `cus_status` varchar(100) DEFAULT NULL,
  `res_type` varchar(100) DEFAULT NULL,
  `res_detail` varchar(100) DEFAULT NULL,
  `res_address` varchar(100) DEFAULT NULL,
  `native_address` varchar(100) DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `occ_detail` varchar(100) DEFAULT NULL,
  `occ_income` varchar(100) DEFAULT NULL,
  `occ_address` varchar(100) DEFAULT NULL,
  `area_confirm` varchar(100) DEFAULT NULL,
  `area` int(11) DEFAULT NULL,
  `line` varchar(100) DEFAULT NULL,
  `cus_limit` varchar(100) DEFAULT NULL,
  `about_cus` varchar(100) DEFAULT NULL,
  `how_to_know` varchar(11) DEFAULT NULL,
  `loan_count` varchar(11) DEFAULT NULL,
  `first_loan_date` date DEFAULT NULL,
  `travel_with_company` varchar(100) DEFAULT NULL,
  `monthly_income` varchar(100) DEFAULT NULL,
  `other_income` varchar(100) DEFAULT NULL,
  `support_income` varchar(100) DEFAULT NULL,
  `commitment` varchar(100) DEFAULT NULL,
  `monthly_due_capacity` varchar(100) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `payment_mode_status` int(11) NOT NULL DEFAULT 1,
  `payment_type` int(11) DEFAULT NULL,
  `payment_mode` int(11) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `issue_person` varchar(100) DEFAULT NULL,
  `issue_relationship` varchar(100) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_profile`
--

INSERT INTO `customer_profile` (`id`, `cus_id`, `aadhar_num`, `cus_name`, `gender`, `dob`, `age`, `mobile1`, `mobile2`, `whatsapp_no`, `pic`, `guarantor_name`, `gu_pic`, `cus_data`, `cus_status`, `res_type`, `res_detail`, `res_address`, `native_address`, `occupation`, `occ_detail`, `occ_income`, `occ_address`, `area_confirm`, `area`, `line`, `cus_limit`, `about_cus`, `how_to_know`, `loan_count`, `first_loan_date`, `travel_with_company`, `monthly_income`, `other_income`, `support_income`, `commitment`, `monthly_due_capacity`, `remark`, `payment_mode_status`, `payment_type`, `payment_mode`, `bank_id`, `issue_person`, `issue_relationship`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'FT-1001', '666655554444', 'Maya', '2', '', '54', '9876512342', NULL, NULL, '', '1', '', 'New', '', '2', 'Pondy', 'Pondy', 'Tamilnadu', '', '', '', '', '1', 2, '1', '890000', 'good', '1', '0', '0000-00-00', '', '3000', '0', '0', '0', '10000', NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-07-29 00:00:00', '2025-07-29'),
(2, 'FT-1002', '777788889999', 'Riyaz', '1', '2001-12-08', '', '9876512342', NULL, NULL, '', '2', '', 'New', '', '', '', '', '', 'Teacher', 'Sv school', '40000', 'villainur', '2', 4, '2', '100000', 'ok', '4', '', '0000-00-00', '', '7000', '2000', '0', '0', '0', NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-07-29 00:00:00', '2025-07-29'),
(3, 'FT-1003', '667867867867', 'Anu', '2', '', '', '7897897897', '', '', '68d77629474b3.webp', '3', '', 'New', '', '3', 'Residential Details', 'Puducherry', 'Native Address', '', '', '', '', '1', 1, '1', '900000', '', '1', '', '0000-00-00', '', '89000', '340000', '0', '0', '0', NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, 1, '2025-09-27 10:58:16', '2025-09-27'),
(4, 'FT-1004', '222288889999', 'Niyaz', '1', '2001-12-08', '', '9876512342', NULL, NULL, '', '4', '', 'New', '', '', '', '', '', 'Teacher', 'Sv school', '40000', 'villainur', '2', 4, '2', '100000', 'ok', '4', '', '0000-00-00', '', '7000', '2000', '0', '0', '0', NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-07-29 00:00:00', '2025-07-29'),
(5, 'FT-1001', '666655554444', 'Maya', '2', '', '54', '9876512342', '', '', '68d7996cc7847.jpg', '1', '', 'Existing', 'Additional', '2', 'Pondy', 'Pondy', 'Tamilnadu', '', '', '', '', '1', 2, '1', '890000', 'good', '1', '1', '2025-07-29', '0 Years, 1 Months', '3000', '0', '0', '0', '10000', NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, 1, '2025-09-27 13:29:19', '2025-09-27'),
(6, 'FT-1005', '147125823693', 'Fayaz', '1', '', '', '8990878673', '', '', '68d7b5ef7fa66.jpg', '5', '', 'New', '', '1', 'Residential Details', 'Puducherry', 'TamilNadu', '', '', '', '', '1', 1, '1', '', '', '3', '', '0000-00-00', '', '67867', '78', '0', '0', '78878', 'cus limitisless\n', 1, NULL, NULL, NULL, NULL, NULL, 1, 1, '2025-09-27 15:29:05', '2025-09-27'),
(7, 'FT-1006', '369852321471', 'Moni', '2', '', '', '6786786786', '', '', '68d7b6d90e1fb.webp', '6', '', 'New', '', '1', 'Pondy', 'New street, chetpet', 'chetpet', '', '', '', '', '1', 1, '1', '5345345345', '', '2', '', '0000-00-00', '', '67000', '6767000', '67567', '7567', '56756', 'ok\n', 1, NULL, NULL, NULL, NULL, NULL, 1, 1, '2025-09-27 15:33:40', '2025-09-27'),
(8, 'FT-1006', '369852321471', 'Moni', '2', '', '', '6786786786', '', '', '68d7b6d90e1fb.webp', '6', '', 'Existing', '', '1', 'Pondy', 'New street, chetpet', 'chetpet', '', '', '', '', '1', 1, '1', '5345345345', '', '2', '0', '0000-00-00', '', '67000', '6767000', '67567', '7567', '56756', NULL, 2, 1, 3, 1, 'Fayaz', 'Spouse', 1, 1, '2025-09-27 18:04:21', '2025-09-29'),
(9, 'FT-1005', '147125823693', 'Fayaz', '1', '', '', '8990878673', '', '', '68d7b5ef7fa66.jpg', '5', '', 'Existing', '', '1', 'Residential Details', 'Puducherry', 'TamilNadu', '', '', '', '', '1', 1, '1', '900000', '', '3', '0', '0000-00-00', '', '67867', '78', '0', '0', '78878', NULL, 2, 2, 2, 1, 'Fayaz', 'Customer', 1, 1, '2025-09-27 18:05:53', '2025-09-27'),
(10, 'FT-1007', '456745645645', 'latha', '2', '', '', '6867867867', '', '', '68da5ae08f8f4.jpg', '7', '', 'New', '', '2', 'Residential Details', 'Puducherry', 'TamilNadu', '', '', '', '', '1', 1, '1', '', '', '2', '', '0000-00-00', '', '86867', '0', '0', '0', '786786', NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, 1, '2025-09-29 15:38:37', '2025-09-29');

-- --------------------------------------------------------

--
-- Table structure for table `customer_register`
--

CREATE TABLE `customer_register` (
  `id` int(11) NOT NULL,
  `cus_profile_id` int(100) DEFAULT NULL,
  `cus_id` varchar(250) DEFAULT NULL,
  `aadhar_num` varchar(100) NOT NULL,
  `cus_name` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `dob` varchar(50) DEFAULT NULL,
  `age` varchar(100) DEFAULT NULL,
  `mobile1` varchar(100) NOT NULL,
  `mobile2` varchar(100) DEFAULT NULL,
  `whatsapp_no` varchar(50) DEFAULT NULL,
  `pic` varchar(100) NOT NULL,
  `cus_data` varchar(100) DEFAULT NULL,
  `cus_status` varchar(100) DEFAULT NULL,
  `res_type` varchar(100) DEFAULT NULL,
  `res_detail` varchar(100) DEFAULT NULL,
  `res_address` varchar(100) DEFAULT NULL,
  `native_address` varchar(100) DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `occ_detail` varchar(100) DEFAULT NULL,
  `occ_income` varchar(100) DEFAULT NULL,
  `occ_address` varchar(100) DEFAULT NULL,
  `area_confirm` varchar(100) DEFAULT NULL,
  `area` int(11) DEFAULT NULL,
  `line` varchar(100) DEFAULT NULL,
  `cus_limit` varchar(100) DEFAULT NULL,
  `about_cus` varchar(100) DEFAULT NULL,
  `how_to_know` varchar(11) DEFAULT NULL,
  `loan_count` varchar(11) DEFAULT NULL,
  `first_loan_date` date DEFAULT NULL,
  `travel_with_company` varchar(100) DEFAULT NULL,
  `monthly_income` varchar(100) DEFAULT NULL,
  `other_income` varchar(100) DEFAULT NULL,
  `support_income` varchar(100) DEFAULT NULL,
  `commitment` varchar(100) DEFAULT NULL,
  `monthly_due_capacity` varchar(100) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_register`
--

INSERT INTO `customer_register` (`id`, `cus_profile_id`, `cus_id`, `aadhar_num`, `cus_name`, `gender`, `dob`, `age`, `mobile1`, `mobile2`, `whatsapp_no`, `pic`, `cus_data`, `cus_status`, `res_type`, `res_detail`, `res_address`, `native_address`, `occupation`, `occ_detail`, `occ_income`, `occ_address`, `area_confirm`, `area`, `line`, `cus_limit`, `about_cus`, `how_to_know`, `loan_count`, `first_loan_date`, `travel_with_company`, `monthly_income`, `other_income`, `support_income`, `commitment`, `monthly_due_capacity`, `remark`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 1, 'FT-1001', '666655554444', 'Maya', '2', '', '54', '9876512342', '', '', '68d7996cc7847.jpg', 'Existing', 'Additional', '2', 'Pondy', 'Pondy', 'Tamilnadu', '', '', '', '', '1', 2, '1', '890000', 'good', '1', '1', '2025-07-29', '0 Years, 1 Months', '3000', '0', '0', '0', '10000', NULL, 1, 1, '2025-07-29 00:00:00', '2025-09-27'),
(2, 2, 'FT-1002', '777788889999', 'Riyaz', '1', '2001-12-08', '', '9876512342', NULL, NULL, '', 'New', '', '', '', '', '', 'Teacher', 'Sv school', '40000', 'villainur', '2', 4, '2', '100000', 'ok', '4', '', '0000-00-00', '', '7000', '2000', '0', '0', '0', NULL, 1, NULL, '2025-07-29 00:00:00', '2025-07-29'),
(3, 3, 'FT-1003', '667867867867', 'Anu', '2', '', '', '7897897897', '', '', '68d77629474b3.webp', 'New', '', '3', 'Residential Details', 'Puducherry', 'Native Address', '', '', '', '', '1', 1, '1', '900000', '', '1', '', '0000-00-00', '', '89000', '340000', '0', '0', '0', NULL, 1, 1, '2025-09-27 10:58:16', '2025-09-27'),
(4, 4, 'FT-1004', '222288889999', 'Niyaz', '1', '2001-12-08', '', '9876512342', NULL, NULL, '', 'New', '', '', '', '', '', 'Teacher', 'Sv school', '40000', 'villainur', '2', 4, '2', '100000', 'ok', '4', '', '0000-00-00', '', '7000', '2000', '0', '0', '0', NULL, 1, NULL, '2025-07-29 00:00:00', '2025-07-29'),
(5, 6, 'FT-1005', '147125823693', 'Fayaz', '1', '', '', '8990878673', '', '', '68d7b5ef7fa66.jpg', 'Existing', '', '1', 'Residential Details', 'Puducherry', 'TamilNadu', '', '', '', '', '1', 1, '1', '900000', '', '3', '0', '0000-00-00', '', '67867', '78', '0', '0', '78878', NULL, 1, 1, '2025-09-27 15:29:05', '2025-09-27'),
(6, 7, 'FT-1006', '369852321471', 'Moni', '2', '', '', '6786786786', '', '', '68d7b6d90e1fb.webp', 'Existing', '', '1', 'Pondy', 'New street, chetpet', 'chetpet', '', '', '', '', '1', 1, '1', '5345345345', '', '2', '0', '0000-00-00', '', '67000', '6767000', '67567', '7567', '56756', NULL, 1, 1, '2025-09-27 15:33:40', '2025-09-27'),
(7, 10, 'FT-1007', '456745645645', 'latha', '2', '', '', '6867867867', '', '', '68da5ae08f8f4.jpg', 'New', '', '2', 'Residential Details', 'Puducherry', 'TamilNadu', '', '', '', '', '1', 1, '1', '', '', '2', '', '0000-00-00', '', '86867', '0', '0', '0', '786786', NULL, 1, 1, '2025-09-29 15:38:37', '2025-09-29');

-- --------------------------------------------------------

--
-- Table structure for table `customer_status`
--

CREATE TABLE `customer_status` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_profile_id` int(11) NOT NULL,
  `loan_calculation_id` int(11) DEFAULT NULL,
  `coll_status` varchar(250) DEFAULT NULL,
  `payable_amnt` varchar(100) DEFAULT NULL,
  `bal_amnt` varchar(100) DEFAULT NULL,
  `last_paid_date` varchar(100) DEFAULT NULL,
  `current_month_paid` varchar(100) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `sub_status` int(11) DEFAULT NULL,
  `closed_consider_sts` varchar(100) DEFAULT NULL,
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

INSERT INTO `customer_status` (`id`, `cus_id`, `cus_profile_id`, `loan_calculation_id`, `coll_status`, `payable_amnt`, `bal_amnt`, `last_paid_date`, `current_month_paid`, `status`, `sub_status`, `closed_consider_sts`, `closed_date`, `remark`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'FT-1001', 1, 1, 'Pending', '6000', '21400', '5', '1', 7, NULL, NULL, NULL, NULL, 1, 1, '2025-09-27', '2025-09-27'),
(2, 'FT-1002', 2, 2, 'Closed', '0', '0', '5', '1', 10, 1, '3', '2025-09-27', 'ok', 1, 1, '2025-09-27', '2025-09-27'),
(3, 'FT-1003', 3, 3, 'Closed', '0', '0', '5', '1', 10, 1, '1', '2025-09-27', 'ok', 1, 1, '2025-09-27', '2025-09-27'),
(4, 'FT-1004', 4, 4, 'Closed', '0', '0', '5', '1', 12, 1, '1', '2025-09-27', '', 1, 1, '2025-09-27', '2025-09-29'),
(5, 'FT-1001', 5, 5, 'Current', '4545', '45450', NULL, NULL, 7, NULL, NULL, NULL, NULL, 1, 1, '2025-09-27', '2025-09-27'),
(6, 'FT-1005', 6, 6, NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, 1, 1, '2025-09-27', '2025-09-27'),
(7, 'FT-1006', 7, 7, NULL, NULL, NULL, NULL, NULL, 14, NULL, NULL, NULL, NULL, 1, 1, '2025-09-27', '2025-09-27'),
(8, 'FT-1006', 8, 8, 'Current', '6000', '60000', NULL, NULL, 7, NULL, NULL, NULL, NULL, 1, 1, '2025-09-27', '2025-09-29'),
(9, 'FT-1005', 9, 9, 'Pending', '48000', '60240', '3', '1', 7, NULL, NULL, NULL, NULL, 1, 1, '2025-09-27', '2025-11-19'),
(10, 'FT-1007', 10, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, 1, 1, '2025-09-29', '2025-09-29');

-- --------------------------------------------------------

--
-- Table structure for table `cus_feedback`
--

CREATE TABLE `cus_feedback` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_profile_id` int(50) NOT NULL,
  `feedback_label` varchar(100) NOT NULL,
  `feedback` int(11) NOT NULL,
  `cus_remark` varchar(100) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date NOT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Collection Agent', 1, NULL, '2025-05-08', NULL),
(2, 'Manager', 1, NULL, '2025-12-01', NULL),
(3, 'TL', 1, NULL, '2025-12-01', NULL),
(4, 'Admin', 1, NULL, '2025-12-01', NULL),
(5, 'staff', 1, NULL, '2025-12-01', NULL);

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
(39, 2, 'Puducherry', 1),
(41, 3, 'Chittoor', 1);

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
  `take_status` varchar(50) NOT NULL DEFAULT '0',
  `take_date` date DEFAULT NULL,
  `take_person` varchar(50) DEFAULT NULL,
  `take_purpose` varchar(50) DEFAULT NULL,
  `take_remarks` varchar(50) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document_info`
--

INSERT INTO `document_info` (`id`, `cus_id`, `cus_profile_id`, `doc_name`, `doc_type`, `holder_name`, `relationship`, `upload`, `noc_status`, `date_of_noc`, `noc_member`, `noc_relationship`, `take_status`, `take_date`, `take_person`, `take_purpose`, `take_remarks`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'FT-1003', 3, 'Aadhar', 1, 3, 'Father', '68d7b0a0857bd.webp', 0, NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, 1, NULL, '2025-09-27', NULL);

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
  `take_status` varchar(50) NOT NULL DEFAULT '0',
  `take_date` date DEFAULT NULL,
  `take_person` varchar(50) DEFAULT NULL,
  `take_purpose` varchar(50) DEFAULT NULL,
  `take_remarks` varchar(50) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `coll_mode` int(11) NOT NULL,
  `bank_id` varchar(11) DEFAULT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `family_info`
--

CREATE TABLE `family_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `fam_name` varchar(100) NOT NULL,
  `fam_relationship` varchar(100) NOT NULL,
  `remarks` varchar(250) DEFAULT NULL,
  `fam_age` varchar(100) DEFAULT NULL,
  `fam_live` varchar(100) NOT NULL,
  `fam_occupation` varchar(100) DEFAULT NULL,
  `fam_aadhar` varchar(100) NOT NULL,
  `fam_mobile` varchar(100) NOT NULL,
  `other_details` varchar(255) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `family_info`
--

INSERT INTO `family_info` (`id`, `cus_id`, `fam_name`, `fam_relationship`, `remarks`, `fam_age`, `fam_live`, `fam_occupation`, `fam_aadhar`, `fam_mobile`, `other_details`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'FT-1001', 'Logeswaari', 'Mother', NULL, '', '', '', '989432889251', '8798798790', NULL, 1, NULL, '2025-07-29', '2025-07-29'),
(2, 'FT-1002', 'srilaksmi', 'Mother', NULL, '76', '1', 'Doctor', '790989089098', '8798798791', NULL, 1, NULL, '2025-07-29', '2025-07-29'),
(3, 'FT-1003', 'Kumar', 'Father', '', '', '1', '', '767867867867', '6786786786', NULL, 1, NULL, '2025-09-27', NULL),
(4, 'FT-1004', 'srilaksmi', 'Mother', NULL, '76', '1', 'Doctor', '790989089098', '8798798791', NULL, 1, NULL, '2025-07-29', '2025-07-29'),
(5, 'FT-1005', 'Moni', 'Spouse', '', '', '1', '', '768678735543', '8782589635', NULL, 1, NULL, '2025-09-27', NULL),
(6, 'FT-1006', 'Fayaz', 'Spouse', '', '', '1', '', '121212121212', '9023456781', NULL, 1, NULL, '2025-09-27', NULL),
(7, 'FT-1007', 'sdfsd', 'Father', '', '', '1', '', '678678678678', '6796767867', NULL, 1, NULL, '2025-09-29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `fingerprints`
--

CREATE TABLE `fingerprints` (
  `id` int(11) NOT NULL COMMENT 'Primary Key',
  `adhar_num` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `hand` varchar(50) DEFAULT NULL,
  `ansi_template` longtext NOT NULL,
  `bitmap_data` longtext DEFAULT NULL,
  `insert_user_id` varchar(50) DEFAULT NULL,
  `update_user_id` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `guarantor_info`
--

CREATE TABLE `guarantor_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(255) DEFAULT NULL,
  `relationship_type` varchar(250) DEFAULT NULL,
  `guarantor_name` varchar(255) DEFAULT NULL,
  `family_id` varchar(100) DEFAULT NULL,
  `other_mem_id` int(11) DEFAULT NULL,
  `guarantor_relationship` varchar(250) DEFAULT NULL,
  `details` varchar(100) DEFAULT NULL,
  `gu_pic` varchar(100) DEFAULT NULL,
  `insert_login_id` int(11) DEFAULT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `updated_on` date DEFAULT NULL,
  `created_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `upload` varchar(100) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kyc_info`
--

INSERT INTO `kyc_info` (`id`, `cus_id`, `cus_profile_id`, `proof_of`, `fam_mem`, `proof`, `proof_detail`, `upload`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'FT-1003', '3', '2', 3, 1, '', '', 1, NULL, '2025-09-27', NULL),
(2, 'FT-1001', '5', '1', NULL, 1, '', '', 1, NULL, '2025-09-27', NULL),
(3, 'FT-1005', '6', '2', 5, 1, '1', '', 1, NULL, '2025-09-27', NULL),
(4, 'FT-1006', '7', '1', NULL, 1, '1', '', 1, NULL, '2025-09-27', NULL),
(5, 'FT-1006', '8', '1', NULL, 1, '', '', 1, NULL, '2025-09-27', NULL),
(6, 'FT-1005', '9', '1', NULL, 1, '', '', 1, NULL, '2025-09-27', NULL),
(7, 'FT-1007', '10', '1', NULL, 1, '', '', 1, NULL, '2025-09-29', NULL);

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
(1, 'L1', 2, 1, 1, NULL, '2025-07-10 10:51:47', NULL),
(2, 'l2', 2, 1, 1, NULL, '2025-07-10 10:53:34', NULL),
(3, 'l3', 2, 1, 1, NULL, '2025-09-01 10:03:01', NULL),
(4, 'l1', 3, 1, 1, NULL, '2025-09-01 10:04:02', NULL),
(6, 'l5', 2, 1, 1, NULL, '2025-09-08 15:05:33', NULL);

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
(1, 'Home', 1, NULL, '2025-07-10', NULL),
(2, 'Personal', 1, NULL, '2025-07-15', NULL),
(3, 'Land', 1, NULL, '2025-07-15', NULL);

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
  `scheme_name` varchar(150) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loan_category_creation`
--

INSERT INTO `loan_category_creation` (`id`, `loan_category`, `loan_limit`, `due_method`, `due_type`, `interest_rate_min`, `interest_rate_max`, `due_period_min`, `due_period_max`, `doc_charge_min`, `doc_charge_max`, `processing_fee_min`, `processing_fee_max`, `overdue_penalty`, `scheme_name`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 1, '200000', 'Monthly', 'EMI', '1', '2', '2', '10', '2', '3', '2', '3', '2', '1,2', 1, 1, '2025-07-10', '2025-07-29'),
(2, 2, '300000', 'Monthly', 'EMI', '1', '5', '1', '10', '1', '2', '1', '4', '2', '2', 1, 1, '2025-07-15', '2025-08-30'),
(3, 3, '700000', 'Monthly', 'EMI', '', '', '', '', '', '', '', '', '', '1', 1, NULL, '2025-07-15', NULL),
(4, 1, '6700000', 'Monthly', 'EMI', '1', '5', '2', '3', '1', '3', '1', '3', '1', '2,1', 1, NULL, '2025-11-01', NULL);

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
  `category_info` varchar(255) DEFAULT NULL,
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
  `total_amnt` int(11) DEFAULT NULL,
  `due_amnt` int(11) DEFAULT NULL,
  `doc_charge_calculate` int(11) NOT NULL,
  `processing_fees_calculate` int(11) NOT NULL,
  `net_cash` int(11) NOT NULL,
  `loan_date` date NOT NULL,
  `due_startdate` date NOT NULL,
  `maturity_date` date NOT NULL,
  `collection_method` int(11) DEFAULT NULL,
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

INSERT INTO `loan_entry_loan_calculation` (`id`, `cus_profile_id`, `cus_id`, `loan_id`, `loan_category`, `category_info`, `loan_amount`, `profit_type`, `due_method`, `due_type`, `profit_method`, `scheme_due_method`, `scheme_day`, `scheme_name`, `interest_rate`, `due_period`, `doc_charge`, `processing_fees`, `loan_amnt`, `principal_amnt`, `interest_amnt`, `total_amnt`, `due_amnt`, `doc_charge_calculate`, `processing_fees_calculate`, `net_cash`, `loan_date`, `due_startdate`, `maturity_date`, `collection_method`, `referred`, `agent_id`, `agent_name`, `cus_status`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 1, 'FT-1001', 'LID-101', '1', NULL, 20000, 0, 'Monthly', 'EMI', 'After Benefit', '', 'Not Found', '', 1, 10, 2, 2, 20000, 20000, 2000, 22000, 2200, 400, 400, 19200, '2025-07-29', '2025-07-29', '2026-04-29', 1, 1, '', '', 0, 1, NULL, '2025-07-29', '2025-07-29'),
(2, 2, 'FT-1002', 'LID-102', '1', NULL, 30000, 1, '', '', 'After Benefit', '2', '1', '1', 2, 10, 2, 1, 30000, 30000, 6000, 36000, 3600, 100, 300, 29600, '2025-07-29', '2025-08-01', '2025-09-29', 2, 0, '1', 'A-101', 0, 1, NULL, '2025-07-29', '2025-07-29'),
(3, 3, 'FT-1003', 'LID-103', '1', '', 30000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 1, 10, 2, 2, 30000, 30000, 3000, 33000, 3300, 600, 600, 28800, '2025-09-27', '2025-09-27', '2026-06-27', 1, 0, '1', 'AG-101', 0, 1, 0, '2025-09-27', '2025-09-27'),
(4, 4, 'FT-1004', 'LID-104', '1', NULL, 30000, 1, '', '', 'After Benefit', '2', '1', '1', 2, 10, 2, 1, 30000, 30000, 6000, 36000, 3600, 100, 300, 29600, '2025-07-29', '2025-08-01', '2025-09-29', 2, 0, '1', 'A-101', 0, 1, NULL, '2025-07-29', '2025-07-29'),
(5, 5, 'FT-1001', 'LID-105', '2', '', 45000, 1, '', '', 'After Benefit', '3', '', '2', 1, 10, 1, 1, 45000, 45000, 450, 45450, 4545, 450, 450, 44100, '2025-09-27', '2025-09-27', '2025-10-06', 1, 0, '1', 'AG-101', 0, 1, 1, '2025-09-27', '2025-09-27'),
(6, 6, 'FT-1005', 'LID-106', '3', '', 60000, 1, '', '', 'After Benefit', '2', '1', '1', 2, 10, 2, 1, 60000, 60000, 1200, 61200, 6120, 5, 600, 59398, '2025-09-27', '2025-09-30', '2025-12-01', 1, 1, '', '', 0, 1, NULL, '2025-09-27', NULL),
(7, 7, 'FT-1006', 'LID-107', '2', '', 90000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 1, 10, 1, 1, 90000, 90000, 9000, 99000, 9900, 900, 900, 88200, '2025-09-27', '2025-09-27', '2026-06-27', 1, 1, '', '', 0, 1, NULL, '2025-09-27', NULL),
(8, 8, 'FT-1006', 'LID-108', '1', '', 50000, 0, 'Monthly', 'EMI', 'After Benefit', '', '', '', 2, 10, 2, 2, 50000, 50000, 10000, 60000, 6000, 1000, 1000, 48000, '2025-09-27', '2025-09-27', '2026-06-27', 1, 1, '', '', 0, 1, 1, '2025-09-27', '2025-09-29'),
(9, 9, 'FT-1005', 'LID-109', '3', '', 60000, 1, '', '', 'After Benefit', '2', '3', '1', 2, 10, 2, 1, 60000, 60000, 1200, 61200, 6120, 5, 600, 59398, '2025-09-27', '2025-09-27', '2025-11-26', 1, 1, '', '', 0, 1, 1, '2025-09-27', '2025-09-27');

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
  `net_bal_cash` varchar(100) NOT NULL,
  `payment_type` int(11) NOT NULL,
  `payment_mode` varchar(11) DEFAULT NULL,
  `bank_name` varchar(11) DEFAULT NULL,
  `cash` varchar(100) DEFAULT NULL,
  `cheque_val` varchar(100) DEFAULT NULL,
  `transaction_val` varchar(100) DEFAULT NULL,
  `transaction_id` varchar(50) DEFAULT NULL,
  `cheque_no` varchar(50) DEFAULT NULL,
  `cheque_remark` varchar(100) DEFAULT NULL,
  `tran_remark` varchar(100) DEFAULT NULL,
  `balance_amount` varchar(100) DEFAULT NULL,
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

INSERT INTO `loan_issue` (`id`, `cus_id`, `cus_profile_id`, `loan_amnt`, `net_cash`, `net_bal_cash`, `payment_type`, `payment_mode`, `bank_name`, `cash`, `cheque_val`, `transaction_val`, `transaction_id`, `cheque_no`, `cheque_remark`, `tran_remark`, `balance_amount`, `issue_date`, `issue_person`, `relationship`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'FT-1001', 1, 20000, 19200, '19200', 2, '2', '', '19200', '', '', '', '', '', '', '0', '2025-07-29', 'lakshmi', 'Mother', 1, NULL, '2025-07-29 00:00:00', NULL),
(2, 'FT-1002', 2, 30000, 29600, '29600', 2, '2', '', '', '29600', '', '', '9999999999', 'ok', '', '0', '2025-07-29', 'Sri', 'Mother', 1, NULL, '2025-07-29 00:00:00', NULL),
(3, 'FT-1004', 4, 30000, 29600, '29600', 2, '2', '1', '', '29600', '', '', '9999999999', 'ok', '', '0', '2025-07-29', 'Sri', 'Mother', 1, NULL, '2025-07-29 00:00:00', NULL),
(4, 'FT-1003', 3, 30000, 28800, '28800', 2, '1', '', '28800', NULL, NULL, NULL, NULL, NULL, NULL, '0', '2025-09-27', 'Anu', 'Customer', 1, NULL, '2025-09-27 13:22:14', NULL),
(6, 'FT-1001', 5, 45000, 44100, '44100', 2, '1', '', '44100', NULL, NULL, NULL, NULL, NULL, NULL, '0', '2025-09-27', 'Maya', 'Customer', 1, NULL, '2025-09-27 15:24:04', NULL),
(7, 'FT-1005', 9, 60000, 59398, '59398', 2, '2', '1', NULL, '', '59398', '776876876787', '', '', 'ok', '0', '2025-09-27', 'Fayaz', 'Customer', 1, NULL, '2025-09-27 18:13:50', NULL),
(8, 'FT-1006', 8, 50000, 48000, '48000', 1, '1', '', '2000', NULL, NULL, NULL, NULL, NULL, NULL, '46000', '2025-09-29', 'Moni', 'Customer', 1, NULL, '2025-09-29 09:58:17', NULL),
(9, 'FT-1006', 8, 50000, 48000, '46000', 1, '3', '1', NULL, '6000', '', '', '5656756', 'ok', '', '40000', '2025-09-29', 'Fayaz', 'Spouse', 1, NULL, '2025-09-29 10:19:22', NULL),
(10, 'FT-1006', 8, 50000, 48000, '40000', 1, '3', '1', NULL, '40000', '', '', '5675675', '', '', '0', '2025-09-29', 'Fayaz', 'Spouse', 1, NULL, '2025-09-29 10:51:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `loan_summary_feedback`
--

CREATE TABLE `loan_summary_feedback` (
  `id` int(11) NOT NULL,
  `cus_profile_id` varchar(255) DEFAULT NULL,
  `cus_id` varchar(255) DEFAULT NULL,
  `feedback_label` varchar(255) DEFAULT NULL,
  `cus_feedback` varchar(255) DEFAULT NULL,
  `feedback_remark` varchar(255) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date NOT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loan_summary_feedback`
--

INSERT INTO `loan_summary_feedback` (`id`, `cus_profile_id`, `cus_id`, `feedback_label`, `cus_feedback`, `feedback_remark`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, '2', 'FT-1002', 'Good', '5', 'tty', 1, 1, '2025-09-27', '2025-09-27');

-- --------------------------------------------------------

--
-- Table structure for table `location_audit`
--

CREATE TABLE `location_audit` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `actions` varchar(150) NOT NULL,
  `actions_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `latitude` varchar(150) NOT NULL,
  `longitude` varchar(150) NOT NULL,
  `location` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location_audit`
--

INSERT INTO `location_audit` (`id`, `user_id`, `actions`, `actions_date_time`, `latitude`, `longitude`, `location`) VALUES
(3, 1, 'Login', '2025-11-18 00:13:06', '10.3160955', '77.9301306', 'Panjanpatti N, Tamil Nadu, 624303, IN'),
(4, 1, 'Login', '2025-11-18 09:30:24', '11.9295918', '79.8283485', 'Puducherry, Puducherry, 605001, IN');

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
(12, 'Concern', 'concern', 'help-with-circle'),
(13, 'Follow Up', 'follow_up', 'folder_shared'),
(14, 'Search', 'search', 'magnifying-glass'),
(15, 'Reports', 'reports', 'assignment_turned_in'),
(16, 'Bulk Upload', 'bulk_upload', 'cloud_upload');

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
  `take_status` varchar(50) NOT NULL DEFAULT '0',
  `take_date` date DEFAULT NULL,
  `take_person` varchar(50) DEFAULT NULL,
  `take_purpose` varchar(50) DEFAULT NULL,
  `take_remarks` varchar(50) DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mortgage_info`
--

INSERT INTO `mortgage_info` (`id`, `cus_id`, `cus_profile_id`, `property_holder_name`, `relationship`, `property_details`, `mortgage_name`, `designation`, `mortgage_number`, `reg_office`, `mortgage_value`, `upload`, `noc_status`, `date_of_noc`, `noc_member`, `noc_relationship`, `take_status`, `take_date`, `take_person`, `take_purpose`, `take_remarks`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'FT-1005', 9, 0, 'Customer', 'jkj', 'klll', 'llll', '7897897', '789789', '890000', '68da4ef4ae527.jpg', 0, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, 1, NULL, '2025-09-29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `new_cus_promo`
--

CREATE TABLE `new_cus_promo` (
  `id` int(11) NOT NULL,
  `promo_id` int(11) NOT NULL,
  `label` varchar(100) NOT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `follow_date` date DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `created_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `new_cus_promo`
--

INSERT INTO `new_cus_promo` (`id`, `promo_id`, `label`, `remark`, `status`, `follow_date`, `insert_login_id`, `created_on`) VALUES
(1, 6, 'ok', '2 months', 'Interested', '2025-09-26', 1, '2025-09-26'),
(2, 5, 'dgdfgd', 'ok', 'Not Interested', '2025-10-04', 1, '2025-09-26'),
(5, 5, 'dgdfgd', 'ok', 'Interested', '2025-10-18', 1, '2025-09-26'),
(6, 9, 'klkl', 'fgdfgd', 'Not Interested', '2025-09-26', 1, '2025-09-26'),
(7, 9, 'dgdfgd', 'dssd', 'Interested', '2025-09-26', 1, '2025-09-26'),
(8, 17, 'sdfsdf', 'sdfsdf', 'Not Interested', '2025-09-12', 1, '2025-09-26'),
(9, 1, 'dgdfgd', 'fgdfgd', 'Interested', '2025-09-27', 1, '2025-09-27'),
(10, 2, 'alcas', 'dsfsdfsdfsdf', 'Interested', '2025-09-28', 1, '2025-09-27');

-- --------------------------------------------------------

--
-- Table structure for table `noc`
--

CREATE TABLE `noc` (
  `id` int(11) NOT NULL,
  `cus_profile_id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `signed_list` int(11) NOT NULL,
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

INSERT INTO `noc` (`id`, `cus_profile_id`, `cus_id`, `signed_list`, `cheque_list`, `mortgage_list`, `endorsement_list`, `document_list`, `gold_info`, `noc_status`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 4, 'FT-1004', 2, 2, 2, 2, 2, 2, 2, 1, NULL, '2025-09-29', NULL);

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
(1, 1, '2025-09-29', 'Niyaz', 'Customer', '2025-09-29');

-- --------------------------------------------------------

--
-- Table structure for table `other_transaction`
--

CREATE TABLE `other_transaction` (
  `id` int(11) NOT NULL,
  `coll_mode` int(11) NOT NULL,
  `bank_id` varchar(11) DEFAULT NULL,
  `trans_cat` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `ref_id` varchar(100) DEFAULT NULL,
  `trans_id` varchar(100) DEFAULT NULL,
  `user_name` varchar(11) DEFAULT NULL,
  `amount` varchar(150) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `other_transaction`
--

INSERT INTO `other_transaction` (`id`, `coll_mode`, `bank_id`, `trans_cat`, `name`, `type`, `ref_id`, `trans_id`, `user_name`, `amount`, `remark`, `insert_login_id`, `created_on`) VALUES
(1, 1, '', 2, 1, 1, 'INV-101', '', NULL, '1000000', 'ok', 1, '2025-09-24 11:31:03'),
(2, 1, '', 2, 1, 1, 'INV-102', '', NULL, '1200000', 'ok', 1, '2025-09-24 11:31:25');

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
(1, 2, 'Anu', 1, '2025-09-24');

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
('1', '2025-07', '44', NULL, '0', '0', '2025-09-27 10:50:34', '2025-09-27 10:50:34'),
('1', '2025-08', '88', NULL, '0', '0', '2025-09-27 10:50:34', '2025-09-27 10:50:34'),
('2', '2025-08-01', '72', NULL, '0', '0', '2025-09-27 13:37:09', '2025-09-27 13:37:09'),
('2', '2025-08-08', '72', NULL, '0', '0', '2025-09-27 13:37:09', '2025-09-27 13:37:09'),
('2', '2025-08-15', '72', NULL, '0', '0', '2025-09-27 13:37:09', '2025-09-27 13:37:09'),
('2', '2025-08-22', '72', NULL, '0', '0', '2025-09-27 13:37:09', '2025-09-27 13:37:09'),
('2', '2025-08-29', '72', NULL, '0', '0', '2025-09-27 13:37:09', '2025-09-27 13:37:09'),
('2', '2025-09-05', '72', NULL, '0', '0', '2025-09-27 13:37:09', '2025-09-27 13:37:09'),
('2', '2025-09-12', '72', NULL, '0', '0', '2025-09-27 13:37:09', '2025-09-27 13:37:09'),
('2', '2025-09-19', '72', NULL, '0', '0', '2025-09-27 13:37:09', '2025-09-27 13:37:09'),
('2', NULL, NULL, '2025-09-27', '576', '', '2025-09-27 13:42:18', '2025-09-27 13:42:18'),
('1', NULL, NULL, '2025-09-27', '132', '', '2025-09-27 15:24:34', '2025-09-27 15:24:34'),
('4', '2025-08-01', '72', NULL, '0', '0', '2025-09-27 17:32:09', '2025-09-27 17:32:09'),
('4', '2025-08-08', '72', NULL, '0', '0', '2025-09-27 17:32:09', '2025-09-27 17:32:09'),
('4', '2025-08-15', '72', NULL, '0', '0', '2025-09-27 17:32:09', '2025-09-27 17:32:09'),
('4', '2025-08-22', '72', NULL, '0', '0', '2025-09-27 17:32:09', '2025-09-27 17:32:09'),
('4', '2025-08-29', '72', NULL, '0', '0', '2025-09-27 17:32:09', '2025-09-27 17:32:09'),
('4', '2025-09-05', '72', NULL, '0', '0', '2025-09-27 17:32:09', '2025-09-27 17:32:09'),
('4', '2025-09-12', '72', NULL, '0', '0', '2025-09-27 17:32:09', '2025-09-27 17:32:09'),
('4', '2025-09-19', '72', NULL, '0', '0', '2025-09-27 17:32:09', '2025-09-27 17:32:09'),
('4', NULL, NULL, '2025-09-27', '576', '', '2025-09-27 17:32:29', '2025-09-27 17:32:29'),
('9', '2025-09-27', '122', NULL, '0', '0', '2025-11-19 13:08:49', '2025-11-19 13:08:49'),
('9', '2025-10-04', '122', NULL, '0', '0', '2025-11-19 13:08:49', '2025-11-19 13:08:49'),
('9', '2025-10-11', '122', NULL, '0', '0', '2025-11-19 13:08:49', '2025-11-19 13:08:49'),
('9', '2025-10-18', '122', NULL, '0', '0', '2025-11-19 13:08:49', '2025-11-19 13:08:49'),
('9', '2025-10-25', '122', NULL, '0', '0', '2025-11-19 13:08:49', '2025-11-19 13:08:49'),
('9', '2025-11-01', '122', NULL, '0', '0', '2025-11-19 13:08:49', '2025-11-19 13:08:49'),
('9', '2025-11-08', '122', NULL, '0', '0', '2025-11-19 13:08:49', '2025-11-19 13:08:49');

-- --------------------------------------------------------

--
-- Table structure for table `promotion_customer`
--

CREATE TABLE `promotion_customer` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `cus_profile_id` int(11) NOT NULL,
  `label` varchar(100) NOT NULL,
  `remark` varchar(100) NOT NULL,
  `c_sts` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `follow_date` datetime DEFAULT NULL,
  `insert_login_id` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promotion_customer`
--

INSERT INTO `promotion_customer` (`id`, `cus_id`, `cus_profile_id`, `label`, `remark`, `c_sts`, `status`, `follow_date`, `insert_login_id`, `created_on`) VALUES
(1, 'FT-1005', 6, 'Good', 'ok', '2', 'Interested', '2025-09-27 00:00:00', 1, '2025-09-27 15:37:47'),
(2, 'FT-1003', 3, 'ok', 'sdfs', '1', 'Interested', '2025-09-27 00:00:00', 1, '2025-09-27 15:45:57'),
(3, 'FT-1006', 7, 'dgdfgd', 'sdfsdfsdf', '2', 'Not Interested', '2025-09-29 00:00:00', 1, '2025-09-27 15:46:09');

-- --------------------------------------------------------

--
-- Table structure for table `proof_info`
--

CREATE TABLE `proof_info` (
  `id` int(11) NOT NULL,
  `addProof_name` varchar(100) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `proof_info`
--

INSERT INTO `proof_info` (`id`, `addProof_name`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'Aadhar', 1, NULL, '2025-07-10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `property_info`
--

CREATE TABLE `property_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) NOT NULL,
  `aadhar_num` varchar(250) DEFAULT NULL,
  `cus_profile_id` varchar(255) NOT NULL,
  `property` varchar(100) NOT NULL,
  `property_detail` varchar(100) NOT NULL,
  `property_holder` int(11) NOT NULL,
  `insert_login_id` int(11) NOT NULL,
  `update_login_id` int(11) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Director', 1, NULL, '2025-05-08', NULL),
(2, 'Admin', 1, NULL, '2025-10-16', NULL),
(3, 'Staff', 1, NULL, '2025-10-16', NULL);

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
(1, 'weekly', '2', 'After Benefit', '2', '10', '2', 'rupee', '2', '10', 'percent', '1', '10', 1, 1, '2025-07-10', '2025-09-24'),
(2, 'kkk', '3', 'After Benefit', '1', '10', '1', 'percent', '1', '1', 'percent', '1', '1', 1, NULL, '2025-07-29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `signed_doc_info`
--

CREATE TABLE `signed_doc_info` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(250) DEFAULT NULL,
  `doc_name` varchar(255) DEFAULT NULL,
  `sign_type` varchar(255) DEFAULT NULL,
  `signType_relationship` varchar(255) DEFAULT NULL,
  `doc_Count` varchar(255) DEFAULT NULL,
  `cus_profile_id` varchar(150) DEFAULT NULL,
  `noc_status` varchar(10) NOT NULL DEFAULT '0',
  `date_of_noc` varchar(150) DEFAULT NULL,
  `noc_member` varchar(150) DEFAULT NULL,
  `noc_relationship` varchar(150) DEFAULT NULL,
  `take_status` varchar(20) NOT NULL DEFAULT '0',
  `take_date` date DEFAULT NULL,
  `take_person` varchar(50) DEFAULT NULL,
  `take_purpose` varchar(50) DEFAULT NULL,
  `take_remarks` varchar(50) DEFAULT NULL,
  `insert_login_id` varchar(100) DEFAULT NULL,
  `update_login_id` varchar(100) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `signed_doc_info`
--

INSERT INTO `signed_doc_info` (`id`, `cus_id`, `doc_name`, `sign_type`, `signType_relationship`, `doc_Count`, `cus_profile_id`, `noc_status`, `date_of_noc`, `noc_member`, `noc_relationship`, `take_status`, `take_date`, `take_person`, `take_purpose`, `take_remarks`, `insert_login_id`, `update_login_id`, `created_date`, `updated_date`) VALUES
(1, 'FT-1003', '0', '0', '', '1', '3', '0', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-09-27 11:54:41'),
(2, 'FT-1006', '0', '0', '', '1', '8', '0', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-09-27 18:04:49'),
(3, 'FT-1005', '0', '0', '', '1', '9', '0', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-09-27 18:10:37'),
(4, 'FT-1005', '0', '1', '5', '1', '9', '0', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-09-29 14:45:54'),
(5, 'FT-1005', '0', '0', '', '1', '9', '0', NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-09-29 14:46:07');

-- --------------------------------------------------------

--
-- Table structure for table `signed_upload`
--

CREATE TABLE `signed_upload` (
  `id` int(11) NOT NULL,
  `cus_id` varchar(100) DEFAULT NULL,
  `cus_profile_id` int(11) DEFAULT NULL,
  `signed_info_id` int(50) DEFAULT NULL,
  `uploads` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `signed_upload`
--

INSERT INTO `signed_upload` (`id`, `cus_id`, `cus_profile_id`, `signed_info_id`, `uploads`) VALUES
(1, 'FT-1005', 9, 5, '68da4e57ca0f6.jpg');

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
(2, 'Puducherry', 1),
(3, 'Andhra Pradesh', 1);

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
(18, 10, 'Accounts Loan Issue', 'accounts_loan_issue', 'style'),
(19, 11, 'Update Customer', 'update_customer', 'cloud_upload'),
(21, 12, 'Concern Creation', 'concern_creation', 'info1'),
(22, 13, 'Promotion Activity', 'customer_data', 'person_pin'),
(23, 13, 'Due Follow Up', 'due_followup', 'exit_to_app'),
(24, 14, 'Search', 'search_screen', 'search'),
(25, 15, 'Loan Issue Report', 'loan_issue_report', 'area-graph'),
(26, 15, 'Collection Report', 'collection_report', 'event_note'),
(27, 15, 'Balance Report', 'balance_report', 'event_available'),
(28, 15, 'Closed Report', 'closed_report', 'erase'),
(29, 15, 'Ledger View Report', 'ledger_view_report', 'terrain'),
(30, 16, 'Bulk Upload ', 'bulk_upload', 'cloud_done'),
(31, 12, 'Concern Solution', 'concern_solution', 'stars'),
(32, 15, 'Concern Report', 'concern_report', 'note');

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
(320, 2, 39, 'Yanam', 1),
(321, 3, 41, 'Nagari', 1);

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
  `update_login_id` varchar(100) DEFAULT NULL,
  `created_on` date NOT NULL,
  `updated_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='All the users will be stored here with screen access details';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `user_code`, `role`, `designation`, `address`, `place`, `email`, `mobile`, `user_name`, `password`, `branch`, `loan_category`, `line`, `collection_access`, `download_access`, `screens`, `insert_login_id`, `update_login_id`, `created_on`, `updated_on`) VALUES
(1, 'Super Admin', 'US-001', 2, 4, '', '', '', '', 'admin', '123', '2,3', '1,2,3,4', '1,2,6', 1, 1, '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,31,22,23,24,25,26,27,28,29,32,30', '1', '1', '2024-06-13', '2025-12-02'),
(10, 'Test1', 'US-002', 1, 3, '', '', '', '', 'Test', '123', '2,3', '1', '1', 2, 2, '1,4,5,9,10,11,12,13,14,15,18,19,21,31,22,23,24,26', '1', '1', '2025-01-29', '2025-12-01'),
(14, 'Dhiviya', 'US-003', 3, 1, '', '', '', '', 'dhivi', '123', '2,3', '1,2,3', '1,2,6', 1, 1, '1,2,9,21,31', '1', '1', '2025-10-16', '2025-12-01'),
(15, 'ramya', 'US-004', 3, 5, '', '', '', '', 'ramya', '123', '2', '2', '1', 1, 1, '1,21,31', '1', '1', '2025-12-01', '2025-12-02'),
(16, 'priya', 'US-005', 3, 2, '', '', '', '', 'priya', '123', '3,2', '4,3', '2,1', 1, 1, '1,21,31', '1', NULL, '2025-12-02', NULL);

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
-- Indexes for table `area_creation_area_name`
--
ALTER TABLE `area_creation_area_name`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `commitment`
--
ALTER TABLE `commitment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_commitment` (`cus_profile_id`,`cus_id`,`commitment_date`) USING BTREE;

--
-- Indexes for table `company_creation`
--
ALTER TABLE `company_creation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `State ids` (`state`),
  ADD KEY `District ids` (`district`),
  ADD KEY `Taluk ids` (`taluk`);

--
-- Indexes for table `concern_creation`
--
ALTER TABLE `concern_creation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `concern_subject`
--
ALTER TABLE `concern_subject`
  ADD PRIMARY KEY (`con_sub_id`);

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
-- Indexes for table `customer_register`
--
ALTER TABLE `customer_register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_status`
--
ALTER TABLE `customer_status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerProfileId` (`cus_profile_id`);

--
-- Indexes for table `cus_feedback`
--
ALTER TABLE `cus_feedback`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `fingerprints`
--
ALTER TABLE `fingerprints`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gold_info`
--
ALTER TABLE `gold_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guarantor_info`
--
ALTER TABLE `guarantor_info`
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
-- Indexes for table `loan_summary_feedback`
--
ALTER TABLE `loan_summary_feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location_audit`
--
ALTER TABLE `location_audit`
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
-- Indexes for table `new_cus_promo`
--
ALTER TABLE `new_cus_promo`
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
-- Indexes for table `promotion_customer`
--
ALTER TABLE `promotion_customer`
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
-- Indexes for table `signed_doc_info`
--
ALTER TABLE `signed_doc_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `signed_upload`
--
ALTER TABLE `signed_upload`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `agent_creation`
--
ALTER TABLE `agent_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `area_creation`
--
ALTER TABLE `area_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `area_creation_area_name`
--
ALTER TABLE `area_creation_area_name`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `area_name_creation`
--
ALTER TABLE `area_name_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `bank_clearance`
--
ALTER TABLE `bank_clearance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key';

--
-- AUTO_INCREMENT for table `bank_creation`
--
ALTER TABLE `bank_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bank_info`
--
ALTER TABLE `bank_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `branch_creation`
--
ALTER TABLE `branch_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cash_tally_modes`
--
ALTER TABLE `cash_tally_modes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `cheque_info`
--
ALTER TABLE `cheque_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cheque_no_list`
--
ALTER TABLE `cheque_no_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cheque_upd`
--
ALTER TABLE `cheque_upd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `collection`
--
ALTER TABLE `collection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `collection_charges`
--
ALTER TABLE `collection_charges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key';

--
-- AUTO_INCREMENT for table `commitment`
--
ALTER TABLE `commitment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `company_creation`
--
ALTER TABLE `company_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `concern_creation`
--
ALTER TABLE `concern_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `concern_subject`
--
ALTER TABLE `concern_subject`
  MODIFY `con_sub_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `customer_data`
--
ALTER TABLE `customer_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer_profile`
--
ALTER TABLE `customer_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `customer_register`
--
ALTER TABLE `customer_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customer_status`
--
ALTER TABLE `customer_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `cus_feedback`
--
ALTER TABLE `cus_feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `designation`
--
ALTER TABLE `designation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `districts`
--
ALTER TABLE `districts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `document_info`
--
ALTER TABLE `document_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `document_need`
--
ALTER TABLE `document_need`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `endorsement_info`
--
ALTER TABLE `endorsement_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `family_info`
--
ALTER TABLE `family_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `fingerprints`
--
ALTER TABLE `fingerprints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key';

--
-- AUTO_INCREMENT for table `gold_info`
--
ALTER TABLE `gold_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guarantor_info`
--
ALTER TABLE `guarantor_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kyc_info`
--
ALTER TABLE `kyc_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `line_name_creation`
--
ALTER TABLE `line_name_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `loan_category`
--
ALTER TABLE `loan_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `loan_category_creation`
--
ALTER TABLE `loan_category_creation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `loan_entry_loan_calculation`
--
ALTER TABLE `loan_entry_loan_calculation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `loan_issue`
--
ALTER TABLE `loan_issue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `loan_summary_feedback`
--
ALTER TABLE `loan_summary_feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `location_audit`
--
ALTER TABLE `location_audit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `menu_list`
--
ALTER TABLE `menu_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `mortgage_info`
--
ALTER TABLE `mortgage_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `new_cus_promo`
--
ALTER TABLE `new_cus_promo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `noc`
--
ALTER TABLE `noc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `noc_ref`
--
ALTER TABLE `noc_ref`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `other_transaction`
--
ALTER TABLE `other_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `other_trans_name`
--
ALTER TABLE `other_trans_name`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `promotion_customer`
--
ALTER TABLE `promotion_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `proof_info`
--
ALTER TABLE `proof_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `property_info`
--
ALTER TABLE `property_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `scheme`
--
ALTER TABLE `scheme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `signed_doc_info`
--
ALTER TABLE `signed_doc_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `signed_upload`
--
ALTER TABLE `signed_upload`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sub_menu_list`
--
ALTER TABLE `sub_menu_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `taluks`
--
ALTER TABLE `taluks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=322;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
