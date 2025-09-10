const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
const content = fs.readFileSync(indexPath, 'utf8');

// Converter conteúdo em linhas
const lines = content.split('\n');

console.log('=== VERIFICANDO CONTEXTO DAS CHAMADAS ÀS FUNÇÕES ===\n');

// Verificar linhas 2245-2255
console.log('🔍 LINHAS 2245-2255 (contexto das chamadas):\n');

for (let i = 2244; i < Math.min(2255, lines.length); i++) {
    console.log(`${(i + 1).toString().padStart(4)}: ${lines[i]}`);
}

console.log('\n' + '='.repeat(50));
console.log('🔍 VERIFICANDO ONDE AS FUNÇÕES SÃO CHAMADAS');
console.log('='.repeat(50) + '\n');

// Procurar por funções que chamam as funções de carga
const callingFunctions = [
    'loadSiteDataFromSupabase',
    'loadServicesEventsFromSupabase'
];

callingFunctions.forEach(funcName => {
    console.log(`🔍 Procurando chamadas para: ${funcName}\n`);
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`function ${funcName}(`)) {
            console.log(`✅ Função ${funcName} encontrada na linha ${i + 1}:`);
            
            // Mostrar algumas linhas antes e depois
            const start = Math.max(0, i - 2);
            const end = Math.min(lines.length, i + 10);
            
            for (let j = start; j < end; j++) {
                const marker = j === i ? '>>> ' : '    ';
                console.log(`${marker}${(j + 1).toString().padStart(4)}: ${lines[j]}`);
            }
            console.log('');
            break;
        }
    }
});

// Verificar se há chamadas no evento DOMContentLoaded
console.log('🔍 VERIFICANDO EVENT LISTENERS...\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('DOMContentLoaded') || lines[i].includes('loadSiteDataFromSupabase')) {
        console.log(`Linha ${(i + 1).toString().padStart(4)}: ${lines[i]}`);
        
        // Mostrar contexto
        const contextStart = Math.max(0, i - 3);
        const contextEnd = Math.min(lines.length, i + 3);
        
        for (let j = contextStart; j <= contextEnd; j++) {
            if (j !== i) {
                console.log(`     ${(j + 1).toString().padStart(4)}: ${lines[j]}`);
            }
        }
        console.log('');
    }
}

console.log('\n🔍 VERIFICANDO SE HÁ ERROS DE SINTAXE...\n');

// Verificar se há chaves balanceadas nas funções de carga
const loadFunctionNames = [
    'loadServicesFromSupabase',
    'loadReviewsFromSupabase',
    'loadSpacePhotosFromSupabase',
    'loadContactInfoFromSupabase'
];

loadFunctionNames.forEach(funcName => {
    console.log(`🔍 Verificando função: ${funcName}`);
    
    let funcStart = -1;
    let funcEnd = -1;
    
    // Encontrar início da função
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`function ${funcName}(`)) {
            funcStart = i;
            break;
        }
    }
    
    // Encontrar fim da função
    if (funcStart !== -1) {
        let braceCount = 0;
        for (let i = funcStart; i < lines.length; i++) {
            const line = lines[i];
            if (line.includes('{')) braceCount++;
            if (line.includes('}')) braceCount--;
            if (braceCount === 0 && line.includes('}')) {
                funcEnd = i;
                break;
            }
        }
        
        if (funcEnd !== -1) {
            console.log(`   Linhas: ${funcStart + 1} - ${funcEnd + 1}`);
            console.log(`   ✅ Função bem formatada`);
        } else {
            console.log(`   ❌ Função MAL FORMATADA - chaves não fechadas`);
        }
    }
    
    console.log('');
});