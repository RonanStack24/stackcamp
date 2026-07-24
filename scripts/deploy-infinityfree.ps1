$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$credentialsPath = Join-Path $projectRoot "infinityfree-credentials.local.ps1"
$uploadPath = Join-Path $projectRoot "infinityfree-upload"

if (-not (Test-Path -LiteralPath $credentialsPath)) {
    throw "Missing infinityfree-credentials.local.ps1."
}

. $credentialsPath

if ($InfinityFreeFtpPassword -eq "REPLACE_WITH_YOUR_FTP_PASSWORD") {
    throw "Add your FTP password to infinityfree-credentials.local.ps1 before deploying."
}

if (-not (Test-Path -LiteralPath $uploadPath)) {
    throw "Missing infinityfree-upload. Run npm.cmd run build:infinityfree first."
}

$files = Get-ChildItem -LiteralPath $uploadPath -File -Recurse
$uploaded = 0

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($uploadPath.Length).TrimStart('\', '/')
    $remotePath = ($relativePath -replace '\\', '/')
    $remoteUrl = "ftp://${InfinityFreeFtpHost}:$InfinityFreeFtpPort/$InfinityFreeRemoteDirectory/$remotePath"

    & curl.exe `
        --silent `
        --show-error `
        --fail `
        --ftp-create-dirs `
        --user "${InfinityFreeFtpUsername}:${InfinityFreeFtpPassword}" `
        --upload-file $file.FullName `
        $remoteUrl

    if ($LASTEXITCODE -ne 0) {
        throw "FTP upload failed for $relativePath."
    }

    $uploaded++
    Write-Host "Uploaded $uploaded of $($files.Count): $relativePath"
}

Write-Host "Deployment complete: https://stack-camp.gt.tc"
