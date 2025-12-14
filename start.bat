@echo off
echo ========================================
echo Starting IMDB Review Sentiment Analyzer
echo ========================================
echo.

echo Starting Python Flask API Server...
start "Flask API" cmd /k "python api_server.py"

timeout /t 3 /nobreak > nul

echo Starting Next.js Development Server...
start "Next.js Dev" cmd /k "npm run dev"

echo.
echo ========================================
echo Both servers are starting!
echo ========================================
echo Flask API: http://localhost:5000
echo Next.js Web: http://localhost:3000
echo ========================================
echo.
echo Press any key to exit (this will NOT stop the servers)
pause > nul
