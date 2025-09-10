const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
const content = fs.readFileSync(indexPath, 'utf8');

console.log('=== ANÁLISE DO ARQUIVO index.html ===');

// Verificar se há erros de sintaxe óbvios
const lines = content.split('\n');

// Procurar por padrões problemáticos
let issues = [];

// Verificar se há múltiplas declarações de funções com o mesmo nome
const functionDeclarations = {};
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const funcMatch = line.match(/function\s+(\w+)\s*\(/);
    if (funcMatch) {
        const funcName = funcMatch[1];
        if (functionDeclarations[funcName]) {
            issues.push(`Função duplicada "${funcName}" na linha ${i + 1} (também declarada na linha ${functionDeclarations[funcName] + 1})`);
        } else {
            functionDeclarations[funcName] = i;
        }
    }
}

// Verificar se há chamadas de função antes da declaração
const showTabMatches = [];
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('showTab(')) {
        showTabMatches.push({line: i + 1, content: lines[i].trim()});
    }
}

// Verificar estrutura do Supabase
const supabaseLines = [];
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('supabase') && (lines[i].includes('createClient') || lines[i].includes('.from('))) {
        supabaseLines.push({line: i + 1, content: lines[i].trim()});
    }
}

console.log('\n=== CHAMADAS showTab ENCONTRADAS ===');
showTabMatches.forEach(match => {
    console.log(`Linha ${match.line}: ${match.content}`);
});

console.log('\n=== LINHAS SUPABASE ===');
supabaseLines.forEach(line => {
    console.log(`Linha ${line.line}: ${line.content}`);
});

console.log('\n=== PROBLEMAS IDENTIFICADOS ===');
if (issues.length > 0) {
    issues.forEach(issue => console.log(`❌ ${issue}`));
} else {
    console.log('✅ Nenhum problema de duplicação de funções encontrado');
}

// Verificar se há erros de fechamento de tags
const openScriptTags = (content.match(/<script/g) || []).length;
const closeScriptTags = (content.match(/<\/script/g) || []).length;
console.log(`\n=== TAGS SCRIPT ===`);
console.log(`Abertas: ${openScriptTags}, Fechadas: ${closeScriptTags}`);
if (openScriptTags !== closeScriptTags) {
    console.log(`❌ ERRO: Número diferente de tags <script> abertas e fechadas!`);
} else {
    console.log(`✅ Tags <script> estão balanceadas`);
}

console.log('\n=== ANÁLISE CONCLUÍDA ===');