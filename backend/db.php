<?php
// backend/db.php

// 1. Common CORS Headers
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. Database Configuration
// Production credentials live in config.php, which is intentionally ignored
// by Git. Local development continues to use the defaults below.
$configFile = __DIR__ . '/config.php';
$config = file_exists($configFile)
    ? require $configFile
    : [
        'host' => getenv('DB_HOST') ?: 'localhost',
        'database' => getenv('DB_NAME') ?: 'stackcamp_db',
        'username' => getenv('DB_USER') ?: 'root',
        'password' => getenv('DB_PASSWORD') ?: '',
    ];

$host = $config['host'];
$dbname = $config['database'];
$username = $config['username'];
$password = $config['password'];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    error_log("Stackcamp database connection failed: " . $e->getMessage());
    echo json_encode(["status" => "error", "message" => "Database connection failed. Check the server database configuration."]);
    exit();
}
