# 3MASH Full Site Lighthouse Audit Runner
param(
    [string]$UrlFile = ".\lighthouse-audit\urls.txt",
    [string]$ReportDir = ".\lighthouse-audit\reports",
    [string]$LogFile = ".\lighthouse-audit\audit-log.txt"
)

$ErrorActionPreference = "Continue"

New-Item -ItemType Directory -Force -Path $ReportDir | Out-Null

$urls = Get-Content $UrlFile | Where-Object { $_.Trim() -ne "" }
$total = $urls.Count
$passed = 0
$failed = 0
$startTime = Get-Date

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "  3MASH Full Website Lighthouse Audit" -ForegroundColor Cyan
Write-Host "  Target URLs: $total" -ForegroundColor Cyan
Write-Host "  Report Directory: $ReportDir" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

"3MASH Audit Log - Started: $startTime" | Set-Content $LogFile

$index = 0
foreach ($url in $urls) {
    $index++
    $url = $url.Trim()
    if (!$url) { continue }

    $slug = $url -replace "^https?://[^/]+/?", ""
    $slug = $slug -replace "[/\\?&=:#%+]", "_"
    $slug = $slug -replace "_+$", ""
    if (!$slug) { $slug = "homepage" }
    if ($slug.Length -gt 100) { $slug = $slug.Substring(0, 100) }

    $reportBase = Join-Path $ReportDir ("{0:D3}_{1}" -f $index, $slug)
    $htmlReport = "${reportBase}.report.html"

    Write-Host ("[{0}/{1}] Scanning: {2}" -f $index, $total, $url) -ForegroundColor Yellow
    
    $startPageTime = Get-Date
    
    # Run via cmd /c to ensure Windows npm batch shim is resolved properly
    $cmdLine = "lighthouse `"$url`" --output html --output json --output-path=`"$reportBase`" --chrome-flags=`"--headless --no-sandbox --disable-gpu --disable-dev-shm-usage`" --only-categories=performance --only-categories=accessibility --only-categories=best-practices --only-categories=seo --quiet"
    
    cmd.exe /c $cmdLine
    $exitCode = $LASTEXITCODE
    $elapsed = [int]((Get-Date) - $startPageTime).TotalSeconds

    if ($exitCode -eq 0 -and (Test-Path $htmlReport)) {
        $passed++
        Write-Host ("       -> SUCCESS ({0}s) Saved: {1:D3}_{2}.report.html" -f $elapsed, $index, $slug) -ForegroundColor Green
        "[PASS] $url ($elapsed s) -> $reportBase" | Add-Content $LogFile
    } else {
        $failed++
        Write-Host ("       -> FAILED (Exit Code: {0}, {1}s)" -f $exitCode, $elapsed) -ForegroundColor Red
        "[FAIL] $url (Exit: $exitCode, $elapsed s) -> $reportBase" | Add-Content $LogFile
    }

    Start-Sleep -Seconds 1
}

$endTime = Get-Date
$totalMin = [int]($endTime - $startTime).TotalMinutes
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ("  COMPLETED! Passed: {0}/{1} | Failed: {2}/{1}" -f $passed, $total, $failed) -ForegroundColor Green
Write-Host ("  Total time: ~{0} minutes" -f $totalMin) -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
"Summary: Passed: $passed, Failed: $failed, Total time: ~$totalMin min, Completed: $endTime" | Add-Content $LogFile
