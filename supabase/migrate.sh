#!/bin/bash

# Script de migração do banco de dados Supabase para Buffet Sobral

echo "=== Script de Migração do Banco de Dados Supabase ==="
echo "Este script irá configurar o banco de dados para o Buffet Sobral"
echo ""

# Verificar se estamos no diretório correto
if [ ! -f "supabase/setup.sql" ]; then
    echo "Erro: Não foi possível encontrar o arquivo supabase/setup.sql"
    echo "Por favor, execute este script a partir do diretório raiz do projeto."
    exit 1
fi

echo "Arquivos necessários encontrados."
echo ""

# Solicitar confirmação do usuário
echo "Este script irá:"
echo "1. Criar as tabelas necessárias no Supabase"
echo "2. Inserir dados iniciais"
echo ""
read -p "Deseja continuar? (s/N): " confirm

if [[ ! $confirm =~ ^[Ss]$ ]]; then
    echo "Operação cancelada."
    exit 0
fi

echo ""
echo "=== Etapa 1: Criando tabelas e inserindo dados iniciais ==="

# Verificar se o CLI do Supabase está instalado
if ! command -v supabase &> /dev/null; then
    echo "Erro: CLI do Supabase não encontrado."
    echo "Por favor, instale o CLI do Supabase: https://supabase.com/docs/guides/cli"
    exit 1
fi

# Executar o script de setup
echo "Executando supabase/setup.sql..."
supabase db reset

if [ $? -eq 0 ]; then
    echo "✓ Tabelas criadas com sucesso!"
else
    echo "✗ Erro ao criar tabelas."
    exit 1
fi

echo ""
echo "=== Etapa 2: Inserindo dados de exemplo ==="

# Executar o script de seed (opcional)
read -p "Deseja inserir dados de exemplo para testes? (s/N): " seed_confirm

if [[ $seed_confirm =~ ^[Ss]$ ]]; then
    echo "Executando supabase/seed.sql..."
    supabase db seed
    
    if [ $? -eq 0 ]; then
        echo "✓ Dados de exemplo inseridos com sucesso!"
    else
        echo "✗ Erro ao inserir dados de exemplo."
        exit 1
    fi
fi

echo ""
echo "=== Configuração concluída com sucesso! ==="
echo ""
echo "Próximos passos:"
echo "1. Verifique as tabelas criadas no painel do Supabase"
echo "2. Teste a conexão com o frontend"
echo "3. (Opcional) Configure as políticas de segurança conforme necessário"
echo ""
echo "Para mais informações, consulte supabase/README.md"