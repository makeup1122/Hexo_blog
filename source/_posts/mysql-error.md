---
title: mysql-error
date: 2017-08-30 09:51:21
tags:
- mysql
---
 [PDOException]                                                                                      
  SQLSTATE[22007]: Invalid datetime format: 1292 Incorrect date value: '0000-00-00' for column 're_directorytime' at row 1  

   SET SESSION sql_mode='ALLOW_INVALID_DATES';

   ALTER TABLE `culture`.`cu_immaterial` 
        CHANGE COLUMN `content` `content` MEDIUMTEXT NOT NULL ; 