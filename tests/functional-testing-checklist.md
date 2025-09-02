# Checklist de Testes Funcionais - HatchCanvas Copy

## 📋 Visão Geral

Este checklist garante que todas as funcionalidades do site funcionem corretamente. Marque cada item após verificação manual.

**Data do Teste**: ___________  
**Testador**: _______________  
**Navegador**: ______________  
**Dispositivo**: ____________

---

## 🔗 **1. LINKS E NAVEGAÇÃO**

### Links de Navegação Principal
- [ ] **Link "Início"** - Redireciona para #home
- [ ] **Link "Recursos"** - Redireciona para #features  
- [ ] **Link "Galeria"** - Redireciona para #gallery
- [ ] **Link "Sobre"** - Redireciona para #about
- [ ] **Link "Contato"** - Redireciona para #contact

### Comportamento dos Links
- [ ] **Scroll suave** - Transição suave entre seções
- [ ] **Offset correto** - Links param na posição certa (considerando header fixo)
- [ ] **Indicador ativo** - Link atual destacado na navegação
- [ ] **Hover effects** - Mudança visual ao passar mouse
- [ ] **Focus states** - Visível ao navegar por teclado

### Links Externos
- [ ] **Links sociais** - Abrem em nova aba (_blank)
- [ ] **Links externos** - Têm rel="noopener noreferrer"
- [ ] **Email links** - Abrem cliente de email (mailto:)
- [ ] **Telefone links** - Funcionam em dispositivos móveis (tel:)

### Logo e Branding
- [ ] **Logo clicável** - Redireciona para topo da página
- [ ] **Logo responsivo** - Mantém proporções em mobile
- [ ] **Alt text** - Texto alternativo presente
- [ ] **Carregamento** - Logo carrega rapidamente

### Navegação por Teclado
- [ ] **Tab order** - Ordem lógica de navegação
- [ ] **Enter/Space** - Ativam links corretamente
- [ ] **Escape** - Fecha menus/modais
- [ ] **Arrow keys** - Navegação em menus (se aplicável)

**Score Links**: ___/20 (___%)

---

## 📝 **2. FORMULÁRIOS**

### Formulário de Contato
- [ ] **Campo Nome** - Aceita texto, validação mínima
- [ ] **Campo Email** - Validação de formato de email
- [ ] **Campo Assunto** - Aceita texto, validação mínima
- [ ] **Campo Mensagem** - Textarea funcional, validação mínima
- [ ] **Botão Submit** - Funciona corretamente

### Validação de Campos
- [ ] **Campos obrigatórios** - Marcados com * ou required
- [ ] **Validação em tempo real** - Feedback durante digitação
- [ ] **Mensagens de erro** - Claras e específicas
- [ ] **Mensagens de sucesso** - Confirmação de envio
- [ ] **Estados visuais** - Cores diferentes para erro/sucesso

### Comportamento do Formulário
- [ ] **Prevenção de envio vazio** - Não envia sem dados obrigatórios
- [ ] **Feedback visual** - Loading state durante envio
- [ ] **Reset após envio** - Campos limpos após sucesso
- [ ] **Persistência de dados** - Dados mantidos em caso de erro
- [ ] **Acessibilidade** - Labels associados aos campos

### Estados de Interação
- [ ] **Focus states** - Outline visível nos campos
- [ ] **Hover states** - Feedback visual em botões
- [ ] **Active states** - Feedback ao clicar
- [ ] **Disabled states** - Campos desabilitados quando necessário
- [ ] **Placeholder text** - Texto de exemplo nos campos

### Validação Específica
- [ ] **Email format** - Rejeita emails inválidos
- [ ] **Tamanho mínimo** - Nome com pelo menos 2 caracteres
- [ ] **Tamanho máximo** - Campos respeitam limites
- [ ] **Caracteres especiais** - Aceita acentos e símbolos
- [ ] **Sanitização** - Previne XSS e injeção

**Score Formulários**: ___/25 (___%)

---

## ✨ **3. INTERAÇÕES E ANIMAÇÕES**

### Hover Effects
- [ ] **Botões** - Mudança de cor/elevação ao hover
- [ ] **Links** - Underline ou mudança de cor
- [ ] **Cards** - Elevação ou escala ao hover
- [ ] **Imagens** - Overlay ou zoom ao hover
- [ ] **Ícones** - Transformação ou cor ao hover

### Transições e Animações
- [ ] **Duração adequada** - Não muito rápidas nem lentas (150-300ms)
- [ ] **Easing natural** - Curvas de animação suaves
- [ ] **Performance** - Animações não causam lag
- [ ] **Redução de movimento** - Respeitam prefers-reduced-motion
- [ ] **Consistência** - Mesmo timing em elementos similares

### Scroll Animations
- [ ] **Scroll reveal** - Elementos aparecem ao fazer scroll
- [ ] **Parallax effects** - Movimento diferenciado de elementos
- [ ] **Progress indicators** - Indicador de progresso de scroll
- [ ] **Sticky elements** - Header fixo funciona corretamente
- [ ] **Smooth scroll** - Navegação suave entre seções

### Micro-interações
- [ ] **Button ripple** - Efeito de ondulação em botões
- [ ] **Form feedback** - Feedback visual em campos
- [ ] **Loading states** - Indicadores de carregamento
- [ ] **Success states** - Confirmações visuais
- [ ] **Error states** - Indicações de erro

### Estados Interativos
- [ ] **Focus visible** - Outline em elementos focados
- [ ] **Active states** - Feedback ao clicar/tocar
- [ ] **Disabled states** - Elementos desabilitados claramente indicados
- [ ] **Loading states** - Indicação durante processamento
- [ ] **Empty states** - Tratamento de conteúdo vazio

**Score Interações**: ___/25 (___%)

---

## 🧭 **4. NAVEGAÇÃO E USABILIDADE**

### Header e Menu Principal
- [ ] **Header sticky** - Permanece visível ao fazer scroll
- [ ] **Menu responsivo** - Adapta-se a diferentes telas
- [ ] **Logo posicionado** - Canto superior esquerdo
- [ ] **Menu alinhado** - Distribuição equilibrada
- [ ] **Z-index correto** - Header sobre outros elementos

### Menu Mobile
- [ ] **Hamburger button** - Visível em telas pequenas
- [ ] **Menu overlay** - Cobre a tela ao abrir
- [ ] **Animação suave** - Transição de abertura/fechamento
- [ ] **Fechar ao clicar** - Menu fecha ao selecionar item
- [ ] **Fechar ao clicar fora** - Menu fecha ao clicar na overlay

### Navegação por Seções
- [ ] **Indicador ativo** - Seção atual destacada no menu
- [ ] **Scroll spy** - Menu atualiza conforme scroll
- [ ] **Offset correto** - Seções aparecem completamente
- [ ] **Transição suave** - Scroll animado entre seções
- [ ] **Back to top** - Botão para voltar ao topo (se aplicável)

### Breadcrumbs e Orientação
- [ ] **Estrutura clara** - Hierarquia de navegação evidente
- [ ] **Posição atual** - Usuário sabe onde está
- [ ] **Caminho de volta** - Fácil retorno a seções anteriores
- [ ] **Consistência** - Padrão mantido em todas as páginas
- [ ] **Acessibilidade** - Navegação por teclado funcional

### Skip Links e Acessibilidade
- [ ] **Skip to content** - Link para pular navegação
- [ ] **Focus trap** - Em modais e overlays
- [ ] **Keyboard navigation** - Todos os elementos acessíveis
- [ ] **Screen reader** - Textos alternativos presentes
- [ ] **ARIA labels** - Elementos complexos bem descritos

**Score Navegação**: ___/25 (___%)

---

## 📱 **5. RESPONSIVIDADE**

### Breakpoints Principais
- [ ] **Mobile (320-767px)** - Layout empilhado, menu hamburger
- [ ] **Tablet (768-1023px)** - Layout adaptado, 2 colunas
- [ ] **Desktop (1024px+)** - Layout completo, múltiplas colunas
- [ ] **Large screens (1400px+)** - Aproveitamento do espaço
- [ ] **Orientação landscape** - Funciona em tablets deitados

### Layout Mobile
- [ ] **Menu hamburger** - Substitui menu horizontal
- [ ] **Conteúdo empilhado** - Uma coluna em mobile
- [ ] **Imagens responsivas** - Redimensionam corretamente
- [ ] **Texto legível** - Tamanho adequado para mobile
- [ ] **Botões touch-friendly** - Tamanho mínimo 44px

### Adaptações de Conteúdo
- [ ] **Hero section** - Adapta-se bem ao mobile
- [ ] **Features grid** - Colapsa para 1 coluna
- [ ] **Gallery** - Mantém proporções em mobile
- [ ] **About section** - Texto e imagem empilhados
- [ ] **Contact form** - Campos ocupam largura total

### Touch e Gestos
- [ ] **Touch targets** - Elementos clicáveis grandes o suficiente
- [ ] **Scroll suave** - Funciona bem com touch
- [ ] **Pinch to zoom** - Permitido onde apropriado
- [ ] **Swipe gestures** - Funcionam em carrosséis (se aplicável)
- [ ] **Tap highlights** - Feedback visual ao tocar

### Performance Mobile
- [ ] **Carregamento rápido** - Otimizado para conexões lentas
- [ ] **Imagens otimizadas** - Tamanhos apropriados para mobile
- [ ] **JavaScript leve** - Não trava em dispositivos lentos
- [ ] **CSS eficiente** - Não causa reflows desnecessários
- [ ] **Lazy loading** - Imagens carregam conforme necessário

**Score Responsividade**: ___/25 (___%)

---

## ⚡ **6. PERFORMANCE E CARREGAMENTO**

### Tempo de Carregamento
- [ ] **First Paint < 2s** - Primeiro conteúdo aparece rapidamente
- [ ] **LCP < 2.5s** - Maior elemento carrega em tempo adequado
- [ ] **FID < 100ms** - Resposta rápida à primeira interação
- [ ] **CLS < 0.1** - Layout não "pula" durante carregamento
- [ ] **TTI < 3s** - Página interativa rapidamente

### Otimizações de Recursos
- [ ] **Imagens otimizadas** - Formatos modernos (WebP, AVIF)
- [ ] **CSS minificado** - Arquivos comprimidos
- [ ] **JavaScript minificado** - Código otimizado
- [ ] **Fonts otimizadas** - Carregamento eficiente
- [ ] **Lazy loading** - Recursos carregam sob demanda

### Cache e Armazenamento
- [ ] **Browser cache** - Headers de cache configurados
- [ ] **Service Worker** - Cache offline funcional
- [ ] **Local Storage** - Dados persistem entre sessões
- [ ] **CDN** - Recursos servidos de CDN (se aplicável)
- [ ] **Compression** - Gzip/Brotli habilitado

### Indicadores de Carregamento
- [ ] **Loading states** - Feedback durante carregamento
- [ ] **Skeleton screens** - Placeholders durante carregamento
- [ ] **Progress bars** - Indicação de progresso
- [ ] **Error states** - Tratamento de falhas de carregamento
- [ ] **Retry mechanisms** - Opção de tentar novamente

### Otimização de Rede
- [ ] **Preload crítico** - Recursos importantes carregam primeiro
- [ ] **Prefetch** - Recursos futuros pré-carregados
- [ ] **DNS prefetch** - Resolução antecipada de domínios
- [ ] **Resource hints** - Dicas para o navegador
- [ ] **Bundle splitting** - JavaScript dividido eficientemente

**Score Performance**: ___/25 (___%)

---

## 🔧 **7. FUNCIONALIDADES ESPECÍFICAS**

### Seção Hero
- [ ] **Título principal** - Visível e bem formatado
- [ ] **Subtítulo** - Complementa o título principal
- [ ] **Call-to-action** - Botões funcionam corretamente
- [ ] **Imagem hero** - Carrega e exibe corretamente
- [ ] **Background** - Gradiente ou imagem de fundo

### Seção Features
- [ ] **Grid de recursos** - Layout em colunas funcionando
- [ ] **Ícones** - Carregam e exibem corretamente
- [ ] **Títulos** - Hierarquia visual clara
- [ ] **Descrições** - Texto legível e bem formatado
- [ ] **Hover effects** - Cards respondem ao mouse

### Seção Gallery
- [ ] **Grid de imagens** - Layout responsivo
- [ ] **Imagens** - Carregam com qualidade adequada
- [ ] **Overlays** - Informações aparecem ao hover
- [ ] **Categorias** - Filtros funcionam (se aplicável)
- [ ] **Lightbox** - Modal de imagem funciona (se aplicável)

### Seção About
- [ ] **Texto principal** - Conteúdo bem formatado
- [ ] **Estatísticas** - Números destacados corretamente
- [ ] **Imagem** - Posicionada e dimensionada corretamente
- [ ] **Layout** - Distribuição equilibrada do conteúdo
- [ ] **Animações** - Contadores animados (se aplicável)

### Seção Contact
- [ ] **Formulário** - Todos os campos funcionais
- [ ] **Informações** - Dados de contato visíveis
- [ ] **Mapa** - Integração funcional (se aplicável)
- [ ] **Links sociais** - Redirecionam corretamente
- [ ] **Layout** - Distribuição clara das informações

### Footer
- [ ] **Links** - Todos funcionais
- [ ] **Informações** - Dados da empresa visíveis
- [ ] **Redes sociais** - Links funcionam corretamente
- [ ] **Copyright** - Informação atualizada
- [ ] **Layout** - Organização clara do conteúdo

**Score Funcionalidades**: ___/30 (___%)

---

## 🛡️ **8. SEGURANÇA E VALIDAÇÃO**

### Validação de Formulários
- [ ] **Sanitização** - Inputs são limpos antes do processamento
- [ ] **Validação server-side** - Não depende apenas do frontend
- [ ] **CSRF protection** - Tokens de segurança implementados
- [ ] **Rate limiting** - Prevenção de spam
- [ ] **Captcha** - Proteção contra bots (se necessário)

### Headers de Segurança
- [ ] **Content Security Policy** - CSP configurado
- [ ] **X-Frame-Options** - Proteção contra clickjacking
- [ ] **X-XSS-Protection** - Proteção XSS habilitada
- [ ] **Strict-Transport-Security** - HTTPS forçado
- [ ] **Referrer-Policy** - Política de referrer configurada

### Tratamento de Erros
- [ ] **Mensagens genéricas** - Não expõem informações sensíveis
- [ ] **Logs seguros** - Erros logados sem dados sensíveis
- [ ] **Fallbacks** - Degradação graciosa em caso de erro
- [ ] **Timeout handling** - Tratamento de timeouts
- [ ] **Error boundaries** - Isolamento de erros JavaScript

**Score Segurança**: ___/15 (___%)

---

## 📊 **RESUMO FINAL**

### Scores por Categoria
| Categoria | Score | Peso | Score Ponderado |
|-----------|-------|------|-----------------|
| Links e Navegação | ___/20 (___%) | 15% | ___% |
| Formulários | ___/25 (___%) | 20% | ___% |
| Interações | ___/25 (___%) | 15% | ___% |
| Navegação | ___/25 (___%) | 15% | ___% |
| Responsividade | ___/25 (___%) | 20% | ___% |
| Performance | ___/25 (___%) | 10% | ___% |
| Funcionalidades | ___/30 (___%) | 15% | ___% |
| Segurança | ___/15 (___%) | 5% | ___% |

### Score Geral
**Total**: ___/190 (___%)

### Critérios de Aprovação
- [ ] **Score geral ≥ 90%** - Excelente funcionalidade
- [ ] **Formulários ≥ 85%** - Funcionalidade crítica
- [ ] **Responsividade ≥ 90%** - Experiência mobile
- [ ] **Performance ≥ 80%** - Carregamento adequado
- [ ] **Segurança ≥ 90%** - Proteção básica

### Status Final
- [ ] ✅ **APROVADO** - Todas as funcionalidades funcionam corretamente
- [ ] ⚠️ **APROVADO COM RESSALVAS** - Pequenos ajustes necessários
- [ ] ❌ **REPROVADO** - Correções significativas necessárias

---

## 📝 **OBSERVAÇÕES E CORREÇÕES**

### Problemas Encontrados
```
1. _________________________________
   Severidade: [ ] Baixa [ ] Média [ ] Alta
   Status: [ ] Pendente [ ] Em correção [ ] Corrigido

2. _________________________________
   Severidade: [ ] Baixa [ ] Média [ ] Alta
   Status: [ ] Pendente [ ] Em correção [ ] Corrigido

3. _________________________________
   Severidade: [ ] Baixa [ ] Média [ ] Alta
   Status: [ ] Pendente [ ] Em correção [ ] Corrigido
```

### Recomendações
```
1. _________________________________

2. _________________________________

3. _________________________________
```

### Próximos Passos
- [ ] Corrigir problemas de alta prioridade
- [ ] Implementar melhorias sugeridas
- [ ] Executar novos testes após correções
- [ ] Documentar mudanças realizadas

---

**Testador**: ________________________  
**Data**: ___________________________  
**Assinatura**: ______________________

---

**Versão**: 1.0.0  
**Última atualização**: 1 de setembro de 2025