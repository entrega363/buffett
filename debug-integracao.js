const { createClient } = require('@supabase/supabase-js');

// Credenciais do Supabase
const SUPABASE_URL = 'https://vopekxfyorbuyrvzcshy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGVreGZ5b3JidXlydnpjc2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTkyNjMsImV4cCI6MjA3MzAzNTI2M30.jIQqu4j_0QfPpn67YXHyy760X6Z4wwhuHMj-xK3emP4';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function debugSiteIntegration() {
    console.log('=== DEBUG DA INTEGRAÇÃO DO SITE COM O SUPABASE ===\n');
    
    // 1. Verificar se as funções do site estão acessando as tabelas corretas
    console.log('🔍 Verificando acesso às tabelas esperadas pelo site...\n');
    
    // Tabelas que o site provavelmente espera
    const expectedTables = [
        { name: 'services', description: 'Serviços do buffet' },
        { name: 'reviews', description: 'Avaliações dos clientes' },
        { name: 'space_photos', description: 'Fotos do espaço' },
        { name: 'contact_info', description: 'Informações de contato' },
        { name: 'featured_videos', description: 'Vídeos em destaque' }
    ];
    
    for (const table of expectedTables) {
        try {
            console.log(`🔍 Verificando tabela: ${table.name} (${table.description})`);
            const { data, error } = await supabase
                .from(table.name)
                .select('*')
                .limit(1);
            
            if (error) {
                console.log(`❌ Erro: ${error.message}`);
            } else {
                console.log(`✅ Acesso bem-sucedido: ${data.length} registros encontrados`);
                if (data.length > 0) {
                    console.log(`   Estrutura: ${Object.keys(data[0]).join(', ')}`);
                }
            }
            console.log('');
        } catch (error) {
            console.log(`❌ Erro ao acessar ${table.name}: ${error.message}\n`);
        }
    }
    
    // 2. Verificar dados específicos que o site pode esperar
    console.log('🔍 Verificando dados específicos esperados pelo site...\n');
    
    // Verificar se há campos específicos que o site espera
    try {
        console.log('🔍 Verificando estrutura de serviços...');
        const { data: services } = await supabase
            .from('services')
            .select('*')
            .limit(3);
        
        services.forEach((service, index) => {
            console.log(`   Serviço ${index + 1}: ${service.name}`);
            console.log(`   Campos disponíveis: ${Object.keys(service).join(', ')}`);
            
            // Verificar campos específicos que o site pode esperar
            const expectedFields = ['id', 'name', 'description', 'price', 'image_url'];
            expectedFields.forEach(field => {
                if (service[field] === undefined) {
                    console.log(`   ⚠️  Campo ${field} ausente`);
                }
            });
            console.log('');
        });
    } catch (error) {
        console.log(`❌ Erro ao verificar serviços: ${error.message}\n`);
    }
    
    // 3. Verificar permissões e RLS
    console.log('🔍 Verificando permissões e RLS (Row Level Security)...\n');
    
    try {
        // Testar uma operação que requer autenticação
        console.log('🔍 Testando acesso anônimo...');
        const { data, error } = await supabase
            .from('services')
            .select('id, name')
            .limit(1);
        
        if (error && error.code === 'PGRST301') {
            console.log('❌ Acesso negado - pode haver problema com RLS');
        } else if (error) {
            console.log(`❌ Erro de acesso: ${error.message}`);
        } else {
            console.log('✅ Acesso anônimo permitido');
        }
    } catch (error) {
        console.log(`❌ Erro ao verificar permissões: ${error.message}\n`);
    }
    
    // 4. Verificar se há triggers ou funções especiais
    console.log('🔍 Verificando funções e triggers...\n');
    
    try {
        // Testar se há funções RPC que o site pode usar
        console.log('🔍 Procurando por funções RPC...');
        
        // Este teste pode falhar se não tivermos permissão, mas vamos tentar
        console.log('ℹ️  Teste de funções RPC não executado (requer permissões especiais)');
    } catch (error) {
        console.log(`ℹ️  Não foi possível verificar funções RPC: ${error.message}\n`);
    }
    
    console.log('=== DEBUG CONCLUÍDO ===\n');
    
    // 5. Sugestões de correção
    console.log('💡 SUGESTÕES DE CORREÇÃO:\n');
    console.log('1. Verificar se o site está usando as credenciais corretas');
    console.log('2. Confirmar se as chamadas Supabase estão usando o cliente correto');
    console.log('3. Verificar se há erros de CORS no console do navegador');
    console.log('4. Confirmar se as políticas RLS permitem acesso anônimo de leitura');
    console.log('5. Verificar se o site está esperando a estrutura correta dos dados\n');
}

// Executar debug
debugSiteIntegration();