$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$distPath = Join-Path $projectRoot "dist"
$backendPath = Join-Path $projectRoot "backend"
$outputPath = Join-Path $projectRoot "infinityfree-upload"
$configPath = Join-Path $backendPath "config.php"

if (-not (Test-Path -LiteralPath $configPath)) {
    throw "Missing backend/config.php. Copy backend/config.example.php to backend/config.php and add your InfinityFree MySQL credentials."
}

Push-Location $projectRoot
try {
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
        throw "The frontend production build failed."
    }
} finally {
    Pop-Location
}

if (Test-Path -LiteralPath $outputPath) {
    Remove-Item -LiteralPath $outputPath -Recurse -Force
}

New-Item -ItemType Directory -Path $outputPath | Out-Null
Copy-Item -Path (Join-Path $distPath "*") -Destination $outputPath -Recurse
Copy-Item -LiteralPath $backendPath -Destination (Join-Path $outputPath "backend") -Recurse

Remove-Item -LiteralPath (Join-Path $outputPath "backend/schema.sql") -Force
Remove-Item -LiteralPath (Join-Path $outputPath "backend/schema.infinityfree.sql") -Force
Remove-Item -LiteralPath (Join-Path $outputPath "backend/config.example.php") -Force

Write-Host "InfinityFree package prepared at: $outputPath"
Write-Host "Upload the contents of this folder into your domain's htdocs directory."
