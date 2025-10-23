# Open the DB Attempt sandbox in the default browser (Windows PowerShell)
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
$file = Join-Path $scriptPath 'index.html'
Start-Process $file
