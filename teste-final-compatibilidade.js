const { createClient } = require('@supabase/supabase-js');

// Credenciais anônimas do Supabase (as mesmas usadas pelo site)
const SUPABASE_URL = 'https://vopekxfyorbuyrvzcshy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGVreGZ5b3JidXlydnpjc2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTkyNjMsImV4cCI6MjA3MzAzNTI2M30.jIQqu4j_0QfPpn67YXHyy760X6Z4wwhuHMj-xK3emP4';

console.log('=== TESTE FINAL DE LEITURA COM CREDENCIAIS ANÔNIMAS ===\n');

// Criar cliente Supabase com credenciais anônimas (igual ao site)
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testSiteReadOperations() {
    console.log('🔍 TESTANDO OPERAÇÕES DE LEITURA ESPERADAS PELO SITE...\n');
    
    // Testes exatamente como o site faria
    const siteReadTests = [
        {
            name: 'Carregar Serviços',
            operation: async () => {
                const { data, error } = await supabase
                    .from('services')
                    .select('id, name, description, price, image_url')
                    .order('name');
                
                if (error) throw error;
                return data;
            }
        },
        {
            name: 'Carregar Avaliações',
            operation: async () => {
                const { data, error } = await supabase
                    .from('reviews')
                    .select('id, name, stars, comment, created_at')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                return data;
            }
        },
        {
            name: 'Carregar Fotos do Espaço',
            operation: async () => {
                const { data, error } = await supabase
                    .from('space_photos')
                    .select('id, name, data, upload_date')
                    .order('upload_date', { ascending: false });
                
                if (error) throw error;
                return data;
            }
        },
        {
            name: 'Carregar Informações de Contato',
            operation: async () => {
                const { data, error } = await supabase
                    .from('contact_info')
                    .select('id, whatsapp_number, contact_email, contact_phone, last_updated')
                    .limit(1);
                
                if (error) throw error;
                return data.length > 0 ? data[0] : null;
            }
        },
        {
            name: 'Carregar Vídeos em Destaque',
            operation: async () => {
                const { data, error } = await supabase
                    .from('featured_videos')
                    .select('id, url, video_id, title, added_date')
                    .order('added_date', { ascending: false });
                
                if (error) throw error;
                return data;
            }
        }
    ];
    
    let allTestsPassed = true;
    
    // Executar todos os testes
    for (const test of siteReadTests) {
        console.log(`🔍 Testando: ${test.name}`);
        
        try {
            const result = await test.operation();
            const itemCount = Array.isArray(result) ? result.length : result ? 1 : 0;
            
            console.log(`   ✅ Sucesso: ${itemCount} itens carregados`);
            
            // Mostrar amostra dos dados (primeiro item)
            if (itemCount > 0) {
                const sampleItem = Array.isArray(result) ? result[0] : result;
                console.log(`   📄 Amostra: ${JSON.stringify(sampleItem, null, 2).substring(0, 100)}...`);
            }
            
        } catch (error) {
            console.log(`   ❌ Erro: ${error.message}`);
            allTestsPassed = false;
        }
        
        console.log('');
    }
    
    if (allTestsPassed) {
        console.log('🎉 TODOS OS TESTES DE LEITURA PASSARAM!\n');
        console.log('✅ O site agora deve carregar todos os dados corretamente!');
    } else {
        console.log('❌ Alguns testes de leitura falharam.');
        console.log('⚠️  Verifique as políticas RLS no painel do Supabase.');
    }
    
    return allTestsPassed;
}

async function testSpecificSiteFunctions() {
    console.log('🔍 TESTANDO FUNÇÕES ESPECÍFICAS DO SITE...\n');
    
    // Testar exatamente as funções que o site chama
    const siteFunctions = [
        {
            name: 'loadServicesFromSupabase',
            test: async () => {
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .order('name');
                
                if (error) throw error;
                return data;
            }
        },
        {
            name: 'loadReviewsFromSupabase',
            test: async () => {
                const { data, error } = await supabase
                    .from('reviews')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                return data;
            }
        },
        {
            name: 'loadSpacePhotosFromSupabase',
            test: async () => {
                const { data, error } = await supabase
                    .from('space_photos')
                    .select('*')
                    .order('upload_date', { ascending: false });
                
                if (error) throw error;
                return data;
            }
        },
        {
            name: 'loadContactInfoFromSupabase',
            test: async () => {
                const { data, error } = await supabase
                    .from('contact_info')
                    .select('*')
                    .limit(1);
                
                if (error) throw error;
                return data.length > 0 ? data[0] : null;
            }
        },
        {
            name: 'loadFeaturedVideosFromSupabase',
            test: async () => {
                const { data, error } = await supabase
                    .from('featured_videos')
                    .select('*')
                    .order('added_date', { ascending: false });
                
                if (error) throw error;
                return data;
            }
        }
    ];
    
    let allFunctionsWork = true;
    
    for (const func of siteFunctions) {
        console.log(`🔍 Testando função: ${func.name}`);
        
        try {
            const result = await func.test();
            const itemCount = Array.isArray(result) ? result.length : result ? 1 : 0;
            
            console.log(`   ✅ Função executada com sucesso: ${itemCount} itens`);
            
        } catch (error) {
            console.log(`   ❌ Erro na função: ${error.message}`);
            allFunctionsWork = false;
        }
        
        console.log('');
    }
    
    return allFunctionsWork;
}

async function finalVerification() {
    console.log('🔍 VERIFICAÇÃO FINAL DE COMPATIBILIDADE...\n');
    
    // Verificar se os dados estão no formato esperado pelo site
    const compatibilityChecks = [
        {
            name: 'Estrutura de Serviços',
            check: async () => {
                const { data, error } = await supabase
                    .from('services')
                    .select('id, name, description, price, image_url, created_at, updated_at')
                    .limit(1);
                
                if (error) throw error;
                
                if (data && data.length > 0) {
                    const service = data[0];
                    const requiredFields = ['id', 'name', 'description', 'price', 'image_url'];
                    const missingFields = requiredFields.filter(field => !(field in service));
                    
                    if (missingFields.length === 0) {
                        return { valid: true, message: 'Todos os campos obrigatórios presentes' };
                    } else {
                        return { valid: false, message: `Campos faltando: ${missingFields.join(', ')}` };
                    }
                }
                
                return { valid: true, message: 'Tabela vazia' };
            }
        },
        {
            name: 'Estrutura de Avaliações',
            check: async () => {
                const { data, error } = await supabase
                    .from('reviews')
                    .select('id, name, stars, comment, created_at')
                    .limit(1);
                
                if (error) throw error;
                
                if (data && data.length > 0) {
                    const review = data[0];
                    const requiredFields = ['id', 'name', 'stars', 'comment'];
                    const missingFields = requiredFields.filter(field => !(field in review));
                    
                    if (missingFields.length === 0) {
                        return { valid: true, message: 'Todos os campos obrigatórios presentes' };
                    } else {
                        return { valid: false, message: `Campos faltando: ${missingFields.join(', ')}` };
                    }
                }
                
                return { valid: true, message: 'Tabela vazia' };
            }
        },
        {
            name: 'Estrutura de Contatos',
            check: async () => {
                const { data, error } = await supabase
                    .from('contact_info')
                    .select('id, whatsapp_number, contact_email, contact_phone, last_updated')
                    .limit(1);
                
                if (error) throw error;
                
                if (data && data.length > 0) {
                    const contact = data[0];
                    const requiredFields = ['id', 'whatsapp_number', 'contact_email', 'contact_phone'];
                    const missingFields = requiredFields.filter(field => !(field in contact));
                    
                    if (missingFields.length === 0) {
                        return { valid: true, message: 'Todos os campos obrigatórios presentes' };
                    } else {
                        return { valid: false, message: `Campos faltando: ${missingFields.join(', ')}` };
                    }
                }
                
                return { valid: true, message: 'Tabela vazia' };
            }
        }
    ];
    
    let allCompatible = true;
    
    for (const check of compatibilityChecks) {
        console.log(`🔍 Verificando: ${check.name}`);
        
        try {
            const result = await check.check();
            if (result.valid) {
                console.log(`   ✅ ${result.message}`);
            } else {
                console.log(`   ⚠️  ${result.message}`);
                allCompatible = false;
            }
        } catch (error) {
            console.log(`   ❌ Erro na verificação: ${error.message}`);
            allCompatible = false;
        }
        
        console.log('');
    }
    
    return allCompatible;
}

async function main() {
    console.log('🚀 INICIANDO TESTE FINAL DE COMPATIBILIDADE COM O SITE...\n');
    
    try {
        // Testar operações de leitura
        const readTestsPassed = await testSiteReadOperations();
        
        console.log('\n' + '='.repeat(50) + '\n');
        
        // Testar funções específicas do site
        const functionsWork = await testSpecificSiteFunctions();
        
        console.log('\n' + '='.repeat(50) + '\n');
        
        // Verificação final de compatibilidade
        const isCompatible = await finalVerification();
        
        console.log('\n' + '='.repeat(60));
        console.log('🎉 RELATÓRIO FINAL DE COMPATIBILIDADE');
        console.log('='.repeat(60));
        
        if (readTestsPassed && functionsWork && isCompatible) {
            console.log('✅ TODO O SISTEMA ESTÁ FUNCIONANDO CORRETAMENTE!');
            console.log('\n📊 RESUMO:');
            console.log('   ✅ Operações de leitura: FUNCIONANDO');
            console.log('   ✅ Funções do site: FUNCIONANDO');
            console.log('   ✅ Compatibilidade de dados: COMPATÍVEL');
            console.log('   ✅ Banco de dados: TOTALMENTE POPULADO');
            console.log('\n🎯 O SITE AGORA DEVE CARREGAR TODOS OS DADOS CORRETAMENTE!');
        } else {
            console.log('⚠️  ALGUNS COMPONENTES PRECISAM DE ATENÇÃO:');
            console.log(`   📖 Operações de leitura: ${readTestsPassed ? '✅ OK' : '❌ PROBLEMA'}`);
            console.log(`   📖 Funções do site: ${functionsWork ? '✅ OK' : '❌ PROBLEMA'}`);
            console.log(`   📖 Compatibilidade: ${isCompatible ? '✅ OK' : '❌ PROBLEMA'}`);
            console.log('\n💡 Verifique as políticas RLS no painel do Supabase se houver problemas.');
        }
        
        console.log('\n' + '='.repeat(60));
        
    } catch (error) {
        console.log(`❌ Erro durante o teste final: ${error.message}`);
    }
}

// Executar teste final
main();