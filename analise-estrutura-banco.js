const { createClient } = require('@supabase/supabase-js');

// Credenciais do Supabase
const SUPABASE_URL = 'https://vopekxfyorbuyrvzcshy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGVreGZ5b3JidXlydnpjc2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTkyNjMsImV4cCI6MjA3MzAzNTI2M30.jIQqu4j_0QfPpn67YXHyy760X6Z4wwhuHMj-xK3emP4';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function analyzeDatabaseStructure() {
    console.log('=== ANÁLISE DA ESTRUTURA DO BANCO DE DADOS ===\n');
    
    // 1. Analisar tabela de serviços
    console.log('サービ Tabela de Serviços:');
    try {
        const { data: services, error } = await supabase
            .from('services')
            .select('*');
        
        if (error) {
            console.log(`❌ Erro: ${error.message}\n`);
        } else {
            console.log(`✅ ${services.length} serviços encontrados`);
            services.forEach((service, index) => {
                console.log(`   ${index + 1}. ${service.name}`);
                console.log(`      Preço: R$ ${service.price}`);
                console.log(`      Descrição: ${service.description}`);
                console.log(`      Campos: ${Object.keys(service).join(', ')}`);
                console.log('');
            });
        }
    } catch (error) {
        console.log(`❌ Erro ao analisar serviços: ${error.message}\n`);
    }
    
    // 2. Analisar tabela de avaliações
    console.log('⭐ Tabela de Avaliações:');
    try {
        const { data: reviews, error } = await supabase
            .from('reviews')
            .select('*');
        
        if (error) {
            console.log(`❌ Erro: ${error.message}\n`);
        } else {
            console.log(`✅ ${reviews.length} avaliações encontradas`);
            reviews.forEach((review, index) => {
                console.log(`   ${index + 1}. ${review.name} - ${review.stars} estrelas`);
                console.log(`      Comentário: ${review.comment}`);
                console.log(`      Campos: ${Object.keys(review).join(', ')}`);
                console.log('');
            });
        }
    } catch (error) {
        console.log(`❌ Erro ao analisar avaliações: ${error.message}\n`);
    }
    
    // 3. Analisar tabela de fotos
    console.log('📸 Tabela de Fotos:');
    try {
        const { data: photos, error } = await supabase
            .from('space_photos')
            .select('*');
        
        if (error) {
            console.log(`❌ Erro: ${error.message}\n`);
        } else {
            console.log(`✅ ${photos.length} fotos encontradas`);
            photos.forEach((photo, index) => {
                console.log(`   ${index + 1}. ${photo.name}`);
                console.log(`      Campos: ${Object.keys(photo).join(', ')}`);
                console.log('');
            });
        }
    } catch (error) {
        console.log(`❌ Erro ao analisar fotos: ${error.message}\n`);
    }
    
    // 4. Analisar tabela de informações de contato
    console.log('📞 Tabela de Informações de Contato:');
    try {
        const { data: contacts, error } = await supabase
            .from('contact_info')
            .select('*');
        
        if (error) {
            console.log(`❌ Erro: ${error.message}\n`);
        } else {
            console.log(`✅ ${contacts.length} registros de contato encontrados`);
            contacts.forEach((contact, index) => {
                console.log(`   ${index + 1}. WhatsApp: ${contact.whatsapp_number}`);
                console.log(`      Email: ${contact.contact_email}`);
                console.log(`      Telefone: ${contact.contact_phone}`);
                console.log(`      Campos: ${Object.keys(contact).join(', ')}`);
                console.log('');
            });
        }
    } catch (error) {
        console.log(`❌ Erro ao analisar contatos: ${error.message}\n`);
    }
    
    // 5. Analisar tabela de vídeos
    console.log('🎬 Tabela de Vídeos em Destaque:');
    try {
        const { data: videos, error } = await supabase
            .from('featured_videos')
            .select('*');
        
        if (error) {
            console.log(`❌ Erro: ${error.message}\n`);
        } else {
            console.log(`✅ ${videos.length} vídeos encontrados`);
            videos.forEach((video, index) => {
                console.log(`   ${index + 1}. ${video.title}`);
                console.log(`      URL: ${video.url}`);
                console.log(`      Video ID: ${video.video_id}`);
                console.log(`      Campos: ${Object.keys(video).join(', ')}`);
                console.log('');
            });
        }
    } catch (error) {
        console.log(`❌ Erro ao analisar vídeos: ${error.message}\n`);
    }
    
    console.log('=== ANÁLISE CONCLUÍDA ===\n');
}

// Executar análise
analyzeDatabaseStructure();