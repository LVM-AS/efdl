@echo off
setlocal

echo.
echo =====================================
echo EFTA-DL SERVER: Activating virtual environment and starting server
echo =====================================
echo.

if not exist venv\Scripts\activate.bat (
    echo ERROR: Virtual environment not found. Run setup-easy.bat first.
    goto :error
)

call venv\Scripts\activate.bat
if errorlevel 1 goto :error

echo Starting server...
python server.py
if errorlevel 1 goto :error

echo.
echo Server started successfully.

goto :end

:error
echo.
echo Server failed to start. See the output above for details.

:end
pause
endlocal