// Configuração de Performance - HatchCanvas Copy

// Configurações de otimização
const PERFORMANCE_CONFIG = {
    // Lazy loading
    lazyLoading: {
        enabled: true,
        rootMargin: '50px',
        threshold: 0.1,
        placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhcnJlZ2FuZG8uLi48L3RleHQ+PC9zdmc+'
    },
    
    // Preload de recursos críticos
    preload: {
        css: [
            'assets/css/main.min.css',
            'assets/css/responsive.min.css'
        ],
        js: [
            'assets/js/main.min.js'
        ],
        images: [
            'assets/images/logo.svg',
            'assets/images/hero-image.jpg'
        ]
    },
    
    // Configurações de cache
    cache: {
        version: '1.0.0',
        staticAssets: 31536000, // 1 ano
        dynamicContent: 3600,   // 1 hora
        images: 2592000         // 30 dias
    },
    
    // Métricas de performance
    metrics: {
        enabled: true,
        endpoint: '/api/metrics',
        sampleRate: 0.1 // 10% dos usuários
    }
};

// Implementar lazy loading para imagens
function initLazyLoading() {
    if (!PERFORMANCE_CONFIG.lazyLoading.enabled) return;
    
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: PERFORMANCE_CONFIG.lazyLoading.rootMargin,
            threshold: PERFORMANCE_CONFIG.lazyLoading.threshold
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores sem suporte
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
        });
    }
}

// Preload de recursos críticos
function preloadCriticalResources() {
    const { css, js, images } = PERFORMANCE_CONFIG.preload;
    
    // Preload CSS
    css.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
    
    // Preload JavaScript
    js.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Preload imagens críticas
    images.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Registrar Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registrado:', registration);
                })
                .catch(error => {
                    console.log('Erro ao registrar Service Worker:', error);
                });
        });
    }
}

// Coletar métricas de performance
function collectPerformanceMetrics() {
    if (!PERFORMANCE_CONFIG.metrics.enabled) return;
    if (Math.random() > PERFORMANCE_CONFIG.metrics.sampleRate) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const paintData = performance.getEntriesByType('paint');
            
            const metrics = {
                // Core Web Vitals
                fcp: paintData.find(entry => entry.name === 'first-contentful-paint')?.startTime,
                lcp: getLCP(),
                cls: getCLS(),
                fid: getFID(),
                
                // Métricas de navegação
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                
                // Informações do usuário
                userAgent: navigator.userAgent,
                connection: navigator.connection?.effectiveType,
                timestamp: Date.now()
            };
            
            // Enviar métricas (implementar endpoint)
            sendMetrics(metrics);
        }, 0);
    });
}

// Obter Largest Contentful Paint
function getLCP() {
    return new Promise(resolve => {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver(list => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                resolve(lastEntry.startTime);
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } else {
            resolve(null);
        }
    });
}

// Obter Cumulative Layout Shift
function getCLS() {
    return new Promise(resolve => {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const observer = new PerformanceObserver(list => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                resolve(clsValue);
            });
            observer.observe({ entryTypes: ['layout-shift'] });
        } else {
            resolve(null);
        }
    });
}

// Obter First Input Delay
function getFID() {
    return new Promise(resolve => {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver(list => {
                for (const entry of list.getEntries()) {
                    resolve(entry.processingStart - entry.startTime);
                    break;
                }
            });
            observer.observe({ entryTypes: ['first-input'] });
        } else {
            resolve(null);
        }
    });
}

// Enviar métricas para servidor
function sendMetrics(metrics) {
    if (navigator.sendBeacon) {
        navigator.sendBeacon(
            PERFORMANCE_CONFIG.metrics.endpoint,
            JSON.stringify(metrics)
        );
    } else {
        fetch(PERFORMANCE_CONFIG.metrics.endpoint, {
            method: 'POST',
            body: JSON.stringify(metrics),
            headers: {
                'Content-Type': 'application/json'
            },
            keepalive: true
        }).catch(error => {
            console.warn('Erro ao enviar métricas:', error);
        });
    }
}

// Otimizar imagens baseado na conexão
function optimizeForConnection() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        const slowConnections = ['slow-2g', '2g', '3g'];
        
        if (slowConnections.includes(connection.effectiveType)) {
            // Reduzir qualidade de imagens para conexões lentas
            document.documentElement.classList.add('slow-connection');
        }
    }
}

// Inicializar otimizações
function initPerformanceOptimizations() {
    preloadCriticalResources();
    initLazyLoading();
    registerServiceWorker();
    collectPerformanceMetrics();
    optimizeForConnection();
    
    console.log('Otimizações de performance inicializadas');
}

// Executar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
} else {
    initPerformanceOptimizations();
}

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PERFORMANCE_CONFIG;
}