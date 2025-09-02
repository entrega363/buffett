# 🚀 Deploy Automático para GitHub Pages

## ✅ Configuração Completa

O sistema de deploy automático foi configurado com sucesso! Agora você tem:

### 📁 Arquivos de Deploy Criados:
- `.github/workflows/deploy.yml` - GitHub Actions para deploy automático
- `.nojekyll` - Arquivo para GitHub Pages funcionar corretamente
- `deploy-setup.bat` - Script de configuração para Windows
- `deploy-setup.sh` - Script de configuração para Linux/Mac

## 🔧 Como Usar

### Opção 1: Configuração Automática (Recomendada)

**No Windows:**
```bash
cd hatchcanvas-copy
deploy-setup.bat
```

**No Linux/Mac:**
```bash
cd hatchcanvas-copy
./deploy-setup.sh
```

### Opção 2: Configuração Manual

1. **Inicializar Git (se necessário):**
```bash
git init
git add .
git commit -m "Deploy automático: Configuração inicial do HatchCanvas"
git branch -M main
```

2. **Conectar ao repositório GitHub:**
```bash
git remote add origin https://github.com/buffetsobral1/buffet.git
git push -u origin main
```

3. **Configurar GitHub Pages:**
   - Vá para `Settings > Pages` no seu repositório
   - Em "Source", selecione "GitHub Actions"
   - Salve as configurações

## 🌐 Resultado

Após a configuração, seu site estará disponível em:
**https://buffetsobral1.github.io/buffet/**

## ⚡ Deploy Automático

A partir de agora, sempre que você fizer push para o repositório:

1. **GitHub Actions** será executado automaticamente
2. **Deploy** será feito para GitHub Pages
3. **Site** será atualizado em poucos minutos

## 📊 Monitoramento

- Vá para a aba "Actions" no GitHub para ver o status dos deploys
- Cada push criará um novo workflow de deploy
- Você receberá notificações se houver erros

## 🔄 Atualizações Futuras

Para atualizar o site:
```bash
git add .
git commit -m "Atualização do site"
git push
```

O deploy será automático! 🎉

## 🆘 Solução de Problemas

### Se o deploy falhar:
1. Verifique a aba "Actions" no GitHub
2. Certifique-se que GitHub Pages está configurado corretamente
3. Verifique se o arquivo `.nojekyll` existe

### Se o site não carregar:
1. Aguarde alguns minutos após o deploy
2. Verifique se a URL está correta
3. Limpe o cache do navegador

## 📞 Suporte

Se precisar de ajuda, verifique:
- Logs na aba "Actions" do GitHub
- Configurações em "Settings > Pages"
- Status do GitHub Pages