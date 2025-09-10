const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
const content = fs.readFileSync(indexPath, 'utf8');

console.log('=== ANÁLISE DAS FUNÇÕES SUPABASE NO SITE ===\n');

// Converter conteúdo em linhas
const lines = content.split('\n');

// Encontrar as funções que acessam o Supabase
console.log('🔍 PROCURANDO FUNÇÕES DE ACESSO AO SUPABASE...\n');

// Procurar por funções que começam com "load" e terminam com "FromSupabase"
const loadFunctions = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('function load') && line.includes('FromSupabase')) {
        const funcMatch = line.match(/function\s+(load\w+FromSupabase)/);
        if (funcMatch) {
            loadFunctions.push({
                name: funcMatch[1],
                line: i + 1
            });
        }
    }
}

console.log(`✅ ${loadFunctions.length} funções de carga encontradas:`);
loadFunctions.forEach(func => {
    console.log(`   - ${func.name} (linha ${func.line})`);
});
console.log('');

// Analisar cada função de carga
loadFunctions.forEach(func => {
    console.log(`🔍 ANALISANDO FUNÇÃO: ${func.name}`);
    
    // Encontrar o início e fim da função
    let funcStart = func.line - 1;
    let funcEnd = funcStart;
    let braceCount = 0;
    
    // Encontrar o início da função
    for (let i = funcStart; i >= 0; i--) {
        if (lines[i].includes('function ' + func.name)) {
            funcStart = i;
            break;
        }
    }
    
    // Encontrar o fim da função
    for (let i = funcStart; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('{')) braceCount++;
        if (line.includes('}')) braceCount--;
        if (braceCount === 0 && line.includes('}')) {
            funcEnd = i;
            break;
        }
    }
    
    console.log(`   Linhas: ${funcStart + 1} - ${funcEnd + 1}`);
    
    // Extrair o corpo da função
    const funcLines = lines.slice(funcStart, funcEnd + 1);
    const funcBody = funcLines.join('\n');
    
    // Verificar chamadas Supabase
    const supabaseCalls = funcBody.match(/await supabaseClient\.[\s\S]*?;/g);
    if (supabaseCalls) {
        console.log(`   ✅ ${supabaseCalls.length} chamadas Supabase encontradas:`);
        supabaseCalls.forEach((call, index) => {
            console.log(`     ${index + 1}. ${call.trim()}`);
        });
    } else {
        console.log(`   ❌ Nenhuma chamada Supabase encontrada`);
    }
    
    // Verificar tabela acessada
    const tableMatch = funcBody.match(/\.from\(['"]([^'"]+)['"]\)/);
    if (tableMatch) {
        console.log(`   📊 Tabela acessada: ${tableMatch[1]}`);
    }
    
    // Verificar tratamento de erro
    if (funcBody.includes('if (error)')) {
        console.log(`   ✅ Tratamento de erro implementado`);
    } else {
        console.log(`   ⚠️  Tratamento de erro não encontrado`);
    }
    
    console.log('');
});

// Verificar funções principais de inicialização
console.log('🔍 VERIFICANDO FUNÇÕES DE INICIALIZAÇÃO...\n');

const initFunctions = [
    'loadServicesFromSupabase',
    'loadReviewsFromSupabase',
    'loadSpacePhotosFromSupabase',
    'loadContactInfoFromSupabase'
];

initFunctions.forEach(funcName => {
    const funcExists = content.includes('function ' + funcName);
    if (funcExists) {
        console.log(`✅ ${funcName} - Função encontrada`);
    } else {
        console.log(`❌ ${funcName} - Função NÃO encontrada`);
    }
});

// Verificar chamadas às funções de inicialização
console.log('\n🔍 VERIFICANDO CHAMADAS ÀS FUNÇÕES DE INICIALIZAÇÃO...\n');

const domContentLoaded = content.match(/document\.addEventListener\('DOMContentLoaded',[\s\S]*?await load\w+FromSupabase/g);
if (domContentLoaded) {
    console.log(`✅ ${domContentLoaded.length} chamadas de inicialização encontradas`);
} else {
    console.log(`❌ Nenhuma chamada de inicialização encontrada`);
}

console.log('\n=== ANÁLISE CONCLUÍDA ===\n');

// Verificar se há erros de sintaxe
console.log('🔍 VERIFICANDO POSSÍVEIS ERROS DE SINTAXE...\n');

// Verificar chaves balanceadas
let totalBraces = 0;
lines.forEach(line => {
    totalBraces += (line.match(/{/g) || []).length;
    totalBraces -= (line.match(/}/g) || []).length;
});

if (totalBraces === 0) {
    console.log('✅ Chaves balanceadas');
} else {
    console.log(`❌ Chaves DESBALANCEADAS: ${totalBraces > 0 ? 'faltam' : 'sobram'} ${Math.abs(totalBraces)}`);
}

// Verificar parênteses balanceados
let totalParentheses = 0;
lines.forEach(line => {
    totalParentheses += (line.match(/\(/g) || []).length;
    totalParentheses -= (line.match(/\)/g) || []).length;
});

if (totalParentheses === 0) {
    console.log('✅ Parênteses balanceados');
} else {
    console.log(`❌ Parênteses DESBALANCEADOS: ${totalParentheses > 0 ? 'faltam' : 'sobram'} ${Math.abs(totalParentheses)}`);
}

console.log('\n💡 SUGESTÕES BASEADAS NA ANÁLISE:');
console.log('1. Verificar se todas as funções de carga estão implementadas corretamente');
console.log('2. Confirmar se as chamadas Supabase estão usando a sintaxe correta');
console.log('3. Verificar se há erros de sintaxe que impedem a execução');
console.log('4. Confirmar se as funções de inicialização estão sendo chamadas');