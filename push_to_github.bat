@echo off
title Push Halal Motion Videos to GitHub
echo ===================================================
echo   Pushing Halal Motion Videos to GitHub
echo   Repository: https://github.com/hafizabrar1234567-blip/Halal-motion-video.git
echo ===================================================
echo.

echo 1. Staging any remaining changes...
git add .

echo.
echo 2. Committing files...
git commit -m "Initial commit: Halal Motion Videos with Quran promo compositions and Vercel build config"

echo.
echo 3. Setting main branch and pushing to GitHub...
git branch -M main
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo ===================================================
    echo   [SUCCESS] Code successfully pushed to GitHub!
    echo ===================================================
) else (
    echo ===================================================
    echo   [FAILED] Push failed. 
    echo   If it asked for login or permission, make sure
    echo   you are logged in with 'hafizabrar1234567-blip'.
    echo ===================================================
)
echo.
pause
