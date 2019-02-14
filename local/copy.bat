@echo off
             :SCRIPT2
             For %%F In ("C:\Users\HP User\Desktop\radiografia\*.*") Do If Not Exist "C:\Users\HP User\Documents\trabajos\washington\Doc-Boris\local\public\radiografias\%%~nxF" Copy "%%F" "C:\Users\HP User\Documents\trabajos\washington\Doc-Boris\local\public\radiografias\%%~nxF"
             For %%F In ("C:\Users\HP User\Desktop\tomografia\*.*") Do If Not Exist "C:\Users\HP User\Documents\trabajos\washington\Doc-Boris\local\public\tomografias\%%~nxF" Copy "%%F" "C:\Users\HP User\Documents\trabajos\washington\Doc-Boris\local\public\tomografias\%%~nxF"
             goto :SCRIPT2