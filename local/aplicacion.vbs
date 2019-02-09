Set WshShell = CreateObject("WScript.Shell")
WshShell.Run chr(34) & "mysqld.bat" & Chr(34), 0
WshShell.Run chr(34) & "serve.bat" & Chr(34), 0
WshShell.Run chr(34) & "run.bat" & Chr(34), 0
Set WshShell = Nothing
