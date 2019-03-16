@echo off
set carpeta=%1
set radiografia=%2
set carpeta_radiografia="./storage/app/warehouse/%1"
set zip="./storage/app/warehouse/%1.zip"
set archivo="storage\app\radiografias\%2"
echo %archivo%
mkdir %carpeta_radiografia%
copy %archivo% %carpeta_radiografia%

CScript zip.vbs %carpeta_radiografia% %zip%