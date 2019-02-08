@echo off
:SCRIPT2
For %%F In ("C:\Users\pc\Desktop\rafiografia\*.*") Do If Not Exist "C:\xampp\htdocs\DTE\Doc-Boris\local\public\radiografias\%%~nxF" Copy "%%F" "C:\xampp\htdocs\DTE\Doc-Boris\local\public\radiografias\%%~nxF"
goto :SCRIPT2