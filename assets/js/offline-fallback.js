// Sistema de Fallback Offline - HatchCanvas Copy

class OfflineFallbackHandler {
    constructor() {
        this.isOnline = navigator.onLine;
        this.offlineQueue = [];
        this.retryInterval = 5000; // 5 segundos
        this.maxRetries = 3;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkInitialState();
        this.setupOfflineIndicator();
        this.setupFormQueue();
    }

    setupEventListeners() {
        window.addEventListener('online', this.handleOnline.bind(this));
        window.addEventListener('offline', this.handleOffline.bind(this));
        
        // Interceptar requisições fetch para queue offline
        this.interceptFetch();
    }

    checkInitialState() {
        if (!this.isOnline) {
            this.handleOffline();
        }
    }

    handleOnline() {
        console.log('Conexão restaurada');
        this.isOnline = true;
        this.hideOfflineIndicator();
        this.processOfflineQueue();
        this.showOnlineNotification();
    }

    handleOffline() {
        console.log('Conexão perdida');
        this.isOnline = false;
        this.showOfflineIndicator();
        this.enableOfflineMode();
    }

    showOfflineIndicator() {
        // Remover indicador existente
        const existing = document.querySelector('.offline-indicator');
        if (existing) existing.remove();

        const indicator = document.createElement('div');
        indicator.className = 'offline-indicator';
        indicator.innerHTML = `
            <span>📡 Você está offline</span>
            <button onclick="window.location.reload()" class="btn-retry">
                Tentar novamente
            </button>
        `;
        
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
            z-index: 10000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            animation: slideInUp 0.3s ease-out;
        `;

        const retryBtn = indicator.querySelector('.btn-retry');
        retryBtn.style.cssText = `
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            transition: background 0.2s;
        `;

        document.body.appendChild(indicator);
    }

    hideOfflineIndicator() {
        const indicator = document.querySelector('.offline-indicator');
        if (indicator) {
            indicator.style.animation = 'slideOutDown 0.3s ease-in';
            setTimeout(() => indicator.remove(), 300);
        }
    }

    showOnlineNotification() {
        const notification = document.createElement('div');
        notification.className = 'online-notification';
        notification.innerHTML = `
            <span>✅ Conexão restaurada</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            z-index: 10000;
            animation: slideInUp 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    enableOfflineMode() {
        document.body.classList.add('offline-mode');
        
        // Desabilitar formulários que precisam de conexão
        const forms = document.querySelectorAll('form[data-requires-online]');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, button');
            inputs.forEach(input => {
                input.disabled = true;
            });
            
            // Adicionar mensagem de offline
            if (!form.querySelector('.offline-message')) {
                const message = document.createElement('div');
                message.className = 'offline-message';
                message.innerHTML = `
                    <p>⚠️ Este formulário requer conexão com a internet.</p>
                    <p>Seus dados serão enviados quando a conexão for restaurada.</p>
                `;
                message.style.cssText = `
                    background: #fff3cd;
                    border: 1px solid #ffeaa7;
                    color: #856404;
                    padding: 12px;
                    border-radius: 4px;
                    margin: 10px 0;
                    font-size: 14px;
                `;
                form.insertBefore(message, form.firstChild);
            }
        });
    }

    setupFormQueue() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.isOnline) {
                    e.preventDefault();
                    this.queueFormSubmission(form);
                }
            });
        });
    }

    queueFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const queueItem = {
            id: Date.now(),
            type: 'form',
            url: form.action || window.location.href,
            method: form.method || 'POST',
            data: data,
            timestamp: Date.now(),
            retries: 0
        };
        
        this.offlineQueue.push(queueItem);
        this.saveQueueToStorage();
        
        this.showQueuedMessage();
    }

    showQueuedMessage() {
        const message = document.createElement('div');
        message.className = 'queued-message';
        message.innerHTML = `
            <span>📤 Dados salvos localmente</span>
            <p>Serão enviados quando a conexão for restaurada</p>
        `;
        
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #17a2b8;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            max-width: 300px;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => message.remove(), 300);
        }, 4000);
    }

    async processOfflineQueue() {
        if (this.offlineQueue.length === 0) return;

        console.log(`Processando ${this.offlineQueue.length} itens da fila offline`);

        const itemsToProcess = [...this.offlineQueue];
        this.offlineQueue = [];

        for (const item of itemsToProcess) {
            try {
                await this.processQueueItem(item);
                console.log('Item processado com sucesso:', item.id);
            } catch (error) {
                console.error('Erro ao processar item da fila:', error);
                
                if (item.retries < this.maxRetries) {
                    item.retries++;
                    this.offlineQueue.push(item);
                } else {
                    console.error('Item descartado após máximo de tentativas:', item.id);
                }
            }
        }

        this.saveQueueToStorage();
    }

    async processQueueItem(item) {
        switch (item.type) {
            case 'form':
                return this.submitQueuedForm(item);
            case 'api':
                return this.makeQueuedApiCall(item);
            default:
                throw new Error(`Tipo de item desconhecido: ${item.type}`);
        }
    }

    async submitQueuedForm(item) {
        const response = await fetch(item.url, {
            method: item.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item.data)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return response;
    }

    async makeQueuedApiCall(item) {
        const response = await fetch(item.url, {
            method: item.method,
            headers: item.headers || {},
            body: item.data ? JSON.stringify(item.data) : undefined
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return response;
    }

    saveQueueToStorage() {
        try {
            localStorage.setItem('offlineQueue', JSON.stringify(this.offlineQueue));
        } catch (error) {
            console.warn('Não foi possível salvar fila offline:', error);
        }
    }

    loadQueueFromStorage() {
        try {
            const stored = localStorage.getItem('offlineQueue');
            if (stored) {
                this.offlineQueue = JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Não foi possível carregar fila offline:', error);
            this.offlineQueue = [];
        }
    }

    interceptFetch() {
        const originalFetch = window.fetch;
        
        window.fetch = async (...args) => {
            try {
                return await originalFetch(...args);
            } catch (error) {
                if (!this.isOnline) {
                    console.log('Requisição falhou - modo offline ativo');
                    
                    // Tentar buscar no cache do Service Worker
                    if ('caches' in window) {
                        const cache = await caches.open('hatchcanvas-copy-v1.0.0');
                        const cachedResponse = await cache.match(args[0]);
                        
                        if (cachedResponse) {
                            console.log('Servindo do cache:', args[0]);
                            return cachedResponse;
                        }
                    }
                }
                
                throw error;
            }
        };
    }

    // Método público para adicionar itens à fila
    queueApiCall(url, options = {}) {
        const queueItem = {
            id: Date.now(),
            type: 'api',
            url: url,
            method: options.method || 'GET',
            headers: options.headers || {},
            data: options.body,
            timestamp: Date.now(),
            retries: 0
        };
        
        this.offlineQueue.push(queueItem);
        this.saveQueueToStorage();
        
        return queueItem.id;
    }

    // Método para verificar status da fila
    getQueueStatus() {
        return {
            items: this.offlineQueue.length,
            isOnline: this.isOnline,
            queue: this.offlineQueue.map(item => ({
                id: item.id,
                type: item.type,
                timestamp: item.timestamp,
                retries: item.retries
            }))
        };
    }
}

// CSS adicional para animações
const additionalStyles = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(100%);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .offline-mode {
        filter: grayscale(20%);
    }
    
    .offline-mode .btn:not(.btn-retry) {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Inicializar handler offline
let offlineHandler;

function initOfflineFallback() {
    try {
        offlineHandler = new OfflineFallbackHandler();
        console.log('Sistema de fallback offline inicializado');
    } catch (error) {
        console.error('Erro ao inicializar fallback offline:', error);
    }
}

// Executar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOfflineFallback);
} else {
    initOfflineFallback();
}

// Exportar para uso global
window.OfflineFallbackHandler = OfflineFallbackHandler;
window.offlineHandler = offlineHandler;

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OfflineFallbackHandler;
}