@echo off
             :SCRIPT2
             For %%F In ("C:\Users\pc\Desktop\radiografia\*.*") Do If Not Exist "C:\xampp\htdocs\DTE\Doc-Boris\local\public\radiografias\%%~nxF" Copy "%%F" "C:\xampp\htdocs\DTE\Doc-Boris\local\public\radiografias\%%~nxF"
             For %%F In ("C:\Users\pc\Desktop\Tomograias\*.*") Do If Not Exist "C:\xampp\htdocs\DTE\Doc-Boris\local\public\tomografias\%%~nxF" Copy "%%F" "C:\xampp\htdocs\DTE\Doc-Boris\local\public\tomografias\%%~nxF"
             goto :SCRIPT2