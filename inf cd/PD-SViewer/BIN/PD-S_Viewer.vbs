Set objShell = WScript.CreateObject("WScript.Shell")
dim strDir

'スクリプトがあるフォルダを取得
strDir = Replace(WScript.ScriptFullName, WScript.ScriptName,"")

'EXEはスクリプトと同じフォルダにある想定
strDir = strDir & "PD-S_Viewer.exe /Agree"

'EXE実行
objShell.Run strDir
Set objShell = Nothing

