<?php
// backend/logs.php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM build_logs ORDER BY created_at DESC LIMIT 10");
        $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["status" => "success", "data" => $logs]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to fetch logs."]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (isset($data['author']) && isset($data['mood']) && isset($data['content'])) {
        $author = trim($data['author']);
        $mood = trim($data['mood']);
        $content = trim($data['content']);

        try {
            $stmt = $pdo->prepare("INSERT INTO build_logs (author, mood, content) VALUES (:author, :mood, :content)");
            $stmt->execute([
                ':author' => $author,
                ':mood' => $mood,
                ':content' => $content
            ]);
            
            // Return the newly created log so the frontend can display it immediately
            $newId = $pdo->lastInsertId();
            $stmt = $pdo->prepare("SELECT * FROM build_logs WHERE id = :id");
            $stmt->execute([':id' => $newId]);
            $newLog = $stmt->fetch(PDO::FETCH_ASSOC);

            echo json_encode(["status" => "success", "data" => $newLog]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to save log."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing fields."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed."]);
}
