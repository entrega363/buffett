// Service Worker para Cache - HatchCanvas Copy
const CACHE_NAME = 'hatchcanvas-copy-v1.0.0';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/assets/css/main.min.css',
    '/assets/css/responsive.min.css',
    '/assets/js/main.min.js',
    '/assets/images/logo.svg',
    '/assets/images/hero-image.jpg',
    '/assets/images/about-image.jpg',
    '/assets/images/favicon.ico'
];

// Instalar Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cache aberto');
                return cache.addAll(CACHE_URLS);
            })
            .then(() => {
                console.log('Service Worker: Todos os arquivos foram cacheados');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Erro ao cachear arquivos', error);
            })
    );
});

// Ativar Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Ativando...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Removendo cache antigo', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Ativado');
            return self.clients.claim();
        })
    );
});

// Interceptar requisições
self.addEventListener('fetch', event => {
    // Apenas interceptar requisições GET
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retornar do cache se disponível
                if (response) {
                    console.log('Service Worker: Servindo do cache', event.request.url);
                    return response;
                }

                // Fazer requisição de rede
                return fetch(event.request)
                    .then(response => {
                        // Verificar se a resposta é válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clonar resposta para cache
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(error => {
                        console.error('Service Worker: Erro na requisição', error);
                        
                        // Retornar página offline para navegação
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Limpar cache quando necessário
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME).then(() => {
            console.log('Service Worker: Cache limpo');
            event.ports[0].postMessage({ success: true });
        });
    }
});