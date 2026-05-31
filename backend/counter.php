<?php
// backend/visits.php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Increment the total views
        $pdo->query("UPDATE page_views SET total_views = total_views + 1 WHERE id = 1");
        
        // Fetch the new total
        $stmt = $pdo->query("SELECT total_views FROM page_views WHERE id = 1");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode(["status" => "success", "total_views" => $result['total_views']]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to update visits."]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT total_views FROM page_views WHERE id = 1");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode(["status" => "success", "total_views" => $result['total_views']]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to fetch visits."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed."]);
}
