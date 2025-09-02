# Guia de Teste Local - HatchCanvas Copy

## 🚀 **COMO TESTAR LOCALMENTE**

### **Opção 1: Servidor HTTP Simples (Recomendado)**

#### **Usando Python (se instalado):**
```bash
# Navegue até a pasta do projeto
cd hatchcanvas-copy

# Python 3
python -m http.server 8000

# Python 2 (se necessário)
python -m SimpleHTTPServer 8000
```

#### **Usando Node.js (se instalado):**
```bash
# Instalar servidor global
npm install -g http-server

# Navegar até a pasta
cd hatchcanvas-copy

# Iniciar servidor
http-server -p 8000
```

#### **Usando PHP (se instalado):**
```bash
# Navegue até a pasta do projeto
cd hatchcanvas-copy

# Iniciar servidor PHP
php -S localhost:8000
```

### **Opção 2: Live Server (VS Code)**

Se você usa VS Code:
1. Instale a extensão "Live Server"
2. Clique com botão direito no `index.html`
3. Selecione "Open with Live Server"

### **Opção 3: Abrir Diretamente no Navegador**

⚠️ **Limitações**: Algumas funcionalidades podem não funcionar devido a políticas CORS
- Navegue até a pasta `hatchcanvas-copy`
- Clique duplo no arquivo `index.html`
- Ou arraste o arquivo para o navegador

---

## 🌐 **ACESSANDO O SITE**

Após iniciar o servidor, acesse:
- **URL**: `http://localhost:8000`
- **Porta**: 8000 (ou a porta que você escolheu)

---

## 🧪 **TESTES PARA EXECUTAR**

### **1. Teste Visual Básico**
- ✅ Verifique se o site carrega completamente
- ✅ Confirme se todas as imagens aparecem
- ✅ Teste a navegação entre seções
- ✅ Verifique se o design está correto

### **2. Teste de Responsividade**
- ✅ Redimensione a janela do navegador
- ✅ Teste em modo mobile (F12 → Device Mode)
- ✅ Verifique se o menu hamburger funciona
- ✅ Confirme se o layout se adapta

### **3. Teste de Funcionalidades**
- ✅ Clique em todos os links de navegação
- ✅ Teste o formulário de contato
- ✅ Verifique hover effects nos botões
- ✅ Teste scroll suave entre seções

### **4. Teste de Performance**
- ✅ Abra DevTools (F12)
- ✅ Vá na aba "Network"
- ✅ Recarregue a página (Ctrl+F5)
- ✅ Verifique tempos de carregamento

---

## 🔧 **FERRAMENTAS DE TESTE INCLUÍDAS**

### **Testes Visuais Automatizados**
Acesse: `http://localhost:8000/tests/visual-comparison.html`
- Compare com o site original
- Execute testes de fidelidade visual
- Veja scores por categoria

### **Testes Funcionais Automatizados**
Acesse: `http://localhost:8000/tests/functional-tests.html`
- Teste todos os links
- Valide formulários
- Verifique interações

### **Testes de Compatibilidade**
Acesse: `http://localhost:8000/tests/browser-compatibility.html`
- Verifique suporte do navegador
- Teste funcionalidades modernas
- Veja relatório de compatibilidade

---

## 📱 **TESTE EM DIFERENTES DISPOSITIVOS**

### **Desktop**
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Resoluções: 1920x1080, 1366x768
- ✅ Teste zoom: 50%, 100%, 150%

### **Mobile (DevTools)**
- ✅ iPhone SE (375x667)
- ✅ iPhone 12 (390x844)
- ✅ Samsung Galaxy (360x640)
- ✅ iPad (768x1024)

### **Como Testar Mobile:**
1. Abra DevTools (F12)
2. Clique no ícone de dispositivo móvel
3. Selecione diferentes dispositivos
4. Teste orientação portrait/landscape

---

## 🐛 **RESOLUÇÃO DE PROBLEMAS**

### **Site não carrega:**
- Verifique se o servidor está rodando
- Confirme a URL: `http://localhost:8000`
- Tente uma porta diferente: `python -m http.server 3000`

### **Imagens não aparecem:**
- Verifique se todas as imagens SVG estão na pasta `assets/images/`
- Confirme se o servidor está servindo arquivos estáticos

### **JavaScript não funciona:**
- Abra DevTools (F12) → Console
- Verifique se há erros JavaScript
- Confirme se os arquivos JS estão carregando

### **CSS não carrega:**
- Verifique se os arquivos CSS estão na pasta `assets/css/`
- Confirme se o caminho no HTML está correto
- Teste com cache desabilitado (Ctrl+Shift+R)

---

## 📊 **CHECKLIST DE TESTE LOCAL**

### **Funcionalidades Básicas**
- [ ] Site carrega em menos de 3 segundos
- [ ] Todas as imagens aparecem corretamente
- [ ] Menu de navegação funciona
- [ ] Links internos fazem scroll suave
- [ ] Formulário de contato valida campos

### **Responsividade**
- [ ] Layout adapta em mobile (< 768px)
- [ ] Menu hamburger funciona em mobile
- [ ] Texto é legível em todas as telas
- [ ] Botões são clicáveis em touch
- [ ] Imagens redimensionam corretamente

### **Interatividade**
- [ ] Hover effects funcionam nos botões
- [ ] Cards elevam ao passar mouse
- [ ] Animações de scroll funcionam
- [ ] Transições são suaves
- [ ] Formulário mostra feedback visual

### **Performance**
- [ ] First Paint < 2 segundos
- [ ] Imagens carregam rapidamente
- [ ] Scroll é suave e responsivo
- [ ] Não há travamentos ou lag
- [ ] JavaScript não bloqueia a UI

---

## 🎯 **TESTES ESPECÍFICOS RECOMENDADOS**

### **1. Teste de Navegação**
```
1. Clique em "Início" → deve ir para o topo
2. Clique em "Recursos" → deve ir para #features
3. Clique em "Galeria" → deve ir para #gallery
4. Clique em "Sobre" → deve ir para #about
5. Clique em "Contato" → deve ir para #contact
```

### **2. Teste de Formulário**
```
1. Deixe campos vazios → deve mostrar erro
2. Digite email inválido → deve mostrar erro
3. Preencha tudo corretamente → deve mostrar sucesso
4. Teste validação em tempo real
```

### **3. Teste Mobile**
```
1. Redimensione para < 768px
2. Menu deve virar hamburger
3. Clique no hamburger → menu deve abrir
4. Clique em link → menu deve fechar
5. Teste orientação landscape
```

---

## 📈 **MÉTRICAS ESPERADAS**

### **Performance Local**
- **First Paint**: < 1 segundo
- **DOM Ready**: < 1.5 segundos
- **Load Complete**: < 2 segundos
- **Tamanho total**: ~400KB

### **Funcionalidade**
- **Links funcionais**: 100%
- **Formulário**: Validação completa
- **Responsividade**: Todos os breakpoints
- **Interações**: Hover e animações

---

## 🔍 **COMANDOS ÚTEIS PARA DEBUG**

### **Verificar arquivos:**
```bash
# Listar arquivos do projeto
ls -la hatchcanvas-copy/

# Verificar estrutura
tree hatchcanvas-copy/
```

### **Testar conectividade:**
```bash
# Testar se servidor está rodando
curl http://localhost:8000

# Verificar porta em uso
netstat -an | grep 8000
```

### **DevTools (F12):**
- **Console**: Ver erros JavaScript
- **Network**: Ver carregamento de recursos
- **Elements**: Inspecionar HTML/CSS
- **Lighthouse**: Testar performance

---

## 🎉 **SUCESSO!**

Se todos os testes passarem, você terá confirmado que:
- ✅ O site funciona perfeitamente local
- ✅ Todas as funcionalidades estão operacionais
- ✅ A responsividade está correta
- ✅ A performance está otimizada

**Pronto para deploy em produção!** 🚀

---

## 📞 **SUPORTE**

Se encontrar algum problema:
1. Verifique este guia primeiro
2. Teste em navegador diferente
3. Confirme se todos os arquivos estão presentes
4. Verifique console de erros (F12)

**Boa sorte com os testes!** 🎯