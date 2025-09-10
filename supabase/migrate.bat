@echo off
:: Script de migração do banco de dados Supabase para Buffet Sobral

title Migração do Banco de Dados Supabase - Buffet Sobral

echo ====================================================
echo Script de Migração do Banco de Dados Supabase
echo Este script irá configurar o banco de dados para o Buffet Sobral
echo ====================================================
echo.

:: Verificar se estamos no diretório correto
if not exist "supabase\setup.sql" (
    echo Erro: Não foi possível encontrar o arquivo supabase\setup.sql
    echo Por favor, execute este script a partir do diretório raiz do projeto.
    pause
    exit /b 1
)

echo Arquivos necessários encontrados.
echo.

:: Solicitar confirmação do usuário
echo Este script irá:
echo 1. Criar as tabelas necessárias no Supabase
echo 2. Inserir dados iniciais
echo.
set /p confirm=^Deseja continuar? ^(s/N^): 

if /i not "%confirm%"=="s" (
    echo Operação cancelada.
    pause
    exit /b 0
)

echo.
echo ====================================================
echo Etapa 1: Criando tabelas e inserindo dados iniciais
echo ====================================================

:: Verificar se o CLI do Supabase está instalado
where supabase >nul 2>&1
if %errorlevel% neq 0 (
    echo Erro: CLI do Supabase não encontrado.
    echo Por favor, instale o CLI do Supabase: https://supabase.com/docs/guides/cli
    pause
    exit /b 1
)

:: Executar o script de setup
echo Executando supabase\setup.sql...
supabase db reset

if %errorlevel% equ 0 (
    echo ^> Tabelas criadas com sucesso!
) else (
    echo ^> Erro ao criar tabelas.
    pause
    exit /b 1
)

echo.
echo ====================================================
echo Etapa 2: Inserindo dados de exemplo
echo ====================================================

:: Executar o script de seed (opcional)
set /p seed_confirm=^Deseja inserir dados de exemplo para testes? ^(s/N^): 

if /i "%seed_confirm%"=="s" (
    echo Executando supabase\seed.sql...
    supabase db seed
    
    if %errorlevel% equ 0 (
        echo ^> Dados de exemplo inseridos com sucesso!
    ) else (
        echo ^> Erro ao inserir dados de exemplo.
        pause
        exit /b 1
    )
)

echo.
echo ====================================================
echo Configuração concluída com sucesso!
echo ====================================================
echo.
echo Próximos passos:
echo 1. Verifique as tabelas criadas no painel do Supabase
echo 2. Teste a conexão com o frontend
echo 3. ^(Opcional^) Configure as políticas de segurança conforme necessário
echo.
echo Para mais informações, consulte supabase\README.md
echo.
pause