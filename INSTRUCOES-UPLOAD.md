# 📤 Instruções para Upload Manual no GitHub

## ⚠️ Problema de Autenticação Detectado

Como há um problema de autenticação com o Git, vou te dar as instruções para fazer upload manual.

## 🚀 Opção 1: Upload via Interface Web do GitHub

### Passo 1: Preparar Arquivos
1. Comprima toda a pasta `hatchcanvas-copy` em um ZIP
2. Ou use os arquivos individuais

### Passo 2: Upload no GitHub
1. Vá para: https://github.com/buffetsobral1/buffet
2. Clique em "Add file" > "Upload files"
3. Arraste todos os arquivos da pasta `hatchcanvas-copy`
4. Escreva uma mensagem de commit: "Deploy inicial do HatchCanvas"
5. Clique em "Commit changes"

### Passo 3: Configurar GitHub Pages
1. Vá para `Settings` > `Pages`
2. Em "Source", selecione "GitHub Actions"
3. Salve as configurações

## 🚀 Opção 2: Configurar Git Localmente

### Configurar Credenciais:
```bash
# Configure seu usuário
git config --global user.name "buffetsobral1"
git config --global user.email "seu-email@gmail.com"

# Use token de acesso pessoal em vez de senha
# Vá para GitHub > Settings > Developer settings > Personal access tokens
# Crie um token com permissões de repositório
```

### Fazer Push:
```bash
cd hatchcanvas-copy
git push -u origin main
# Use seu token como senha quando solicitado
```

## ✅ Resultado Final

Após qualquer uma das opções, seu site estará disponível em:
**https://buffetsobral1.github.io/buffet/**

## 📊 Status Atual

✅ Arquivos preparados e commitados localmente
✅ GitHub Actions configurado
✅ Deploy automático pronto
⏳ Aguardando upload para GitHub

## 🔄 Próximos Passos

1. Faça upload dos arquivos (Opção 1 ou 2)
2. Configure GitHub Pages
3. Aguarde alguns minutos
4. Acesse seu site!

## 📞 Suporte

Se precisar de ajuda com:
- Token de acesso: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- GitHub Pages: https://docs.github.com/en/pages