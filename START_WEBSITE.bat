@echo off
echo ========================================
echo   PUCCI Opulence - Website Starter
echo ========================================
echo.

echo Step 1: Starting Backend Server...
echo.
cd backend
start "PUCCI Backend" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo Step 2: Starting Frontend Server...
echo.
cd ..\pucci-opulence-web-main
start "PUCCI Frontend" cmd /k "npm run dev"
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window...
pause >nul

