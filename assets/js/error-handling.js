// Sistema de Tratamento de Erros e Fallbacks - HatchCanvas Copy

// Configurações de fallback
const FALLBACK_CONFIG = {
    images: {
        placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1IiBzdHJva2U9IiNkZGQiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2VtIG7Do28gZGlzcG9uw612ZWw8L3RleHQ+PC9zdmc+',
        errorIcon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiIGZpbGw9IiNmNTk2MDAiLz48L3N2Zz4='
    },
    fonts: {
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        fallback: ['Arial', 'Helvetica', 'sans-serif']
    },
    colors: {
        primary: '#6366f1',
        fallback: '#007bff'
    }
};

// Sistema de tratamento de erros para imagens
class ImageErrorHandler {
    constructor() {
        this.retryAttempts = 2;
        this.retryDelay = 1000;
        this.init();
    }

    init() {
        // Interceptar erros de imagem globalmente
        document.addEventListener('error', this.handleImageError.bind(this), true);
        
        // Processar imagens existentes
        this.processExistingImages();
        
        // Observer para novas imagens
        this.observeNewImages();
    }

    handleImageError(event) {
        const img = event.target;
        
        if (img.tagName !== 'IMG') return;
        
        // Evitar loop infinito
        if (img.dataset.errorHandled) return;
        
        console.warn('Erro ao carregar imagem:', img.src);
        
        // Tentar recarregar a imagem
        this.retryImageLoad(img);
    }

    async retryImageLoad(img) {
        const originalSrc = img.src;
        const retryCount = parseInt(img.dataset.retryCount || '0');
        
        if (retryCount < this.retryAttempts) {
            img.dataset.retryCount = (retryCount + 1).toString();
            
            // Aguardar antes de tentar novamente
            await this.delay(this.retryDelay);
            
            // Tentar recarregar
            img.src = originalSrc + '?retry=' + Date.now();
        } else {
            // Usar fallback após esgotar tentativas
            this.applyImageFallback(img);
        }
    }

    applyImageFallback(img) {
        img.dataset.errorHandled = 'true';
        
        // Aplicar placeholder
        img.src = FALLBACK_CONFIG.images.placeholder;
        img.alt = img.alt || 'Imagem não disponível';
        
        // Adicionar classe de erro
        img.classList.add('image-error');
        
        // Adicionar indicador visual de erro
        this.addErrorIndicator(img);
        
        console.log('Fallback aplicado para imagem:', img.dataset.originalSrc || 'unknown');
    }

    addErrorIndicator(img) {
        const container = img.parentElement;
        
        // Criar indicador de erro se não existir
        if (!container.querySelector('.image-error-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'image-error-indicator';
            indicator.innerHTML = `
                <img src="${FALLBACK_CONFIG.images.errorIcon}" alt="Erro" width="24" height="24">
                <span>Imagem não disponível</span>
            `;
            
            // Posicionar o indicador
            container.style.position = 'relative';
            indicator.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 5px;
                z-index: 10;
            `;
            
            container.appendChild(indicator);
        }
    }

    processExistingImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Salvar src original
            if (img.src && !img.dataset.originalSrc) {
                img.dataset.originalSrc = img.src;
            }
            
            // Verificar se a imagem já falhou
            if (img.complete && img.naturalWidth === 0) {
                this.applyImageFallback(img);
            }
        });
    }

    observeNewImages() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        const images = node.tagName === 'IMG' ? [node] : node.querySelectorAll('img');
                        images.forEach(img => {
                            if (img.src && !img.dataset.originalSrc) {
                                img.dataset.originalSrc = img.src;
                            }
                        });
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Sistema de fallback para fontes
class FontFallbackHandler {
    constructor() {
        this.init();
    }

    init() {
        this.detectFontSupport();
        this.applyFontFallbacks();
    }

    async detectFontSupport() {
        if (!('fonts' in document)) {
            console.warn('Font Loading API não suportada, usando fallbacks');
            this.applyFontFallbacks();
            return;
        }

        try {
            // Tentar carregar fonte principal
            await document.fonts.load('1em Inter');
            
            // Verificar se a fonte foi carregada
            const fontFace = [...document.fonts].find(font => 
                font.family.includes('Inter')
            );
            
            if (!fontFace || fontFace.status !== 'loaded') {
                console.warn('Fonte Inter não carregada, usando fallback');
                this.applyFontFallbacks();
            }
        } catch (error) {
            console.error('Erro ao carregar fontes:', error);
            this.applyFontFallbacks();
        }
    }

    applyFontFallbacks() {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --font-family-primary: ${FALLBACK_CONFIG.fonts.fallback.join(', ')};
            }
            
            body, h1, h2, h3, h4, h5, h6, p, span, div {
                font-family: ${FALLBACK_CONFIG.fonts.fallback.join(', ')} !important;
            }
        `;
        document.head.appendChild(style);
        
        document.body.classList.add('font-fallback');
    }
}

// Sistema de tratamento de erros JavaScript
class JavaScriptErrorHandler {
    constructor() {
        this.errors = [];
        this.maxErrors = 50;
        this.init();
    }

    init() {
        // Capturar erros JavaScript
        window.addEventListener('error', this.handleError.bind(this));
        
        // Capturar erros de Promise rejeitadas
        window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
        
        // Capturar erros de recursos
        window.addEventListener('error', this.handleResourceError.bind(this), true);
    }

    handleError(event) {
        const error = {
            type: 'javascript',
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            stack: event.error?.stack,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        this.logError(error);
        this.showUserFriendlyError();
    }

    handlePromiseRejection(event) {
        const error = {
            type: 'promise',
            message: event.reason?.message || 'Promise rejeitada',
            stack: event.reason?.stack,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        this.logError(error);
        
        // Prevenir que o erro apareça no console
        event.preventDefault();
    }

    handleResourceError(event) {
        const target = event.target;
        
        if (target !== window && target.tagName) {
            const error = {
                type: 'resource',
                element: target.tagName,
                source: target.src || target.href,
                message: `Falha ao carregar ${target.tagName}`,
                timestamp: Date.now(),
                url: window.location.href
            };
            
            this.logError(error);
        }
    }

    logError(error) {
        // Adicionar à lista de erros
        this.errors.push(error);
        
        // Limitar número de erros armazenados
        if (this.errors.length > this.maxErrors) {
            this.errors.shift();
        }
        
        // Log no console para desenvolvimento
        console.error('Erro capturado:', error);
        
        // Enviar para serviço de monitoramento (implementar se necessário)
        this.sendErrorToService(error);
    }

    showUserFriendlyError() {
        // Mostrar notificação amigável apenas uma vez
        if (document.querySelector('.error-notification')) return;
        
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <div class="error-content">
                <strong>Ops! Algo deu errado</strong>
                <p>Encontramos um pequeno problema. Tente recarregar a página.</p>
                <button onclick="window.location.reload()" class="btn btn-primary btn-sm">
                    Recarregar Página
                </button>
                <button onclick="this.parentElement.parentElement.remove()" class="btn btn-secondary btn-sm">
                    Fechar
                </button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 350px;
            font-family: Arial, sans-serif;
        `;
        
        document.body.appendChild(notification);
        
        // Remover automaticamente após 10 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }

    sendErrorToService(error) {
        // Implementar envio para serviço de monitoramento
        // Por exemplo: Sentry, LogRocket, etc.
        
        if (navigator.sendBeacon) {
            const data = JSON.stringify(error);
            navigator.sendBeacon('/api/errors', data);
        }
    }

    getErrorReport() {
        return {
            errors: this.errors,
            summary: {
                total: this.errors.length,
                javascript: this.errors.filter(e => e.type === 'javascript').length,
                promise: this.errors.filter(e => e.type === 'promise').length,
                resource: this.errors.filter(e => e.type === 'resource').length
            }
        };
    }
}

// Sistema de degradação graciosa para JavaScript desabilitado
class GracefulDegradation {
    constructor() {
        this.init();
    }

    init() {
        // Adicionar classe indicando que JS está habilitado
        document.documentElement.classList.add('js-enabled');
        
        // Remover elementos que dependem de JS
        this.handleNoScriptElements();
        
        // Configurar fallbacks para funcionalidades JS
        this.setupFallbacks();
    }

    handleNoScriptElements() {
        // Mostrar conteúdo alternativo para usuários sem JS
        const noscriptElements = document.querySelectorAll('noscript');
        noscriptElements.forEach(element => {
            // Processar conteúdo noscript se necessário
        });
    }

    setupFallbacks() {
        // Fallback para formulários
        this.setupFormFallbacks();
        
        // Fallback para navegação
        this.setupNavigationFallbacks();
        
        // Fallback para animações
        this.setupAnimationFallbacks();
    }

    setupFormFallbacks() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            // Adicionar validação HTML5 como fallback
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                if (input.name === 'email' && !input.type) {
                    input.type = 'email';
                }
                if (input.hasAttribute('data-required')) {
                    input.required = true;
                }
            });
        });
    }

    setupNavigationFallbacks() {
        // Garantir que links de navegação funcionem sem JS
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                // Adicionar ID único se não existir
                if (!target.id) {
                    target.id = href.substring(1);
                }
            }
        });
    }

    setupAnimationFallbacks() {
        // Reduzir animações para usuários com preferência
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Inicializar sistemas de tratamento de erros
function initErrorHandling() {
    try {
        new ImageErrorHandler();
        new FontFallbackHandler();
        new JavaScriptErrorHandler();
        new GracefulDegradation();
        
        console.log('Sistemas de tratamento de erros inicializados');
    } catch (error) {
        console.error('Erro ao inicializar tratamento de erros:', error);
    }
}

// Executar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initErrorHandling);
} else {
    initErrorHandling();
}

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ImageErrorHandler,
        FontFallbackHandler,
        JavaScriptErrorHandler,
        GracefulDegradation,
        FALLBACK_CONFIG
    };
}