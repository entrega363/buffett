# 🧪 Teste de Debug do Site Buffet Sobral

Este documento contém instruções para diagnosticar e resolver problemas no site do Buffet Sobral.

## 📋 Problemas Identificados

1. **Botões não funcionam**: Nenhum botão responde ao clique
2. **Navegação quebrada**: Não é possível mudar de página/aba
3. **Conexão com Supabase**: Verificar se os dados estão sendo carregados corretamente

## 🔧 Arquivos de Diagnóstico Criados

### 1. `debug-script-completo.js`
Script completo de debug que verifica:
- Carregamento do DOM
- Elementos principais
- Funções essenciais
- Event listeners
- Conexão com Supabase
- Navegação entre abas

### 2. `pagina-teste-debug.html`
Página HTML de teste com:
- Diagnóstico automático
- Testes manuais interativos
- Console visual de erros
- Verificação de elementos e funções

### 3. `servidor-teste.js`
Servidor Node.js simples para testar os arquivos localmente

## ▶️ Como Executar os Testes

### Opção 1: Usando o Servidor Node.js

1. Abra o terminal/prompt de comando
2. Navegue até a pasta do projeto:
   ```
   cd C:\Users\maste\.kiro\buffet-sobral-novo5
   ```
3. Execute o servidor:
   ```
   node servidor-teste.js
   ```
4. Abra o navegador em `http://localhost:3000`
5. Acesse `http://localhost:3000/pagina-teste-debug.html` para executar os testes

### Opção 2: Usando Live Server (VS Code)

1. Abra a pasta no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

## 📊 Diagnóstico Esperado

### Elementos que Devem ser Encontrados:
- `#catalogo`, `#simulador`, `#agenda`, `#avaliacoes`, `#videos`
- `.nav-tab` (abas de navegação)
- `#servicesList`, `#packagesContainer`, `#calendar`
- `#reviewsContainer`, `#featuredVideosContainer`

### Funções que Devem Existir:
- `showTab(tabName)`
- `addService(name, price, unit)`
- `shareWhatsApp()`
- `generateCalendar()`
- `loadReviews()`
- `loadFeaturedVideos()`
- `updateServicesDisplay()`

### Conexão com Supabase:
- Cliente Supabase deve estar disponível
- Deve conseguir acessar tabelas: `services`, `reviews`, `space_photos`, `contact_info`

## 🔍 Problemas Comuns e Soluções

### 1. Scripts não carregam
**Sintoma**: Funções undefined no console
**Solução**: Verificar se todos os scripts estão sendo carregados corretamente

### 2. Event listeners não funcionam
**Sintoma**: Cliques não respondem
**Solução**: Verificar se o DOM está completamente carregado antes de adicionar listeners

### 3. Erros de CORS com Supabase
**Sintoma**: Erros de conexão no console
**Solução**: Verificar políticas de segurança do Supabase

## 🛠️ Ferramentas de Debug no Navegador

1. **Console (F12)**: Verificar erros de JavaScript
2. **Elements (F12)**: Verificar estrutura HTML
3. **Network (F12)**: Verificar carregamento de recursos
4. **Sources (F12)**: Debug passo a passo

## 📞 Suporte

Se os testes não resolverem o problema, entre em contato com o suporte técnico.