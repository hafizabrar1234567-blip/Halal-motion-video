$WScriptShell = New-Object -ComObject WScript.Shell
$desktopPaths = @(
    [System.Environment]::GetFolderPath('Desktop'),
    'C:\Users\iAT\Desktop',
    'C:\Users\iAT\OneDrive\Desktop'
) | Select-Object -Unique

$iconPath = "D:\Halal Motion videos\public\app.ico"

# Find actual browser path
$browserPath = ""
$candidates = @(
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
)
foreach ($c in $candidates) {
    if (Test-Path $c) {
        $browserPath = $c
        break
    }
}

Write-Host "Found browser at: $browserPath"

# HTML local file path or web URL
$localHtml = "file:///D:/Halal%20Motion%20videos/dist/index.html"

foreach ($desktop in $desktopPaths) {
    if (Test-Path $desktop) {
        $shortcutPath = Join-Path $desktop "Halal Motion Videos.lnk"
        $shortcut = $WScriptShell.CreateShortcut($shortcutPath)
        $shortcut.TargetPath = $browserPath
        $shortcut.Arguments = "--app=`"$localHtml`" --window-size=1366,850"
        $shortcut.IconLocation = "$iconPath,0"
        $shortcut.Description = "Halal Motion Videos - Islamic Motion Graphics Studio"
        $shortcut.WorkingDirectory = "D:\Halal Motion videos"
        $shortcut.Save()
        Write-Host "Successfully updated desktop shortcut at: $shortcutPath"
    }
}
