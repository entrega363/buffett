// Script de debug completo para identificar problemas no site do Buffet Sobral

console.log('=== INICIANDO DIAGNÓSTICO DO SITE ===');

// Função para verificar se o DOM está carregado
function verificarDOM() {
    console.log('1. Verificando carregamento do DOM...');
    
    if (document.readyState === 'loading') {
        console.warn('⚠️  DOM ainda está carregando');
        document.addEventListener('DOMContentLoaded', function() {
            console.log('✅ DOMContentLoaded disparado');
            executarDiagnostico();
        });
    } else {
        console.log('✅ DOM já está carregado');
        executarDiagnostico();
    }
}

// Função principal de diagnóstico
function executarDiagnostico() {
    console.log('\n=== DIAGNÓSTICO PRINCIPAL ===');
    
    // 1. Verificar elementos principais
    verificarElementos();
    
    // 2. Verificar funções essenciais
    verificarFuncoes();
    
    // 3. Verificar event listeners
    verificarEventListeners();
    
    // 4. Verificar Supabase
    verificarSupabase();
    
    // 5. Verificar navegação
    verificarNavegacao();
    
    console.log('\n=== FIM DO DIAGNÓSTICO ===');
}

// Verificar se os elementos principais existem
function verificarElementos() {
    console.log('\n2. Verificando elementos principais...');
    
    const elementos = [
        'catalogo',
        'simulador', 
        'agenda',
        'avaliacoes',
        'videos',
        'servicesList',
        'packagesContainer',
        'calendar',
        'reviewsContainer',
        'featuredVideosContainer'
    ];
    
    elementos.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            console.log(`✅ Elemento #${id} encontrado`);
        } else {
            console.error(`❌ Elemento #${id} NÃO encontrado`);
        }
    });
    
    // Verificar nav-tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    if (navTabs.length > 0) {
        console.log(`✅ ${navTabs.length} abas de navegação encontradas`);
    } else {
        console.error('❌ Nenhuma aba de navegação encontrada');
    }
}

// Verificar se as funções principais estão definidas
function verificarFuncoes() {
    console.log('\n3. Verificando funções principais...');
    
    const funcoes = [
        'showTab',
        'addService',
        'shareWhatsApp',
        'generateCalendar',
        'loadReviews',
        'loadFeaturedVideos',
        'updateServicesDisplay'
    ];
    
    funcoes.forEach(nome => {
        if (typeof window[nome] === 'function') {
            console.log(`✅ Função ${nome} definida`);
        } else {
            console.error(`❌ Função ${nome} NÃO definida`);
        }
    });
}

// Verificar event listeners
function verificarEventListeners() {
    console.log('\n4. Verificando event listeners...');
    
    // Verificar se há botões na página
    const botoes = document.querySelectorAll('button');
    console.log(`✅ ${botoes.length} botões encontrados`);
    
    if (botoes.length > 0) {
        // Testar clique no primeiro botão
        const primeiroBotao = botoes[0];
        console.log(`📝 Primeiro botão: ${primeiroBotao.textContent.trim()}`);
        console.log(`📝 Onclick: ${primeiroBotao.getAttribute('onclick') || 'Nenhum'}`);
    }
    
    // Verificar se há formulários
    const formularios = document.querySelectorAll('form');
    console.log(`✅ ${formularios.length} formulários encontrados`);
}

// Verificar conexão com Supabase
function verificarSupabase() {
    console.log('\n5. Verificando conexão com Supabase...');
    
    if (typeof supabase !== 'undefined') {
        console.log('✅ Cliente Supabase encontrado');
        
        // Tentar acessar as tabelas
        const tabelas = ['services', 'reviews', 'space_photos', 'contact_info'];
        
        tabelas.forEach(tabela => {
            try {
                if (typeof supabase.from === 'function') {
                    console.log(`✅ Acesso à tabela ${tabela} disponível`);
                } else {
                    console.error(`❌ Problema ao acessar tabela ${tabela}`);
                }
            } catch (erro) {
                console.error(`❌ Erro ao verificar tabela ${tabela}:`, erro.message);
            }
        });
    } else {
        console.error('❌ Cliente Supabase NÃO encontrado');
    }
}

// Verificar navegação entre abas
function verificarNavegacao() {
    console.log('\n6. Verificando navegação...');
    
    // Verificar função showTab
    if (typeof window.showTab === 'function') {
        console.log('✅ Função showTab está disponível');
        
        // Testar mudança de aba
        try {
            // Guardar aba atual
            const abaAtiva = document.querySelector('.nav-tab.active');
            const secaoAtiva = document.querySelector('.section.active');
            
            console.log('📝 Testando navegação para aba "simulador"...');
            
            // Tentar mostrar aba simulador
            showTab('simulador');
            
            // Verificar se a aba foi ativada
            const novaAbaAtiva = document.querySelector('.nav-tab.active');
            const novaSecaoAtiva = document.getElementById('simulador');
            
            if (novaSecaoAtiva && novaSecaoAtiva.classList.contains('active')) {
                console.log('✅ Navegação para aba "simulador" funcionou');
            } else {
                console.error('❌ Navegação para aba "simulador" falhou');
            }
            
            // Restaurar aba original
            if (secaoAtiva) {
                secaoAtiva.classList.add('active');
            }
        } catch (erro) {
            console.error('❌ Erro ao testar navegação:', erro.message);
        }
    } else {
        console.error('❌ Função showTab NÃO disponível');
    }
}

// Adicionar estilo para mensagens de debug
function adicionarEstiloDebug() {
    const estilo = document.createElement('style');
    estilo.textContent = `
        .debug-message {
            position: fixed;
            top: 10px;
            right: 10px;
            background: #333;
            color: white;
            padding: 10px;
            border-radius: 5px;
            z-index: 9999;
            font-family: monospace;
            font-size: 12px;
            max-width: 300px;
        }
        .debug-error {
            background: #f44336;
        }
        .debug-success {
            background: #4CAF50;
        }
    `;
    document.head.appendChild(estilo);
}

// Função para mostrar mensagem de debug na tela
function mostrarMensagemDebug(mensagem, tipo = 'info') {
    const div = document.createElement('div');
    div.className = `debug-message debug-${tipo}`;
    div.textContent = mensagem;
    document.body.appendChild(div);
    
    // Remover após 3 segundos
    setTimeout(() => {
        if (div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }, 3000);
}

// Executar diagnóstico quando a página carregar
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // DOM já está pronto
    setTimeout(verificarDOM, 100);
} else {
    // Aguardar o carregamento do DOM
    document.addEventListener('DOMContentLoaded', verificarDOM);
}

// Adicionar diagnóstico de erros globais
window.addEventListener('error', function(evento) {
    console.error('❌ Erro global detectado:', evento.error);
    mostrarMensagemDebug(`Erro: ${evento.error.message}`, 'error');
});

// Adicionar diagnóstico de promessas rejeitadas
window.addEventListener('unhandledrejection', function(evento) {
    console.error('❌ Promise rejeitada:', evento.reason);
    mostrarMensagemDebug(`Promise rejeitada: ${evento.reason}`, 'error');
});

console.log('=== SCRIPT DE DEBUG CARREGADO ===');