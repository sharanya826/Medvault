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

-- Users Table (for future authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Reviews Table (optional, if users can submit feedback)
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    medicine_id INT,
    review_text TEXT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (medicine_id) REFERENCES medicines(id)
);
