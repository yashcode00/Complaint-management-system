-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 21, 2021 at 04:18 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `complaint_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `id` int(11) NOT NULL,
  `firstname` varchar(225) NOT NULL,
  `lastname` varchar(225) NOT NULL,
  `fathername` varchar(255) NOT NULL,
  `username` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `rollnumber` varchar(225) NOT NULL,
  `email` varchar(300) NOT NULL,
  `mobile` bigint(10) NOT NULL,
  `dob` date NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `state` varchar(225) NOT NULL,
  `gender` enum('m','f','o') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`id`, `firstname`, `lastname`, `fathername`, `username`, `password`, `rollnumber`, `email`, `mobile`, `dob`, `timestamp`, `state`, `gender`) VALUES
(1, 'Yash', 'Sharma', 'Vijay Narayan', 'yashcode00', 'e10adc3949ba59abbe56e057f20f883e', 'B20241', 'yashuvats.42@gmail.com', 9564315430, '2023-10-08', '2021-10-21 19:37:29', 'Delhi', 'm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`,`username`,`rollnumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
