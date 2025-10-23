Param()

$root = Join-Path $PSScriptRoot ".."
$chapters = @(
    "c:\DProjects\DB BK WORLDS\KILNUniverse\_manuscripts\THE_TRANSLATORS_BURDEN\chapters\THE_TRANSLATORS_BURDEN_Chapter_1_Prose.md",
    "c:\DProjects\DB BK WORLDS\KILNUniverse\_manuscripts\THE_TRANSLATORS_BURDEN\chapters\THE_TRANSLATORS_BURDEN_Chapter_2_Prose.md",
    "c:\DProjects\DB BK WORLDS\KILNUniverse\_manuscripts\THE_TRANSLATORS_BURDEN\chapters\THE_TRANSLATORS_BURDEN_Chapter_3_Prose.md",
    "c:\DProjects\DB BK WORLDS\KILNUniverse\_manuscripts\THE_TRANSLATORS_BURDEN\chapters\THE_TRANSLATORS_BURDEN_Chapter_4_Prose.md",
    "c:\DProjects\DB BK WORLDS\KILNUniverse\_manuscripts\THE_TRANSLATORS_BURDEN\chapters\THE_TRANSLATORS_BURDEN_Chapter_5_Prose.md",
    "c:\DProjects\DB BK WORLDS\KILNUniverse\_manuscripts\THE_TRANSLATORS_BURDEN\chapters\THE_TRANSLATORS_BURDEN_Chapter_6_Prose.md",
    "c:\DProjects\DB BK WORLDS\KILNUniverse\_manuscripts\THE_TRANSLATORS_BURDEN\chapters\THE_TRANSLATORS_BURDEN_Chapter_7_Prose.md",
    "c:\DProjects\DB BK WORLDS\KILNUniverse\_manuscripts\THE_TRANSLATORS_BURDEN\chapters\THE_TRANSLATORS_BURDEN_Chapter_8_Prose.md",
    "c:\DProjects\DB BK WORLDS\KILNUniverse\_manuscripts\THE_TRANSLATORS_BURDEN\chapters\THE_TRANSLATORS_BURDEN_Chapter_9_Prose.md",
    "c:\DProjects\DB BK WORLDS\KILNUniverse\_manuscripts\THE_TRANSLATORS_BURDEN\chapters\THE_TRANSLATORS_BURDEN_Chapter_10_Prose.md",
    "c:\DProjects\DB BK WORLDS\KILNUniverse\_manuscripts\THE_TRANSLATORS_BURDEN\chapters\THE_TRANSLATORS_BURDEN_Chapter_11_Prose.md",
    "c:\DProjects\DB BK WORLDS\KILNUniverse\_manuscripts\THE_TRANSLATORS_BURDEN\chapters\THE_TRANSLATORS_BURDEN_Chapter_12_Prose.md",
    "c:\DProjects\DB BK WORLDS\KILNUniverse\_manuscripts\THE_TRANSLATORS_BURDEN\chapters\THE_TRANSLATORS_BURDEN_Chapter_13_Prose.md"
)

$editsDir = Join-Path $root "edits"
$backupDir = Join-Path $editsDir "backups"
New-Item -ItemType Directory -Force -Path $editsDir | Out-Null
New-Item -ItemType Directory -Force -Path $backupDir | Out-Null

$diffsFile = Join-Path $editsDir "THE_TRANSLATORS_BURDEN_chapter_diffs.md"
"# Chapter diffs - generated on $(Get-Date -Format o)" | Out-File -Encoding utf8 -FilePath $diffsFile

function Normalize-ProseBlock([string]$text){
    if(-not $text){ return $text }
    # Collapse multiple spaces
    $text = $text -replace " {2,}", " "
    # Ellipses to single char
    $text = $text -replace '\.\.\.', '…'
    # Double hyphen to em-dash
    $text = $text -replace '--', '—'
    # Remove stray space before punctuation
    $text = $text -replace '\s+([,\.;:!\?])', '$1'
    # NOTE: straight double-quote → curly-quote conversion disabled (user requested conservative normalization)

    # Paragraph splitting heuristic: split on blank lines into paragraphs
    $paras = [regex]::Split($text, "(\r?\n\r?\n)") | Where-Object { $_ -ne $null }

    # Build a clean paragraph list (ignore pure separators)
    $cleanParas = @()
    for($i=0; $i -lt $paras.Length; $i++){
        $p = $paras[$i]
        if($p -match '^\r?\n$' -or $p -match '^\r?\n\r?\n$'){ continue }
        $cleanParas += $p
    }

    for($i=0; $i -lt $cleanParas.Length; $i++){
        $para = $cleanParas[$i]
        if($para -and $para.Length -gt 360){
            # Split long paragraph into sentences and break roughly in half
            $sentences = [regex]::Split($para, '(?<=[\.\!\?])\s+') | Where-Object { $_ -ne '' }
            if($sentences.Length -gt 1){
                $mid = [int]([math]::Ceiling($sentences.Length/2))
                $first = ($sentences[0..($mid-1)] -join ' ').Trim()
                $second = ($sentences[$mid..($sentences.Length-1)] -join ' ').Trim()
                $cleanParas[$i] = $first + "`r`n`r`n" + $second
            }
        }
    }

    # Rejoin with blank-line separators
    return ($cleanParas -join "`r`n`r`n")
}

foreach($file in $chapters){
    if(-not (Test-Path $file)){
        Write-Warning "File not found: $file"
        continue
    }
    $orig = Get-Content -Raw -Encoding utf8 $file
    $backup = Join-Path $backupDir (Split-Path $file -Leaf)
    # Only create the original backup once to avoid overwriting the true original
    if(-not (Test-Path $backup)){
        Set-Content -Encoding utf8 -Path $backup -Value $orig
    } else {
        Write-Verbose "Backup already exists for $file; skipping overwrite."
    }

    # split on fenced code blocks to avoid changing code
    $parts = [regex]::Split($orig, '(```[\s\S]*?```)', [System.Text.RegularExpressions.RegexOptions]::Multiline)
    for($i=0; $i -lt $parts.Length; $i++){
        # parts with ``` at start are code fences, leave them alone
        if($parts[$i] -match '^```'){
            continue
        } else {
            $parts[$i] = Normalize-ProseBlock $parts[$i]
        }
    }

    $new = ($parts -join '')

    # write back
    Set-Content -Encoding utf8 -Path $file -Value $new

    # produce unified diff using git if available, otherwise simple markers
    $diffHeader = "`n--- $file (original)`n+++ $file (modified)`n"
    Add-Content -Path $diffsFile -Value $diffHeader -Encoding utf8
    try{
        # Check for git availability without creating unused variables
        & git --version 2>$null
        if($LASTEXITCODE -eq 0){
            $gdiff = & git --no-pager diff --no-index -- $backup $file 2>$null
            if($gdiff){ Add-Content -Path $diffsFile -Value $gdiff -Encoding utf8 }
            else { Add-Content -Path $diffsFile -Value "(no changes detected)" -Encoding utf8 }
        }
        else{
            Add-Content -Path $diffsFile -Value "(git not available; original backed up at $backup)" -Encoding utf8
        }
    } catch {
        Add-Content -Path $diffsFile -Value "(error generating git diff; original backed up at $backup)" -Encoding utf8
    }
}

Write-Output "Processing complete. Diffs written to: $diffsFile"
