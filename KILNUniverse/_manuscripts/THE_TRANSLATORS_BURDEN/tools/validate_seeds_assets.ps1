<#
validate_seeds_assets.ps1

Reads `SEEDS.json` (expected next to this script's parent folder) and checks whether
each `suggested_asset` exists under the `visual_design` folder. Prints a clear report
of found vs missing assets and any placeholder paths. Exits with code 0 if all assets
are found, 1 if any are missing.

Usage:
  pwsh -NoProfile -ExecutionPolicy Bypass -File .\validate_seeds_assets.ps1

#>

Set-StrictMode -Version Latest

function Write-Log {
    param([string]$Message, [string]$Level = 'INFO')
    $ts = (Get-Date).ToString('s')
    Write-Output "[$ts] [$Level] $Message"
}

$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
# Manuscript root is parent of tools
$ManuscriptRoot = Resolve-Path (Join-Path $ScriptRoot '..')
$SeedsPath = Join-Path $ManuscriptRoot 'SEEDS.json'
$VisualDesignDir = Join-Path $ManuscriptRoot 'visual_design'

if (-not (Test-Path $SeedsPath)) {
    Write-Error "SEEDS.json not found at: $SeedsPath"
    exit 2
}

try {
    $raw = Get-Content -Raw -Path $SeedsPath -ErrorAction Stop
    $json = $raw | ConvertFrom-Json -ErrorAction Stop
} catch {
    Write-Error "Failed to read/parse SEEDS.json: $_"
    exit 2
}

$results = @()

foreach ($seed in $json.seeds) {
    $id = $seed.id
    $suggested = $seed.suggested_asset
    if ([string]::IsNullOrWhiteSpace($suggested)) {
        $results += [pscustomobject]@{ id = $id; status = 'no-suggested-asset'; suggested = $null }
        continue
    }

    # Try several candidate resolutions in priority order
    $candidates = @()

    # If suggested already contains 'visual_design' or starts with a drive/root, try directly
    if ($suggested -match '[\\/]*visual_design[\\/]') {
        $candidates += (Join-Path $ManuscriptRoot $suggested)
    }

    # Primary: under visual_design folder
    $candidates += Join-Path $VisualDesignDir $suggested

    # Secondary: sibling to SEEDS.json (manuscript root)
    $candidates += Join-Path $ManuscriptRoot $suggested

    # Tertiary: assume suggested is already relative and try as-is
    $candidates += $suggested

    $foundPath = $null
    foreach ($cand in $candidates) {
        if (-not $cand) { continue }
        try {
            $resolved = Resolve-Path -LiteralPath $cand -ErrorAction SilentlyContinue
        } catch {
            $resolved = $null
        }
        if ($resolved) {
            $foundPath = $resolved.Path
            break
        }
        if (Test-Path $cand) {
            # plain relative path exists
            $foundPath = (Resolve-Path $cand).Path
            break
        }
    }

    $placeholder = $null
    if (-not $foundPath) {
        # Check for placeholder with .placeholder.txt suffix next to candidate paths
        foreach ($cand in $candidates) {
            if (-not $cand) { continue }
            $ph = "$cand.placeholder.txt"
            if (Test-Path $ph) { $placeholder = (Resolve-Path $ph).Path; break }
            # also check inside visual_design if cand was manuscript-root relative
            $ph2 = Join-Path $VisualDesignDir "$cand.placeholder.txt"
            if (Test-Path $ph2) { $placeholder = (Resolve-Path $ph2).Path; break }
        }
    }

    $status = if ($foundPath) { 'found' } else { 'missing' }
    $results += [pscustomobject]@{
        id = $id;
        suggested = $suggested;
        resolved = $foundPath;
        placeholder = $placeholder;
        status = $status
    }
}

# Print results
Write-Log "Seed assets validation report"
Write-Log "SEEDS.json: $SeedsPath"
Write-Log "visual_design base: $VisualDesignDir"

$missing = $results | Where-Object { $_.status -eq 'missing' }
$found = $results | Where-Object { $_.status -eq 'found' }

if ($found.Count -gt 0) {
    Write-Log "Found assets:" 'INFO'
    $found | ForEach-Object { Write-Output "  - $($_.id): $($_.resolved)" }
}

if ($missing.Count -gt 0) {
    Write-Log "Missing assets (placeholders shown if present):" 'WARN'
    $missing | ForEach-Object {
        $line = "  - $($_.id): suggested='$($_.suggested)'"
        if ($_.placeholder) { $line += " -> placeholder='$($_.placeholder)'" }
        Write-Output $line
    }
    Write-Log "Validation FAILED: $($missing.Count) missing assets" 'ERROR'
    exit 1
} else {
    Write-Log "Validation PASSED: all suggested assets resolved" 'INFO'
    exit 0
}
