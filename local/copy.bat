@echo off
:SCRIPT2
For %%F In ("C:\Users\HP User\Desktop\ejemplo\*.*") Do If Not Exist "C:\Users\HP User\Documents\trabajos\washington\Doc-Boris\local\public\radiografias\%%~nxF" Copy "%%F" "C:\Users\HP User\Documents\trabajos\washington\Doc-Boris\local\public\radiografias\%%~nxF"
goto :SCRIPT2