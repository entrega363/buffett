#!/bin/bash

echo "========================================"
echo "  HatchCanvas Copy - Servidor Local"
echo "========================================"
echo ""

echo "Tentando iniciar servidor local..."
echo ""

# Tentar Python 3 primeiro
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 encontrado! Iniciando servidor na porta 8000..."
    echo ""
    echo "🌐 Acesse: http://localhost:8000"
    echo "⏹️  Pressione Ctrl+C para parar o servidor"
    echo ""
    python3 -m http.server 8000
    exit 0
fi

# Tentar Python 2
if command -v python &> /dev/null; then
    echo "✅ Python encontrado! Iniciando servidor na porta 8000..."
    echo ""
    echo "🌐 Acesse: http://localhost:8000"
    echo "⏹️  Pressione Ctrl+C para parar o servidor"
    echo ""
    python -m SimpleHTTPServer 8000
    exit 0
fi

# Tentar Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js encontrado! Verificando http-server..."
    
    if command -v http-server &> /dev/null; then
        echo "✅ http-server encontrado! Iniciando servidor..."
        echo ""
        echo "🌐 Acesse: http://localhost:8000"
        echo "⏹️  Pressione Ctrl+C para parar o servidor"
        echo ""
        http-server -p 8000
        exit 0
    else
        echo "📦 Instalando http-server..."
        npm install -g http-server
        echo "🚀 Iniciando servidor..."
        echo ""
        echo "🌐 Acesse: http://localhost:8000"
        echo "⏹️  Pressione Ctrl+C para parar o servidor"
        echo ""
        http-server -p 8000
        exit 0
    fi
fi

# Tentar PHP
if command -v php &> /dev/null; then
    echo "✅ PHP encontrado! Iniciando servidor na porta 8000..."
    echo ""
    echo "🌐 Acesse: http://localhost:8000"
    echo "⏹️  Pressione Ctrl+C para parar o servidor"
    echo ""
    php -S localhost:8000
    exit 0
fi

# Se nenhum servidor foi encontrado
echo ""
echo "❌ ERRO: Nenhum servidor encontrado!"
echo ""
echo "Para testar localmente, você precisa de uma das opções:"
echo ""
echo "1. 🐍 Python (recomendado):"
echo "   - Ubuntu/Debian: sudo apt install python3"
echo "   - macOS: brew install python3"
echo "   - Depois execute: python3 -m http.server 8000"
echo ""
echo "2. 📦 Node.js:"
echo "   - Ubuntu/Debian: sudo apt install nodejs npm"
echo "   - macOS: brew install node"
echo "   - Depois execute: npm install -g http-server"
echo ""
echo "3. 🐘 PHP:"
echo "   - Ubuntu/Debian: sudo apt install php"
echo "   - macOS: brew install php"
echo "   - Depois execute: php -S localhost:8000"
echo ""
echo "4. 🌐 Ou simplesmente abra o arquivo index.html no navegador"
echo "   (algumas funcionalidades podem não funcionar)"
echo ""

echo "Pressione Enter para continuar..."
read