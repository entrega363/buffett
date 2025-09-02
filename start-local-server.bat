@echo off
echo ========================================
echo   HatchCanvas Copy - Servidor Local
echo ========================================
echo.

echo Tentando iniciar servidor local...
echo.

REM Tentar Python 3 primeiro
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Python encontrado! Iniciando servidor na porta 8000...
    echo.
    echo Acesse: http://localhost:8000
    echo Pressione Ctrl+C para parar o servidor
    echo.
    python -m http.server 8000
    goto :end
)

REM Tentar Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Node.js encontrado! Verificando http-server...
    npm list -g http-server >nul 2>&1
    if %errorlevel% == 0 (
        echo http-server encontrado! Iniciando servidor...
        echo.
        echo Acesse: http://localhost:8000
        echo Pressione Ctrl+C para parar o servidor
        echo.
        http-server -p 8000
        goto :end
    ) else (
        echo Instalando http-server...
        npm install -g http-server
        echo Iniciando servidor...
        echo.
        echo Acesse: http://localhost:8000
        echo Pressione Ctrl+C para parar o servidor
        echo.
        http-server -p 8000
        goto :end
    )
)

REM Tentar PHP
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo PHP encontrado! Iniciando servidor na porta 8000...
    echo.
    echo Acesse: http://localhost:8000
    echo Pressione Ctrl+C para parar o servidor
    echo.
    php -S localhost:8000
    goto :end
)

REM Se nenhum servidor foi encontrado
echo.
echo ❌ ERRO: Nenhum servidor encontrado!
echo.
echo Para testar localmente, você precisa de uma das opções:
echo.
echo 1. Python (recomendado):
echo    - Baixe em: https://python.org
echo    - Depois execute: python -m http.server 8000
echo.
echo 2. Node.js:
echo    - Baixe em: https://nodejs.org
echo    - Depois execute: npm install -g http-server
echo.
echo 3. PHP:
echo    - Baixe em: https://php.net
echo    - Depois execute: php -S localhost:8000
echo.
echo 4. Ou simplesmente abra o arquivo index.html no navegador
echo    (algumas funcionalidades podem não funcionar)
echo.

:end
echo.
echo Pressione qualquer tecla para fechar...
pause >nul