# Guia de Tratamento de Erros e Fallbacks - HatchCanvas Copy

## Visão Geral

O sistema de tratamento de erros implementado garante que o site funcione adequadamente mesmo quando ocorrem falhas ou quando recursos não estão disponíveis. O sistema inclui:

- **Fallbacks para imagens** que não carregam
- **Fallbacks para fontes** não disponíveis
- **Tratamento de erros JavaScript** com notificações amigáveis
- **Degradação graciosa** para usuários sem JavaScript
- **Sistema offline** com queue de requisições
- **Indicadores visuais** de status e erros

## Componentes do Sistema

### 1. ImageErrorHandler

Gerencia erros de carregamento de imagens com sistema de retry e fallbacks.

#### Funcionalidades:
- **Retry automático**: Tenta recarregar imagens até 2 vezes
- **Placeholder visual**: Mostra imagem de fallback quando falha
- **Indicador de erro**: Adiciona ícone visual de erro
- **Observer de novas imagens**: Monitora imagens adicionadas dinamicamente

#### Uso:
```javascript
// Inicialização automática
const imageHandler = new ImageErrorHandler();

// Aplicar fallback manualmente
imageHandler.applyImageFallback(imgElement);
```

### 2. FontFallbackHandler

Detecta falhas no carregamento de fontes e aplica fallbacks.

#### Funcionalidades:
- **Detecção de suporte**: Verifica Font Loading API
- **Fallback automático**: Aplica fontes seguras quando necessário
- **Indicador visual**: Mostra aviso quando fontes não carregam

#### Configuração:
```javascript
const FALLBACK_CONFIG = {
    fonts: {
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont'],
        fallback: ['Arial', 'Helvetica', 'sans-serif']
    }
};
```

### 3. JavaScriptErrorHandler

Captura e trata erros JavaScript de forma amigável.

#### Funcionalidades:
- **Captura global**: Intercepta todos os erros JS
- **Promises rejeitadas**: Trata erros de async/await
- **Erros de recursos**: Monitora falhas de carregamento
- **Notificações amigáveis**: Mostra mensagens para o usuário
- **Relatórios**: Coleta dados para análise

#### Tipos de erro capturados:
```javascript
{
    type: 'javascript|promise|resource',
    message: 'Descrição do erro',
    filename: 'arquivo.js',
    lineno: 123,
    stack: 'Stack trace',
    timestamp: Date.now()
}
```

### 4. GracefulDegradation

Garante funcionalidade básica sem JavaScript.

#### Funcionalidades:
- **Detecção de JS**: Adiciona classes CSS apropriadas
- **Fallbacks de formulário**: Validação HTML5
- **Navegação básica**: Links funcionais
- **Redução de animações**: Respeita preferências do usuário

### 5. OfflineFallbackHandler

Gerencia funcionalidade offline e queue de requisições.

#### Funcionalidades:
- **Detecção de conexão**: Monitora status online/offline
- **Queue de formulários**: Salva dados quando offline
- **Retry automático**: Processa queue quando online
- **Indicadores visuais**: Mostra status da conexão
- **Cache inteligente**: Usa Service Worker quando disponível

## Configuração e Personalização

### Configurações Globais

```javascript
const FALLBACK_CONFIG = {
    images: {
        placeholder: 'data:image/svg+xml;base64,...',
        errorIcon: 'data:image/svg+xml;base64,...'
    },
    fonts: {
        primary: ['Inter', 'system-ui', 'sans-serif'],
        fallback: ['Arial', 'Helvetica', 'sans-serif']
    },
    colors: {
        primary: '#6366f1',
        fallback: '#007bff'
    }
};
```

### Personalizar Mensagens de Erro

```javascript
// Personalizar notificação de erro
function showCustomError(message) {
    const notification = document.createElement('div');
    notification.className = 'custom-error-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
}
```

### Configurar Queue Offline

```javascript
// Adicionar item à queue offline
offlineHandler.queueApiCall('/api/data', {
    method: 'POST',
    body: JSON.stringify(data)
});

// Verificar status da queue
const status = offlineHandler.getQueueStatus();
console.log(`${status.items} itens na fila`);
```

## Estados Visuais

### Classes CSS Aplicadas

| Classe | Descrição |
|--------|-----------|
| `.js-enabled` | JavaScript está habilitado |
| `.no-js` | JavaScript desabilitado |
| `.font-fallback` | Fontes de fallback em uso |
| `.offline-mode` | Modo offline ativo |
| `.image-error` | Imagem com erro |

### Indicadores Visuais

#### Erro de Imagem
```css
.image-error {
    background-color: #f8f9fa;
    border: 2px dashed #dee2e6;
    min-height: 200px;
}

.image-error-indicator {
    background: rgba(220, 53, 69, 0.9);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
}
```

#### Status Offline
```css
.offline-indicator {
    background: #dc3545;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    position: fixed;
    bottom: 20px;
    left: 20px;
}
```

## Monitoramento e Análise

### Coleta de Métricas

O sistema coleta automaticamente:
- Número de erros por tipo
- Frequência de fallbacks
- Status de conexão
- Performance de retry

### Relatórios de Erro

```javascript
// Obter relatório completo
const errorReport = jsErrorHandler.getErrorReport();

// Estrutura do relatório
{
    errors: [...], // Lista de erros
    summary: {
        total: 10,
        javascript: 5,
        promise: 3,
        resource: 2
    }
}
```

### Envio para Serviços

```javascript
// Configurar envio para serviço de monitoramento
function sendErrorToService(error) {
    if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/errors', JSON.stringify(error));
    }
}
```

## Testes e Validação

### Testar Fallbacks de Imagem

```javascript
// Simular erro de imagem
const img = document.querySelector('img');
img.src = 'invalid-url.jpg';
```

### Testar Modo Offline

```javascript
// Simular offline
Object.defineProperty(navigator, 'onLine', {
    writable: true,
    value: false
});
window.dispatchEvent(new Event('offline'));
```

### Testar sem JavaScript

1. Desabilitar JavaScript no navegador
2. Verificar se conteúdo noscript aparece
3. Testar funcionalidade básica
4. Validar formulários HTML5

## Boas Práticas

### Para Desenvolvedores

1. **Sempre fornecer fallbacks** para recursos críticos
2. **Testar cenários de erro** regularmente
3. **Monitorar métricas** de fallback
4. **Manter mensagens amigáveis** para usuários
5. **Documentar comportamentos** de erro

### Para Usuários

1. **Habilitar JavaScript** para melhor experiência
2. **Manter navegador atualizado**
3. **Verificar conexão** se houver problemas
4. **Reportar erros** persistentes

## Troubleshooting

### Problemas Comuns

#### Imagens não carregam
- Verificar URLs das imagens
- Confirmar permissões de acesso
- Testar conectividade

#### Fontes não aparecem
- Verificar carregamento de arquivos de fonte
- Confirmar CORS headers
- Testar fallbacks

#### JavaScript com erros
- Verificar console do navegador
- Confirmar compatibilidade
- Testar em modo incógnito

### Logs de Debug

```javascript
// Habilitar logs detalhados
localStorage.setItem('debug-errors', 'true');

// Verificar no console
console.log('Error handlers initialized');
```

## Atualizações e Manutenção

### Versioning

O sistema segue versionamento semântico:
- **Major**: Mudanças incompatíveis
- **Minor**: Novas funcionalidades
- **Patch**: Correções de bugs

### Atualizações Recomendadas

1. **Mensal**: Revisar logs de erro
2. **Trimestral**: Atualizar fallbacks
3. **Semestral**: Testar compatibilidade
4. **Anual**: Revisar estratégia completa

---

**Versão**: 1.0.0  
**Última atualização**: 1 de setembro de 2025  
**Compatibilidade**: Todos os navegadores modernos