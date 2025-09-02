# HatchCanvas Copy - Teste Local

## 🚀 **INÍCIO RÁPIDO**

### **Opção 1: Scripts Automáticos**

#### **Windows:**
```bash
# Clique duplo no arquivo ou execute no terminal:
start-local-server.bat
```

#### **Mac/Linux:**
```bash
# Torne executável (apenas primeira vez):
chmod +x start-local-server.sh

# Execute:
./start-local-server.sh
```

### **Opção 2: Manual**

#### **Com Python (Recomendado):**
```bash
# Navegue até a pasta
cd hatchcanvas-copy

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### **Com Node.js:**
```bash
# Instale o servidor (apenas primeira vez)
npm install -g http-server

# Execute
http-server -p 8000
```

#### **Com PHP:**
```bash
php -S localhost:8000
```

## 🌐 **ACESSAR O SITE**

Após iniciar o servidor:
- **URL**: http://localhost:8000
- **Porta**: 8000

## 🧪 **TESTES INCLUÍDOS**

- **Testes Visuais**: http://localhost:8000/tests/visual-comparison.html
- **Testes Funcionais**: http://localhost:8000/tests/functional-tests.html
- **Compatibilidade**: http://localhost:8000/tests/browser-compatibility.html

## 📱 **TESTE RESPONSIVO**

1. Abra DevTools (F12)
2. Clique no ícone de dispositivo móvel
3. Teste diferentes resoluções
4. Verifique menu hamburger em mobile

## ✅ **CHECKLIST RÁPIDO**

- [ ] Site carrega completamente
- [ ] Todas as imagens aparecem
- [ ] Menu de navegação funciona
- [ ] Formulário valida campos
- [ ] Responsivo em mobile
- [ ] Hover effects funcionam

## 🐛 **PROBLEMAS?**

Consulte o arquivo `LOCAL-TESTING-GUIDE.md` para guia completo de troubleshooting.

---

**Versão**: 1.0.0  
**Status**: ✅ Pronto para teste