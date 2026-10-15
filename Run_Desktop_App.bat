@echo off
title Halal Motion Videos - Desktop Application
cd /d "%~dp0"

echo ===================================================
echo   Starting Halal Motion Videos Desktop Application
echo ===================================================
echo.

:: Launch directly as an independent Desktop Application window using Microsoft Edge / Chrome app mode
start msedge --app="https://halal-motion-video.vercel.app" --window-size=1366,850 || start chrome --app="https://halal-motion-video.vercel.app" --window-size=1366,850

echo App launched successfully!
exit
