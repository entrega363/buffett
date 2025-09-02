@echo off
echo ========================================
echo   ENVIANDO PARA GITHUB
echo ========================================
echo.

echo Verificando status do Git...
git status

echo.
echo Adicionando todos os arquivos...
git add .

echo.
set /p commit_msg="Digite a mensagem do commit (ou pressione Enter para usar padrao): "
if "%commit_msg%"=="" set commit_msg=Atualizacao automatica do site

echo Fazendo commit...
git commit -m "%commit_msg%"

echo.
echo Enviando para GitHub...
git push

echo.
echo ========================================
echo   DEPLOY CONCLUIDO!
echo ========================================
echo.
echo Seu site sera atualizado em alguns minutos em:
echo https://buffetsobral1.github.io/buffet/
echo.
echo Verifique o progresso em:
echo https://github.com/buffetsobral1/buffet/actions
echo ========================================

pause