const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
const content = fs.readFileSync(indexPath, 'utf8');

console.log('=== ANÁLISE FOCADA NO JAVASCRIPT ===\n');

// Extrair apenas o conteúdo JavaScript
const scriptMatches = content.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
if (scriptMatches) {
    console.log(`Encontradas ${scriptMatches.length} seções de script\n`);
    
    scriptMatches.forEach((script, index) => {
        console.log(`=== ANÁLISE DO SCRIPT ${index + 1} ===`);
        
        // Remover a tag script e obter apenas o conteúdo
        const scriptContent = script.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
        const lines = scriptContent.split('\n');
        
        // Verificar funções duplicadas
        const functionDeclarations = {};
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const funcMatch = line.match(/function\s+(\w+)\s*\(/);
            if (funcMatch) {
                const funcName = funcMatch[1];
                if (functionDeclarations[funcName]) {
                    console.log(`❌ Função duplicada "${funcName}" na linha ${i + 1} (também declarada na linha ${functionDeclarations[funcName] + 1})`);
                } else {
                    functionDeclarations[funcName] = i;
                }
            }
        }
        
        // Verificar showTab especificamente
        const showTabLines = [];
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('showTab')) {
                showTabLines.push({line: i + 1, content: lines[i].trim()});
            }
        }
        
        if (showTabLines.length > 0) {
            console.log(`\nshowTab encontrada em ${showTabLines.length} linhas:`);
            showTabLines.forEach(match => {
                console.log(`  Linha ${match.line}: ${match.content}`);
            });
        }
        
        // Verificar erros de sintaxe comuns
        let braceCount = 0;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            braceCount += (line.match(/{/g) || []).length;
            braceCount -= (line.match(/}/g) || []).length;
        }
        
        if (braceCount !== 0) {
            console.log(`❌ Chaves desbalanceadas: ${braceCount > 0 ? 'faltam' : 'sobram'} ${Math.abs(braceCount)} chaves`);
        } else {
            console.log('✅ Chaves balanceadas');
        }
        
        console.log('');
    });
} else {
    console.log('❌ Nenhuma seção de script encontrada!');
}

console.log('=== VERIFICAÇÃO DE ESTRUTURA HTML ===');

// Verificar estrutura básica
const openBody = (content.match(/<body/g) || []).length;
const closeBody = (content.match(/<\/body/g) || []).length;
const openHtml = (content.match(/<html/g) || []).length;
const closeHtml = (content.match(/<\/html/g) || []).length;

console.log(`HTML: ${openHtml} abertos, ${closeHtml} fechados ${openHtml === closeHtml ? '✅' : '❌'}`);
console.log(`Body: ${openBody} abertos, ${closeBody} fechados ${openBody === closeBody ? '✅' : '❌'}`);

console.log('\n=== ANÁLISE CONCLUÍDA ===');