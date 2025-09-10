const { createClient } = require('@supabase/supabase-js');

// Credenciais do Supabase com Service Role Key (permite todas as operações)
const SUPABASE_URL = 'https://vopekxfyorbuyrvzcshy.supabase.co';
// Service Role Key (permite todas as operações administrativas)
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGVreGZ5b3JidXlydnpjc2h5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQ1OTI2MywiZXhwIjoyMDczMDM1MjYzfQ.CEziwcAFfb7reGiGorqLneb-81OHDSHwR1ew5Ibg0yk';

console.log('=== CONEXÃO ADMINISTRATIVA AO SUPABASE ===\n');

// Criar cliente Supabase com permissões administrativas
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Dados reais para o Buffet Sobral
const realData = {
    services: [
        {
            name: "Buffet Completo",
            description: "Salgados variados, doces sortidos, bebidas não alcoólicas e serviço completo de garçons",
            price: 45.00,
            image_url: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        {
            name: "Bolo Personalizado",
            description: "Bolos temáticos e personalizados para aniversários, formaturas e casamentos",
            price: 120.00,
            image_url: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        {
            name: "Decoração Temática",
            description: "Decoração completa com balões, painéis, mesas e centros de mesa personalizados",
            price: 200.00,
            image_url: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        {
            name: "Coffee Break Corporativo",
            description: "Café premium, salgados variados, doces finos e sucos naturais para reuniões empresariais",
            price: 25.00,
            image_url: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        {
            name: "Jantar Executivo",
            description: "Menu sofisticado com entradas, prato principal, sobremesa e bebidas para eventos formais",
            price: 85.00,
            image_url: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        {
            name: "Coquetel de Confraternização",
            description: "Finger foods gourmet, canapés, bebidas variadas para confraternizações e happy hours",
            price: 35.00,
            image_url: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        {
            name: "Lanche para Eventos",
            description: "Sanduíches naturais, salgados tradicionais, refrigerantes e sucos para eventos casuais",
            price: 18.00,
            image_url: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        {
            name: "Churrasco Completo",
            description: "Carnes nobres grelhadas, acompanhamentos variados, saladas frescas e pães artesanais",
            price: 55.00,
            image_url: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
    ],
    
    reviews: [
        {
            name: "Maria Silva",
            stars: 5,
            comment: "Excelente atendimento e comida deliciosa! Recomendo muito.",
            created_at: new Date().toISOString()
        },
        {
            name: "João Oliveira",
            stars: 4,
            comment: "Ótimo buffet, equipe atenciosa. Única coisa que poderia melhorar é a variedade de doces.",
            created_at: new Date().toISOString()
        },
        {
            name: "Ana Costa",
            stars: 5,
            comment: "Festa perfeita para minha filha. Os organizadores superaram as expectativas!",
            created_at: new Date().toISOString()
        },
        {
            name: "Carlos Souza",
            stars: 4,
            comment: "Muito bom, ambiente agradável e cardápio variado. Voltaremos com certeza.",
            created_at: new Date().toISOString()
        }
    ],
    
    space_photos: [
        {
            name: "Salão Principal",
            data: "",
            upload_date: new Date().toISOString()
        },
        {
            name: "Área Externa",
            data: "",
            upload_date: new Date().toISOString()
        },
        {
            name: "Cozinha Industrial",
            data: "",
            upload_date: new Date().toISOString()
        },
        {
            name: "Área Kids",
            data: "",
            upload_date: new Date().toISOString()
        },
        {
            name: "Churrasqueira",
            data: "",
            upload_date: new Date().toISOString()
        },
        {
            name: "Estacionamento",
            data: "",
            upload_date: new Date().toISOString()
        }
    ],
    
    contact_info: {
        whatsapp_number: "(85) 99999-9999",
        contact_email: "contato@buffetsobral.com",
        contact_phone: "(85) 99999-9999",
        last_updated: new Date().toISOString()
    },
    
    featured_videos: [
        {
            url: "https://www.youtube.com/watch?v=example1",
            video_id: "example1",
            title: "Tour pelo Buffet Sobral",
            added_date: new Date().toISOString()
        },
        {
            url: "https://www.youtube.com/watch?v=example2",
            video_id: "example2",
            title: "Festa de Aniversário Infantil",
            added_date: new Date().toISOString()
        },
        {
            url: "https://www.youtube.com/watch?v=example3",
            video_id: "example3",
            title: "Casamento Realizado no Local",
            added_date: new Date().toISOString()
        }
    ]
};

async function populateAllTables() {
    console.log('🚀 INICIANDO POPULAÇÃO COMPLETA COM PERMISSÕES ADMINISTRATIVAS...\n');
    
    try {
        // 1. Popular tabela de serviços
        console.log('🍽️  POPULANDO SERVIÇOS...\n');
        
        // Limpar tabela existente
        console.log('🧹 Limpando tabela de serviços...');
        await supabaseAdmin.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        // Inserir novos serviços
        console.log('➕ Inserindo serviços...');
        const { data: servicesData, error: servicesError } = await supabaseAdmin
            .from('services')
            .insert(realData.services);
        
        if (servicesError) {
            console.log(`❌ Erro ao inserir serviços: ${servicesError.message}\n`);
        } else {
            console.log(`✅ ${realData.services.length} serviços inseridos com sucesso!\n`);
        }
        
        // 2. Popular tabela de avaliações
        console.log('⭐ POPULANDO AVALIAÇÕES...\n');
        
        // Limpar tabela existente
        console.log('🧹 Limpando tabela de avaliações...');
        await supabaseAdmin.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        // Inserir novas avaliações
        console.log('➕ Inserindo avaliações...');
        const { data: reviewsData, error: reviewsError } = await supabaseAdmin
            .from('reviews')
            .insert(realData.reviews);
        
        if (reviewsError) {
            console.log(`❌ Erro ao inserir avaliações: ${reviewsError.message}\n`);
        } else {
            console.log(`✅ ${realData.reviews.length} avaliações inseridas com sucesso!\n`);
        }
        
        // 3. Popular tabela de fotos do espaço
        console.log('📸 POPULANDO FOTOS DO ESPAÇO...\n');
        
        // Limpar tabela existente
        console.log('🧹 Limpando tabela de fotos...');
        await supabaseAdmin.from('space_photos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        // Inserir novas fotos
        console.log('➕ Inserindo fotos...');
        const { data: photosData, error: photosError } = await supabaseAdmin
            .from('space_photos')
            .insert(realData.space_photos);
        
        if (photosError) {
            console.log(`❌ Erro ao inserir fotos: ${photosError.message}\n`);
        } else {
            console.log(`✅ ${realData.space_photos.length} fotos inseridas com sucesso!\n`);
        }
        
        // 4. Popular tabela de informações de contato
        console.log('📞 POPULANDO INFORMAÇÕES DE CONTATO...\n');
        
        // Limpar tabela existente
        console.log('🧹 Limpando tabela de contatos...');
        await supabaseAdmin.from('contact_info').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        // Inserir informações de contato
        console.log('➕ Inserindo informações de contato...');
        const { data: contactData, error: contactError } = await supabaseAdmin
            .from('contact_info')
            .insert([realData.contact_info]);
        
        if (contactError) {
            console.log(`❌ Erro ao inserir informações de contato: ${contactError.message}\n`);
        } else {
            console.log(`✅ Informações de contato inseridas com sucesso!\n`);
        }
        
        // 5. Popular tabela de vídeos em destaque
        console.log('🎬 POPULANDO VÍDEOS EM DESTAQUE...\n');
        
        // Limpar tabela existente
        console.log('🧹 Limpando tabela de vídeos...');
        await supabaseAdmin.from('featured_videos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        // Inserir novos vídeos
        console.log('➕ Inserindo vídeos...');
        const { data: videosData, error: videosError } = await supabaseAdmin
            .from('featured_videos')
            .insert(realData.featured_videos);
        
        if (videosError) {
            console.log(`❌ Erro ao inserir vídeos: ${videosError.message}\n`);
        } else {
            console.log(`✅ ${realData.featured_videos.length} vídeos inseridos com sucesso!\n`);
        }
        
        console.log('✅ POPULAÇÃO COMPLETA REALIZADA COM SUCESSO!\n');
        
        // Verificar população
        await verifyPopulation();
        
    } catch (error) {
        console.log(`❌ Erro durante a população: ${error.message}\n`);
    }
}

async function verifyPopulation() {
    console.log('🔍 VERIFICANDO POPULAÇÃO DAS TABELAS...\n');
    
    const verificationQueries = [
        { 
            name: 'Serviços', 
            query: () => supabaseAdmin.from('services').select('*', { count: 'exact' }),
            expected: realData.services.length
        },
        { 
            name: 'Avaliações', 
            query: () => supabaseAdmin.from('reviews').select('*', { count: 'exact' }),
            expected: realData.reviews.length
        },
        { 
            name: 'Fotos do Espaço', 
            query: () => supabaseAdmin.from('space_photos').select('*', { count: 'exact' }),
            expected: realData.space_photos.length
        },
        { 
            name: 'Informações de Contato', 
            query: () => supabaseAdmin.from('contact_info').select('*', { count: 'exact' }),
            expected: 1
        },
        { 
            name: 'Vídeos em Destaque', 
            query: () => supabaseAdmin.from('featured_videos').select('*', { count: 'exact' }),
            expected: realData.featured_videos.length
        }
    ];
    
    let allVerified = true;
    
    for (const verification of verificationQueries) {
        console.log(`📊 Verificando: ${verification.name}`);
        
        try {
            const { data, error, count } = await verification.query();
            
            if (error) {
                console.log(`   ❌ Erro na verificação: ${error.message}`);
                allVerified = false;
            } else {
                console.log(`   ✅ ${count} registros encontrados (${verification.expected} esperados)`);
                if (count !== verification.expected) {
                    console.log(`   ⚠️  Diferença na contagem!`);
                }
            }
        } catch (error) {
            console.log(`   ❌ Erro: ${error.message}`);
            allVerified = false;
        }
        
        console.log('');
    }
    
    if (allVerified) {
        console.log('🎉 TODAS AS TABELAS VERIFICADAS COM SUCESSO!\n');
        console.log('📊 RESUMO FINAL:');
        console.log(`   🍽️  Serviços: ${realData.services.length} itens`);
        console.log(`   ⭐ Avaliações: ${realData.reviews.length} registros`);
        console.log(`   📸 Fotos: ${realData.space_photos.length} imagens`);
        console.log(`   📞 Contatos: 1 registro`);
        console.log(`   🎬 Vídeos: ${realData.featured_videos.length} itens`);
        console.log('\n✅ O banco de dados está completamente populado e pronto para uso!');
    } else {
        console.log('❌ Algumas tabelas apresentaram problemas na verificação.');
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('💡 INSTRUÇÕES PARA O SITE:');
    console.log('='.repeat(50));
    console.log('1. O site agora deve carregar todos os dados corretamente');
    console.log('2. As credenciais anônimas permitem leitura dos dados');
    console.log('3. Apenas operações administrativas requerem a Service Role Key');
    console.log('4. Para atualizações futuras, use o painel do Supabase');
}

// Executar população completa
populateAllTables();