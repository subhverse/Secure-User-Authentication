# Project folder ko GitHub direct upload ke liye saaf karta hai (100 file limit)

$root = $PSScriptRoot
Set-Location $root

$removeDirs = @(
    'client\node_modules',
    'server\node_modules',
    'client\dist',
    'server\dist',
    'github-ready',
    '.cursor'
)

foreach ($dir in $removeDirs) {
    $path = Join-Path $root $dir
    if (Test-Path $path) {
        Remove-Item $path -Recurse -Force
        Write-Host "Removed: $dir" -ForegroundColor Yellow
    }
}

@('client\.env', 'server\.env') | ForEach-Object {
    $path = Join-Path $root $_
    if (Test-Path $path) {
        Remove-Item $path -Force
        Write-Host "Removed: $_ (secrets — baad mein npm run setup)" -ForegroundColor Yellow
    }
}

$count = (Get-ChildItem -Recurse -File).Count
Write-Host ""
Write-Host "Ready! Upload THIS folder on GitHub:" -ForegroundColor Green
Write-Host $root -ForegroundColor Cyan
Write-Host "Files: $count (limit 100)" -ForegroundColor Green
Write-Host ""
Write-Host "GitHub -> Add file -> Upload files -> poora folder drag karo"
Write-Host "Note: .env upload mat karo (secrets). Sirf .env.example jayegi."
Write-Host "Baad mein: npm run setup"
Write-Host ""
