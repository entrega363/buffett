const fs = require('fs');

// Ler o arquivo index.html
const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

console.log('=== CORRIGINDO ERRO DE DIGITAÇÃO NO SUPABASE ===\n');

// Corrigir o erro de digitação "supabaseClientClient" -> "supabaseClient"
const originalPattern = /supabaseClientClient/g;
const correctedPattern = 'supabaseClient';

const corrections = (content.match(originalPattern) || []).length;
content = content.replace(originalPattern, correctedPattern);

console.log(`✅ Corrigidas ${corrections} ocorrências de "supabaseClientClient" para "supabaseClient"\n`);

// Escrever o arquivo corrigido
fs.writeFileSync(indexPath, content, 'utf8');

console.log('✅ Correção aplicada com sucesso!');
console.log('✅ Arquivo index.html atualizado');

// Verificar novamente
const verificaContent = fs.readFileSync(indexPath, 'utf8');
const remainingErrors = (verificaContent.match(/supabaseClientClient/g) || []).length;
console.log(`✅ Erros restantes: ${remainingErrors}\n`);