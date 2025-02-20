CREATE DATABASE Leon_DB;

USE Leon_DB;

-- ====================================
-- Tabla: Eventos de agenda
-- ====================================
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    hour TIME,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ====================================
-- Tabla: Avisos
-- ====================================

CREATE INDEX idx_date ON events(date);
CREATE INDEX idx_title ON events(title);

CREATE TABLE IF NOT EXISTS `avisos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,          
  `title` VARCHAR(255) NOT NULL,                
  `category` VARCHAR(255) NOT NULL DEFAULT 'Sin categoría', 
  `subtitle` VARCHAR(255),                      
  `link` VARCHAR(2083),                         
  `content` TEXT DEFAULT NULL,    
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,              
  UNIQUE(`title`, `subtitle`)                 
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;