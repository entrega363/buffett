const { createClient } = require('@supabase/supabase-js');

// Credenciais do Supabase do projeto
const SUPABASE_URL = 'https://vopekxfyorbuyrvzcshy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGVreGZ5b3JidXlydnpjc2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTkyNjMsImV4cCI6MjA3MzAzNTI2M30.jIQqu4j_0QfPpn67YXHyy760X6Z4wwhuHMj-xK3emP4';

console.log('=== POPULANDO TABELAS COM DADOS REAIS ===\n');

// Criar cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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

async function populateServices() {
    console.log('🍽️  POPULANDO SERVIÇOS...\n');
    
    try {
        // Limpar tabela existente
        console.log('🧹 Limpando tabela de serviços...');
        await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        // Inserir novos serviços
        console.log('➕ Inserindo serviços...');
        const { data, error } = await supabase
            .from('services')
            .insert(realData.services);
        
        if (error) {
            console.log(`❌ Erro ao inserir serviços: ${error.message}\n`);
            return false;
        }
        
        console.log(`✅ ${realData.services.length} serviços inseridos com sucesso!\n`);
        return true;
    } catch (error) {
        console.log(`❌ Erro ao popular serviços: ${error.message}\n`);
        return false;
    }
}

async function populateReviews() {
    console.log('⭐ POPULANDO AVALIAÇÕES...\n');
    
    try {
        // Limpar tabela existente
        console.log('🧹 Limpando tabela de avaliações...');
        await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        // Inserir novas avaliações
        console.log('➕ Inserindo avaliações...');
        const { data, error } = await supabase
            .from('reviews')
            .insert(realData.reviews);
        
        if (error) {
            console.log(`❌ Erro ao inserir avaliações: ${error.message}\n`);
            return false;
        }
        
        console.log(`✅ ${realData.reviews.length} avaliações inseridas com sucesso!\n`);
        return true;
    } catch (error) {
        console.log(`❌ Erro ao popular avaliações: ${error.message}\n`);
        return false;
    }
}

async function populateSpacePhotos() {
    console.log('📸 POPULANDO FOTOS DO ESPAÇO...\n');
    
    try {
        // Limpar tabela existente
        console.log('🧹 Limpando tabela de fotos...');
        await supabase.from('space_photos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        // Inserir novas fotos
        console.log('➕ Inserindo fotos...');
        const { data, error } = await supabase
            .from('space_photos')
            .insert(realData.space_photos);
        
        if (error) {
            console.log(`❌ Erro ao inserir fotos: ${error.message}\n`);
            return false;
        }
        
        console.log(`✅ ${realData.space_photos.length} fotos inseridas com sucesso!\n`);
        return true;
    } catch (error) {
        console.log(`❌ Erro ao popular fotos: ${error.message}\n`);
        return false;
    }
}

async function populateContactInfo() {
    console.log('📞 POPULANDO INFORMAÇÕES DE CONTATO...\n');
    
    try {
        // Limpar tabela existente
        console.log('🧹 Limpando tabela de contatos...');
        await supabase.from('contact_info').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        // Inserir informações de contato
        console.log('➕ Inserindo informações de contato...');
        const { data, error } = await supabase
            .from('contact_info')
            .insert([realData.contact_info]);
        
        if (error) {
            console.log(`❌ Erro ao inserir informações de contato: ${error.message}\n`);
            return false;
        }
        
        console.log(`✅ Informações de contato inseridas com sucesso!\n`);
        return true;
    } catch (error) {
        console.log(`❌ Erro ao popular informações de contato: ${error.message}\n`);
        return false;
    }
}

async function populateFeaturedVideos() {
    console.log('🎬 POPULANDO VÍDEOS EM DESTAQUE...\n');
    
    try {
        // Limpar tabela existente
        console.log('🧹 Limpando tabela de vídeos...');
        await supabase.from('featured_videos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        // Inserir novos vídeos
        console.log('➕ Inserindo vídeos...');
        const { data, error } = await supabase
            .from('featured_videos')
            .insert(realData.featured_videos);
        
        if (error) {
            console.log(`❌ Erro ao inserir vídeos: ${error.message}\n`);
            return false;
        }
        
        console.log(`✅ ${realData.featured_videos.length} vídeos inseridos com sucesso!\n`);
        return true;
    } catch (error) {
        console.log(`❌ Erro ao popular vídeos: ${error.message}\n`);
        return false;
    }
}

async function verifyPopulation() {
    console.log('🔍 VERIFICANDO POPULAÇÃO DAS TABELAS...\n');
    
    const tables = [
        { name: 'services', expected: realData.services.length },
        { name: 'reviews', expected: realData.reviews.length },
        { name: 'space_photos', expected: realData.space_photos.length },
        { name: 'contact_info', expected: 1 },
        { name: 'featured_videos', expected: realData.featured_videos.length }
    ];
    
    let allCorrect = true;
    
    for (const table of tables) {
        try {
            const { count, error } = await supabase
                .from(table.name)
                .select('*', { count: 'exact', head: true });
            
            if (error) {
                console.log(`❌ Erro ao verificar ${table.name}: ${error.message}`);
                allCorrect = false;
            } else {
                console.log(`📊 ${table.name.toUpperCase()}: ${count} registros (${table.expected} esperados)`);
                if (count !== table.expected) {
                    console.log(`   ⚠️  Diferença encontrada!`);
                    allCorrect = false;
                } else {
                    console.log(`   ✅ Quantidade correta`);
                }
            }
            console.log('');
        } catch (error) {
            console.log(`❌ Erro ao verificar ${table.name}: ${error.message}\n`);
            allCorrect = false;
        }
    }
    
    return allCorrect;
}

async function main() {
    console.log('🚀 INICIANDO POPULAÇÃO COMPLETA DO BANCO DE DADOS...\n');
    
    try {
        // Popular todas as tabelas
        const servicesOk = await populateServices();
        const reviewsOk = await populateReviews();
        const photosOk = await populateSpacePhotos();
        const contactOk = await populateContactInfo();
        const videosOk = await populateFeaturedVideos();
        
        // Verificar se todas as operações foram bem-sucedidas
        if (servicesOk && reviewsOk && photosOk && contactOk && videosOk) {
            console.log('✅ TODAS AS TABELAS POPULADAS COM SUCESSO!\n');
            
            // Verificar população
            const verificationOk = await verifyPopulation();
            
            if (verificationOk) {
                console.log('🎉 BANCO DE DADOS TOTALMENTE CONFIGURADO E PRONTO PARA USO!\n');
                console.log('📊 RESUMO FINAL:');
                console.log(`   🍽️  Serviços: ${realData.services.length} itens`);
                console.log(`   ⭐ Avaliações: ${realData.reviews.length} registros`);
                console.log(`   📸 Fotos: ${realData.space_photos.length} imagens`);
                console.log(`   📞 Contatos: 1 registro`);
                console.log(`   🎬 Vídeos: ${realData.featured_videos.length} itens`);
                console.log('\n✅ O site agora deve carregar todos os dados corretamente!');
            } else {
                console.log('⚠️  Houve algumas inconsistências na verificação final.');
            }
        } else {
            console.log('❌ Algumas tabelas não foram populadas corretamente.');
        }
    } catch (error) {
        console.log(`❌ Erro durante a população: ${error.message}`);
    }
}

// Executar população
main();