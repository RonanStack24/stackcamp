<?php
// backend/api.php
require_once 'db.php';

// 3. Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON POST body
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (isset($data['name']) && isset($data['email']) && isset($data['camperType'])) {
        $name = trim($data['name']);
        $email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
        $camperType = trim($data['camperType']);

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid email format."]);
            exit();
        }

        try {
            // Prepare SQL to prevent injection
            $stmt = $pdo->prepare("INSERT INTO waitlist (name, email, camper_type) VALUES (:name, :email, :camper_type)");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':camper_type', $camperType);
            
            $stmt->execute();
            
            echo json_encode(["status" => "success", "message" => "Passport valid! Data saved to database."]);
        } catch (PDOException $e) {
            // Check if email already exists (Duplicate entry error code 23000)
            if ($e->getCode() == 23000) {
                http_response_code(409);
                echo json_encode(["status" => "error", "message" => "This email has already registered for a cabin key."]);
            } else {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => "Failed to save data."]);
            }
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required fields."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed."]);
}
