// Script para analisar o código do site e identificar problemas de integração
const fs = require('fs');

console.log('=== ANÁLISE DO CÓDIGO DO SITE ===\n');

// Ler o arquivo index.html
const indexPath = 'index.html';
const content = fs.readFileSync(indexPath, 'utf8');

// Extrair funções que acessam o Supabase
console.log('🔍 ANALISANDO FUNÇÕES DE ACESSO AO SUPABASE...\n');

// Funções que carregam dados do Supabase
const supabaseFunctions = [
    'loadServicesFromSupabase',
    'loadReviewsFromSupabase', 
    'loadSpacePhotosFromSupabase',
    'loadContactInfoFromSupabase'
];

supabaseFunctions.forEach(funcName => {
    const funcRegex = new RegExp(`async\\\\s+function\\\\s+${funcName}\\\\([^)]*\\\\)\\\\s*\\\\{([\\\\s\\\\S]*?)\\\\n\\\\s*\\\\}`, 'g');
    const match = funcRegex.exec(content);
    
    if (match) {
        console.log(`✅ Função encontrada: ${funcName}`);
        const funcBody = match[1];
        
        // Verificar chamadas Supabase
        const supabaseCalls = funcBody.match(/await supabaseClient\.[\s\S]*?;/g);
        if (supabaseCalls) {
            console.log(`   Chamadas Supabase: ${supabaseCalls.length}`);
            supabaseCalls.forEach((call, index) => {
                console.log(`     ${index + 1}. ${call.trim()}`);
            });
        }
        
        // Verificar tabela acessada
        const tableMatch = funcBody.match(/\.from\(['"]([^'"]+)['"]\)/);
        if (tableMatch) {
            console.log(`   Tabela acessada: ${tableMatch[1]}`);
        }
        
        console.log('');
    } else {
        console.log(`❌ Função não encontrada: ${funcName}\n`);
    }
});

// Verificar estrutura esperada dos dados
console.log('🔍 ANALISANDO ESTRUTURA ESPERADA DOS DADOS...\n');

// Verificar como os dados são usados no site
const dataUsagePatterns = [
    { pattern: /\.name/g, description: 'Acesso ao campo "name"' },
    { pattern: /\.price/g, description: 'Acesso ao campo "price"' },
    { pattern: /\.description/g, description: 'Acesso ao campo "description"' },
    { pattern: /\.stars/g, description: 'Acesso ao campo "stars"' },
    { pattern: /\.comment/g, description: 'Acesso ao campo "comment"' },
    { pattern: /\.image_url/g, description: 'Acesso ao campo "image_url"' },
    { pattern: /\.whatsapp_number/g, description: 'Acesso ao campo "whatsapp_number"' }
];

dataUsagePatterns.forEach(pattern => {
    const matches = content.match(pattern.pattern);
    if (matches) {
        console.log(`✅ ${pattern.description}: ${matches.length} ocorrências`);
    }
});

console.log('\n🔍 COMPARANDO COM ESTRUTURA REAL DO BANCO...\n');

// Estrutura real do banco (baseada nos testes anteriores)
const realStructure = {
    services: ['id', 'name', 'description', 'price', 'image_url', 'created_at', 'updated_at'],
    reviews: ['id', 'name', 'stars', 'comment', 'created_at'],
    space_photos: ['id', 'name', 'data', 'upload_date'],
    contact_info: ['id', 'whatsapp_number', 'contact_email', 'contact_phone', 'last_updated'],
    featured_videos: ['id', 'url', 'video_id', 'title', 'added_date']
};

// Verificar se todos os campos esperados existem
Object.keys(realStructure).forEach(table => {
    console.log(`📊 Tabela: ${table}`);
    realStructure[table].forEach(field => {
        const fieldUsed = content.includes(`.${field}`);
        if (fieldUsed) {
            console.log(`   ✅ ${field} - Em uso no site`);
        } else {
            console.log(`   ℹ️  ${field} - Não utilizado (pode ser opcional)`);
        }
    });
    console.log('');
});

// Verificar possíveis problemas de compatibilidade
console.log('🔍 VERIFICANDO POSSÍVEIS PROBLEMAS DE COMPATIBILIDADE...\n');

// Verificar se há chamadas para campos que não existem
const potentialIssues = [
    { pattern: /\.rating/g, description: 'Campo "rating" (deveria ser "stars")' },
    { pattern: /\.imageUrl/g, description: 'Campo "imageUrl" (deveria ser "image_url")' },
    { pattern: /\.createdAt/g, description: 'Campo "createdAt" (deveria ser "created_at")' },
    { pattern: /\.updatedAt/g, description: 'Campo "updatedAt" (deveria ser "updated_at")' }
];

potentialIssues.forEach(issue => {
    const matches = content.match(issue.pattern);
    if (matches) {
        console.log(`⚠️  Possível incompatibilidade: ${issue.description}`);
        console.log(`   Encontrado em ${matches.length} lugares`);
        console.log('');
    }
});

console.log('=== ANÁLISE CONCLUÍDA ===\n');

// Sugestões de correção
console.log('💡 SUGESTÕES DE CORREÇÃO:\n');
console.log('1. Verificar se todas as funções Supabase estão sendo chamadas corretamente');
console.log('2. Confirmar se a estrutura dos dados corresponde ao esperado pelo site');
console.log('3. Verificar se há campos faltando nas consultas');
console.log('4. Confirmar se as credenciais estão corretas no código do site');
console.log('5. Verificar se há erros de CORS ou permissões');