<?php
// backend/api.php

// 1. Allow any website (like our React app on port 3000) to access this data (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 2. Create some dummy data to send to React
$data = [
    "status" => "success",
    "message" => "Hello from your vanilla PHP backend!",
    "founder" => [
        "name" => "Ronan Antoque",
        "skills" => ["ASP.NET Core", "C# / .NET Ninja", "Aspiring Front-End Dev", "Learning PHP"]
    ]
];

// 3. Convert the PHP array into JSON and send it!
echo json_encode($data);
