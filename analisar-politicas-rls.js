const { createClient } = require('@supabase/supabase-js');

// Credenciais do Supabase do projeto
const SUPABASE_URL = 'https://vopekxfyorbuyrvzcshy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGVreGZ5b3JidXlydnpjc2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTkyNjMsImV4cCI6MjA3MzAzNTI2M30.jIQqu4j_0QfPpn67YXHyy760X6Z4wwhuHMj-xK3emP4';

console.log('=== ANÁLISE E AJUSTE DAS POLÍTICAS RLS ===\n');

// Criar cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function analyzeRLSPolicies() {
    console.log('🔍 ANALISANDO POLÍTICAS RLS DAS TABELAS...\n');
    
    const tables = ['services', 'reviews', 'space_photos', 'contact_info', 'featured_videos'];
    
    for (const table of tables) {
        console.log(`📊 TABELA: ${table.toUpperCase()}`);
        
        try {
            // Verificar se RLS está habilitado
            const { data: rlsStatus, error: rlsError } = await supabase.rpc('get_rls_status', {
                table_name: table
            });
            
            if (rlsError) {
                console.log(`   ℹ️  Não foi possível verificar status RLS: ${rlsError.message}`);
            } else {
                console.log(`   RLS Status: ${JSON.stringify(rlsStatus)}`);
            }
            
            // Verificar políticas existentes
            const { data: policies, error: policiesError } = await supabase
                .from('pg_policies')
                .select('*')
                .eq('tablename', table);
            
            if (policiesError) {
                console.log(`   ℹ️  Erro ao buscar políticas: ${policiesError.message}`);
            } else if (policies && policies.length > 0) {
                console.log(`   ✅ ${policies.length} políticas RLS encontradas:`);
                policies.forEach(policy => {
                    console.log(`     - ${policy.policyname}: ${policy.roles.join(', ')} - ${policy.action}`);
                });
            } else {
                console.log(`   ℹ️  Nenhuma política RLS encontrada`);
            }
            
        } catch (error) {
            console.log(`   ❌ Erro ao analisar ${table}: ${error.message}`);
        }
        
        console.log('');
    }
    
    console.log('=== ANÁLISE DAS POLÍTICAS CONCLUÍDA ===\n');
}

async function testAnonymousAccess() {
    console.log('🔍 TESTANDO ACESSO ANÔNIMO...\n');
    
    const tables = ['services', 'reviews', 'space_photos', 'contact_info', 'featured_videos'];
    
    for (const table of tables) {
        console.log(`📊 TABELA: ${table.toUpperCase()}`);
        
        try {
            // Testar leitura anônima
            const { data, error } = await supabase
                .from(table)
                .select('*')
                .limit(1);
            
            if (error) {
                console.log(`   ❌ Acesso negado: ${error.message}`);
                
                // Verificar se é problema de RLS
                if (error.message.includes('row-level security')) {
                    console.log(`   ⚠️  Problema de segurança em nível de linha (RLS)`);
                }
            } else {
                console.log(`   ✅ Acesso permitido: ${data ? data.length : 0} registros`);
            }
            
        } catch (error) {
            console.log(`   ❌ Erro no teste: ${error.message}`);
        }
        
        console.log('');
    }
    
    console.log('=== TESTE DE ACESSO ANÔNIMO CONCLUÍDO ===\n');
}

async function createRLSPolicies() {
    console.log('🔧 CRIANDO POLÍTICAS RLS PARA ACESSO PÚBLICO...\n');
    
    // Como estamos usando credenciais anônimas, vamos verificar se há uma política que permita leitura
    const tables = ['services', 'reviews', 'space_photos', 'contact_info', 'featured_videos'];
    
    for (const table of tables) {
        console.log(`📊 TABELA: ${table.toUpperCase()}`);
        
        try {
            // Testar acesso antes de criar políticas
            const { data: testData, error: testError } = await supabase
                .from(table)
                .select('*')
                .limit(1);
            
            if (testError) {
                console.log(`   ❌ Acesso negado: ${testError.message}`);
                
                // Verificar se podemos criar uma política de leitura pública
                console.log(`   ℹ️  Para corrigir, é necessário criar políticas RLS no painel do Supabase`);
                console.log(`   💡 Sugestão: CREATE POLICY "Leitura pública" ON ${table} FOR SELECT USING (true);`);
            } else {
                console.log(`   ✅ Acesso já permitido`);
            }
            
        } catch (error) {
            console.log(`   ❌ Erro: ${error.message}`);
        }
        
        console.log('');
    }
    
    console.log('=== CRIAÇÃO DE POLÍTICAS SUGERIDA ===\n');
    console.log('Para corrigir os problemas de RLS, execute estas instruções no SQL Editor do Supabase:\n');
    
    tables.forEach(table => {
        console.log(`CREATE POLICY "Permitir leitura pública" ON ${table}`);
        console.log(`FOR SELECT USING (true);`);
        console.log(``);
        console.log(`CREATE POLICY "Permitir inserção administrativa" ON ${table}`);
        console.log(`FOR INSERT WITH CHECK (true);`);
        console.log(``);
    });
    
    console.log('=== FIM DAS SUGESTÕES ===\n');
}

async function verifySiteRequirements() {
    console.log('🔍 VERIFICANDO REQUISITOS DO SITE...\n');
    
    // Verificar se o site pode ler os dados necessários
    const siteQueries = [
        {
            name: 'Serviços ordenados',
            query: () => supabase.from('services').select('id, name, description, price, image_url').order('name')
        },
        {
            name: 'Avaliações recentes',
            query: () => supabase.from('reviews').select('id, name, stars, comment, created_at').order('created_at', { ascending: false })
        },
        {
            name: 'Fotos do espaço',
            query: () => supabase.from('space_photos').select('id, name, data, upload_date').order('upload_date', { ascending: false })
        },
        {
            name: 'Informações de contato',
            query: () => supabase.from('contact_info').select('id, whatsapp_number, contact_email, contact_phone, last_updated').limit(1)
        },
        {
            name: 'Vídeos em destaque',
            query: () => supabase.from('featured_videos').select('id, url, video_id, title, added_date').order('added_date', { ascending: false })
        }
    ];
    
    for (const query of siteQueries) {
        console.log(`🔍 Testando: ${query.name}`);
        
        try {
            const result = await query.query();
            if (result.error) {
                console.log(`   ❌ Erro: ${result.error.message}`);
            } else {
                console.log(`   ✅ Sucesso: ${result.data ? result.data.length : 0} registros`);
            }
        } catch (error) {
            console.log(`   ❌ Erro: ${error.message}`);
        }
        
        console.log('');
    }
    
    console.log('=== VERIFICAÇÃO DOS REQUISITOS CONCLUÍDA ===\n');
}

async function main() {
    console.log('🚀 INICIANDO ANÁLISE COMPLETA DAS POLÍTICAS RLS...\n');
    
    try {
        await analyzeRLSPolicies();
        await testAnonymousAccess();
        await createRLSPolicies();
        await verifySiteRequirements();
        
        console.log('🎉 ANÁLISE CONCLUÍDA!');
        console.log('\n💡 PRÓXIMOS PASSOS:');
        console.log('1. Acesse o painel do Supabase');
        console.log('2. Vá para a seção SQL Editor');
        console.log('3. Execute as instruções CREATE POLICY sugeridas');
        console.log('4. Verifique se o site carrega os dados corretamente');
        
    } catch (error) {
        console.log(`❌ Erro durante a análise: ${error.message}`);
    }
}

// Executar análise
main();