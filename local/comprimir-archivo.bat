@echo off
set carpeta=%1
set radiografia=%2
set carpeta_radiografia="C:\xampp\htdocs\DTE\Doc-Boris\local\storage\app\warehouse\%1"
set archivo="C:\xampp\htdocs\DTE\Doc-Boris\local\storage\app\radiografias\%2"
set instalador="C:\xampp\htdocs\DTE\Doc-Boris\local\storage\app\instalador"

set autorun="C:\xampp\htdocs\DTE\Doc-Boris\local\storage\app\instalador\Autorun.inf"
set dll="C:\xampp\htdocs\DTE\Doc-Boris\local\storage\app\instalador\ImageOps.dll"
set scanora="C:\xampp\htdocs\DTE\Doc-Boris\local\storage\app\instalador\ScanoraLite.exe"
set mld="C:\xampp\htdocs\DTE\Doc-Boris\local\storage\app\instalador\Translations.mld"
mkdir %carpeta_radiografia%
copy %archivo% %carpeta_radiografia%
copy %autorun% %carpeta_radiografia%
copy %dll% %carpeta_radiografia%
copy %scanora% %carpeta_radiografia%
copy %mld% %carpeta_radiografia%
