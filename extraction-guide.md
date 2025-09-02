# Guia de Extração - Site HatchCanvas

## Instruções para Análise Manual

### 1. Captura de Screenshots

#### Screenshots Necessários:
- [ ] **Desktop Full Page** (1920x1080)
- [ ] **Tablet** (768x1024)
- [ ] **Mobile** (375x667)
- [ ] **Elementos Específicos** (botões, menus, etc.)

#### Como Capturar:
1. Abrir site original: https://hatchcanvas.com/public/proj_zK-rRunptGhgsF6fYzC9C/shape:gkuJABXRWob56rcIBeXPE
2. Usar ferramentas do desenvolvedor (F12)
3. Ativar modo responsivo
4. Capturar em diferentes resoluções
5. Salvar em `assets/images/screenshots/`

### 2. Extração de Estilos CSS

#### Usando DevTools:
1. **Inspecionar Elemento** (clique direito → Inspecionar)
2. **Aba Computed** - ver estilos calculados
3. **Aba Styles** - ver CSS aplicado
4. **Copiar valores** importantes:
   - Cores (color, background-color)
   - Fontes (font-family, font-size)
   - Espaçamentos (margin, padding)
   - Bordas (border, border-radius)

#### Elementos Prioritários:
- [ ] Body/HTML base
- [ ] Cabeçalho/Header
- [ ] Área principal/Canvas
- [ ] Botões e controles
- [ ] Texto e tipografia
- [ ] Cores de fundo e bordas

### 3. Extração de Assets

#### Imagens:
1. **Clique direito** na imagem → "Salvar imagem como"
2. **DevTools** → Network → filtrar por "Img"
3. **Sources** → ver todos os recursos carregados
4. Salvar em `assets/images/`

#### Fontes:
1. **DevTools** → Network → filtrar por "Font"
2. **Computed** → verificar font-family
3. Baixar arquivos .woff, .woff2, .ttf
4. Salvar em `assets/fonts/`

#### Ícones:
1. Procurar por SVGs inline no HTML
2. Verificar sprites de ícones
3. Font icons (FontAwesome, etc.)
4. Salvar em `assets/images/icons/`

### 4. Análise de Funcionalidades

#### JavaScript:
1. **DevTools** → Sources → ver arquivos JS
2. **Console** → testar interações
3. **Network** → ver requisições AJAX
4. Documentar comportamentos observados

#### Interações:
- [ ] Cliques em botões
- [ ] Hover effects
- [ ] Scroll behaviors
- [ ] Formulários (se houver)
- [ ] Modais/popups
- [ ] Navegação

### 5. Estrutura HTML

#### Copiar HTML:
1. **Clique direito** → "Inspecionar elemento"
2. **Clique direito** no elemento HTML → "Copy" → "Copy outerHTML"
3. Documentar estrutura principal
4. Identificar classes e IDs importantes

#### Elementos Semânticos:
- [ ] `<header>`
- [ ] `<nav>`
- [ ] `<main>`
- [ ] `<section>`
- [ ] `<article>`
- [ ] `<aside>`
- [ ] `<footer>`

### 6. Responsividade

#### Testar Breakpoints:
1. **DevTools** → Toggle device toolbar
2. Testar resoluções:
   - 320px (mobile pequeno)
   - 375px (mobile padrão)
   - 768px (tablet)
   - 1024px (desktop pequeno)
   - 1200px (desktop)
   - 1920px (desktop grande)

#### Documentar Mudanças:
- [ ] Layout changes
- [ ] Font size adjustments
- [ ] Hidden/shown elements
- [ ] Navigation changes

### 7. Performance

#### Métricas:
1. **DevTools** → Lighthouse
2. **Network** → ver tempo de carregamento
3. **Performance** → analisar rendering

#### Otimizações Observadas:
- [ ] Lazy loading
- [ ] Image compression
- [ ] CSS/JS minification
- [ ] CDN usage

## Checklist de Extração

### Análise Visual ✓
- [ ] Screenshots capturados
- [ ] Paleta de cores documentada
- [ ] Tipografia identificada
- [ ] Layout mapeado

### Assets Extraídos ✓
- [ ] Imagens baixadas
- [ ] Ícones coletados
- [ ] Fontes identificadas
- [ ] Recursos multimídia

### Código Analisado ✓
- [ ] HTML estruturado
- [ ] CSS documentado
- [ ] JavaScript mapeado
- [ ] Funcionalidades listadas

### Responsividade ✓
- [ ] Breakpoints identificados
- [ ] Comportamentos documentados
- [ ] Adaptações mapeadas

## Próximos Passos

Após completar esta extração:
1. Organizar todos os assets coletados
2. Atualizar arquivo `analysis.md`
3. Começar implementação HTML
4. Aplicar estilos CSS extraídos