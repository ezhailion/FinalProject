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
  `role` VARCHAR(45) NULL,
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

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `goodapplesdb`;
INSERT INTO `user` (`id`, `first_name`, `last_name`, `date_of_birth`, `username`, `password`, `enabled`, `role`, `email`, `create_date`, `last_update`, `phone`, `image_url`, `about_me`, `gender_id`) VALUES (1, 'admin', 'admin', NULL, 'admin', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

COMMIT;

