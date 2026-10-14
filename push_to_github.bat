@echo off
title Push Halal Motion Videos to GitHub
echo ===================================================
echo   Pushing Phase 1 Video Creator Studio to GitHub
echo   Repository: https://github.com/hafizabrar1234567-blip/Halal-motion-video.git
echo ===================================================
echo.

echo 1. Staging Phase 1 files...
git add .

echo.
echo 2. Committing changes...
git commit -m "Phase 1: Add interactive Quran Video Creator Studio with Surah presets, themes and custom audio upload"

echo.
echo 3. Pushing to GitHub main branch...
git branch -M main
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo ===================================================
    echo   [SUCCESS] Code successfully pushed to GitHub!
    echo   Vercel will now update with Phase 1 Creator Studio!
    echo ===================================================
) else (
    echo ===================================================
    echo   [FAILED] Push failed. 
    echo ===================================================
)
echo.
pause
