const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
const content = fs.readFileSync(indexPath, 'utf8');

console.log('=== ANÁLISE DETALHADA DO index.html ===\n');

const lines = content.split('\n');

// Verificar cada linha em busca de erros
for (let i = 0; i < Math.min(lines.length, 100); i++) {
    const line = lines[i];
    
    // Verificar por erros comuns de sintaxe
    if (line.includes('function') && line.includes('(') && !line.includes(')')) {
        console.log(`❌ Linha ${i + 1}: Função sem fechamento de parênteses`);
        console.log(`   ${line.trim()}`);
    }
    
    if (line.includes('{') && !line.includes('}')) {
        // Contar chaves
        let openBraces = (line.match(/{/g) || []).length;
        let closeBraces = (line.match(/}/g) || []).length;
        if (openBraces > closeBraces) {
            console.log(`❌ Linha ${i + 1}: Chave aberta sem fechamento`);
            console.log(`   ${line.trim()}`);
        }
    }
    
    // Verificar por declarações incompletas
    if (line.includes('const') && !line.includes('=') && !line.includes(';')) {
        console.log(`❌ Linha ${i + 1}: Declaração const incompleta`);
        console.log(`   ${line.trim()}`);
    }
    
    if (line.includes('let') && !line.includes('=') && !line.includes(';')) {
        console.log(`❌ Linha ${i + 1}: Declaração let incompleta`);
        console.log(`   ${line.trim()}`);
    }
    
    if (line.includes('var') && !line.includes('=') && !line.includes(';')) {
        console.log(`❌ Linha ${i + 1}: Declaração var incompleta`);
        console.log(`   ${line.trim()}`);
    }
}

// Verificar se há erros específicos na função showTab
const showTabStart = lines.findIndex(line => line.includes('function showTab('));
if (showTabStart !== -1) {
    console.log(`\n=== ANÁLISE DA FUNÇÃO showTab (início na linha ${showTabStart + 1}) ===`);
    
    let braceCount = 0;
    let inFunction = false;
    
    for (let i = showTabStart; i < Math.min(showTabStart + 50, lines.length); i++) {
        const line = lines[i];
        
        if (line.includes('function showTab(')) {
            inFunction = true;
        }
        
        if (inFunction) {
            if (line.includes('{')) braceCount += (line.match(/{/g) || []).length;
            if (line.includes('}')) braceCount -= (line.match(/}/g) || []).length;
            
            if (braceCount === 0 && line.includes('}')) {
                console.log(`✅ Função showTab parece estar corretamente fechada (linha ${i + 1})`);
                break;
            }
        }
    }
    
    if (braceCount !== 0) {
        console.log(`❌ Função showTab pode ter problema de chaves não fechadas`);
    }
}

console.log('\n=== VERIFICAÇÃO DE ERROS COMUNS ===');

// Verificar se há erros de JSON
try {
    JSON.parse('{"test": "value"}');
    console.log('✅ Parser JSON funcionando');
} catch (e) {
    console.log('❌ Parser JSON com problemas');
}

// Verificar se há erros de RegExp
try {
    new RegExp('test');
    console.log('✅ Parser RegExp funcionando');
} catch (e) {
    console.log('❌ Parser RegExp com problemas');
}

console.log('\n=== ANÁLISE CONCLUÍDA ===');