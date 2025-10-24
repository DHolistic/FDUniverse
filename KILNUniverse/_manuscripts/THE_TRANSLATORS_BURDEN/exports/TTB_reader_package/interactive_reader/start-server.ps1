# KILN Universe - Local Development Server
# Run this script to start the interactive reader with proper file loading

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  KILN Universe Interactive Reader" -ForegroundColor Yellow
Write-Host "  Starting Local Server..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
$pythonCmd = $null
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonCmd = "python"
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    $pythonCmd = "python3"
}

if ($pythonCmd) {
    Write-Host "Using Python HTTP Server..." -ForegroundColor Green
    Write-Host ""
    Write-Host "Server running at: http://localhost:8000" -ForegroundColor Green
    Write-Host "Opening browser to: http://localhost:8000/consciousness-codex-title.html" -ForegroundColor Green
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""

    # Open browser
    Start-Process "http://localhost:8000/consciousness-codex-title.html"

    # Start server
    & $pythonCmd -m http.server 8000
} else {
    Write-Host "Python not found! Please install Python or use another method:" -ForegroundColor Red
    Write-Host ""
    Write-Host "Option 1: Install Python from https://www.python.org/" -ForegroundColor Yellow
    Write-Host "Option 2: Use VS Code with Live Server extension" -ForegroundColor Yellow
    Write-Host "Option 3: Use Node.js with 'npx http-server'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
