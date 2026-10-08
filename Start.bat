@echo off
title Halal Motion Videos
cd /d "%~dp0"
set "PATH=C:\Program Files\Git\bin;%PATH%"
echo ========================================================
echo               Halal Motion Videos
echo ========================================================
echo Starting server at http://localhost:4000 ...
start http://localhost:4000
npm start
pause
