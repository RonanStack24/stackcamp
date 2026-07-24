-- Select the Stackcamp database in InfinityFree phpMyAdmin before importing.
-- InfinityFree creates and names the database for you, so CREATE DATABASE and
-- USE statements are intentionally omitted.

CREATE TABLE IF NOT EXISTS waitlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    camper_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS build_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    mood VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS page_views (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_views INT DEFAULT 0
);

INSERT INTO page_views (id, total_views)
SELECT 1, 0
WHERE NOT EXISTS (SELECT 1 FROM page_views WHERE id = 1);
