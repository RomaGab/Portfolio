@echo off
echo Starting Portfolio...
cd /d "%~dp0"
call npm run dev -- --open
pause