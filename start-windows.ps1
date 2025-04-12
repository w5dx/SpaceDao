Write-Host "Starting SpaceDAO in production mode..." -ForegroundColor Green
$env:NODE_ENV = "production"
node dist/index.js