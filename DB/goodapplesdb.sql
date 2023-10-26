-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema goodapplesdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `goodapplesdb` ;

-- -----------------------------------------------------
-- Schema goodapplesdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `goodapplesdb` DEFAULT CHARACTER SET utf8 ;
USE `goodapplesdb` ;

-- -----------------------------------------------------
-- Table `gender`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gender` ;

CREATE TABLE IF NOT EXISTS `gender` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `date_of_birth` DATE NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `enabled` TINYINT NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NULL,
  `create_date` DATETIME NULL,
  `last_update` DATETIME NULL,
  `phone` VARCHAR(45) NULL,
  `image_url` VARCHAR(2000) NULL,
  `about_me` TEXT NULL,
  `gender_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  INDEX `fk_user_gender1_idx` (`gender_id` ASC),
  CONSTRAINT `fk_user_gender1`
    FOREIGN KEY (`gender_id`)
    REFERENCES `gender` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `classroom`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `classroom` ;

CREATE TABLE IF NOT EXISTS `classroom` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `start_time` TIME NULL,
  `end_time` TIME NULL,
  `teacher_id` INT NOT NULL,
  `enabled` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_class_user1_idx` (`teacher_id` ASC),
  CONSTRAINT `fk_class_user1`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student` ;

CREATE TABLE IF NOT EXISTS `student` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `accommodations` TEXT NULL,
  `nickname` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_student_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_student_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `report`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `report` ;

CREATE TABLE IF NOT EXISTS `report` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `notes` TEXT NULL,
  `teacher_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `create_date` DATETIME NULL,
  `last_update` DATETIME NULL,
  `enabled` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_behavior_user1_idx` (`teacher_id` ASC),
  INDEX `fk_behavior_student1_idx` (`student_id` ASC),
  CONSTRAINT `fk_behavior_user1`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_behavior_student1`
    FOREIGN KEY (`student_id`)
    REFERENCES `student` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `behavior_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `behavior_type` ;

CREATE TABLE IF NOT EXISTS `behavior_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `behavior`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `behavior` ;

CREATE TABLE IF NOT EXISTS `behavior` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(2000) NULL,
  `name` VARCHAR(45) NOT NULL,
  `behavior_type_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_behavior_behavior_type1_idx` (`behavior_type_id` ASC),
  CONSTRAINT `fk_behavior_behavior_type1`
    FOREIGN KEY (`behavior_type_id`)
    REFERENCES `behavior_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `message` ;

CREATE TABLE IF NOT EXISTS `message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(2000) NOT NULL,
  `create_date` DATETIME NULL,
  `last_update` DATETIME NULL,
  `sender_id` INT NOT NULL,
  `recipient_id` INT NOT NULL,
  `enabled` TINYINT NULL,
  `message_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_message_user1_idx` (`sender_id` ASC),
  INDEX `fk_message_user2_idx` (`recipient_id` ASC),
  INDEX `fk_message_message1_idx` (`message_id` ASC),
  CONSTRAINT `fk_message_user1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_user2`
    FOREIGN KEY (`recipient_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_message1`
    FOREIGN KEY (`message_id`)
    REFERENCES `message` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `student_has_class`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_has_class` ;

CREATE TABLE IF NOT EXISTS `student_has_class` (
  `student_id` INT NOT NULL,
  `classroom_id` INT NOT NULL,
  PRIMARY KEY (`student_id`, `classroom_id`),
  INDEX `fk_student_has_class_class1_idx` (`classroom_id` ASC),
  INDEX `fk_student_has_class_student1_idx` (`student_id` ASC),
  CONSTRAINT `fk_student_has_class_student1`
    FOREIGN KEY (`student_id`)
    REFERENCES `student` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_has_class_class1`
    FOREIGN KEY (`classroom_id`)
    REFERENCES `classroom` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `parent_has_student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `parent_has_student` ;

CREATE TABLE IF NOT EXISTS `parent_has_student` (
  `parent_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  PRIMARY KEY (`parent_id`, `student_id`),
  INDEX `fk_user_has_student_student1_idx` (`student_id` ASC),
  INDEX `fk_user_has_student_user1_idx` (`parent_id` ASC),
  CONSTRAINT `fk_user_has_student_user1`
    FOREIGN KEY (`parent_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_student_student1`
    FOREIGN KEY (`student_id`)
    REFERENCES `student` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `reflection`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reflection` ;

CREATE TABLE IF NOT EXISTS `reflection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL,
  `scale` INT NOT NULL,
  `create_date` DATETIME NULL,
  `last_update` DATETIME NULL,
  `student_id` INT NOT NULL,
  `enabled` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_reflection_student1_idx` (`student_id` ASC),
  CONSTRAINT `fk_reflection_student1`
    FOREIGN KEY (`student_id`)
    REFERENCES `student` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `resource`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `resource` ;

CREATE TABLE IF NOT EXISTS `resource` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `link` VARCHAR(2000) NOT NULL,
  `image_url` VARCHAR(2000) NULL,
  `enabled` TINYINT NULL,
  `behavior_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `create_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_resources_behavior1_idx` (`behavior_id` ASC),
  INDEX `fk_resource_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_resources_behavior1`
    FOREIGN KEY (`behavior_id`)
    REFERENCES `behavior` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_resource_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `report_has_behavior`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `report_has_behavior` ;

CREATE TABLE IF NOT EXISTS `report_has_behavior` (
  `report_id` INT NOT NULL,
  `behavior_id` INT NOT NULL,
  PRIMARY KEY (`report_id`, `behavior_id`),
  INDEX `fk_report_has_behavior_behavior1_idx` (`behavior_id` ASC),
  INDEX `fk_report_has_behavior_report1_idx` (`report_id` ASC),
  CONSTRAINT `fk_report_has_behavior_report1`
    FOREIGN KEY (`report_id`)
    REFERENCES `report` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_report_has_behavior_behavior1`
    FOREIGN KEY (`behavior_id`)
    REFERENCES `behavior` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS teacher@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'teacher'@'localhost' IDENTIFIED BY 'teacher';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'teacher'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `gender`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `gender` (`id`, `name`, `description`) VALUES (1, 'unspecified', NULL);
INSERT INTO `gender` (`id`, `name`, `description`) VALUES (2, 'male', NULL);
INSERT INTO `gender` (`id`, `name`, `description`) VALUES (3, 'female', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (1, 'teacher', 'teacher', NULL, 'teacher', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'teacher', NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (2, 'parent', 'parent', NULL, 'parent', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'parent', NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (3, 'student', 'student', NULL, 'student', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (4, 'George', 'Feeny', '1927-03-31', 'Gfeeny', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'teacher', 'theMr.Feeny@email.com', '2010-10-10', '2019-05-05', '555-867-5309', 'https://img.buzzfeed.com/buzzfeed-static/static/2023-01/18/15/asset/1dddd1f13899/sub-buzz-2418-1674057214-11.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto', 'I am a passionate educator and molder of young minds.', 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (5, 'Valerie', 'Frizzle', '1955-12-09', 'Vfrizzle', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'teacher', 'theFrizz@email.com', '1997-12-26', '2020-01-17', '555-123-4565', 'https://hellogiggles.com/wp-content/uploads/sites/7/2017/02/08/800x400-ms-frizzle-magic-school-bus.jpg?quality=82&strip=1&resize=640%2C360', 'When teaching I always ecourage my kids to take chances, make mistakes, and get messy!', 3);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (6, 'Dewey', 'Finn', '1969-08-28', 'Dfinn', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'teacher', 'dfinn@email.com', '2003-04-22', '2003-04-22', '555-555-1555', 'https://m.media-amazon.com/images/M/MV5BNjAxMjg0ODg0NF5BMl5BanBnXkFtZTgwMjQ0MDIyMDI@._V1_.jpg', 'I teach little monsters how to rock.', 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (7, 'Amy', 'Mathews', '1970-12-20', 'Amathews', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'parent', 'amathews@email.com', '2008-01-12', '2008-01-12', '555-256-1123', 'https://cdn.thehollywoodgossip.com/uploads/2014/06/the-cast-of-boy-meets-world-where-are-they-now_betsy-randle.jpg', 'I have wonderfull children.', 3);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (8, 'Alan', 'Mathews', '1968-02-01', 'amthews', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'parent', 'alanmathews@email.com', '2008-01-12', '2008-01-12', '555-256-1122', 'https://www.cameo.com/cdn-cgi/image/fit=cover,format=auto,width=500,height=500/https://cdn.cameo.com/resizer/Zq9-2bILY_c165e7433eab6feb2bc25646cb5e628f.jpg', 'I love my kids and wife. Go Eagles!!', 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (9, 'Danny', 'Tanner', '1969-10-07', 'Dtanner', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'parent', 'dtanner@email.com', '2015-02-23', '2015-02-23', '555-121-1212', 'https://variety.com/wp-content/uploads/2022/01/Bob-Saget-01.jpg?w=800', 'Me and my girls are doing great thanks to the help i get from uncle Jesse and uncle Joey.', 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (10, 'Eric', 'Mathews', '1989-09-12', 'Emathews', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', 'emathews@email.com', '2008-01-12', '2008-01-12', '555-256-1122', 'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2018/10/1200/675/WillFriedle2.jpg?ve=1&tl=1', 'I enjoy playing basketball in my free time.', 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (11, 'Morgan', 'Mathews', '1995-02-22', 'Mmathews', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', 'mmathews@email.com', '2008-01-12', '2008-01-12', '555-256-1122', 'https://s.yimg.com/ny/api/res/1.2/YYYJYdfQJO6m_MQcgTk1jw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTk0MA--/https://media.zenfs.com/en/buzzfeed_articles_778/0b84e8f7ac740994c46b96c92f837df5', 'I like my teachers. They are cool.', 3);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (12, 'Cory', 'Mathews', '1992-05-05', 'Cmathews', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', 'cmathews@email.com', '2008-01-12', '2008-01-12', '555-256-1122', 'https://www.j-14.com/wp-content/uploads/2021/05/bmw01.jpg?fit=800%2C1189&quality=86&strip=all', 'I can\'t wait to get out of school and travel.', 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (13, 'D.J.', 'Tanner', '1989-11-12', 'Djtanner', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', 'dtanner@email.com', '2015-02-23', '2015-02-23', '555-121-1212', 'https://imgix.bustle.com/rehost/2016/9/13/e3084938-44ae-41b8-ab3b-dfb1510932d8.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg', 'My Dad and Uncles take pretty good care of me. My sisters can be a pain.', 3);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (14, 'Stephanie', 'Tanner', '1994-04-20', 'Stanner', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', 'stanner@email.com', '2015-02-23', '2015-02-23', '555-121-1212', 'https://static.wikia.nocookie.net/fullhouse/images/f/f5/Stephanie_Hi-res_001.png/revision/latest?cb=20160227122644', 'My teachers won\'t let me chew gum in class. It makes me think \"how rude!\".', 3);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (15, 'Chim', 'Ritchels', '1988-12-01', 'Critchels', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', 'critchels@email.com', '2012-03-11', '2012-03-11', '555-369-9992', 'https://i.pinimg.com/236x/27/80/1e/27801ee6f52cc1947f72c3494255c86e.jpg', 'I like to go fast!!', 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (16, 'Jon', 'Smith', NULL, 'Jsmith', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (17, 'Jane', 'Smith', NULL, 'Jasmith', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (18, 'Bob', 'Dole', NULL, 'Bdole', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (19, 'Barb', 'Dole', NULL, 'Badole', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (20, 'Rick', 'Role', NULL, 'Rrole', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (21, 'John', 'Cena', NULL, 'Jcena', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (22, 'Jane', 'Doe', NULL, 'Jdoe', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (23, 'Lacy', 'May', NULL, 'Lmay', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (24, 'Sarah', 'Johnson', NULL, 'Sjohnson', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (25, 'Eilean', 'Dover', NULL, 'Edover', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (26, 'Ben', 'Dover', NULL, 'Bdover', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (27, 'Don', 'Donaldson', NULL, 'Ddonaldson', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (28, 'Shirly', 'Smith', NULL, 'Ssmith', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (29, 'Brad', 'Jones', NULL, 'Bjones', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (30, 'Chad', 'Jones', NULL, 'Cjones', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'student', NULL, NULL, NULL, NULL, NULL, NULL, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `classroom`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `classroom` (`id`, `name`, `start_time`, `end_time`, `teacher_id`, `enabled`) VALUES (1, 'period 1', '8:15', '9:10', 4, 1);
INSERT INTO `classroom` (`id`, `name`, `start_time`, `end_time`, `teacher_id`, `enabled`) VALUES (2, 'period 2', '9:15', '10:10', 4, 1);
INSERT INTO `classroom` (`id`, `name`, `start_time`, `end_time`, `teacher_id`, `enabled`) VALUES (3, 'period 3', '10:15', '11:10', 5, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `student`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (1, 10, 'allergic to peanuts', 'E-Rizzle');
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (2, 11, NULL, 'Weasle');
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (3, 12, NULL, 'Corinator');
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (4, 13, NULL, 'Deej');
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (5, 14, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (6, 15, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (7, 16, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (8, 17, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (9, 18, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (10, 19, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (11, 20, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (12, 21, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (13, 22, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (14, 23, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (15, 24, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (16, 25, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (17, 26, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (18, 27, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (19, 28, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (20, 29, NULL, NULL);
INSERT INTO `student` (`id`, `user_id`, `accommodations`, `nickname`) VALUES (21, 30, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `report`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `report` (`id`, `notes`, `teacher_id`, `student_id`, `create_date`, `last_update`, `enabled`) VALUES (1, 'good kid', 1, 1, '2023-10-24', '2023-10-24', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `behavior_type`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `behavior_type` (`id`, `name`) VALUES (1, 'good');
INSERT INTO `behavior_type` (`id`, `name`) VALUES (2, 'bad');

COMMIT;


-- -----------------------------------------------------
-- Data for table `behavior`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `behavior` (`id`, `description`, `name`, `behavior_type_id`) VALUES (1, NULL, 'integrity', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `message`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `message` (`id`, `content`, `create_date`, `last_update`, `sender_id`, `recipient_id`, `enabled`, `message_id`) VALUES (1, 'Hello there.. message content', '2023-10-24', '2023-10-24', 1, 2, 1, NULL);
INSERT INTO `message` (`id`, `content`, `create_date`, `last_update`, `sender_id`, `recipient_id`, `enabled`, `message_id`) VALUES (2, 'reply to message one', '2023-10-25', '2023-10-25', 2, 1, 1, 1);
INSERT INTO `message` (`id`, `content`, `create_date`, `last_update`, `sender_id`, `recipient_id`, `enabled`, `message_id`) VALUES (3, 'second reply to message one', '2023-10-25', '2023-10-25', 2, 1, 1, 1);
INSERT INTO `message` (`id`, `content`, `create_date`, `last_update`, `sender_id`, `recipient_id`, `enabled`, `message_id`) VALUES (4, 'first reply to message two', '2023-10-25', '2023-10-25', 1, 2, 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `student_has_class`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (1, 1);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (2, 1);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (3, 1);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (4, 1);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (5, 1);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (6, 1);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (7, 1);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (8, 1);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (9, 1);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (10, 1);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (11, 1);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (12, 1);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (13, 2);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (14, 2);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (15, 2);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (16, 2);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (17, 2);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (18, 2);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (19, 2);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (20, 2);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (21, 2);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (21, 3);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (1, 3);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (20, 3);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (2, 3);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (3, 3);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (19, 3);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (18, 3);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (17, 3);
INSERT INTO `student_has_class` (`student_id`, `classroom_id`) VALUES (6, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `parent_has_student`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `parent_has_student` (`parent_id`, `student_id`) VALUES (7, 1);
INSERT INTO `parent_has_student` (`parent_id`, `student_id`) VALUES (8, 1);
INSERT INTO `parent_has_student` (`parent_id`, `student_id`) VALUES (7, 2);
INSERT INTO `parent_has_student` (`parent_id`, `student_id`) VALUES (8, 2);
INSERT INTO `parent_has_student` (`parent_id`, `student_id`) VALUES (7, 3);
INSERT INTO `parent_has_student` (`parent_id`, `student_id`) VALUES (8, 3);
INSERT INTO `parent_has_student` (`parent_id`, `student_id`) VALUES (9, 4);
INSERT INTO `parent_has_student` (`parent_id`, `student_id`) VALUES (9, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `reflection`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `reflection` (`id`, `content`, `scale`, `create_date`, `last_update`, `student_id`, `enabled`) VALUES (1, 'good day', 5, '2023-10-24', '2023-10-24', 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `resource`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `resource` (`id`, `title`, `link`, `image_url`, `enabled`, `behavior_id`, `user_id`, `create_date`) VALUES (1, 'helpful info', 'www.google.com', NULL, 1, 1, 1, '2023-10-24');

COMMIT;


-- -----------------------------------------------------
-- Data for table `report_has_behavior`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `report_has_behavior` (`report_id`, `behavior_id`) VALUES (1, 1);

COMMIT;

