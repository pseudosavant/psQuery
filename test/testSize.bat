@echo off
set srcFolder=..\src\
set file=psQuery.js
set minfile=psQuery.min.js
set compressedFile=%minfile%.gz

7za a %compressedFile% %srcFolder%%minfile%

cls

ECHO Unminified Size
for %%f in (%srcFolder%%file%) do echo %%~zf bytes

ECHO.
ECHO.
ECHO Uncompressed Size
for %%f in (%srcFolder%%minfile%) do echo %%~zf bytes

ECHO.
ECHO.
ECHO Minified and Gzip Size
for %%f in (%compressedFile%) do echo %%~zf bytes
ECHO.
ECHO.
ECHO.

del %compressedFile%
pause