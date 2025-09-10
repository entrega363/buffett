const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
const content = fs.readFileSync(indexPath, 'utf8');

console.log('=== ANÁLISE DETALHADA DAS FUNÇÕES SUPABASE ===\n');

// Converter conteúdo em linhas
const lines = content.split('\n');

// Encontrar a função loadServicesFromSupabase
console.log('🔍 ANALISANDO FUNÇÃO loadServicesFromSupabase...\n');

let funcStart = -1;
let funcEnd = -1;

// Encontrar início da função
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('function loadServicesFromSupabase(')) {
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
}

if (funcStart !== -1 && funcEnd !== -1) {
    console.log(`✅ Função encontrada nas linhas ${funcStart + 1} - ${funcEnd + 1}\n`);
    
    // Extrair e mostrar o corpo da função
    const funcLines = lines.slice(funcStart, funcEnd + 1);
    funcLines.forEach((line, index) => {
        const lineNum = funcStart + index + 1;
        console.log(`${lineNum.toString().padStart(4)}: ${line}`);
    });
    
    console.log('\n🔍 ANÁLISE DOS PROBLEMAS ENCONTRADOS:\n');
    
    // Verificar se há chamadas reais ao Supabase
    let hasRealSupabaseCall = false;
    funcLines.forEach((line, index) => {
        if (line.includes('await supabaseClient') && line.includes('.from(')) {
            hasRealSupabaseCall = true;
            console.log(`❌ LINHA ${funcStart + index + 1}: Chamada incompleta ou mal formada`);
            console.log(`   Conteúdo: ${line.trim()}`);
        }
    });
    
    if (!hasRealSupabaseCall) {
        console.log('❌ NENHUMA CHAMADA REAL AO SUPABASE ENCONTRADA!');
        console.log('   A função parece estar incompleta ou mal formatada.');
    }
    
    // Verificar se há erros de sintaxe
    const funcBody = funcLines.join('\n');
    if (funcBody.includes('await supabaseClient') && !funcBody.includes('.select(')) {
        console.log('❌ FALTA MÉTODO SELECT NA CHAMADA SUPABASE');
    }
    
    if (funcBody.includes('await supabaseClient') && !funcBody.includes(';')) {
        console.log('❌ FALTA PONTO E VÍRGULA NA CHAMADA SUPABASE');
    }
} else {
    console.log('❌ Função loadServicesFromSupabase NÃO encontrada');
}

console.log('\n' + '='.repeat(50));
console.log('🔍 ANALISANDO OUTRAS FUNÇÕES DE CARGA...');
console.log('='.repeat(50) + '\n');

// Analisar outras funções de carga
const otherFunctions = [
    'loadReviewsFromSupabase',
    'loadSpacePhotosFromSupabase', 
    'loadContactInfoFromSupabase'
];

otherFunctions.forEach(funcName => {
    console.log(`🔍 Função: ${funcName}`);
    
    let start = -1;
    let end = -1;
    
    // Encontrar início
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`function ${funcName}(`)) {
            start = i;
            break;
        }
    }
    
    // Encontrar fim
    if (start !== -1) {
        let braceCount = 0;
        for (let i = start; i < lines.length; i++) {
            const line = lines[i];
            if (line.includes('{')) braceCount++;
            if (line.includes('}')) braceCount--;
            if (braceCount === 0 && line.includes('}')) {
                end = i;
                break;
            }
        }
    }
    
    if (start !== -1 && end !== -1) {
        const funcLines = lines.slice(start, end + 1);
        const funcBody = funcLines.join('\n');
        
        if (funcBody.includes('await supabaseClient') && !funcBody.includes('.select(')) {
            console.log(`❌ ${funcName}: Falta método .select()`);
        } else if (funcBody.includes('await supabaseClient')) {
            console.log(`✅ ${funcName}: Chamada aparentemente correta`);
        } else {
            console.log(`❌ ${funcName}: Sem chamada ao Supabase`);
        }
    } else {
        console.log(`❌ ${funcName}: Função não encontrada`);
    }
    
    console.log('');
});

console.log('💡 SOLUÇÃO SUGERIDA:');
console.log('As funções de carga do Supabase estão mal formatadas.');
console.log('É necessário corrigir as chamadas para seguir o padrão:');
console.log('await supabaseClient.from(\'tabela\').select(\'*\')');