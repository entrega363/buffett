const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// Converter para array de linhas
let lines = content.split('\n');

// Corrigir as linhas específicas
// Linha 2215 (índice 2214)
if (lines[2214].includes('const { data, error } = await supabase')) {
    lines[2214] = lines[2214].replace('await supabase', 'await supabaseClient');
}

// Linha 2242 (índice 2241)
if (lines[2241].includes('const { data, error } = await supabase')) {
    lines[2241] = lines[2241].replace('await supabase', 'await supabaseClient');
}

// Linha 2263 (índice 2262)
if (lines[2262].includes('const { data, error } = await supabase')) {
    lines[2262] = lines[2262].replace('await supabase', 'await supabaseClient');
}

// Linha 2285 (índice 2284)
if (lines[2284].includes('const { data, error } = await supabase')) {
    lines[2284] = lines[2284].replace('await supabase', 'await supabaseClient');
}

// Juntar novamente em string
content = lines.join('\n');

// Escrever o arquivo corrigido
fs.writeFileSync(indexPath, content, 'utf8');

console.log('✅ Correções aplicadas com sucesso ao index.html!');
console.log('Linhas corrigidas:');
console.log('- Linha 2215');
console.log('- Linha 2242');
console.log('- Linha 2263');
console.log('- Linha 2285');