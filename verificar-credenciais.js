const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
const content = fs.readFileSync(indexPath, 'utf8');

console.log('=== VERIFICAÇÃO DAS CREDENCIAIS DO SUPABASE ===\n');

// Encontrar as credenciais do Supabase no arquivo
const supabaseUrlMatch = content.match(/SUPABASE_URL\s*=\s*['"]([^'"]+)['"]/);
const supabaseKeyMatch = content.match(/SUPABASE_KEY\s*=\s*['"]([^'"]+)['"]/);

if (supabaseUrlMatch) {
    const url = supabaseUrlMatch[1];
    console.log(`✅ URL do Supabase encontrada:`);
    console.log(`   ${url}\n`);
    
    // Verificar se é uma URL válida
    try {
        new URL(url);
        console.log('✅ URL válida\n');
    } catch (e) {
        console.log('❌ URL inválida\n');
    }
} else {
    console.log('❌ URL do Supabase NÃO encontrada!\n');
}

if (supabaseKeyMatch) {
    const key = supabaseKeyMatch[1];
    console.log(`✅ Chave do Supabase encontrada:`);
    console.log(`   ${key.substring(0, 20)}...${key.substring(key.length - 20)}\n`);
    console.log(`✅ Chave tem ${key.length} caracteres\n`);
} else {
    console.log('❌ Chave do Supabase NÃO encontrada!\n');
}

// Verificar cliente Supabase
const clientMatch = content.match(/supabaseClient\s*=\s*supabase\.createClient/);
if (clientMatch) {
    console.log('✅ Cliente Supabase criado corretamente\n');
} else {
    console.log('❌ Cliente Supabase NÃO criado corretamente\n');
}

// Verificar chamadas Supabase
const supabaseCalls = content.match(/await supabaseClient\./g);
if (supabaseCalls) {
    console.log(`✅ ${supabaseCalls.length} chamadas ao Supabase encontradas\n`);
} else {
    console.log('❌ Nenhuma chamada ao Supabase encontrada\n');
}

// Verificar tabelas acessadas
const tables = [];
const tableMatches = content.match(/\\.from\\(['"]([^'"]+)['"]\\)/g);
if (tableMatches) {
    tableMatches.forEach(match => {
        const table = match.match(/\\.from\\(['"]([^'"]+)['"]\\)/)[1];
        if (!tables.includes(table)) {
            tables.push(table);
        }
    });
    console.log(`✅ Tabelas acessadas: ${tables.join(', ')}\n`);
} else {
    console.log('❌ Nenhuma tabela Supabase acessada\n');
}

console.log('=== VERIFICAÇÃO CONCLUÍDA ===');