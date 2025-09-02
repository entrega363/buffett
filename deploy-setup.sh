#!/bin/bash

echo "========================================"
echo "   CONFIGURACAO AUTOMATICA DE DEPLOY"
echo "========================================"
echo

echo "Verificando se o Git esta inicializado..."
if [ ! -d ".git" ]; then
    echo "Inicializando repositorio Git..."
    git init
    echo "Repositorio Git inicializado!"
else
    echo "Repositorio Git ja existe."
fi

echo
echo "Adicionando arquivos ao Git..."
git add .
git commit -m "Deploy automatico: Configuracao inicial do HatchCanvas"

echo
echo "Configurando branch principal..."
git branch -M main

echo
echo "IMPORTANTE: Configure o repositorio remoto manualmente:"
echo "git remote add origin https://github.com/buffetsobral1/buffet.git"
echo
echo "Depois execute:"
echo "git push -u origin main"
echo

echo "========================================"
echo "   PROXIMOS PASSOS:"
echo "========================================"
echo "1. Va para Settings > Pages no seu repositorio GitHub"
echo "2. Selecione 'GitHub Actions' como fonte"
echo "3. O deploy sera automatico a cada push!"
echo
echo "Site estara disponivel em:"
echo "https://buffetsobral1.github.io/buffet/"
echo "========================================"