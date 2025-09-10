const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
const content = fs.readFileSync(indexPath, 'utf8');

console.log('=== VERIFICAÇÃO DAS CHAMADAS ÀS FUNÇÕES SUPABASE ===\n');

// Converter conteúdo em linhas
const lines = content.split('\n');

// Verificar onde as funções são chamadas
console.log('🔍 PROCURANDO CHAMADAS ÀS FUNÇÕES DE CARGA...\n');

// Procurar por chamadas às funções de carga
const functionCalls = [
    'loadServicesFromSupabase()',
    'loadReviewsFromSupabase()', 
    'loadSpacePhotosFromSupabase()',
    'loadContactInfoFromSupabase()',
    'await loadServicesFromSupabase()',
    'await loadReviewsFromSupabase()',
    'await loadSpacePhotosFromSupabase()',
    'await loadContactInfoFromSupabase()'
];

functionCalls.forEach(call => {
    const matches = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(call)) {
            matches.push({
                line: i + 1,
                content: lines[i].trim()
            });
        }
    }
    
    if (matches.length > 0) {
        console.log(`✅ ${call} - Encontrado em ${matches.length} lugar(es):`);
        matches.forEach(match => {
            console.log(`   Linha ${match.line}: ${match.content}`);
        });
        console.log('');
    } else {
        console.log(`❌ ${call} - NÃO encontrado\n`);
    }
});

// Verificar chamadas no DOMContentLoaded
console.log('🔍 VERIFICANDO CHAMADAS NO DOMContentLoaded...\n');

const domLoadedMatches = [];
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('DOMContentLoaded') && lines[i].includes('load')) {
        domLoadedMatches.push({
            line: i + 1,
            content: lines[i].trim()
        });
    }
}

if (domLoadedMatches.length > 0) {
    console.log(`✅ ${domLoadedMatches.length} chamadas no DOMContentLoaded encontradas:`);
    domLoadedMatches.forEach(match => {
        console.log(`   Linha ${match.line}: ${match.content}`);
    });
    console.log('');
} else {
    console.log('❌ Nenhuma chamada no DOMContentLoaded encontrada\n');
}

// Verificar se há chamadas para carregar todos os dados
console.log('🔍 VERIFICANDO CARREGAMENTO COMPLETO DOS DADOS...\n');

// Procurar por padrões de carregamento
const patterns = [
    { name: 'await load.*FromSupabase\\(\\)', pattern: /await load\w+FromSupabase\(\)/g },
    { name: 'load.*FromSupabase\\(\\)', pattern: /load\w+FromSupabase\(\)/g },
    { name: 'Promise.all.*load.*FromSupabase', pattern: /Promise\.all\([^)]*load\w+FromSupabase/g }
];

patterns.forEach(patternObj => {
    const matches = content.match(patternObj.pattern);
    if (matches) {
        console.log(`✅ Padrão "${patternObj.name}" encontrado ${matches.length} vez(es):`);
        matches.forEach((match, i) => {
            console.log(`   ${i + 1}. ${match}`);
        });
        console.log('');
    }
});

// Verificar se há tratamento de erros adequado
console.log('🔍 VERIFICANDO TRATAMENTO DE ERROS...\n');

const tryCatchBlocks = content.match(/try\s*{[^}]*await load\w+FromSupabase[^}]*}[^}]*catch/g);
if (tryCatchBlocks) {
    console.log(`✅ ${tryCatchBlocks.length} blocos try-catch com chamadas Supabase encontrados`);
} else {
    console.log('❌ Nenhum bloco try-catch com chamadas Supabase encontrado');
}

console.log('\n🔍 VERIFICANDO SE AS FUNÇÕES ESTÃO SENDO EXECUTADAS...\n');

// Verificar se há console.logs indicando execução
const executionLogs = [
    "console.log('Carregando serviços'",
    "console.log('Carregando avaliações'",
    "console.log('Carregando fotos'",
    "console.log('Carregando contatos'"
];

executionLogs.forEach(log => {
    const escapedLog = log.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedLog, 'g');
    const matches = content.match(regex);
    if (matches) {
        console.log(`✅ Log de execução encontrado: ${log}`);
    } else {
        console.log(`❌ Log de execução NÃO encontrado: ${log}`);
    }
});

console.log('\n=== VERIFICAÇÃO CONCLUÍDA ===\n');

// Sugestões de diagnóstico
console.log('💡 SUGESTÕES DE DIAGNÓSTICO ADICIONAL:');
console.log('1. Adicionar console.log nas funções para verificar se estão sendo chamadas');
console.log('2. Verificar se há erros no console do navegador');
console.log('3. Confirmar se o DOMContentLoaded está sendo disparado');
console.log('4. Verificar se há bloqueios de CORS ou permissões');
console.log('5. Testar chamadas individuais para isolar o problema');