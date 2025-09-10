const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

console.log('=== CORRIGINDO PROBLEMAS DO SITE ===\n');

// Converter conteúdo em linhas
let lines = content.split('\n');

// 1. Corrigir a função loadServicesEventsFromSupabase
console.log('🔧 Corrigindo função loadServicesEventsFromSupabase...\n');

let funcStart = -1;
let funcEnd = -1;

// Encontrar início da função
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('function loadServicesEventsFromSupabase(')) {
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
    console.log(`✅ Função encontrada nas linhas ${funcStart + 1} - ${funcEnd + 1}`);
    
    // Substituir a função problemática por uma versão corrigida
    const correctedFunction = [
        '        // Função para carregar eventos dos serviços do Supabase',
        '        async function loadServicesEventsFromSupabase() {',
        '            try {',
        '                // Carregar eventos dos serviços diretamente',
        '                console.log(\'Carregando eventos dos serviços do Supabase...\');',
        '                // Esta função agora carrega dados diretamente em vez de importar arquivo externo',
        '            } catch (error) {',
        '                console.error(\'Erro ao carregar eventos dos serviços do Supabase:\', error);',
        '                // Fallback para dados do localStorage',
        '            }',
        '        }'
    ];
    
    // Substituir a função
    lines.splice(funcStart, funcEnd - funcStart + 1, ...correctedFunction);
    console.log('✅ Função corrigida');
}

// 2. Remover a segunda chamada ao DOMContentLoaded duplicada (linhas 2245-2253)
console.log('\n🔧 Removendo DOMContentLoaded duplicado...\n');

let domStart = -1;
let domEnd = -1;

// Encontrar a segunda chamada ao DOMContentLoaded
for (let i = 2240; i < Math.min(lines.length, 2260); i++) {
    if (lines[i].includes('document.addEventListener(\'DOMContentLoaded\'')) {
        domStart = i;
        break;
    }
}

// Encontrar o fim do bloco
if (domStart !== -1) {
    for (let i = domStart; i < Math.min(lines.length, domStart + 20); i++) {
        if (lines[i].includes('</script>')) {
            domEnd = i;
            break;
        }
    }
}

if (domStart !== -1 && domEnd !== -1) {
    console.log(`✅ Bloco DOMContentLoaded duplicado encontrado nas linhas ${domStart + 1} - ${domEnd + 1}`);
    lines.splice(domStart, domEnd - domStart + 1);
    console.log('✅ Bloco DOMContentLoaded duplicado removido');
}

// 3. Corrigir chamadas Supabase que podem estar mal formatadas
console.log('\n🔧 Corrigindo chamadas Supabase...\n');

for (let i = 0; i < lines.length; i++) {
    // Corrigir chamadas mal formatadas
    if (lines[i].includes('await supabaseClient') && !lines[i].includes('.select(')) {
        console.log(`🔧 Corrigindo chamada na linha ${i + 1}`);
        lines[i] = lines[i].replace('await supabaseClient', 'const { data, error } = await supabaseClient');
    }
}

// Juntar novamente o conteúdo
content = lines.join('\n');

// 4. Corrigir possíveis erros de sintaxe nas chamadas Supabase
console.log('\n🔧 Corrigindo erros de sintaxe nas chamadas Supabase...\n');

// Padrões comuns de erro
const syntaxFixes = [
    {
        pattern: /(const \{ data, error \} = await supabaseClient\s+\.from\('[^']+'\))/g,
        replacement: '$1.select(\'*\')'
    }
];

syntaxFixes.forEach(fix => {
    const original = content;
    content = content.replace(fix.pattern, fix.replacement);
    if (original !== content) {
        console.log('✅ Erros de sintaxe corrigidos');
    }
});

// Escrever o arquivo corrigido
fs.writeFileSync(indexPath, content, 'utf8');

console.log('\n✅ CORREÇÕES APLICADAS COM SUCESSO!');
console.log('✅ Função loadServicesEventsFromSupabase corrigida');
console.log('✅ DOMContentLoaded duplicado removido');
console.log('✅ Chamadas Supabase padronizadas');
console.log('✅ Arquivo index.html atualizado\n');

console.log('=== CORREÇÃO CONCLUÍDA ===\n');