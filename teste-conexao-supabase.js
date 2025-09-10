const { createClient } = require('@supabase/supabase-js');

// Credenciais do Supabase fornecidas
const SUPABASE_URL = 'https://vopekxfyorbuyrvzcshy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGVreGZ5b3JidXlydnpjc2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTkyNjMsImV4cCI6MjA3MzAzNTI2M30.jIQqu4j_0QfPpn67YXHyy760X6Z4wwhuHMj-xK3emP4';

console.log('=== TESTE DE CONEXÃO DIRETA COM SUPABASE ===\n');

// Criar cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testConnection() {
    console.log('🔍 Testando conexão com Supabase...');
    console.log(`🔗 URL: ${SUPABASE_URL}\n`);
    
    try {
        // Testar conexão básica - listar tabelas
        console.log('📋 Listando tabelas disponíveis...\n');
        
        // Testar acesso a cada tabela esperada
        const tables = [
            'services',
            'reviews', 
            'space_photos',
            'contact_info',
            'featured_videos'
        ];
        
        for (const table of tables) {
            try {
                console.log(`🔍 Testando tabela: ${table}`);
                const { data, error } = await supabase
                    .from(table)
                    .select('*')
                    .limit(1);
                
                if (error) {
                    console.log(`❌ Erro na tabela ${table}: ${error.message}`);
                } else {
                    console.log(`✅ Tabela ${table}: ${data ? data.length : 0} registros encontrados`);
                    if (data && data.length > 0) {
                        console.log(`   Primeiro registro:`, JSON.stringify(data[0], null, 2));
                    }
                }
                console.log('');
            } catch (tableError) {
                console.log(`❌ Erro ao acessar tabela ${table}: ${tableError.message}\n`);
            }
        }
        
        // Testar estrutura do banco
        console.log('🏗️  Verificando estrutura do banco de dados...\n');
        
        try {
            // Listar todas as tabelas
            const { data: tables, error: tablesError } = await supabase
                .from('information_schema.tables')
                .select('table_name')
                .eq('table_schema', 'public');
            
            if (tablesError) {
                console.log(`❌ Erro ao listar tabelas: ${tablesError.message}\n`);
            } else {
                console.log(`✅ Tabelas encontradas no schema public:`);
                tables.forEach(table => {
                    console.log(`   - ${table.table_name}`);
                });
                console.log('');
            }
        } catch (schemaError) {
            console.log(`❌ Erro ao verificar schema: ${schemaError.message}\n`);
        }
        
        console.log('✅ Teste de conexão concluído!\n');
        
    } catch (error) {
        console.log(`❌ Erro na conexão: ${error.message}\n`);
        console.log('💡 Possíveis soluções:');
        console.log('   1. Verificar se a URL do Supabase está correta');
        console.log('   2. Verificar se a chave de acesso está correta');
        console.log('   3. Verificar se há restrições de CORS');
        console.log('   4. Verificar se o projeto está ativo no Supabase\n');
    }
}

// Executar teste
testConnection();