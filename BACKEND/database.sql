CREATE DATABASE IF NOT EXISTS medvault;
USE medvault;

-- Medicines Table
CREATE TABLE IF NOT EXISTS medicines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    composition TEXT,
    uses TEXT,
    side_effects TEXT,
    image_url VARCHAR(255),
    manufacturer VARCHAR(255),
    excellent_review_percent INT,
    average_review_percent INT,
    poor_review_percent INT
);


