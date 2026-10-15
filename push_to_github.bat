@echo off
title Push Halal Motion Videos to GitHub
echo ===================================================
echo   Pushing Original Dashboard & Fixed New Video
echo   Repository: https://github.com/hafizabrar1234567-blip/Halal-motion-video.git
echo ===================================================
echo.

echo 1. Staging original dashboard & API endpoints...
git add .

echo.
echo 2. Committing changes...
git commit -m "Add luxury golden logo, PWA desktop app support, and Windows desktop launcher"

echo.
echo 3. Pushing to GitHub main branch...
git branch -M main
git push -u origin main > push_result.log 2>&1
type push_result.log

echo.
if %errorlevel% equ 0 (
    echo ===================================================
    echo   [SUCCESS] Code successfully pushed to GitHub!
    echo   Original dashboard is now LIVE on Vercel!
    echo ===================================================
) else (
    echo ===================================================
    echo   [FAILED] Push failed. 
    echo ===================================================
)
echo.
pause
