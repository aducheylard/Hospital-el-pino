create database if not exists bd_hud;
Use bd_hud;

-- -----------------------------------------------------
-- Table `Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_hud`.`Usuario` (
  `rut_pasaporte` VARCHAR(15) NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellido` VARCHAR(45) NOT NULL,
  `Telefono` INT NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Foto` VARCHAR(45) NULL,
  PRIMARY KEY (`rut_pasaporte`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_hud`.`Externos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_hud`.`Externos` (
  `rut_pasaporte` VARCHAR(15) NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellido` VARCHAR(45) NOT NULL,
  `Telefono` INT NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Foto` VARCHAR(45) NULL,
  `Comuna` VARCHAR(45) NOT NULL,
  `Domicilio` VARCHAR(45) NOT NULL,
  `num_domicilio` INT NOT NULL,
  `num_depto` INT NULL,
  `Edad` INT NOT NULL,
  `Fecha_nacimiento` DATE NULL,
  `Nacionalidad` VARCHAR(10) NOT NULL,
  foreign key (`rut_pasaporte`) references `bd_hud`.`Usuario`(rut_pasaporte),
  PRIMARY KEY (`rut_pasaporte`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_hud`.`Especialista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_hud`.`Especialista` (
  `rut_pasaporte` VARCHAR(15) NOT NULL,
  `Rol` VARCHAR(45) NOT NULL,
  foreign key (`rut_pasaporte`) references `bd_hud`.`Usuario`(rut_pasaporte),
  PRIMARY KEY (`rut_pasaporte`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_hud`.`Tutor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_hud`.`Tutor` (
  `rut_pasaporte` VARCHAR(15) NOT NULL,
  `Rut_tutor` VARCHAR(15) NOT NULL,
  `Rut_paciente` VARCHAR(15) NULL,
  PRIMARY KEY (`rut_pasaporte`, `Rut_tutor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_hud`.`Paciente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_hud`.`Paciente` (
  `rut_pasaporte` VARCHAR(15) NOT NULL,
  `Rut_paciente` VARCHAR(15) NOT NULL,
  `Rut_tutor` VARCHAR(15) NOT NULL,
  foreign key (`rut_pasaporte`) references `bd_hud`.`Usuario`(rut_pasaporte),
  PRIMARY KEY (`rut_pasaporte`, `Rut_paciente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_hud`.`Ficha_medica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_hud`.`Ficha_medica` (
  `Rut_paciente` VARCHAR(15) NOT NULL,
  `Nombre_paciente` VARCHAR(45) NOT NULL,
  `Historia` VARCHAR(45) NULL,
  `cantidad_insumo` INT NULL,
  `insumo` VARCHAR(45) NULL,
  `Hora_inicio` VARCHAR(45) NOT NULL,
  `Hora_termino` VARCHAR(45) NOT NULL,
  foreign key (`Rut_pasaporte`) references `bd_hud`.`Paciente`(rut_pasaporte),
  PRIMARY KEY (`Rut_paciente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_hud`.`Turnos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_hud`.`Turnos` (
  `Rut` VARCHAR(15) NOT NULL,
  `Disponibilidad` TINYINT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  foreign key (`Rut`) references `bd_hud`.`Especialista`(rut_pasaporte),
  PRIMARY KEY (`Rut`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_hud`.`Equipo_medico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_hud`.`Equipo_medico` (
  `Rol` VARCHAR(45) NOT NULL,
  `id` INT NULL,
  foreign key (`Rol`) references `bd_hud`.`Especialista`(`Rol`),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_hud`.`Reporte_visita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_hud`.`Reporte_visita` (
  `Rut_paciente` VARCHAR(15) NOT NULL,
  `Nombre_paciente` VARCHAR(45) NOT NULL,
  foreign key (`Rut_pasaporte`) references `bd_hud`.`Ficha_medica`(rut_pasaporte),
  PRIMARY KEY (`Rut_paciente`, `Nombre_paciente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_hud`.`ruta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_hud`.`ruta` (
  `tiempo` TIME NOT NULL,
  `objetivo` VARCHAR(45) NOT NULL,
  `ID_equipo_medico` VARCHAR(45) NOT NULL,
  foreign key (`ID_equipo_medico`) references `bd_hud`.`Equipo_medico`(`id`),
  PRIMARY KEY (`ID_equipo_medico`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_hud`.`Visita_programada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_hud`.`Visita_programada` (
  `Rut_paciente` VARCHAR(15) NOT NULL,
  `fecha` DATE NOT NULL,
  `Rut_enfermero` VARCHAR(15) NOT NULL,
  `Riesgo` VARCHAR(45) NOT NULL,
  `Especialidad` VARCHAR(45) NOT NULL,
  foreign key (`Rut_paciente`) references `bd_hud`.`Tutor`(`Rut_paciente`),
  PRIMARY KEY (`Rut_paciente`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `bd_hud`.`Calendario_visitas`(
 `Rut_paciente` VARCHAR(15) NOT NULL,
  `fecha_inicio` DATE NOT NULL,
  `fecha_termino` DATE NOT NULL,
  foreign key (`Rut_paciente`) references `bd_hud`.`Paciente`(`rut_pasaporte`),
  Primary key(`Rut_paciente`))
  Engine = InnoDB;

 