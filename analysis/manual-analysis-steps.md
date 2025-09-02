# Passos para Análise Manual do Site

## Instruções de Análise

### 1. Acesso ao Site Original
1. Abra o navegador (Chrome ou Firefox recomendado)
2. Acesse: https://hatchcanvas.com/public/proj_zK-rRunptGhgsF6fYzC9C/shape:gkuJABXRWob56rcIBeXPE
3. Aguarde o carregamento completo da página

### 2. Captura de Screenshots
1. **Screenshot completo**: Capture a página inteira (use extensão ou ferramenta de screenshot)
2. **Screenshots por seção**: Capture cabeçalho, conteúdo principal, rodapé separadamente
3. **Screenshots responsivos**: 
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

### 3. Inspeção de Elementos
1. Abra as Ferramentas do Desenvolvedor (F12)
2. Execute o script `extract-info.js` no console
3. Copie os resultados para o arquivo de análise

### 4. Análise Visual Detalhada

#### Cores
- [ ] Identificar cor primária
- [ ] Identificar cor secundária
- [ ] Identificar cores de destaque
- [ ] Documentar gradientes (se houver)
- [ ] Capturar paleta completa

#### Tipografia
- [ ] Identificar fonte principal
- [ ] Identificar fonte secundária
- [ ] Medir tamanhos de texto (h1, h2, h3, p, etc.)
- [ ] Documentar pesos de fonte (normal, bold, etc.)
- [ ] Verificar espaçamento entre linhas

#### Layout
- [ ] Medir largura máxima do container
- [ ] Identificar sistema de grid
- [ ] Documentar espaçamentos (margins, paddings)
- [ ] Mapear breakpoints responsivos

### 5. Análise de Interatividade

#### Navegação
- [ ] Testar todos os links
- [ ] Verificar menu responsivo
- [ ] Documentar animações de hover

#### Formulários (se houver)
- [ ] Testar campos de entrada
- [ ] Verificar validações
- [ ] Documentar mensagens de erro

#### Animações
- [ ] Identificar transições CSS
- [ ] Documentar animações JavaScript
- [ ] Capturar timing e easing

### 6. Análise Técnica

#### Performance
- [ ] Medir tempo de carregamento
- [ ] Verificar otimização de imagens
- [ ] Analisar tamanho dos arquivos

#### SEO
- [ ] Verificar meta tags
- [ ] Analisar estrutura de headings
- [ ] Documentar alt texts das imagens

### 7. Extração de Assets

#### Imagens
1. Clique direito em cada imagem → "Salvar imagem como"
2. Salve na pasta `assets/images/`
3. Mantenha nomes descritivos

#### Ícones
1. Identifique se usa biblioteca de ícones (Font Awesome, etc.)
2. Ou extraia ícones SVG individualmente

#### Fontes
1. Verifique se usa Google Fonts ou fontes customizadas
2. Baixe arquivos de fonte se necessário

### 8. Documentação dos Resultados

Após completar a análise, atualize os seguintes arquivos:
- `site-analysis.md` - Resultados completos
- `colors.css` - Paleta de cores extraída
- `typography.css` - Estilos de tipografia
- `layout-measurements.md` - Medidas e espaçamentos

### 9. Validação

- [ ] Compare screenshots com o site original
- [ ] Verifique se todos os elementos foram documentados
- [ ] Confirme que assets foram extraídos corretamente

### 10. Próximos Passos

Após completar a análise:
1. Revisar toda a documentação
2. Organizar assets extraídos
3. Preparar para implementação HTML
4. Prosseguir para a próxima tarefa do plano

---

**Tempo estimado**: 2-3 horas para análise completa
**Ferramentas necessárias**: Navegador, ferramentas de desenvolvedor, extensão de screenshot