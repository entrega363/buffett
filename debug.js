// Script de depuração para identificar problemas no site do Buffet Sobral

console.log('=== DEBUG DO SISTEMA ===');
console.log('Iniciando diagnóstico...');

// Verificar se o Supabase está carregado corretamente
if (typeof supabase !== 'undefined') {
    console.log('✓ Supabase carregado corretamente');
} else {
    console.error('✗ Supabase não está disponível');
}

// Verificar se os elementos principais existem
const elementosPrincipais = [
    'catalogo',
    'simulador',
    'agenda',
    'avaliacoes',
    'videos'
];

elementosPrincipais.forEach(id => {
    const elemento = document.getElementById(id);
    if (elemento) {
        console.log(`✓ Elemento #${id} encontrado`);
    } else {
        console.error(`✗ Elemento #${id} não encontrado`);
    }
});

// Verificar se as funções principais estão definidas
const funcoesPrincipais = [
    'showTab',
    'addService',
    'shareWhatsApp',
    'generateCalendar'
];

funcoesPrincipais.forEach(nome => {
    if (typeof window[nome] === 'function') {
        console.log(`✓ Função ${nome} definida`);
    } else {
        console.error(`✗ Função ${nome} não definida`);
    }
});

// Verificar se os event listeners estão funcionando
document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ DOMContentLoaded disparado');
    
    // Testar clique em um botão
    const primeiroBotao = document.querySelector('button');
    if (primeiroBotao) {
        console.log('✓ Primeiro botão encontrado:', primeiroBotao.textContent);
    } else {
        console.error('✗ Nenhum botão encontrado');
    }
});

// Verificar conexão com Supabase
async function testarConexaoSupabase() {
    try {
        if (typeof supabase !== 'undefined' && supabase && typeof supabase.from === 'function') {
            // Tentar uma operação simples
            const { data, error } = await supabase
                .from('services')
                .select('id')
                .limit(1);
            
            if (error) {
                console.error('✗ Erro na conexão com Supabase:', error);
            } else {
                console.log('✓ Conexão com Supabase estabelecida com sucesso');
            }
        } else {
            console.error('✗ Cliente Supabase não configurado corretamente');
        }
    } catch (erro) {
        console.error('✗ Erro ao testar conexão com Supabase:', erro);
    }
}

// Executar teste de conexão após um pequeno delay
setTimeout(testarConexaoSupabase, 2000);

console.log('=== FIM DO DIAGNÓSTICO ===');