bat

@echo off
cd /d "%~dp0gestion-citas-medicas"
start http://localhost:3000
pnpm exec next dev --port 3000 --hostname 0.0.0.0
pause