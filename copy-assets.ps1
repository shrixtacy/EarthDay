# PowerShell script to copy assets from Downloads folder

$downloadsPath = "C:\Users\shriy\Downloads"
$projectPath = $PSScriptRoot

Write-Host "Copying assets from Downloads to project..." -ForegroundColor Cyan

# Copy video
Write-Host "Copying video..." -ForegroundColor Yellow
Copy-Item "$downloadsPath\continuation,_camera_reaches_202604220251.mp4" `
    "$projectPath\public\assets\videos\earth-hero.mp4" -Force

# Copy images
Write-Host "Copying images..." -ForegroundColor Yellow

Copy-Item "$downloadsPath\ultra-realistic,_photorealistic,_cinematic_202604220224.jpeg" `
    "$projectPath\public\assets\images\space.jpeg" -Force

Copy-Item "$downloadsPath\ultra-realistic,_photorealistic,_cinematic_202604220741.jpeg" `
    "$projectPath\public\assets\images\sky.jpeg" -Force

Copy-Item "$downloadsPath\ultra-realistic,_photorealistic,_cinematic_202604220223 (2).jpeg" `
    "$projectPath\public\assets\images\forest.jpeg" -Force

Copy-Item "$downloadsPath\ultra-realistic,_photorealistic,_cinematic_202604220741.jpeg" `
    "$projectPath\public\assets\images\soil.jpeg" -Force

Copy-Item "$downloadsPath\ultra-realistic,_photorealistic,_cinematic_202604220223 (1).jpeg" `
    "$projectPath\public\assets\images\ocean.jpeg" -Force

Copy-Item "$downloadsPath\ultra-realistic,_photorealistic,_cinematic_202604220223.jpeg" `
    "$projectPath\public\assets\images\whale.jpeg" -Force

Write-Host "`nAll assets copied successfully!" -ForegroundColor Green
Write-Host "You can now run: npm run dev" -ForegroundColor Cyan
