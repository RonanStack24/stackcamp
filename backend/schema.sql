-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS stackcamp_db;
USE stackcamp_db;

-- Create the waitlist table to store Join Camp submissions
CREATE TABLE IF NOT EXISTS waitlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    camper_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the build_logs table for the simulator
CREATE TABLE IF NOT EXISTS build_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    mood VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the page_views table for the visitor counter
CREATE TABLE IF NOT EXISTS page_views (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_views INT DEFAULT 0
);

-- Insert the initial counter row if it doesn't exist
INSERT INTO page_views (id, total_views) 
SELECT 1, 0 
WHERE NOT EXISTS (SELECT * FROM page_views WHERE id = 1);
